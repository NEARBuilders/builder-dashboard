import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import MemberTableActions from './member-table-action';
import { Member } from '@/lib/dao/members';

type TMembersTableProps = {
  users: Member[];
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function MembersTable({ users, pageCount }: TMembersTableProps) {
  return (
    <>
      <MemberTableActions />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
