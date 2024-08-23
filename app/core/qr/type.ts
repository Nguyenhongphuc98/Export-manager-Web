export enum ScannedItemStatus {
  Success = 0, //quet thanh cong
  Duplicate = 1, // item da duoc quet
  NoSession = 2, // khong co export/weigh session tuong ung dang mo => kick out
  InvalidItem = 3, // item nay k nam trong session dang xu ly
  ItemNotFound = 4, //k tim thay item nay
  Error = 5, // unknow error
}

export type ScannedItemData = {
  status: ScannedItemStatus;
  exportId: string,
  info: {
    id: string,
    packageSeries: [number, number];
    po: string;
    // sku: string;
    packageId: string;
    // itemsInPackage: number;
    // netWeight: number;
    // grossWeight: number;
    // width: number;
    // length: number;
    // height: number;
  };
};
