import { useWallet } from '@/hooks/use-wallet';
import { getMembers } from '@/lib/dao/members';
import { useQuery } from '@tanstack/react-query';

export const useGetMembers = () => {
  // Needed because can't view without a wallet...
  const { wallet } = useWallet();
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => getMembers(wallet!),
    retry: 3
  });
};
