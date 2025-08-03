import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Building, IdCard, Newspaper, User, UserPlus } from 'lucide-react';

import ClinicHubLogo from "@/assets/routes/public/clinicHubLogo.png";
import AnimatedComponent from '@/components/animated-component';
import BasicInput from '@/components/basic-input/basic-input';
import { Button } from '@/components/ui/button';
import { formatCpfCnpj } from '@/services/utils/formats';
import { isValidCNPJ, isValidCPF } from '@/services/utils/valid';
import createAccount from '@/services/api/account/createAccount';

interface FormFields {
  userType: "PERSONAL" | "BUSINESS";
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

const isPersonalFormValid = (fields: FormFields) => {
  const { name, cpf, councilNumber } = fields;
  return name.length > 3 && isValidCPF(cpf) && councilNumber && councilNumber.length > 0;
};

const isBusinessFormValid = (fields: FormFields) => {
  const { name, cpf, clinicName, cnpj } = fields;
  return name.length > 3 && isValidCPF(cpf) && clinicName && clinicName.length > 3 && cnpj && isValidCNPJ(cnpj);
};

export default function RegisterInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const previousFields: FormFields = location.state || {};
  const [formFields, setFormFields] = useState<FormFields>(previousFields);

  useEffect(() => {
    if (!previousFields.userType || !previousFields.email || !previousFields.password) {
      toast.error("Informações incompletas. Comece o registro novamente.");
      navigate("/register-access");
    }
  }, [previousFields, navigate]);

  const disabledButton = useMemo(() => {
    if (formFields.userType === "PERSONAL") {
      return !isPersonalFormValid(formFields);
    }
    return !isBusinessFormValid(formFields);
  }, [formFields]);

  const handleInputChange = useCallback((field: keyof FormFields, value: string) => {
    setFormFields(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await createAccount({
        workspace_type: formFields.userType,
        email: formFields.email,
        password: formFields.password,
        name: formFields.name,
        cpf: formFields.cpf,
        crm_number: formFields.councilNumber,
        workspace_name: formFields.clinicName,
        cnpj: formFields.cnpj
      })
      navigate("/validate-email", { state: formFields.email });
    } catch (error) {
      console.log(error, "ERROR SUBMIT REGISTER INFO")
    }
  }, [navigate, formFields]);

  return (
    <div className="flex w-full min-h-dvh">
      <div className='flex flex-col justify-center w-full lg:w-1/3 px-6 py-4 lg:px-14 space-y-5 2xl:space-y-6'>
        <AnimatedComponent type='slide-from-left' delay={100} duration='duration-500'>
          <section id='header' className='space-y-10'>
            <div className='space-y-2'>
              <div className="flex items-center space-x-2">
                <img src={ClinicHubLogo} />
                <span className="text-xl font-semibold">ClinicHUB</span>
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
          {formFields.userType === "PERSONAL" ? (
            <div id="inputs" className='space-y-5'>
              <BasicInput
                id='full-name'
                label="Nome completo"
                value={formFields.name}
                type="text"
                placeholder="Digite seu nome completo"
                leftIcon={<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <BasicInput
                id='crm-number'
                label="Número do Conselho Regional"
                value={formFields.councilNumber}
                type="text"
                autoCapitalize='characters'
                placeholder="CRM/XX 000000"
                leftIcon={<Newspaper className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                onChange={(e) => handleInputChange("councilNumber", e.target.value.toUpperCase())}
              />
              <BasicInput
                id='cpf-number'
                label="CPF"
                value={formatCpfCnpj(formFields.cpf)}
                type="text"
                placeholder="Digite seu CPF"
                maxLength={14}
                leftIcon={<IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                onChange={(e) => handleInputChange("cpf", e.target.value.replace(/[./-]/g, ""))}
              />
            </div>
          ) : (
            <div id="inputs" className='space-y-5'>
              <BasicInput
                id='full-name'
                label="Nome completo do administrador"
                value={formFields.name}
                type="text"
                placeholder="Digite seu nome completo"
                leftIcon={<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <BasicInput
                id='cpf-number'
                label="CPF do administrador"
                value={formatCpfCnpj(formFields.cpf)}
                type="text"
                placeholder="Digite seu CPF"
                leftIcon={<IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                onChange={(e) => handleInputChange("cpf", e.target.value.replace(/[./-]/g, ""))}
              />
              <BasicInput
                id='clinic-name'
                label="Nome da Clínica"
                value={formFields.clinicName}
                type="text"
                placeholder="Digite sua clínica"
                leftIcon={<Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                onChange={(e) => handleInputChange("clinicName", e.target.value)}
              />
              <BasicInput
                id='cnpj-number'
                label="CNPJ"
                value={formatCpfCnpj(formFields.cnpj)}
                type="text"
                placeholder="Digite seu CNPJ"
                leftIcon={<Newspaper className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                onChange={(e) => handleInputChange("cnpj", e.target.value.replace(/[./-]/g, ""))}
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