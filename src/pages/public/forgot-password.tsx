import ImageCarousel from '@/components/carousel/carousel';
import { ModeToggle } from '@/components/mode-toggle/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { useLoading } from '@/context/loading-context';
import { useTheme } from '@/context/theme-context';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClinicHubLogo from "@/assets/routes/public/clinicHubLogo.png"
import ClinicHUbLoginImage1 from "@/assets/routes/public/clinicHubLoginImage1.png";
import ClinicHUbLoginImage2 from "@/assets/routes/public/clinicHubLoginImage2.png";
import ClinicHubLoginImage3 from "@/assets/routes/public/clinicHubLoginImage3.png";
import AnimatedComponent from '@/components/animated-component';
import BasicInput from '@/components/basic-input/basic-input';
import { Mail } from 'lucide-react';

export default function ForgotPassword() {
  const { onLoading, offLoading } = useLoading();
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const { logo } = useTheme()

  const [data, setData] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await onLoading();

    try {
      e.preventDefault();
      if (data === '') {
        toast.warn('Preencha as credenciais corretamnete');
      } else {
        const response = await forgotPassword(data);
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message)
          await navigate(`/profiles`);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        return toast.error(
          error.response?.data?.message || 'Algo deu errado, tente novamente.',
        );
      }
    } finally {
      await offLoading();
    }
  };

  const disabled = data === '';

  return (
  <section>
    <div className="flex w-full min-h-dvh">
      <div className='flex flex-col justify-center w-full lg:w-1/3 px-6 py-4 lg:px-14 space-y-5 xl:space-y-4 2xl:space-y-6'>
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
              <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
              <p>Acesse sua conta para continuar</p>
            </div>
          </section>
        </AnimatedComponent>

        <AnimatedComponent type='slide-from-bottom' delay={200} duration='duration-700' className='space-y-5 xl:space-y-4 2xl:space-y-6'>

            <form onSubmit={handleSubmit} id="inputs" className='space-y-5'>
              <BasicInput
                label="E-mail"
                leftIcon={
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
                id="email"
                type="email"
                error={emailError}
                placeholder="seu@email.com"
                value={data.email}
                onChange={(e) => {
                  setUser('email', e.target.value);
                }}
                onBlur={() => {
                  if (!emailValidator(data.email)) {
                    setEmailError('Preencha o e-mail corretamente');
                  } else {
                    setEmailError(undefined);
                  }
                }}
                autoComplete="email"
                required
              />
              <BasicInput
                label="Senha"
                placeholder="Digite sua senha"
                id="password"
                type="password"
                value={data.password}
                required
                onChange={(e) => setUser('password', e.target.value)}
                leftIcon={
                <Lock 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                }
              />
              <span className="text-right block text-primary hover:underline ml-1 cursor-pointer text-right" onClick={() => navigate('/forgot-password')}>
                Esqueceu a senha?
              </span>

              <Button
                className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary-foreground text-white flex items-center justify-center space-x-2"
                disabled={disabled}
                type="submit"
                >
                <LogIn className="h-5 w-5" />
                Entrar
                
              </Button>
              <Label
                className="text-center block text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Não tem uma conta?
                <span className="text-primary hover:underline ml-1 cursor-pointer" onClick={() => {}}>Cadastre-se gartuitamente</span>
              </Label>
            </form>
        </AnimatedComponent>
      </div>
      <section id='bubbles' className='hidden lg:block lg:w-2/3 min-h-full bg-gradient-to-r from-primary to-primary-foreground relative'>
        <div className='absolute min-h top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 z-20'>
            <ImageCarousel
          images={[
            ClinicHUbLoginImage1,
            ClinicHUbLoginImage2,
            ClinicHubLoginImage3,
          ]}
        />
        </div>
        <div className="absolute bottom-1 left-[10%] w-6 h-6 rounded-full opacity-0 bg-white animate-bubble-float-1 z-10"></div>
        <div className="absolute bottom-1 left-[30%] w-30 h-30 rounded-full opacity-0 bg-white animate-bubble-float-2 z-10"></div>
        <div className="absolute bottom-1 left-[50%] w-7 h-7 rounded-full opacity-0 bg-white animate-bubble-float-3 z-10"></div>
        <div className="absolute bottom-1 left-[70%] w-12 h-12 rounded-full opacity-0 bg-white animate-bubble-float-1 [animation-delay:3s] z-10"></div>
        <div className="absolute bottom-1 left-[90%] w-9 h-9 rounded-full opacity-0 bg-white animate-bubble-float-2 [animation-delay:1s] z-10"></div>
      </section>
    </div>
  </section>
  );
}
