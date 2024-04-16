import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/client-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { DynamoTables } from './enum/dynamo-tables.enum';

@Injectable()
export class DynamoService {
  constructor(@Inject('DYNAMODB') private readonly _client: DynamoDBClient) {}

  public findAll<T>(tableNmae: DynamoTables): Promise<T[]> {
    const params: ScanCommandInput = {
      TableName: tableNmae,
    };
    return this._client
      .send(new ScanCommand(params))
      .then((res) => res.Items as T[]);
  }
}
