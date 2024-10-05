import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import MemberTableActions from './member-table-action';

type TMembersTableProps = {
  users: any;
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
