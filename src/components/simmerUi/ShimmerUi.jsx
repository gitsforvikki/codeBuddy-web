const Shimmer = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`block animate-pulse rounded-lg bg-[#e3e8ed] ${className}`}
  />
);

const ShimmerPage = ({ children, label }) => (
  <div
    className="min-h-[calc(100vh-72px)] bg-(--connections-cream) px-4 py-8 sm:px-6 md:py-12 lg:px-8"
    role="status"
    aria-label={label}
  >
    {children}
  </div>
);

export const AuthShimmer = () => (
  <ShimmerPage label="Loading account">
    <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-4xl border border-(--connections-line) bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
      <div className="hidden space-y-6 bg-(--connections-ink) p-8 md:block">
        <Shimmer className="h-11 w-11 bg-white/20" />
        <Shimmer className="h-3 w-32 bg-white/20" />
        <Shimmer className="h-20 w-4/5 bg-white/20" />
        <Shimmer className="h-16 w-full bg-white/20" />
      </div>
      <div className="space-y-5 p-3 md:p-8">
        <Shimmer className="h-3 w-28" />
        <Shimmer className="h-10 w-4/5" />
        <Shimmer className="h-5 w-full" />
        <Shimmer className="h-12 w-full" />
        <Shimmer className="h-12 w-full" />
        <Shimmer className="h-12 w-full" />
      </div>
    </div>
  </ShimmerPage>
);

export const FeedShimmer = () => (
  <ShimmerPage label="Loading developer feed">
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex items-end justify-between gap-5">
        <div className="w-full max-w-xl space-y-3">
          <Shimmer className="h-3 w-36" />
          <Shimmer className="h-12 w-4/5" />
          <Shimmer className="h-5 w-full" />
        </div>
        <Shimmer className="hidden h-16 w-32 sm:block" />
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(360px,1fr)_minmax(0,.8fr)]">
        <Shimmer className="hidden h-72 rounded-4xl lg:block" />
        <div className="rounded-4xl border border-(--connections-line) bg-white p-4 shadow-sm md:p-6">
          <Shimmer className="h-8 w-2/3" />
          <Shimmer className="mt-5 h-90 w-full rounded-2xl" />
          <Shimmer className="mt-5 h-10 w-full" />
        </div>
        <div className="space-y-4">
          <Shimmer className="h-36 w-full rounded-2xl" />
          <Shimmer className="h-36 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  </ShimmerPage>
);

const ConnectionCardShimmer = () => (
  <div className="rounded-2xl border border-(--connections-line) bg-white p-5 shadow-sm">
    <div className="flex justify-between">
      <Shimmer className="h-16 w-16 rounded-2xl" />
      <Shimmer className="h-6 w-20 rounded-full" />
    </div>
    <Shimmer className="mt-5 h-6 w-3/5" />
    <Shimmer className="mt-3 h-4 w-2/5" />
    <Shimmer className="mt-5 h-14 w-full" />
    <Shimmer className="mt-5 h-11 w-full" />
  </div>
);

export const ConnectionsShimmer = () => (
  <ShimmerPage label="Loading connections">
    <div className="mx-auto max-w-295">
      <div className="space-y-4">
        <Shimmer className="h-3 w-32" />
        <Shimmer className="h-16 w-3/5" />
        <Shimmer className="h-5 w-2/5" />
      </div>
      <Shimmer className="mt-8 h-12 w-full max-w-sm rounded-full" />
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ConnectionCardShimmer />
        <ConnectionCardShimmer />
        <ConnectionCardShimmer />
      </div>
    </div>
  </ShimmerPage>
);

