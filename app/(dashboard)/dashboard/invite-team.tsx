'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Loader2, PlusCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { inviteTeamMember } from '@/app/(login)/actions';
import { useUser } from '@/lib/auth';

type ActionState = {
  error?: string;
  success?: string;
};

export function InviteTeamMember() {
  const { user } = useUser();
  const isOwner = user?.role === 'owner';
  const [inviteState, inviteAction, isInvitePending] = useActionState<
    ActionState,
    FormData
  >(inviteTeamMember, { error: '', success: '' });

  return (
    <Card className="bg-[#000000] border-[#1d1d1d]">
      <CardHeader>
        <CardTitle className="text-[#fafafa]">Convidar Membro</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-[#fafafa]">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite o email do novo membro"
              required
              disabled={!isOwner}
              className="bg-[#1d1d1d] border-[#333333] text-[#fafafa] placeholder:text-[#666666] focus:border-[#333333] focus:ring-1 focus:ring-[#333333]"
            />
          </div>
          <div>
            <Label className="text-[#fafafa]">Função</Label>
            <RadioGroup
              defaultValue="member"
              name="role"
              className="flex space-x-4"
              disabled={!isOwner}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="member" 
                  id="member"
                  className="border-[#333333] text-[#fafafa]"
                />
                <Label htmlFor="member" className="text-[#888888]">Membro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="owner" 
                  id="owner"
                  className="border-[#333333] text-[#fafafa]"
                />
                <Label htmlFor="owner" className="text-[#888888]">Proprietário</Label>
              </div>
            </RadioGroup>
          </div>
          {inviteState?.error && (
            <p className="text-sm text-red-500">{inviteState.error}</p>
          )}
          {inviteState?.success && (
            <p className="text-sm text-green-500">{inviteState.success}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-[#1d1d1d] hover:bg-[#333333] text-[#fafafa] border border-[#333333] transition-colors duration-200"
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando convite...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Convidar Membro
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardFooter className="bg-[#1d1d1d] border-t border-[#333333]">
          <p className="text-sm text-[#666666]">
            Apenas proprietários podem convidar novos membros.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
