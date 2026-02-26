import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const date = new Date();
const year = date.getFullYear();

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
  jenis: "BARU",
  cabang: "",
  cabangId: null,
  model: "",
  type: "",
  brand: "",
  tahunKendaraan: year.toString(),
  kondisi: "",
  modelKendaraan: "",
  jenisAsuransi: "",
  totalOTR: 0,
  totalDP: 0,
  branchName: "",
};

const heNewSlice = createSlice({
  name: "alat-berat-baru",
  initialState,
  reducers: {
    setJenisHEBaru: (state, action: PayloadAction<string>) => {
      state.jenis = action.payload;
    },
    setCabangHEBaru: (state, action: PayloadAction<string>) => {
      state.cabang = action.payload;
    },
    setCabangIdHEBaru: (state, action: PayloadAction<number>) => {
      state.cabangId = action.payload;
    },
    setBrandHEBaru: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setModelHEBaru: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setTypeHEBaru: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setTotalOTRHEBaru: (state, action: PayloadAction<number>) => {
      state.totalOTR = action.payload;
    },
    setTotalDPHEBaru: (state, action: PayloadAction<number>) => {
      state.totalDP = action.payload;
    },
    setBranchNameHEBaru: (state, action: PayloadAction<string>) => {
      state.branchName = action.payload;
    },
    setJenisAsuransiHEBaru: (state, action: PayloadAction<string>) => {
      state.jenisAsuransi = action.payload;
    },
    setTahunKendaraanHEBaru: (state, action: PayloadAction<string>) => {
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
  setJenisHEBaru,
  setCabangHEBaru,
  setCabangIdHEBaru,
  setBrandHEBaru,
  setModelHEBaru,
  setTypeHEBaru,
  setTotalOTRHEBaru,
  setBranchNameHEBaru,
  setJenisAsuransiHEBaru,
  setTotalDPHEBaru,
  setTahunKendaraanHEBaru,
  resetForm,
} = heNewSlice.actions;

export default heNewSlice.reducer;
