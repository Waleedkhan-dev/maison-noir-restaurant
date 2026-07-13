import { cx } from '@/utils';

export function Skeleton({ className, ratio }) {
  return (
    <div
      className={cx('skeleton rounded-lg', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
      aria-hidden="true"
    />
  );
}

/** Matches DishCard's footprint exactly, so swapping in the real card shifts nothing. */
export function DishCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-charcoal">
      <Skeleton className="rounded-none" ratio="4/3" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex items-center justify-between pt-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <DishCardSkeleton key={i} />
      ))}
    </div>
  );
}
