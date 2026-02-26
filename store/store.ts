import { configureStore } from "@reduxjs/toolkit";
import heUsedReducer from "@/store/slices/he-used";
import heNewReducer from "@/store/slices/he-new";
import carUsedReducer from "@/store/slices/car-new";
import carNewReducer from "@/store/slices/car-used";

export const store = () => {
  return configureStore({
    reducer: {
      he_used: heUsedReducer,
      he_new: heNewReducer,
      car_used: carUsedReducer,
      car_new: carNewReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
