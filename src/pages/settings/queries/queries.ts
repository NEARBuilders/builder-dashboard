import { useWallet } from '@/hooks/use-wallet';
import { getConfig } from '@/lib/dao/config';
import { useQuery } from '@tanstack/react-query';

export const useGetConfig = () => {
  const { wallet } = useWallet();

  return useQuery({
    queryKey: ['config'],
    queryFn: async () => getConfig(wallet!),
    retry: 3
  });
};
