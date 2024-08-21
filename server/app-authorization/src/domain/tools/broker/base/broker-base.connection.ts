import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { env } from 'process';

export abstract class BrokerConnectionBase {
  protected client: ClientProxy;

  constructor(queueName: string) {
    const queueHost: string = `amqps://${env.ARIM_MQ_USER}:${env.ARIM_MQ_PASSWORD}@${env.ARIM_MQ_HOST}`;
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [queueHost],
        queue: queueName,
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async emitToPattern<T>(pattern: string, message: T) {
    const parsedMessage: string = JSON.stringify(message);
    return this.client.emit(pattern, parsedMessage);
  }
}
