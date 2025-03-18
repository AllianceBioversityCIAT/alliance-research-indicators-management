import { Injectable, Logger } from '@nestjs/common';
import { BrokerConnectionBase } from './base/broker-base.connection';
import { ConfigMessageSocketDto, EmailBody } from './dtos/mailer.dto';
import { env } from 'process';
import { TemplateService } from '../../auxiliary/template/template.service';
import {
  TemplateEnum,
  WelcomeEmailTemplate,
} from '../../auxiliary/template/enum/template.enum';
import { User } from '../../entities/users/entities/user.entity';

@Injectable()
export class MessageMicroservice extends BrokerConnectionBase {
  private readonly _logger = new Logger(MessageMicroservice.name);

  constructor(private readonly _templateService: TemplateService) {
    super(env.ARIM_QUEUE_EMAIL);
  }

  async sendEmail(message: EmailBody) {
    const parsedMessage: ConfigMessageSocketDto = {
      auth: {
        password: env.ARIM_MS_SECRET,
        username: env.ARIM_MS_CLIENT_ID,
      },
      data: {
        from: {
          email: env.ARIM_FROM_EMAIL,
          name: env.ARIM_FROM_NAME,
        },
        emailBody: {
          subject: message?.subject,
          to: message?.to,
          cc: message?.cc,
          bcc: message?.bcc,
          message: {
            text: message?.message?.text,
            socketFile: message?.message?.socketFile,
          },
        },
      },
    };
    this.client.emit('send', parsedMessage);
    this._logger.log(`Email "${message.subject}" in process to send`);
  }

  async welcomeEmail(data: User) {
    await this._templateService
      ._getTemplate<WelcomeEmailTemplate>(TemplateEnum.WELCOME_EMAIL, {
        client_host: env.ARIM_ALLIANCE_CLI_HOST,
        first_name: data.first_name,
        last_name: data.last_name,
      })
      .then(async (template: string) => {
        const sendEmail: EmailBody = {
          message: {
            socketFile: Buffer.from(template),
          },
          subject: 'Welcome to Alliance',
          to: data.email,
        };

        await this.sendEmail(sendEmail);
      });
  }
}
