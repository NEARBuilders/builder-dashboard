import { useWallet } from '@/hooks/use-wallet';
import { getProposals } from '@/lib/dao/proposals';
import { useQuery } from '@tanstack/react-query';

export const useGetProposals = (offset: number, limit: number) => {
  const { wallet } = useWallet();

  return useQuery({
    queryKey: ['proposals'],
    queryFn: async () => getProposals(offset, limit, wallet!),
    retry: 3
  });
};
