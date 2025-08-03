import { useMemo } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Info, Lock, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string
}

interface PasswordStrengthResult {
  isValid: boolean;
  lengthValid: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  strengthLenght: number;
  strengthText: string;
  errors: string[];
}

const PasswordInput = ({ label, value, ...rest }: PasswordInputProps) => {

  const passwordStrength = useMemo(() => {
    value = String(value)
    const result: PasswordStrengthResult = {
      isValid: true,
      lengthValid: false,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSymbol: false,
      strengthLenght: 0,
      strengthText: "Muito Fraca",
      errors: [],
    };

    if (value.length >= 8 && value.length <= 70) {
      result.lengthValid = true;
      result.strengthLenght += 1
    } else {
      result.isValid = false;
      result.errors.push("A senha deve conter entre 8 e 70 caracteres.");
    }

    if (/[a-z]/.test(value)) {
      result.hasLowerCase = true;
      result.strengthLenght += 1
    } else {
      result.isValid = false;
      result.errors.push("A senha deve conter pelo menos uma letra minúscula (a-z).");
    }

    if (/[A-Z]/.test(value)) {
      result.hasUpperCase = true;
      result.strengthLenght += 1
    } else {
      result.isValid = false;
      result.errors.push("A senha deve conter pelo menos uma letra maiúscula (A-Z).");
    }

    if (/[0-9]/.test(value)) {
      result.hasNumber = true;
      result.strengthLenght += 1
    } else {
      result.isValid = false;
      result.errors.push("A senha deve conter pelo menos um número (0-9).");
    }

    if (/[!@#$*]/.test(value)) {
      result.hasSymbol = true;
      result.strengthLenght += 1
    } else {
      result.isValid = false;
      result.errors.push("A senha deve conter pelo menos um símbolo (!@#$*).");
    }

    if (result.strengthLenght > 2 && result.strengthLenght <= 4) {
      result.strengthText = "Fraca"
    }

    if (result.strengthLenght > 4) {
      result.strengthText = "Forte"
    }

    return result;
  }, [value])

  return (
    <div>
      {label && (
        <Label htmlFor="password">{label}</Label>
      )}

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input id="password" type="password" placeholder="Crie uma senha" className="pl-10" value={value} {...rest} />
      </div>

      <div className="flex space-x-1 mt-2">
        <div className={`h-1 flex-1 rounded-full ${passwordStrength.strengthLenght > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        <div className={`h-1 flex-1 rounded-full ${passwordStrength.strengthLenght > 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        <div className={`h-1 flex-1 rounded-full ${passwordStrength.strengthLenght > 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
      </div>

      <div className="flex flex-row gap-2 mt-1">
        <p className="text-xs text-gray-500">Força da senha: {passwordStrength.strengthText}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center">
              <Info size={16} />
            </TooltipTrigger>
            <TooltipContent className="bg-accent text-foreground border">
              <div className="space-y-2">
                <h2 className="text-sm">Sua senha deve conter:</h2>
                <div>
                  <div className='flex flex-row gap-2'>
                    {passwordStrength.lengthValid ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />}
                    <p className={cn("text-xs text-red-500", passwordStrength.lengthValid && "text-green-500")}>Entre 8 e 70 caracteres</p>
                  </div>
                  <div className='flex flex-row gap-2'>
                    {passwordStrength.hasLowerCase ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />}
                    <p className={cn("text-xs text-red-500", passwordStrength.hasLowerCase && "text-green-500")}>Pelo menos uma letra minúscula (a-z)</p>
                  </div>
                  <div className='flex flex-row gap-2'>
                    {passwordStrength.hasUpperCase ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />}
                    <p className={cn("text-xs text-red-500", passwordStrength.hasUpperCase && "text-green-500")}>Pelo menos uma letra maiúscula (A-Z)</p>
                  </div>
                  <div className='flex flex-row gap-2'>
                    {passwordStrength.hasNumber ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />}
                    <p className={cn("text-xs text-red-500", passwordStrength.hasNumber && "text-green-500")}>Pelo menos um número (0-9)</p>
                  </div>
                  <div className='flex flex-row gap-2'>
                    {passwordStrength.hasSymbol ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />}
                    <p className={cn("text-xs text-red-500", passwordStrength.hasSymbol && "text-green-500")}>Pelo menos um símbolo (!@#$*)</p>
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default PasswordInput