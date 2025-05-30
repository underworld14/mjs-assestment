import { Suspense } from "react";
import { getUsers } from "@/lib/actions/users";
import { UserTable } from "@/components/users/user-table";
import { Skeleton } from "@/components/ui/skeleton";

function UserTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>

      {/* Desktop skeleton */}
      <div className="hidden md:block space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

async function UsersContent() {
  const users = await getUsers();

  return <UserTable users={users} />;
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<UserTableSkeleton />}>
        <UsersContent />
      </Suspense>
    </div>
  );
}
