import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionMessage } from '../enums/exception-message.enum';
import { JwtService, TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { env } from 'process';
import { DataSource } from 'typeorm';
import { UserRole } from '../../entities/user-roles/entities/user-role.entity';
import { PayloadDto } from '../global-dto/payload.dto';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async use(
    @Req() req: RequestWithCustomAttrs,
    @Res() _res: Response,
    @Next() next: NextFunction,
  ) {
    const { authorization } = req.headers;
    if (typeof authorization !== 'string') {
      throw new UnauthorizedException(ExceptionMessage.JWT_NOT_FOUND);
    }

    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException(ExceptionMessage.JWT_NOT_FOUND);
    }

    const token = parts[1];

    try {
      const decoded: PayloadDto = this.jwtService.verify(token, {
        secret: env.ARIM_JWT_SECRET,
      });
      req.user = decoded;
      const typeRole: number = 1;
      const roles = await this.dataSource.getRepository(UserRole).find({
        where: {
          user_id: decoded.id,
          is_active: true,
          role: { focus_id: typeRole },
        },
      });
      req.user.roles = roles;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(ExceptionMessage.JWT_EXPIRED);
      } else if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException(ExceptionMessage.JWT_INVALID);
      } else {
        throw new UnauthorizedException(ExceptionMessage.JWT_ERROR);
      }
    }
  }
}

interface RequestWithCustomAttrs extends Request {
  [key: string]: any;
}
