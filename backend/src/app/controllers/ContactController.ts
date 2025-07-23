// import bcrypt from 'bcryptjs';
// import { Request, Response } from 'express';
// import Contacts from '@entities/Contact';
// import emailValidator from '@utils/emailValidator';
// import sendMail from '@src/services/mail/sendEmail';
// import generatePassword from '@utils/auth/generatePassword';
// import { firstName } from '@utils/formats';
// import Contact from '@entities/Contact';
// import { simulate } from '@src/services/integrations/novo-saque/simulation/simulate';
// import { authenticateNovoSaque } from '@src/services/integrations/novo-saque/auth';
// import { simulateCrm } from '@src/services/integrations/novo-saque/simulation/simulate-crm';
// import Deal from '@entities/Deal';
// import queryBuilder from '@utils/queryBuilder';

// interface ContactInterface {
//   id?: string;
//   name: string;
//   role: string;
//   phone: string;
//   born_date?: string;
//   token: string;
//   password: string;
//   secret?: string;
// }

// class ContactController {
//   public async findContacts(req: Request, res: Response): Promise<void> {
//     try {
//       const { where } = queryBuilder(req.query);
//       const page = Number(req.query.page) || 1;
//       const pageSize = Number(req.query.pageSize) || 10;

//       const [contact, total] = await Contact.findAndCount({
//         where,
//         take: pageSize,
//         skip: (page - 1) * pageSize,
//         order: {
//           name: 'DESC',
//           created_at: 'DESC',
//           updated_at: 'DESC',
//           id: 'DESC',
//         }, // <- aqui!
//       });
//       if (!contact) {
//         res.status(404).json({ message: 'Contato não encontrado.' });
//         return;
//       }
//       const token = await authenticateNovoSaque();

//       // if (!token) {
//       //   res.status(404).json({
//       //     message: 'Não foi possível se autenticar com o novo saque.',
//       //   });
//       //   return;
//       // }

//       const contacts = await Promise.all(
//         contact.map(async (s) => {
//           if (s.cpf) {
//             const fgts = await simulateCrm(s, token);

//             const liquid_value = fgts?.target?.response.liquidValue;

//             console.log(fgts)
//             return {
//               ...s,
//               authorized_bank: fgts ? liquid_value ? 'Novo Saque' : 'Não autorizado' : "Banco indisponível",
//               value: liquid_value || '0',
//             };
//           } else {
//             return {
//               ...s,
//               authorized_bank: 'Não autorizado',
//               value: '0',
//             };
//           }
//         }),
//       );

//       console.log(`contacts.length: ${contacts.length}`);
//       res.status(200).json({
//         data: contacts,
//         total,
//         page: Number(req.query.page) || 1,
//         pageSize: Number(req.query.pageSize) || 10,
//         totalPages: Math.ceil(total / (Number(req.query.pageSize) || 10)),
//       });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: 'Erro interno ao buscar usuário, tente novamente.' });
//     }
//   }
//   public async findContactById(req: Request, res: Response): Promise<void> {
//     try {
//       const id = req.params.id;

//       const contact = await Contacts.findOne(id);

//       if (!contact) {
//         res.status(404).json({ message: 'Contato não encontrado.' });
//         return;
//       }

//       const token = await authenticateNovoSaque();

//       const fgts = await simulateCrm(contact.cpf, token);

//       const data = {
//         ...contact,
//         simulation: fgts?.target
//           ? { ...fgts.target, bank: 'Novo Saque' }
//           : null,
//       };

//       res.status(200).json(data);
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: 'Erro interno ao buscar usuário, tente novamente.' });
//     }
//   }

//   public async findContactByCPF(req: Request, res: Response): Promise<void> {
//     try {
//       const cpf = req.params.cpf;

//       const contact = await Contacts.findOne({ where: { cpf } });

//       if (!contact) {
//         res.status(404).json({ message: 'Contato não encontrado.' });
//         return;
//       }

//       const token = await authenticateNovoSaque();

//       const fgts = await simulateCrm(contact.cpf, token);

//       const data = {
//         ...contact,
//         simulation: fgts?.target
//           ? { ...fgts.target, bank: 'Novo Saque' }
//           : null,
//       };

//       res.status(200).json(data);
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: 'Erro interno ao buscar usuário, tente novamente.' });
//     }
//   }

//   public async import(req: Request, res: Response): Promise<void> {
//     try {
//       const contactsData = req.body;

//       let completed = 0;
//       let failed = 0;

//       const token = await authenticateNovoSaque();

//       if (!token) {
//         res.status(404).json({
//           message: 'Não foi possível se autenticar com o novo saque.',
//         });
//         return;
//       }

//       for (const contact of contactsData) {
//         const hasProduct = await Contact.findOne({
//           where: { cpf: contact.cpf },
//         });
//         if (hasProduct) {
//           failed = failed + 1;
//         } else {
//           const fgts = await simulateCrm(contact.cpf, token);

//           const liquid_value = fgts?.target?.response.liquidValue;
//           if (liquid_value) {
//             const group = await Contact.create({
//               name: contact.name,
//               cpf: contact.cpf.replace(/\D/g, ''),
//               phone: contact.phone.replace(/\D/g, '') || '',
//               born_date: contact.born_date || '',
//             }).save();

//             const deal = await Deal.create({
//               contact: group,
//             }).save();

//             if (group.id && deal.id) {
//               completed = completed + 1;
//             } else {
//               failed = failed + 1;
//             }
//           }
//         }
//       }

//       res.status(201).json({ completed: completed, failed: failed });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: 'Erro interno ao buscar usuário, tente novamente.' });
//     }
//   }

//   public async update(req: Request, res: Response): Promise<void> {
//     try {
//       const { id } = req.params;
//       const { name, phone, born_date }: ContactInterface = req.body;

//       if (!phone || phone === '') {
//         res.status(400).json({ message: 'Telefone não informado.' });
//         return;
//       }

//       const contact = await Contacts.findOne(id);

//       if (!contact) {
//         res.status(404).json({ message: 'Contato não encontrado.' });
//         return;
//       }

//       const valuesToUpdate = {
//         name: name || contact.name,
//         phone: phone || contact.phone,
//         born_date: born_date || contact.born_date,
//       };

//       await Contacts.update(contact.id, { ...valuesToUpdate });

//       res.status(200).send({ message: 'Contato atualizado com sucesso' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         message: 'Erro interno ao atualizar o usuário, tente novamente.',
//       });
//     }
//   }

//   public async delete(req: Request, res: Response): Promise<void> {
//     try {
//       const { id } = req.params;

//       const contact = await Contacts.findOne(id);

//       if (!contact) {
//         res.status(404).json({ message: 'Contato não encontrado.' });
//         return;
//       }
//       await Contacts.softRemove(contact);

//       res.status(204).send({ message: 'Contato removido com sucesso' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         message: 'Erro interno ao atualizar o usuário, tente novamente.',
//       });
//     }
//   }
// }

// export default new ContactController();
