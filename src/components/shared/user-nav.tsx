import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useWallet } from '@/hooks/use-wallet';
import { getProfile } from '@/lib/social';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserNav() {
  const { wallet, signedAccountId } = useWallet();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', signedAccountId],
    queryFn: async () => getProfile(signedAccountId),
    retry: 3
  });

  const renderAvatarContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-secondary">
          <Loader className="h-6 w-6 animate-spin text-primary" />
        </div>
      );
    }
    if (isError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-secondary">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
      );
    }
    return (
      <>
        <AvatarImage
          src={
            `https://ipfs.near.social/ipfs/${data?.image?.ipfs_cid}` ||
            'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png'
          }
          alt={`${data?.name}` || signedAccountId || ''}
        />
        <AvatarFallback>
          {data?.name?.[0] || signedAccountId?.[0] || 'U'}
        </AvatarFallback>
      </>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-14 w-14 rounded-full">
          <Avatar className="h-14 w-14">{renderAvatarContent()}</Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {`${data?.name}` || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {signedAccountId}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            to={`https://near.social/mob.near/widget/ProfilePage?accountId=${signedAccountId}`}
          >
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => wallet?.signOut()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
