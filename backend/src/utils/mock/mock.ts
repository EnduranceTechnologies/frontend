import User from '@entities/User';
import bcrypt from 'bcryptjs';
import { users } from './dataMock';

const mocks = async (): Promise<void> => {
  try {
    const [hasUsers] = await Promise.all([User.count()]);

    if (hasUsers > 0) {
      console.log('Mocks ok');
      return;
    }


    for (const user of users) {
      const password_hash = await bcrypt.hash(user.password, 10);
      const element = await User.create({
        ...user,
        role: 'ADMIN',
        password_hash,
      }).save();
      console.log(`👤 Usuário "${element.name}" criado com sucesso`);
    }

  } catch (error) {
    console.log('Erro ao rodar mocks!', error);
  }
};

export default mocks;
