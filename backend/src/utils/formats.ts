
export const firstName = (name: string) => name.split(' ')[0];



export function formatPhone(phone: string) {
  if (phone) {
    phone = phone?.toString();
    phone = phone?.replace(/^55/, ''); // Remove o 55 do início, se existir
    phone = phone?.replace(/[^*\d]/g, ''); // Remove tudo o que não é dígito exceto o asterisco

    // Verifica se o número tem 9 após o DDD. Se não tiver, adiciona.
    phone = phone.replace(/^(\d{2})(\d{7,8})$/, (match, ddd, rest) => {
      if (rest.length === 8) {
        return `${ddd}9${rest}`;
      }
      return match;
    });

    // phone = phone?.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
    // phone = phone?.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos
  }
  // console.log(phone)
  return phone;
}


export function formatToWhatsAppNumber(phone: string) {
  if (phone) {
    // Remove todos os caracteres que não são números
    phone = phone.toString().replace(/\D/g, '');

    // Remove todos os espaços entre os números (não há espaços neste ponto, mas só para garantir)
    phone = phone.replace(/\s+/g, '');

    // Adiciona o prefixo 55 antes de todos os números
    phone = `${phone}`;

    // Adiciona @c.us no final do número
    phone = `${phone}@c.us`;
  }
  return phone;
}


export function formatCurrency(valor: number) {
  return (valor / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}



export const formatCpfCnpj = (v: string) => {
  v = v?.replace(/\D/g, '');

  if (v?.length <= 11) {
    return v
      ?.replace(/\D/g, '')
      ?.replace(/(\d{3})(\d)/, '$1.$2')
      ?.replace(/(\d{3})(\d)/, '$1.$2')
      ?.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    return v
      ?.replace(/\D+/g, '')
      ?.replace(/(\d{2})(\d)/, '$1.$2')
      ?.replace(/(\d{3})(\d)/, '$1.$2')
      ?.replace(/(\d{3})(\d)/, '$1/$2')
      ?.replace(/(\d{4})(\d)/, '$1-$2')
      ?.replace(/(-\d{2})\d+?$/, '$1');
  }
};
