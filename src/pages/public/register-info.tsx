import { Button } from '@/components/ui/button';
// import { useAuth } from '@/context/auth-context';
// import { useLoading } from '@/context/loading-context';
// import { AxiosError } from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { User, IdCard, Building, Newspaper, UserPlus } from 'lucide-react';

import ClinicHubLogo from "@/assets/routes/public/clinicHubLogo.png"
import BasicInput from '@/components/basic-input/basic-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isValidCNPJ, isValidCPF } from '@/utils/valid';
import { formatCpfCnpj } from '@/utils/formats';
import AnimatedComponent from '@/components/animated-component';

interface FormFields {
  userType: "individual" | "clinic"
  email: string;
  password: string;
  confirmPassword: string;
  checkTerms: boolean;
  name: string;
  cpf: string;
  clinicName?: string;
  cnpj?: string;
  councilNumber?: string;
}


export default function RegisterInfo() {
  const location = useLocation()
  const navigate = useNavigate()

  const previousFields: FormFields = location.state || {}

  const [formFields, setFormFields] = useState<FormFields>(previousFields);

  const disabledButton = useMemo(() => {
    if (formFields.userType === "individual") {
      if (formFields.name.length > 3 &&
        isValidCPF(formFields.cpf) &&
        formFields.councilNumber &&
        formFields.councilNumber.length > 0
      ) return false
    }

    if (formFields.userType === "clinic") {
      if (formFields.name.length > 3 &&
        isValidCPF(formFields.cpf) &&
        formFields.clinicName &&
        formFields.clinicName.length > 3 &&
        formFields.cnpj &&
        isValidCNPJ(formFields.cnpj)
      ) return false
    }

    return true
  }, [formFields])

  useEffect(() => {
    if (!previousFields.userType || !previousFields.email || !previousFields.password) {
      navigate("/register-access")
    }
  }, [])

  const handleFormFields = useCallback(<T extends keyof FormFields>(field: T, value: FormFields[T]) => {
    setFormFields(prev => ({
      ...prev,
      [field]: value
    }))
  }, [setFormFields])

  const handleSubmit = () => {
    console.log(formFields, "formFields")
    navigate("/validate-email", { state: formFields.email })
  }

  return (
    <div className="flex w-full min-h-dvh">
      <div className='flex flex-col justify-center w-full lg:w-1/3 px-6 py-4 lg:px-14 space-y-5 2xl:space-y-6'>
        <AnimatedComponent type='slide-from-left' delay={100} duration='duration-500'>
          <section id='header' className='space-y-10'>
            <div className='space-y-2'>
              <div className="flex items-center space-x-2">
                <img src={ClinicHubLogo} />
                <span className="text-xl font-semibold">ClinicHub</span>
              </div>
              <p className="text-sm">Sistema de Gestão em Saúde</p>
            </div>
            <div className='space-y-1'>
              <h1 className="text-3xl font-bold">Criar sua conta</h1>
              <p>Finalize suas informações</p>
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent type='slide-from-left' delay={100}>
          <section id='progress' className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-sm text-gray-600">Acesso</span>
            </div>
            <div className="w-full h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-sm font-medium text-primary">Informações</span>
            </div>
          </section>
        </AnimatedComponent>


        <AnimatedComponent type='slide-from-left' delay={200} className='space-y-5 2xl:space-y-6'>
          {formFields.userType === "individual" ? (
            <div id="inputs" className='space-y-5'>
              <BasicInput
                label="Nome completo"
                value={formFields.name}
                type="text"
                placeholder="Digite seu nome completo"
                leftIcon={
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
                onChange={(e) => handleFormFields("name", e.target.value)}
              />

              <BasicInput
                label="Número do Conselho Regional"
                value={formFields.councilNumber}
                type="text"
                autoCapitalize='characters'
                placeholder="CRM/XX 000000"
                leftIcon={
                  <Newspaper className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
                onChange={(e) => handleFormFields("councilNumber", e.target.value.toUpperCase())}
              />

              <BasicInput
                label="CPF"
                value={formatCpfCnpj(formFields.cpf)}
                type="text"
                placeholder="Digite seu CPF"
                maxLength={14}
                leftIcon={
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
                onChange={(e) => handleFormFields("cpf", e.target.value.replace(/[./-]/g, ""))}
              />
            </div>
          ) : (
            <div id="inputs" className='space-y-5'>
              <BasicInput
                label="Nome completo do administrador"
                value={formFields.name}
                type="text"
                placeholder="Digite seu nome completo"
                leftIcon={
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
                onChange={(e) => handleFormFields("name", e.target.value)}
              />

              <BasicInput
                label="CPF do administrador"
                value={formatCpfCnpj(formFields.cpf)}
                type="text"
                placeholder="Digite seu CPF"
                leftIcon={
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
                onChange={(e) => handleFormFields("cpf", e.target.value.replace(/[./-]/g, ""))}
              />

              <BasicInput
                label="Nome da Clínica"
                value={formFields.clinicName}
                type="text"
                placeholder="Digite sua clínica"
                leftIcon={
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
                onChange={(e) => handleFormFields("clinicName", e.target.value)}
              />

              <BasicInput
                label="CNPJ"
                value={formatCpfCnpj(formFields.cnpj)}
                type="text"
                placeholder="Digite seu CNPJ"
                leftIcon={
                  <Newspaper className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
                onChange={(e) => handleFormFields("cnpj", e.target.value.replace(/[./-]/g, ""))}
              />
            </div>
          )}

          <Button
            className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary-foreground text-white flex items-center justify-center space-x-2"
            disabled={disabledButton}
            onClick={handleSubmit}
          >
            <UserPlus className="h-5 w-5" />
            Criar conta
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
