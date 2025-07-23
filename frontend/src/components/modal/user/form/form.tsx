import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User } from '@/types/User';
import { SelectInput } from '@/components/select-input/select-input';

interface FormUserProps {
  data: User;
  change: (value: string, item: string) => void;
}

function FormUser({ data, change }: FormUserProps) {
  const filterOptions = [
    {
      title: 'Filtros',
      items: [
        { label: 'Membro', value: 'MEMBER' },
        { label: 'Administrador', value: 'ADMIN' },
      ],
    },
  ];
  return (
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          required
          value={data.name}
          placeholder="Nome do usuário"
          onChange={(e) => change(e.target.value, 'name')}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Perfil</Label>
        <SelectInput
          options={filterOptions}
          value={data.role}
          placeholder="Perfil de acesso"
          onChange={(e) => change(e, 'role')}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="E-mail do usuário"
          value={data.email}
          onChange={(e) => change(e.target.value, 'email')}
        />
      </div>
    </CardContent>
  );
}

export default FormUser;
