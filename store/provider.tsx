"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, store } from "./store";

type Props = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
