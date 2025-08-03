import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useUser } from '@/context/user-context';
import { useLoading } from '@/context/loading-context';
import ModalContainer from '..';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

interface DeleteUserModalProps {
  id: string;
  open: boolean;
  close: () => void;
  getData: () => void;
}

interface DeleteUser {
  name: string;
}

export default function DeleteUserModal({
  open,
  close,
  id,
  getData,
}: DeleteUserModalProps) {
  const { user, getUser, deleteUser } = useUser();
  const { onLoading, offLoading } = useLoading();
  const [data, setData] = useState<DeleteUser>(user);


  async function fetchUser() {
    await onLoading();
    try {
      const { data } = await getUser(id);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        return toast.error(
          error?.response?.data?.message ||
          'Não foi possível encontrar o usuário, tente novamente.',
        );
      }
    } finally {
      await offLoading();
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setData(user);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onLoading();
    try {
      const response = await deleteUser(id);
      if (response.status === 204) {
        toast.success('Usuário removido com sucesso.');
        getData();
        close();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        return toast.error(
          error?.response?.data?.message || 'Algo deu errado, tente novamente.',
        );
      }
      console.log(error);
    } finally {
      await offLoading();
    }
  };

  return (
    <div>
      <ModalContainer open={open} close={close}>
        <form className="w-[400px]" onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-red-600">Atenção</CardTitle>
              <CardDescription>
                Você está removendo um usuário <b className='text-black'>{data.name}</b>, ao
                confirmar, este usuário não ficará mais disponível.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <strong>Deseja prosseguir?</strong>
            </CardContent>
            <CardFooter className="gap-10">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => close()}
              >
                Cancelar
              </Button>
              <Button className="w-full" variant="destructive" type="submit">
                Confirmar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </ModalContainer>
    </div>
  );
}
