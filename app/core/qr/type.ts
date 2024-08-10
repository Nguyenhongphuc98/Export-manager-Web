export enum ExportedItemStatus {
  Success = 0,
  Duplicate = 1,
  NoSession = 2,
  InvalidItem = 3,
}

export type ExportedItemData = {
  status: ExportedItemStatus;
  info: {
    packageSeries: string;
    po: string;
    sku: string;
    packageId: string;
    itemsInPackage: number;
    netWeight: number;
    grossWeight: number;
    width: number;
    length: number;
    height: number;
  };
};
