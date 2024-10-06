import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetConfig } from './queries/queries';

export default function SettingsPage() {
  const { data, isLoading, isError, error } = useGetConfig();

  if (isLoading) {
    return (
      <Card className="mx-auto mt-6 max-w-xl p-4">
        <CardContent>
          <Skeleton className="mb-2 h-6 w-full" />
          <Skeleton className="mb-2 h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="mx-auto mt-6 max-w-xl border border-red-200 bg-red-100 p-4">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error ? error.message : 'An error occurred'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto mt-6 max-w-xl border border-gray-200 bg-gray-50 p-4  text-black">
      <CardHeader>
        <CardTitle>Configuration Data</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="overflow-auto whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-100 p-4 text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
