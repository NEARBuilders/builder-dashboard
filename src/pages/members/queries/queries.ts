import { getMembers } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetMembers = (offset, pageLimit, country) => {
  return useQuery({
    queryKey: ['members', offset, pageLimit, country],
    queryFn: async () => getMembers(offset, pageLimit, country)
  });
};
