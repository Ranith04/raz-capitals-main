/**
 * Skeleton loading component for admin pages
 * Provides immediate UI feedback while data is loading
 */

export default function AdminPageSkeleton() {
  return (
    <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 sm:h-10 bg-[#2D4A32] rounded-lg w-64 mb-6"></div>

      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6">
            <div className="h-4 bg-[#4A6741] rounded w-24 mb-3"></div>
            <div className="h-8 bg-[#4A6741] rounded w-16"></div>
          </div>
        ))}
      </div>

      {/* Filter Section Skeleton */}
      <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-4 bg-[#4A6741] rounded w-20 mb-2"></div>
              <div className="h-10 bg-[#4A6741] rounded"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-[#4A6741] rounded w-32"></div>
          <div className="h-9 bg-[#4A6741] rounded w-24"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6">
        <div className="h-6 bg-[#4A6741] rounded w-48 mb-6"></div>
        
        {/* Desktop Table Skeleton */}
        <div className="hidden lg:block">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-12 bg-[#4A6741] rounded flex-1"></div>
                <div className="h-12 bg-[#4A6741] rounded flex-1"></div>
                <div className="h-12 bg-[#4A6741] rounded flex-1"></div>
                <div className="h-12 bg-[#4A6741] rounded flex-1"></div>
                <div className="h-12 bg-[#4A6741] rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card Skeleton */}
        <div className="lg:hidden space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#4A6741] rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-5 bg-[#2D4A32] rounded w-24"></div>
                <div className="h-6 bg-[#2D4A32] rounded w-16"></div>
              </div>
              <div className="h-4 bg-[#2D4A32] rounded w-32"></div>
              <div className="h-4 bg-[#2D4A32] rounded w-40"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-4 bg-[#2D4A32] rounded"></div>
                <div className="h-4 bg-[#2D4A32] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

