import { ReactNode, useState } from "react";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils";

interface BasicInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  className?: string;
}

const BasicInput = ({ label, error, leftIcon, className, ...rest }: BasicInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={rest.id}>{label}</Label>
      )}
      <div className="relative">
        {leftIcon}
        <Input
          id={rest.id}
          className={cn(
            leftIcon && "pl-9",
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          onFocus={() => setIsFocused(true)}
          {...rest}
        />
      </div>
      {error && (
        <div
          className={cn(
            'absolute w-full text-red-500 text-sm overflow-hidden transition-all duration-300 ease-in-out',
            isFocused
              ? 'translate-y-full opacity-100'
              : 'top-full opacity-100'
          )}
          style={{ transform: error ? 'translateY(0)' : 'translateY(-100%)' }}
        >
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default BasicInput