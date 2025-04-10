
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-accent transition-all"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: theme === "light" ? 0 : 180 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex items-center justify-center"
            >
              {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 transition-all" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400 transition-all" />
              )}
            </motion.div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {theme === "light" ? "dark" : "light"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
