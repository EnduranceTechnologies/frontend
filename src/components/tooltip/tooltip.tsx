import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipComponent({ button, children }: { button: ReactNode; children: ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
