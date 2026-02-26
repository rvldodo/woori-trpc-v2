import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoanState {
  jenis: string | null;
  cabang: string | null;
  cabangId: number | null;
  brand: string | null;
  model: string | null;
  type: string | null;
  tahunKendaraan: string | null;
  kondisi: string | null;
  modelKendaraan: string | null;
  jenisAsuransi: string | null;
  totalOTR: number | null;
  totalDP: number | null;
  branchName: string | null;
}

const initialState: LoanState = {
  jenis: "BEKAS",
  cabang: "",
  cabangId: null,
  model: "",
  type: "",
  brand: "",
  tahunKendaraan: "",
  kondisi: "",
  modelKendaraan: "",
  jenisAsuransi: "",
  totalOTR: 0,
  totalDP: 0,
  branchName: "",
};

const heUsedSlice = createSlice({
  name: "alat-berat-bekas",
  initialState,
  reducers: {
    setJenisHEBekas: (state, action: PayloadAction<string>) => {
      state.jenis = action.payload;
    },
    setCabangHEBekas: (state, action: PayloadAction<string>) => {
      state.cabang = action.payload;
    },
    setCabangIdHEBekas: (state, action: PayloadAction<number>) => {
      state.cabangId = action.payload;
    },
    setBrandHEBekas: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setModelHEBekas: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setTypeHEBekas: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setTotalOTRHEBekas: (state, action: PayloadAction<number>) => {
      state.totalOTR = action.payload;
    },
    setTotalDPHEBekas: (state, action: PayloadAction<number>) => {
      state.totalDP = action.payload;
    },
    setBranchNameHEBekas: (state, action: PayloadAction<string>) => {
      state.branchName = action.payload;
    },
    setJenisAsuransiHEBekas: (state, action: PayloadAction<string>) => {
      state.jenisAsuransi = action.payload;
    },
    setTahunKendaraanHEBekas: (state, action: PayloadAction<string>) => {
      state.tahunKendaraan = action.payload;
    },
    resetForm: (_) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setJenisHEBekas,
  setCabangHEBekas,
  setCabangIdHEBekas,
  setBrandHEBekas,
  setTypeHEBekas,
  setModelHEBekas,
  setTotalOTRHEBekas,
  setBranchNameHEBekas,
  setJenisAsuransiHEBekas,
  setTotalDPHEBekas,
  setTahunKendaraanHEBekas,
  resetForm,
} = heUsedSlice.actions;

export default heUsedSlice.reducer;
