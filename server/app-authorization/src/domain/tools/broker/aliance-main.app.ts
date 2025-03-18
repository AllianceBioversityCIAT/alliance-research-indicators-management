import { Injectable, Logger } from '@nestjs/common';
import { BrokerConnectionBase } from './base/broker-base.connection';
import { env } from 'process';
@Injectable()
export class AlianceMainApp extends BrokerConnectionBase {
  protected readonly _logger = new Logger(AlianceMainApp.name);

  constructor() {
    super(env.ARIM_QUEUE_SECONDARY);
  }
}
