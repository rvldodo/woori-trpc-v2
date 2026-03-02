export interface CarBrand {
  Unit: number;
  AssetMerk: string;
  AssetMerkName: string;
  ManufacturerCountry: string;
}

export interface CarModel {
  AssetModel: string;
  AssetModelName: string;
}

export interface CarType {
  AssetType: string;
  AssetTypeName: string;
}

export interface Tenor {
  AdminFee: number;
  Angsuran: number;
  DP: number;
  ErrorCode: string;
  ErrorDesc: string;
  FirstPayment: "AD" | "AR";
  Jenisbiaya: string;
  MinDP_persen: number;
  OTR: number;
  PH: number;
  Pencairan: number;
  PremiAsuransi: number;
  Provinsi: number;
  Sumberpertanggungan: string;
  TDP: number;
  Tahun: number;
  Tenor: number;
  TotalAdmin: number;
  Wilayah: null;
  asuransi_kendaraan: string;
  fiducia: number;
  jenisasset: null;
  jeniskredit: string;
  kategoriasset: string;
  notaris: number;
}
