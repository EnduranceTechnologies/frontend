import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
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
import DeleteUserModal from './delete';
import { AxiosError } from 'axios';

interface DetailUserModalProps {
  id: string;
  open: boolean;
  close: () => void;
  getData: () => void;
}

export default function DetailUserModal({
  id,
  open,
  close,
  getData,
}: DetailUserModalProps) {
  const { user, getUser } = useUser();
  const { onLoading, offLoading } = useLoading();
  const [data, setData] = useState<User>(user);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  async function fetchUser() {
    await onLoading();
    try {
      const { data } = await getUser(id);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        return toast.error(
          error?.response?.data?.message || 'Algo deu errado, tente novamente.',
        );
      }
    } finally {
      await offLoading();
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function controlDelete() {
    setDeleteModal(!deleteModal);
  }

  return (
    <ModalContainer open={open} close={close}>
      {id && deleteModal && (
        <DeleteUserModal
          id={id}
          open={deleteModal}
          close={controlDelete}
          getData={async () => {
            await getData();
            await close();
          }}
        />
      )}
      <Card className="card-modal">
        <CardHeader>
          <CardTitle>Detalhes do usuário</CardTitle>
          <CardDescription>
            Veja abaixo os detalhes da conta do usuário.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Nome</Label>
            <br />
            <strong>{data.name}</strong>
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">E-mail</Label>
            <br />
            <strong>
              <p>{data.email}</p>
            </strong>
          </div>
        </CardContent>
        <CardFooter className="gap-2 flex flex-col">
          <Button
            className="w-full"
            variant={'destructive'}
            type="submit"
            onClick={() => controlDelete()}
          >
            Remover
          </Button>
        </CardFooter>
      </Card>
    </ModalContainer>
  );
}
