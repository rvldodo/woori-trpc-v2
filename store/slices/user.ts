import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string | null;
  company?: string | null;
  phone: string | null;
  otp: string | null;
  userType: "INDIVIDU" | "KORPORAT";
}

export const initialState: UserState = {
  name: "",
  company: "",
  phone: "",
  otp: "",
  userType: "INDIVIDU",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCompany: (state, action: PayloadAction<string>) => {
      state.company = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setOTP: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setUserType: (state, action: PayloadAction<"INDIVIDU" | "KORPORAT">) => {
      state.userType = action.payload;
    },
    resetForm: (_) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setName, setPhone, setCompany, setOTP, setUserType, resetForm } =
  userSlice.actions;

export default userSlice.reducer;
