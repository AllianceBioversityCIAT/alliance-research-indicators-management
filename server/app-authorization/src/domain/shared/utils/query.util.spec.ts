import { QueryUtil } from './query.util';

describe('QueryUtil', () => {
  let util: QueryUtil;

  beforeEach(() => {
    util = new QueryUtil();
  });

  it('should be defined', () => {
    expect(util).toBeDefined();
  });

  it('should build query where', () => {
    const params = {
      tableAlias: {
        key: 'value',
      },
      tableAlias2: {
        key2: true,
        key3: 1,
      },
    };

    const expected = {
      where:
        '1 = 1 AND tableAlias.key LIKE :tableAlias_key AND tableAlias2.key2 = :tableAlias2_key2 AND tableAlias2.key3 = :tableAlias2_key3 ',
      attr: {
        tableAlias_key: '%value%',
        tableAlias2_key2: true,
        tableAlias2_key3: 1,
      },
    };
    const result = QueryUtil.buildQueryWhere(params);
    expect(result).toEqual(expected);
  });
});
