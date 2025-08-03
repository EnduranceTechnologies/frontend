
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ClinicHubLogo from "@/assets/routes/public/clinicHubLogo.png"
import { BookA, Info, Mail, RefreshCcw, Scale, ShieldPlus, TriangleAlert, UserCheck } from 'lucide-react';

interface TermsOfUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsOfUseModalProps> = ({ isOpen, onClose, onAccept }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent className="p-0 max-w-4xl border-none rounded-lg">
        <DialogHeader className="p-6 bg-gradient-to-r from-primary to-primary-foreground rounded-t-lg text-white">
          <div className="flex items-center gap-2">
            <img src={ClinicHubLogo} />
            <span className="text-2xl font-semibold">ClinicHUB</span>
          </div>
          <div className='flex flex-col items-start'>
            <DialogTitle className="text-xl font-semibold">Termos de Uso</DialogTitle>
            <span className="text-white">
              Sistema de Gestão em Saúde
            </span>
            <span className="text-xs text-white">
              Última atualização: Janeiro de 2024
            </span>
          </div>
        </DialogHeader>

        <div className="p-6 text-gray-700 max-h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar space-y-5">
          <div id='intro' className='space-y-2'>
            <div className='flex flex-row gap-2 items-center'>
              <Info size={18} className='text-primary' />
              <h3 className="font-bold text-lg">1. Introdução</h3>
            </div>
            <p className="text-sm ml-1">
              Bem-vindo ao ClinicHUB, um sistema de gestão em saúde desenvolvido para profissionais e clínicas. Ao utilizar nossa plataforma, você concorda com os termos e condições descritos neste documento.
            </p>
          </div>

          <div id="definitions" className='space-y-2'>
            <div className="flex flex-row gap-2 items-center">
              <BookA size={18} className='text-primary' />
              <h3 className="text-xl font-bold">
                2. Definições
              </h3>
            </div>

            <div className='space-y-1 ml-1'>
              <p><strong>Plataforma:</strong> O sistema ClinicHUB e todos os seus recursos.</p>
              <p><strong>Usuário:</strong> Profissional de saúde ou administrador que utiliza a plataforma.</p>
              <p><strong>Dados de Saúde:</strong> Informações relacionadas aos pacientes e atendimentos.</p>
            </div>
          </div>

          <div id="usage" className='space-y-2'>
            <div className="flex flex-row gap-2 items-center">
              <UserCheck size={18} className='text-primary' />
              <h3 className="text-xl font-bold">
                3. Uso da Plataforma
              </h3>
            </div>

            <div className='space-y-1 ml-1'>
              <p className="text-sm">
                O usuário compromete-se a:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li className='ml-4'>Utilizar a plataforma apenas para fins profissionais legítimos</li>
                <li className='ml-4'>Manter a confidencialidade dos dados de acesso</li>
                <li className='ml-4'>Respeitar as normas do Conselho Federal de Medicina</li>
                <li className='ml-4'>Não compartilhar informações sensíveis de pacientes</li>
              </ul>
            </div>
          </div>

          <div id="privacy" className='space-y-2'>
            <div className="flex flex-row gap-2 items-center">
              <ShieldPlus size={18} className='text-primary' />
              <h3 className="text-xl font-bold">
                4. Privacidade e Proteção de Dados
              </h3>
            </div>

            <div className='space-y-1 ml-1'>
              <p className="text-sm">
                O ClinicHUB está em conformidade com a LGPD (Lei Geral de Proteção de Dados):
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li className='ml-4'>Criptografia de dados em trânsito e em repouso</li>
                <li className='ml-4'>Controle de acesso baseado em perfis</li>
                <li className='ml-4'>Logs de auditoria para todas as ações</li>
                <li className='ml-4'>Backup seguro e recuperação de dados</li>
              </ul>
            </div>
          </div>

          <div id="responsability" className='space-y-2'>
            <div className="flex flex-row gap-2 items-center">
              <Scale size={18} className='text-primary' />
              <h3 className="text-xl font-bold">
                5. Responsabilidades
              </h3>
            </div>

            <div className='space-y-1 ml-1'>
              <p className="text-sm font-semibold">
                Do Usuário:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li className='ml-4'>Manter dados atualizados e precisos</li>
                <li className='ml-4'>Usar senhas seguras</li>
                <li className='ml-4'>Reportar problemas de segurança</li>
              </ul>
            </div>
            <div className='space-y-1 ml-1'>
              <p className="text-sm font-semibold">
                Do ClinicHUB:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li className='ml-4'>Manter a disponibilidade do sistema</li>
                <li className='ml-4'>Proteger os dados dos usuários</li>
                <li className='ml-4'>Fornecer suporte técnico</li>
              </ul>
            </div>
          </div>

          <div id='limits' className='space-y-2'>
            <div className='flex flex-row gap-2 items-center'>
              <TriangleAlert size={18} className='text-primary' />
              <h3 className="font-bold text-lg">6. Limitações de Responsabilidades</h3>
            </div>
            <p className="text-sm ml-1">
              O ClinicHUB não se responsabiliza por decisões médicas tomadas com base nas informações da plataforma.
              O sistema é uma ferramenta de apoio à gestão, não substituindo o julgamento clínico profissional.
            </p>
          </div>

          <div id='updates' className='space-y-2'>
            <div className='flex flex-row gap-2 items-center'>
              <RefreshCcw size={18} className='text-primary' />
              <h3 className="font-bold text-lg">7. Atualizações dos Termos</h3>
            </div>
            <p className="text-sm ml-1">
              Reservamo-nos o direito de atualizar estes termos periodicamente.
              Os usuários serão notificados sobre mudanças significativas via e-mail ou através da plataforma.
            </p>
          </div>

          <div id='updates' className='space-y-2'>
            <div className='flex flex-row gap-2 items-center'>
              <Mail size={18} className='text-primary' />
              <h3 className="font-bold text-lg">8. Contato</h3>
            </div>
            <p className="text-sm ml-1">
              Para dúvidas sobre estes termos:
            </p>
            <p className="text-sm ml-1">
              suporte@clinichub.com.br<br />
              Central de Atendimento: (11) 3000-0000
            </p>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <Button className="bg-primary hover:bg-primary-foreground text-white px-6 py-2 rounded-md" onClick={onAccept}>
            Aceitar Termos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;