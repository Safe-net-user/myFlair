import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function FormPanel() {
  const router = useRouter();

  return (
    <form className="flex w-[360px] flex-col gap-5">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Note additionnelle</Label>
        <Textarea
          id="notes"
          placeholder="Indiquez tout ce qui pourrait aider le prestataire à préparer votre rendez-vous."
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            router.back();
          }}
        >
          Retour
        </Button>
        <Button asChild type="button">
          <Link href="/shop/steps/business-boosters">Continuer</Link>
        </Button>
      </div>
    </form>
  );
}
