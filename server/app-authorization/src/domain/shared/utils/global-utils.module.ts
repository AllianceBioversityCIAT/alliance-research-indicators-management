import { Module, Global } from '@nestjs/common';
import { CurrentUserUtil } from './current-user.util';
import { AppConfigUtil } from './app_config.util';

@Global()
@Module({
  providers: [CurrentUserUtil, AppConfigUtil],
  exports: [CurrentUserUtil, AppConfigUtil],
})
export class GlobalUtilsModule {}
