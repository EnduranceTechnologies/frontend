import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLoading } from '@/context/loading-context';
import { useUser } from '@/context/user-context';
import ModalContainer from '..';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import FormUser from './form/form';

interface CreateUserModalProps {
  open: boolean;
  close: () => void;
  getData: () => void;
}

export default function CreateUserModal({
  open,
  close,
  getData,
}: CreateUserModalProps) {
  const { user, createUser } = useUser();
  const { onLoading, offLoading } = useLoading();
  const [data, setData] = useState<User>(user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onLoading();
    try {
      const response = await createUser(data);
      if (response.status === 201) {
        toast.success('Usuário criado com sucesso');
        await getData();
        await close();
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

  const handleChangeObject = (
    value: string,
    item: string,
  ) => {
    setData({
      ...data,
      [item]: value,
    });
  };

  useEffect(() => {
    setData(user);
  }, [open]);

  return (
    <ModalContainer open={open} close={close}>
      <form
        onSubmit={handleSubmit}
        className="w-[85vw] max-w-[400px] sm:w-full"
      >
        <Card className="border-none shadow-none sm:w-[400px]">
          <CardHeader>
            <CardTitle>Adicionar usuário</CardTitle>
            <CardDescription>
              Adicione seu usuário preenchendo os dados abaixo
            </CardDescription>
          </CardHeader>
          <FormUser data={data} change={handleChangeObject} />
          <CardFooter className="w-full flex justify-end items-center gap-4">
            <Button type="submit">Enviar</Button>
          </CardFooter>
        </Card>
      </form>
    </ModalContainer>
  );
}
