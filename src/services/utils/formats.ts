
export function formatCurrency(valor: number) {
  return (valor / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}


export function formatValue(value: string) {
  // Garantir que o valor seja tratado como um número.
  const numericValue = Number(value);

  // Verificar se o valor é um número válido.
  if (isNaN(numericValue)) {
    return '0'; // Ou qualquer outro valor padrão que você considere apropriado.
  }

  // Se o valor é maior ou igual a 100.000, formatar usando 'k' para milhar.
  if (numericValue >= 100000) {
    // Arredondar para o milhar mais próximo e adicionar 'k'.
    const thousands = Math.round(numericValue / 1000);
    return `${thousands}k`;
  }

  // Para valores menores que 100.000, manter a formatação original.
  const formattedValue = numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 0, // Ajustar para lidar com decimais, se necessário.
    maximumFractionDigits: 0, // Ajustar para lidar com decimais, se necessário.
  });

  return formattedValue;
}

export function formatDealStatus(value: string) {
  if (value === 'INPROGRESS') {
    return 'Em andamento';
  } else if (value === 'LOST') {
    return 'Perdida';
  } else if (value === 'PENDING') {
    return 'Pendente';
  } else if (value === 'WON') {
    return 'Convertida';
  } else if (value === 'ARCHIVED') {
    return 'Arquivada';
  }
}

export function formatStatusColor(value: string) {
  if (value === 'INPROGRESS') {
    return 'bg-blue-700';
  } else if (value === 'LOST') {
    return 'bg-red-600';
  } else if (value === 'WON') {
    return 'bg-green-600';
  } else if (value === 'ARCHIVED') {
    return 'bg-gray-700';
  } else if (value === 'PENDING') {
    return 'bg-yellow-600';
  }
}

export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}

export function getInitials(name: string) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }
  return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
}

interface Item {
  [key: string]: string | number; // Define um objeto genérico com chaves dinâmicas
}

export function formatObject(
  array: Item[],
  labelKey: string,
  valueKey: string,
) {
  return array.map((e) => ({
    label: e[labelKey] as string, // Assegura que o valor seja tratado como string
    value: e[valueKey] as string, // Pode ser qualquer outro tipo permitido em `Item`
  }));
}

export function formatComboContact(array: Item[]) {
  return array.map((e) => ({
    id: e.id as string, // Assegura que o valor seja tratado como string
    name: e.name as string, // Assegura que o valor seja tratado como string
    cpf: e.cpf as string, // Pode ser qualquer outro tipo permitido em `Item`
    phone: e.phone as string, // Pode ser qualquer outro tipo permitido em `Item`
    value: e.id as string, // Pode ser qualquer outro tipo permitido em `Item`
  }));
}

export const formatCpfCnpj = (v: string | undefined) => {
  if (!v) return ""

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

export function formatDateInput(value: string): string {
  // Remove tudo que não for número
  const digits = value.replace(/\D/g, '');

  // Aplica a máscara: dd/mm/yyyy
  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 4);
  const part3 = digits.slice(4, 8);

  let formatted = part1;
  if (part2) formatted += '/' + part2;
  if (part3) formatted += '/' + part3;

  return formatted;
}

export function formatPhone(phone: string) {
  if (phone) {
    phone = phone.toString();
    phone = phone.replace(/[^*\d]/g, ''); // Remove tudo o que não é dígito exceto o asterisco

    // Verifica se o número tem 7 ou 8 dígitos após o DDD
    phone = phone.replace(/^(\d{2})(\d{7,8})$/, (match, ddd, rest) => {
      if (rest.length === 8 && !rest.startsWith('9')) {
        return `${ddd}9${rest}`;
      }
      return match;
    });

    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos
  }
  return phone;
}

export function formatNumber(number: string) {
  number = number.replace(/[^\d]/g, '');
  return number;
}

export function formatInt(number: string) {
  // Remove tudo que não for dígito
  number = number.replace(/[^\d]/g, '');

  if (number.length === 0) {
    return '0.00';
  }

  // Garante pelo menos 3 caracteres para depois formatar corretamente
  while (number.length < 3) {
    number = '0' + number;
  }

  const integerPart = number.slice(0, number.length - 2);
  const decimalPart = number.slice(-2);

  return `${parseInt(integerPart)}.${decimalPart}`;
}

export function wppConnected(status: string) {
  return status === 'Connected';
}
