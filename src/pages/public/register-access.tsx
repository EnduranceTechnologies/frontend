import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import ClinicHubLogo from "@/assets/routes/public/clinicHubLogo.png";
import IndividualProfessional from "@/assets/routes/public/register/profissional_individual.svg";
import ClinicADM from "@/assets/routes/public/register/adm_clinica.svg";
import TermsModal from '@/components/terms-modal/terms-modal';
import { Checkbox } from '@/components/ui/checkbox';
import PasswordInput from '@/components/password-input/password-input';
import BasicInput from '@/components/basic-input/basic-input';
import { useNavigate } from 'react-router-dom';
import AnimatedComponent from '@/components/animated-component';
import FindAccount from '@/services/api/account/findAccount';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface FormFields {
  user_type: "PERSONAL" | "BUSINESS";
  email: string;
  password: string;
  confirm_password: string;
  check_terms: boolean;
  name: string;
  cpf: string;
  clinic_name?: string;
  cnpj?: string;
  council_number?: string;
}

const defaultFormFields: FormFields = {
  user_type: "PERSONAL",
  email: "",
  password: "",
  confirm_password: "",
  check_terms: false,
  name: "",
  cpf: "",
  clinic_name: "",
  cnpj: "",
  council_number: "",
};

function validatePasswordCharacteristic(text: string, checkType: "has_upper_letter" | "has_number" | "has_special_char"): boolean {
  switch (checkType) {
    case "has_upper_letter":
      return /[A-Z]/.test(text);
    case "has_number":
      return /[0-9]/.test(text);
    case "has_special_char":
      return /[^a-zA-Z0-9\s]/.test(text);
    default:
      return false;
  }
}

