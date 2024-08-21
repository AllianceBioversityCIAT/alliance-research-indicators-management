import { Injectable, Logger } from '@nestjs/common';
import { BrokerConnectionBase } from './base/broker-base.connection';
import { ConfigMessageSocketDto, EmailBody } from './dtos/mailer.dto';
import { env } from 'process';

@Injectable()
export class MessageMicroservice extends BrokerConnectionBase {
  private readonly _logger = new Logger(MessageMicroservice.name);

  constructor() {
    super('cgiar_ms_test_mailer_queue');
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
    await this.client.emit('send', parsedMessage);
    this._logger.log(`Email "${message.subject}" in process to send`);
  }
}
