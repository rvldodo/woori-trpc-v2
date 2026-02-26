import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoanState {
  jenis: string | null;
  lokasi: string | null;
  cabang: string | null;
  cabangId: number | null;
  brand: string | null;
  brandValue: string | null;
  model: string | null;
  modelValue: string | null;
  type: string | null;
  typeValue: string | null;
  platwil?: string | null;
  tenor: number | null;
  tahunKendaraan: string | null;
  kondisi: string | null;
  modelKendaraan: string | null;
  jenisDP: string | null;
  asuransiKendaraan: string | null;
  totalDP: number | null;
  totalOTR: number | null;
  locationName: string | null;
  branchName: string | null;
  tenorDetail: {
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
  };
}

const initialTenorDetail = {
  AdminFee: 0,
  Angsuran: 0,
  DP: 0,
  ErrorCode: "",
  ErrorDesc: "",
  FirstPayment: "AD" as const,
  Jenisbiaya: "",
  MinDP_persen: 0,
  OTR: 0,
  PH: 0,
  Pencairan: 0,
  PremiAsuransi: 0,
  Provinsi: 0,
  Sumberpertanggungan: "",
  TDP: 0,
  Tahun: 0,
  Tenor: 0,
  TotalAdmin: 0,
  Wilayah: null,
  asuransi_kendaraan: "",
  fiducia: 0,
  jenisasset: null,
  jeniskredit: "",
  kategoriasset: "",
  notaris: 0,
};

const initialState: LoanState = {
  jenis: "BEKAS",
  lokasi: "",
  cabang: "",
  cabangId: null,
  model: "",
  modelValue: "",
  type: "",
  typeValue: "",
  brand: "",
  brandValue: "",
  platwil: "",
  tenor: 12,
  tahunKendaraan: "",
  kondisi: "",
  modelKendaraan: "",
  jenisDP: "",
  asuransiKendaraan: "",
  totalDP: 0,
  totalOTR: 0,
  locationName: "",
  branchName: "",
  tenorDetail: initialTenorDetail,
};

const carUsedSlice = createSlice({
  name: "mobil-lama",
  initialState,
  reducers: {
    setJenis: (state, action: PayloadAction<string>) => {
      state.jenis = action.payload;
    },
    setLokasi: (state, action: PayloadAction<string>) => {
      state.lokasi = action.payload;
    },
    setCabang: (state, action: PayloadAction<string>) => {
      state.cabang = action.payload;
    },
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setBrandValue: (state, action: PayloadAction<string>) => {
      state.brandValue = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setModelValue: (state, action: PayloadAction<string>) => {
      state.modelValue = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setTypeValue: (state, action: PayloadAction<string>) => {
      state.typeValue = action.payload;
    },
    setPlatWil: (state, action: PayloadAction<string>) => {
      state.platwil = action.payload;
    },
    setTenor: (state, action: PayloadAction<number>) => {
      state.tenor = action.payload;
    },
    setTahunKendaraan: (state, action: PayloadAction<string>) => {
      state.tahunKendaraan = action.payload;
    },
    setKondisi: (state, action: PayloadAction<string>) => {
      state.kondisi = action.payload;
    },
    setModelKendaraan: (state, action: PayloadAction<string>) => {
      state.modelKendaraan = action.payload;
    },
    setJenisDP: (state, action: PayloadAction<string>) => {
      state.jenisDP = action.payload;
    },
    setAsuransiKendaraan: (state, action: PayloadAction<string>) => {
      state.asuransiKendaraan = action.payload;
    },
    setTotalDP: (state, action: PayloadAction<number>) => {
      state.totalDP = action.payload;
    },
    setTotalOTR: (state, action: PayloadAction<number>) => {
      state.totalOTR = action.payload;
    },
    setLocationName: (state, action: PayloadAction<string>) => {
      state.locationName = action.payload;
    },
    setBranchName: (state, action: PayloadAction<string>) => {
      state.branchName = action.payload;
    },
    setCabangId: (state, action: PayloadAction<number>) => {
      state.cabangId = action.payload;
    },
    setTenorDetail: (
      state,
      action: PayloadAction<Partial<LoanState["tenorDetail"]>>,
    ) => {
      state.tenorDetail = { ...state.tenorDetail, ...action.payload };
    },
    resetTenorDetail: (state) => {
      state.tenorDetail = initialTenorDetail;
    },
    resetForm: (_) => {
      return {
        ...initialState,
        tenorDetail: initialTenorDetail,
      };
    },
    updateLoanState: (state, action: PayloadAction<Partial<LoanState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setJenis,
  setLokasi,
  setCabang,
  setBrand,
  setBrandValue,
  setModel,
  setModelValue,
  setType,
  setTypeValue,
  setPlatWil,
  setTenor,
  setTahunKendaraan,
  setKondisi,
  setModelKendaraan,
  setJenisDP,
  setAsuransiKendaraan,
  setTotalDP,
  setTotalOTR,
  setLocationName,
  setBranchName,
  setCabangId,
  setTenorDetail,
  resetTenorDetail,
  resetForm,
  updateLoanState,
} = carUsedSlice.actions;

export default carUsedSlice.reducer;
