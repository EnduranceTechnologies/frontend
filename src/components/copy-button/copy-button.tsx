import { Button } from '@/components/ui/button';
import { CopyCheck, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy} className="ml-2">
      {!copied ? <Copy className="w-4 h-4" /> : <CopyCheck className="w-4 h-4" />}
    </Button>
  );
}
