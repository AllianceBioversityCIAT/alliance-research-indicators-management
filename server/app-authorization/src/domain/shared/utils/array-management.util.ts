export class ArrayUtil {
  static update<T>(clientArray: T[], backendArray: T[], key: keyof T & string) {
    backendArray?.forEach((bItem) => {
      const clientArrayItemIndex = clientArray.findIndex(
        (item) => item[key] === bItem[key],
      );
      if (clientArrayItemIndex !== -1) {
        const temp = clientArray[clientArrayItemIndex];
        delete temp[key];
        clientArray[clientArrayItemIndex] = { ...bItem, ...temp };
      } else {
        clientArray.push({ ...bItem, is_active: false });
      }
    });

    return clientArray ?? [];
  }
}
