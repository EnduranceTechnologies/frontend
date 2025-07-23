import User from '@entities/User';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { generateToken } from '@utils/auth/generateToken';
import sendMail from '@src/services/mail/sendEmail';

dotenv.config();

interface UserInterface {
  name: string;
  email: string;
  token: string;
  password: string;
  secret?: string;
  tempToken?: string;
}
/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Operações relativas à autenticação
 */

class AuthController {
  /**
   * @swagger
   * /auth/:
   *   post:
   *     summary: Autentica um usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Autenticação bem-sucedida
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 email:
   *                   type: string
   *                 name:
   *                   type: string
   *                 has_configured:
   *                   type: boolean
   *       400:
   *         description: Valores inválidos para o usuário
   *       404:
   *         description: Usuário não encontrado
   *       401:
   *         description: Senha inválida
   *       500:
   *         description: Erro interno na autenticação
   */
  public async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: UserInterface = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Valores inválidos para o usuário.' });
        return;
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      if (!(await bcrypt.compare(password, user.password_hash))) {
        res.status(401).json({ message: 'Senha inválida.' });
        return;
      }

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno na autenticação.' });
    }
  }
  /**
   * @swagger
   * /auth/forgot-password:
   *   post:
   *     summary: Recupera a senha de um usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Link enviado para o e-mail
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 email:
   *                   type: string
   *                 name:
   *                   type: string
   *                 has_configured:
   *                   type: boolean
   *       400:
   *         description: Valores inválidos para o usuário
   *       404:
   *         description: Usuário não encontrado
   *       401:
   *         description: Senha inválida
   *       500:
   *         description: Erro interno na autenticação
   */
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email }: UserInterface = req.body;

      if (!email) {
        res.status(400).json({ message: 'Valores inválidos para o usuário.' });
        return;
      }

      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      const token = crypto.randomBytes(20).toString('hex'); // token que será enviado via email.

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        token_reset_password: token,
        reset_password_expires: now,
      });

      const client = process.env.CLIENT_CONNECTION;

      // Envie o email e aguarde a conclusão antes de enviar a resposta
      await sendMail('forgotPassword', 'no-reply', 'Recuperação de Senha', {
        client,
        name: user.name,
        token,
        email: user.email,
      });

      // Envie a resposta após o envio do email
      res
        .status(200)
        .json({ message: 'E-mail de recuperação de senha enviado.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno na autenticação.' });
    }
  }

  /**
   * @swagger
   * /auth/forgot-password:
   *   post:
   *     summary: Recupera a senha de um usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Link enviado para o e-mail
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 email:
   *                   type: string
   *                 name:
   *                   type: string
   *                 has_configured:
   *                   type: boolean
   *       400:
   *         description: Valores inválidos para o usuário
   *       404:
   *         description: Usuário não encontrado
   *       401:
   *         description: Senha inválida
   *       500:
   *         description: Erro interno na autenticação
   */
  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, token }: UserInterface = req.body;

      if (!email || !password || !token) {
        res
          .status(400)
          .json({ message: 'Valores inválidos para redefinição de senha' });
        return;
      }
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }
      if (token !== user.token_reset_password) {
        res.status(404).json({ message: 'Token inválido' });
        return;
      }
      const now = new Date();

      if (now > user.reset_password_expires) {
        res.status(400).json({ message: 'Token expirado' });
        return;
      }
      const password_hash = await bcrypt.hash(password, 10);

      await User.update(user.id, {
        password_hash,
        reset_password_expires: undefined,
        token_reset_password: undefined,
      });

      res.status(200).json({ message: 'Senha alterada com sucesso ' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Cannot reset password, try again' });
    }
  }
  /**
   * @swagger
   * /auth/forgot-password:
   *   post:
   *     summary: Recupera a senha de um usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Link enviado para o e-mail
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 email:
   *                   type: string
   *                 name:
   *                   type: string
   *                 has_configured:
   *                   type: boolean
   *       400:
   *         description: Valores inválidos para o usuário
   *       404:
   *         description: Usuário não encontrado
   *       401:
   *         description: Senha inválida
   *       500:
   *         description: Erro interno na autenticação
   */
  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await User.findOne(id);

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Cannot reset password, try again' });
    }
  }
}

export default new AuthController();