export default function RegisterAccess() {
  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const navigate = useNavigate();

  const handleFormFields = useCallback(<T extends keyof FormFields>(field: T, value: FormFields[T]) => {
    setFormFields(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleAcceptTerms = useCallback(() => {
    handleFormFields("check_terms", true);
    setOpenTerms(false);
  }, [handleFormFields]);

  const password_valid = useMemo(() => {
    return (
      validatePasswordCharacteristic(formFields.password, "has_upper_letter") &&
      validatePasswordCharacteristic(formFields.password, "has_number") &&
      validatePasswordCharacteristic(formFields.password, "has_special_char") &&
      formFields.password === formFields.confirm_password
    );
  }, [formFields.password, formFields.confirm_password]);

  const disabled_button = useMemo(() => {
    return !(
      formFields.email.length > 0 &&
      password_valid &&
      formFields.check_terms
    );
  }, [formFields.email, password_valid, formFields.check_terms]);

  const handleSubmit = async () => {
    try {
      const account_exists = await FindAccount({ field: "email", value: formFields.email });

      if (account_exists) {
        toast.error(account_exists.message);
        return;
      }

      navigate("/register-info", { state: formFields });
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message)
      }

      toast.error("Parece que estamos enfrentando problemas técnicos. Tente novamente mais tarde!")
    }
  };

  return (
    <div className="flex w-full min-h-dvh">
      <div className='flex flex-col justify-center w-full lg:w-1/3 px-6 py-4 lg:px-14 space-y-5 xl:space-y-4 2xl:space-y-6'>
        <AnimatedComponent type='slide-from-left' delay={100} duration='duration-500'>
          <section id='header' className='space-y-10'>
            <div className='space-y-2'>
              <div className="flex items-center space-x-2">
                <img src={ClinicHubLogo} alt="ClinicHUB Logo" />
                <span className="text-xl font-semibold">ClinicHUB</span>
              </div>
              <p className="text-sm">Sistema de Gestão em Saúde</p>
            </div>
            <div className='space-y-1'>
              <h1 className="text-3xl font-bold">Criar sua conta</h1>
              <p>Comece criando seu acesso</p>
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent type='slide-from-left' delay={100}>
          <section id='progress' className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-sm font-medium text-primary">Acesso</span>
            </div>
            <div className="w-full h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-sm">Informações</span>
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent type='slide-from-bottom' delay={200} duration='duration-700' className='space-y-5 xl:space-y-4 2xl:space-y-6'>
          <section id="userTypeSelection" className="space-y-1">
            <Label>Tipo de usuário</Label>
            <div className="flex flex-col gap-2 2xl:flex-row 2xl:gap-4">
              <Button
                variant={'outline'}
                className={cn("flex-1 h-24 flex flex-col items-center justify-center space-y-2 text-base", formFields.user_type === "PERSONAL" && "border-primary bg-accent")}
                onClick={() => handleFormFields("user_type", "PERSONAL")}
              >
                <img src={IndividualProfessional} alt="Profissional Individual" />
                <span>Profissional Individual</span>
              </Button>
              <Button
                variant={'outline'}
                className={cn("flex-1 h-24 flex flex-col items-center justify-center space-y-2 text-base", formFields.user_type === "BUSINESS" && "border-primary bg-accent")}
                onClick={() => handleFormFields("user_type", "BUSINESS")}
              >
                <img src={ClinicADM} alt="Administrador de Clínica" />
                <span>Administrador de Clínica</span>
              </Button>
            </div>
          </section>

          <section id="inputs" className='space-y-5'>
            <BasicInput
              label="E-mail"
              leftIcon={
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              }
              id="email"
              type="email"
              autoComplete='email'
              placeholder="seu@email.com"
              onChange={(e) => handleFormFields("email", e.target.value)}
              value={formFields.email}
            />

            <PasswordInput
              label="Senha"
              value={formFields.password}
              onChange={(e) => handleFormFields("password", e.target.value)}
            />

            <BasicInput
              label="Confirmar senha"
              value={formFields.confirm_password}
              placeholder="Confirme sua senha"
              id="confirmPassword"
              type="password"
              onChange={(e) => handleFormFields("confirm_password", e.target.value)}
              leftIcon={
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              }
              error={formFields.password !== formFields.confirm_password && formFields.confirm_password.length > 0 ? "As senhas não coincidem. Por favor, tente novamente." : undefined}
            />
          </section>

          <section id='terms-check' className='flex space-x-2 items-center pt-4'>
            <Checkbox
              id="terms"
              checked={formFields.check_terms}
              onClick={() => handleFormFields("check_terms", !formFields.check_terms)}
            />
            <Label
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Concordo com os
              <span className="text-primary hover:underline ml-1 cursor-pointer" onClick={() => setOpenTerms(true)}>Termos de Uso</span> e
              <span className="text-primary hover:underline ml-1 cursor-pointer" onClick={() => setOpenTerms(true)}>Política de Privacidade</span>
            </Label>
          </section>
          <TermsModal
            isOpen={openTerms}
            onClose={() => setOpenTerms(false)}
            onAccept={handleAcceptTerms}
          />

          <Button
            className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary-foreground text-white flex items-center justify-center space-x-2"
            disabled={disabled_button}
            onClick={handleSubmit}
          >
            Continuar
            <ArrowRight className="h-5 w-5" />
          </Button>
        </AnimatedComponent>
      </div>
      <section id='bubbles' className='hidden lg:block lg:w-2/3 min-h-full bg-gradient-to-r from-primary to-primary-foreground relative'>
        <div className="absolute bottom-1 left-[10%] w-6 h-6 rounded-full opacity-0 bg-white animate-bubble-float-1"></div>
        <div className="absolute bottom-1 left-[30%] w-30 h-30 rounded-full opacity-0 bg-white animate-bubble-float-2"></div>
        <div className="absolute bottom-1 left-[50%] w-7 h-7 rounded-full opacity-0 bg-white animate-bubble-float-3"></div>
        <div className="absolute bottom-1 left-[70%] w-12 h-12 rounded-full opacity-0 bg-white animate-bubble-float-1 [animation-delay:3s]"></div>
        <div className="absolute bottom-1 left-[90%] w-9 h-9 rounded-full opacity-0 bg-white animate-bubble-float-2 [animation-delay:1s]"></div>
      </section>
    </div>
  );
}
