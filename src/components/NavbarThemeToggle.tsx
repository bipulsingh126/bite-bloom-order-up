import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export const NavbarThemeToggle = () => {
  return (
    <div className="fixed top-4 right-4 z-50 shadow-lg rounded-full animate-fade-in">
      <ThemeToggle />
    </div>
  );
};
