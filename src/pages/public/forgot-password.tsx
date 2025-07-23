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
          await toast.success(response.data.message)
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
    <section className="flex flex-col gap-5 items-center h-[100vh] justify-center">
      <img src={logo} className="font-medium h-[4rem]"/>
      {/* <h1 className='text-4xl font-semibold '>Dedica</h1> */}
      <form onSubmit={handleSubmit}>
        <Card className="border-none shadow-none max-w-[400px]">
          <CardHeader>
            <CardTitle>Recuperar senha</CardTitle>
            <CardDescription>
              Preencha e envie seu e-mail abaixo, vamos enviar o link de redefinição de senha para o seu e-mail
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email" className="">
                E-mail
              </Label>
              <Input
                id="email"
                placeholder="seuemail@domínio.com.br"
                autoFocus
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={disabled}>
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </form>
      <ModeToggle />
    </section>
  );
}
