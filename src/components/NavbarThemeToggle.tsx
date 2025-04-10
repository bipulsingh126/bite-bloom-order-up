
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export const NavbarThemeToggle = () => {
  // Remove the fixed positioning as it's now integrated in the navbar
  return (
    <div className="animate-fade-in">
      <ThemeToggle />
    </div>
  );
};
