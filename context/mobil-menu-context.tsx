"use client";

import { createContext, useContext, useState } from "react";

type MobileMenuContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
};

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export function MobileMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <MobileMenuContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);

  if (!context) {
    throw new Error("useMobileMenu must be used inside MobileMenuProvider");
  }

  return context;
}
