import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import PageHead from '@/components/shared/page-head';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Member } from '@/lib/dao/members';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MembersTable from './components/members-table';
import { useGetMembers } from './queries/queries';

export default function MemberPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 20);
  const searchQuery = searchParams.get('search') || '';

  const { data: members, isLoading, isError, error } = useGetMembers();

  const [filteredUsers, setFilteredUsers] = useState<Member[]>([]);
  const [paginatedUsers, setPaginatedUsers] = useState<Member[]>([]);

  useEffect(() => {
    if (members) {
      const debouncedSearch = debounce((query) => {
        if (!query) {
          setFilteredUsers(members);
          return;
        }

        const fuse = new Fuse(members, {
          keys: ['id', 'roles'], // adjust these fields based on your user object structure
          threshold: 0.3,
          includeScore: true
        });

        const results = fuse.search(query);
        setFilteredUsers(results.map((result) => result.item));
      }, 300);

      debouncedSearch(searchQuery);

      return () => debouncedSearch.cancel();
    }
  }, [members, searchQuery]);

  useEffect(() => {
    const offset = (page - 1) * pageLimit;
    setPaginatedUsers(filteredUsers.slice(offset, offset + pageLimit));
  }, [filteredUsers, page, pageLimit]);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'An error occurred while fetching members.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalUsers = filteredUsers.length;
  const pageCount = Math.ceil(totalUsers / pageLimit);

  return (
    <div className="p-4 md:p-8">
      <PageHead title="Member Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Members', link: '/members' }
        ]}
      />
      <MembersTable
        users={paginatedUsers}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </div>
  );
}
