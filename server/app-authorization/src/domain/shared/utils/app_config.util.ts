import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppConfig } from '../../complementary-entities/secondary/app-config/app-config.entity';

@Injectable()
export class AppConfigUtil {
  constructor(private readonly dataSource: DataSource) {}

  async DB_SUPPORT_EMAIL(): Promise<string> {
    const appConfig = await this.dataSource.getRepository(AppConfig).findOne({
      where: {
        key: 'ARI_SUPPORT_EMAIL',
      },
    });
    return appConfig?.simple_value;
  }
}
