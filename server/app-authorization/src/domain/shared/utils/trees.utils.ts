import { MapToKeyof, TreeDto } from '../global-dto/tree.dto';
import { v4 as uuidv4 } from 'uuid';

export const filterActiveDescendants = <T extends TreeDto<T>>(
  node: T | T[],
): T | T[] => {
  if (Array.isArray(node)) {
    return node
      .filter((child) => child.is_active)
      .map((child) => filterActiveDescendants(child)) as T[];
  } else {
    node.children = node.children
      .filter((child) => child.is_active)
      .map((child) => filterActiveDescendants(child)) as T[];

    return node;
  }
};

const mappingOBJ = <T, Y>(data: T, maping: MapToKeyof<T, Y>): Y => {
  const obj: Y = {} as Y;
  for (const key in maping) {
    obj[maping[key]] = <any>data[key];
  }
  return obj;
};

export const mapTreeToArray = <Echema extends TreeDto<Echema>, ReturnData>(
  echema: Echema,
  maping: MapToKeyof<Echema, ReturnData>,
  returnData: ReturnData[] = [],
): ReturnData[] => {
  returnData.push(mappingOBJ<Echema, ReturnData>(echema, maping));
  for (const child of echema.children) {
    mapTreeToArray(child, maping, returnData);
  }

  return returnData;
};

export const mapTree = <
  Echema extends TreeDto<Echema>,
  ReturnData extends { children?: ReturnData[] },
>(
  schema: Echema,
  maping: MapToKeyof<Echema, ReturnData>,
): ReturnData => {
  const mappedNode = mappingOBJ<Echema, ReturnData>(schema, maping);
  mappedNode.children = schema.children.map((child) => mapTree(child, maping));

  return mappedNode;
};

export const addNodeCodeInTree = <Echema extends TreeDto<Echema>>(
  echema: Echema,
  primaryKey: keyof Echema,
  isManualParentCode: boolean = false,
  parentKey: keyof Echema = null,
  parent: string = null,
) => {
  const mappedNode = echema;
  if (mappedNode[primaryKey] === null || mappedNode[primaryKey] === undefined) {
    mappedNode[primaryKey] = uuidv4();
  }

  const tempParenCode = parent && isManualParentCode ? parent : null;
  mappedNode.parent_code = tempParenCode;
  mappedNode.children = echema.children.map((child) =>
    addNodeCodeInTree(
      child,
      primaryKey,
      isManualParentCode,
      parentKey,
      mappedNode[primaryKey] as string,
    ),
  );

  return mappedNode;
};
