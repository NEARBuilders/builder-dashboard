import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import PageHead from '@/components/shared/page-head';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Proposal } from '@/lib/dao/proposals';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProposalsTable from './components/proposals-table';
import { useGetProposals } from './queries/queries';

export default function ProposalsPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 20);
  const searchQuery = searchParams.get('search') || '';
  const offset = (page - 1) * pageLimit;

  const {
    data: proposals,
    isLoading,
    isError,
    error
  } = useGetProposals(offset, pageLimit);

  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [paginatedProposals, setPaginatedProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (proposals) {
      const debouncedSearch = debounce((query) => {
        if (!query) {
          setFilteredProposals(proposals);
          return;
        }

        const fuse = new Fuse(proposals, {
          keys: ['id', 'roles'], // adjust these fields based on your user object structure
          threshold: 0.3,
          includeScore: true
        });

        const results = fuse.search(query);
        setFilteredProposals(results.map((result) => result.item));
      }, 300);

      debouncedSearch(searchQuery);

      return () => debouncedSearch.cancel();
    }
  }, [proposals, searchQuery]);

  useEffect(() => {
    const offset = (page - 1) * pageLimit;
    setPaginatedProposals(filteredProposals.slice(offset, offset + pageLimit));
  }, [filteredProposals, page, pageLimit]);

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
            {error?.message || 'An error occurred while fetching proposals.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalProposals = filteredProposals.length;
  const pageCount = Math.ceil(totalProposals / pageLimit);

  return (
    <div className="p-4 md:p-8">
      <PageHead title="Member Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'proposals', link: '/proposals' }
        ]}
      />
      <ProposalsTable
        proposals={paginatedProposals}
        page={page}
        totalProposals={totalProposals}
        pageCount={pageCount}
      />
    </div>
  );
}