export const RequestsShimmer = () => (
  <ShimmerPage label="Loading connection requests">
    <div className="mx-auto max-w-295">
      <div className="space-y-4">
        <Shimmer className="h-3 w-28" />
        <Shimmer className="h-16 w-3/5" />
        <Shimmer className="h-5 w-2/5" />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-[minmax(210px,.34fr)_minmax(0,1fr)]">
        <Shimmer className="h-72 rounded-2xl" />
        <div className="space-y-3 rounded-2xl border border-(--connections-line) bg-white p-5">
          <Shimmer className="h-8 w-2/5" />
          <Shimmer className="h-24 w-full" />
          <Shimmer className="h-24 w-full" />
          <Shimmer className="h-24 w-full" />
        </div>
      </div>
    </div>
  </ShimmerPage>
);

export const ProfileShimmer = () => (
  <ShimmerPage label="Loading profile">
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="space-y-4">
        <Shimmer className="h-3 w-40" />
        <Shimmer className="h-14 w-3/5" />
        <Shimmer className="h-5 w-2/5" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)]">
        <div className="space-y-6 rounded-4xl border border-(--connections-line) bg-white p-6 md:p-9">
          <Shimmer className="h-8 w-2/5" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Shimmer className="h-12 w-full" />
            <Shimmer className="h-12 w-full" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Shimmer className="h-12 w-full" />
            <Shimmer className="h-12 w-full" />
          </div>
          <Shimmer className="h-12 w-full" />
          <Shimmer className="h-32 w-full" />
          <Shimmer className="h-14 w-full" />
        </div>
        <Shimmer className="h-125 rounded-4xl" />
      </div>
    </div>
  </ShimmerPage>
);

export const ChatShimmer = () => (
  <ShimmerPage label="Loading conversation">
    <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[240px_minmax(0,.88fr)]">
      <Shimmer className="hidden h-72 rounded-3xl lg:block" />
      <div className="flex h-170 flex-col rounded-3xl border border-(--connections-line) bg-white p-5">
        <div className="flex items-center gap-3 border-b border-(--connections-line) pb-5">
          <Shimmer className="h-11 w-11 rounded-2xl" />
          <Shimmer className="h-8 w-1/3" />
        </div>
        <div className="flex-1 space-y-5 py-8">
          <Shimmer className="h-16 w-3/5" />
          <Shimmer className="ml-auto h-16 w-3/5" />
          <Shimmer className="h-20 w-2/5" />
        </div>
        <Shimmer className="h-14 w-full rounded-2xl" />
      </div>
    </div>
  </ShimmerPage>
);

export const MembershipShimmer = () => (
  <ShimmerPage label="Loading membership plans">
    <div className="mx-auto max-w-6xl space-y-8">
      <Shimmer className="h-64 w-full rounded-4xl" />
      <div className="grid gap-6 md:grid-cols-2">
        <Shimmer className="h-96 rounded-3xl" />
        <Shimmer className="h-96 rounded-3xl" />
      </div>
      <Shimmer className="h-64 w-full rounded-3xl" />
    </div>
  </ShimmerPage>
);

export const ResetPasswordShimmer = () => (
  <ShimmerPage label="Loading password reset">
    <div className="mx-auto grid max-w-5xl gap-0 overflow-hidden rounded-4xl border border-(--connections-line) bg-white shadow-sm lg:grid-cols-[.85fr_1.15fr]">
      <div className="hidden space-y-6 bg-(--connections-ink) p-10 lg:block">
        <Shimmer className="h-12 w-12 bg-white/20" />
        <Shimmer className="h-3 w-32 bg-white/20" />
        <Shimmer className="h-20 w-4/5 bg-white/20" />
        <Shimmer className="h-16 w-full bg-white/20" />
      </div>
      <div className="space-y-5 p-6 sm:p-10">
        <Shimmer className="h-3 w-32" />
        <Shimmer className="h-10 w-4/5" />
        <Shimmer className="h-5 w-full" />
        <Shimmer className="h-12 w-full" />
        <Shimmer className="h-12 w-full" />
        <Shimmer className="h-14 w-full" />
        <Shimmer className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  </ShimmerPage>
);
