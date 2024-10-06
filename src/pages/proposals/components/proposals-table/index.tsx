import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import MemberTableActions from './member-table-action';
import { Proposal } from '@/lib/dao/proposals';

type TProposalsTableProps = {
  proposals: Proposal[];
  page: number;
  totalProposals: number;
  pageCount: number;
};

export default function ProposalsTable({
  proposals,
  pageCount
}: TProposalsTableProps) {
  return (
    <>
      <MemberTableActions />
      {proposals && (
        <DataTable columns={columns} data={proposals} pageCount={pageCount} />
      )}
    </>
  );
}
