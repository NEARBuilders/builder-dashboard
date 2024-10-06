import { Checkbox } from '@/components/ui/checkbox';
import { Proposal } from '@/lib/dao/proposals';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Proposal>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'proposer',
    header: 'Proposer'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'kind',
    header: 'Kind',
    cell: ({ row }) => {
      const kind = row.original.kind;
      if ('AddMemberToRole' in kind) {
        return `Add Member: ${kind.AddMemberToRole.member_id}`;
      } else if ('FunctionCall' in kind) {
        return `Function Call: ${kind.FunctionCall.receiver_id}`;
      }
      return 'Unknown';
    }
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'votes',
    header: 'Votes',
    cell: ({ row }) => {
      const votes = row.original.votes;
      return Object.entries(votes)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }
  },
  {
    accessorKey: 'vote_counts',
    header: 'Vote Counts',
    cell: ({ row }) => {
      const voteCounts = row.original.vote_counts.council;
      if (Array.isArray(voteCounts)) {
        return `Yes: ${voteCounts[0]}, No: ${voteCounts[1]}, Abstain: ${voteCounts[2]}`;
      }
      return 'N/A';
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
