export class TreeDto<T extends TreeDto<T>> {
  public children: T[];
  public is_active: boolean;
  public parent_code?: string;
}

export class MappingAttributeDto<In, From> {
  public in: (keyof In)[];
  public from: (keyof From)[];
}

export type MapToKeyof<T, U> = {
  [K in keyof T]?: keyof U;
};
