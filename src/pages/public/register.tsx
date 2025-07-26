import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { useAuth } from '@/context/auth-context';
// import { useLoading } from '@/context/loading-context';
// import { AxiosError } from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import ClinicHubLogo from "@/assets/routes/public/clinicHubLogo.png"
import IndividualProfessional from "@/assets/routes/public/register/profissional_individual.svg"
import ClinicADM from "@/assets/routes/public/register/adm_clinica.svg"
import TermsModal from '@/components/terms-modal/terms-modal';
import { toast } from 'react-toastify';
import { Checkbox } from '@/components/ui/checkbox';

export default function Register() {
  const [userType, setUserType] = useState<'individual' | 'clinic'>('individual');

  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const handleAcceptTerms = useCallback(() => {
    setTermsAccepted(true);
    setOpenTerms(false);
  }, [openTerms, termsAccepted]);

  const handleDeclineTerms = useCallback(() => {
    setOpenTerms(false);
    setTermsAccepted(false);
    toast.error("É necessário aceitar os termos para prosseguir com a criação de conta!")
  }, [openTerms, termsAccepted]);

  return (
    <div className="flex w-full min-h-dvh">
      <div className='flex flex-col justify-center w-full lg:w-1/3 px-6 py-4 lg:px-14 space-y-5 xl:space-y-4 2xl:space-y-6'>
        <div id='header' className='space-y-3'>
          <div className="flex items-center space-x-2">
            <img src={ClinicHubLogo} />
            <span className="text-xl font-semibold">ClinicHub</span>
          </div>
          <p className="text-sm">Sistema de Gestão em Saúde</p>
          <h1 className="text-3xl font-bold">Criar sua conta</h1>
          <p>Comece criando seu acesso</p>
        </div>

        <div id='progress' className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
            <span className="text-sm font-medium text-primary">Acesso</span>
          </div>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-sm">Informações</span>
          </div>
        </div>

        <div id="userTypeSelection" className="space-y-1">
          <Label htmlFor="user-type">Tipo de usuário</Label>
          <div className="flex flex-col gap-2 2xl:flex-row 2xl:gap-4">
            <Button
              variant={'outline'}
              className={cn("flex-1 h-24 flex flex-col items-center justify-center space-y-2 text-base", userType === "individual" && "border-primary bg-accent")}
              onClick={() => setUserType('individual')}
            >
              <img src={IndividualProfessional} />
              <span>Profissional Individual</span>
            </Button>
            <Button
              variant={'outline'}
              className={cn("flex-1 h-24 flex flex-col items-center justify-center space-y-2 text-base", userType === "clinic" && "border-primary bg-accent")}
              onClick={() => setUserType('clinic')}
            >
              <img src={ClinicADM} />
              <span>Administrador de Clínica</span>
            </Button>
          </div>
        </div>

        <div id="inputs" className='space-y-5'>
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="password" type="password" placeholder="Crie uma senha" className="pl-10" />
            </div>
            <p className="text-xs text-gray-500">Mínimo 8 caracteres</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirm-password">Confirmar senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="confirm-password" type="password" placeholder="Confirme sua senha" className="pl-10" />
            </div>
          </div>
        </div>

        <div className='flex space-x-2 items-center' onClick={() => setOpenTerms(true)}>
          <Checkbox
            id="terms"
            checked={termsAccepted} />
          <Label
            htmlFor="terms"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Concordo com os
            <span className="text-primary hover:underline ml-1">Termos de Uso</span> e
            <span className="text-primary hover:underline ml-1">Política de Privacidade</span>
          </Label>
        </div>
        <TermsModal
          isOpen={openTerms}
          onClose={() => setOpenTerms(false)}
          onAccept={handleAcceptTerms}
          onDecline={handleDeclineTerms}
        />

        <Button
          className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary-foreground text-white flex items-center justify-center space-x-2"
          disabled={!termsAccepted}
        >
          Continuar
          <ArrowRight className="h-5 w-5" />
        </Button>

      </div>
      <div className='hidden lg:block lg:w-2/3 min-h-full bg-gradient-to-r from-primary to-primary-foreground relative'>
        <div className="absolute bottom-1 left-[10%] w-6 h-6 rounded-full opacity-0 bg-white animate-bubble-float-1"></div>
        <div className="absolute bottom-1 left-[30%] w-30 h-30 rounded-full opacity-0 bg-white animate-bubble-float-2"></div>
        <div className="absolute bottom-1 left-[50%] w-7 h-7 rounded-full opacity-0 bg-white animate-bubble-float-3"></div>
        <div className="absolute bottom-1 left-[70%] w-12 h-12 rounded-full opacity-0 bg-white animate-bubble-float-1 [animation-delay:3s]"></div>
        <div className="absolute bottom-1 left-[90%] w-9 h-9 rounded-full opacity-0 bg-white animate-bubble-float-2 [animation-delay:1s]"></div>
      </div>
    </div>
  );
}
