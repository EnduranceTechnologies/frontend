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
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RecoverPassword() {
  const { onLoading, offLoading } = useLoading();
  const { recoverPassword } = useAuth();
  const navigate = useNavigate();
  const { email, token } = useParams()
  const { logo } = useTheme()

  const [data, setData] = useState({
    password: '',
    confirm_password: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await onLoading();

    try {
      e.preventDefault();
      if (data.password === '' || data.confirm_password === '') {
        toast.warn('Preencha as senhas corretamnete');
      } else if (data.password !== data.confirm_password) {
        toast.warn('As senhas não coincidem');
      } else {
        const response = await recoverPassword({ ...data, email: email!, token: token! });
        console.log(response);
        if (response.status === 200) {
          await toast.success(response.data.message);
          await navigate(`/login`);
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

  const disabled = (data.password === '' || data.confirm_password === '') || data.password !== data.confirm_password;

  return (
    <section className="flex flex-col gap-5 items-center h-[100vh] justify-center">
      <img src={logo} className="font-medium h-[4rem]" />
      {/* <h1 className='text-4xl font-semibold '>ClinicHUB</h1> */}
      <form onSubmit={handleSubmit}>
        <Card className="border-none shadow-none max-w-[400px]">
          <CardHeader>
            <CardTitle>Redefina sua senha</CardTitle>
            <CardDescription>
              Crie uma nova senha para acessar o aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email" className="">
                Senha
              </Label>
              <Input
                id="password"
                type='password'
                placeholder="••••••••"
                autoFocus
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="">
                Confirme sua Senha
              </Label>
              <Input
                id="confirm_password"
                type='password'
                placeholder="••••••••"
                autoFocus
                value={data.confirm_password}
                onChange={(e) => setData({ ...data, confirm_password: e.target.value })}
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
