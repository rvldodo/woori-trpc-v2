"use client";

import { PATHS } from "@/app/urls";
import { LOAN_DATA_LOCAL_STORAGE } from "@/lib/constants";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function LayoutPinjaman({ children }: Props) {
  useEffect(() => {
    const data = localStorage.getItem(LOAN_DATA_LOCAL_STORAGE);
    if (!data) redirect(PATHS.home.base);
  }, []);

  return children;
}
