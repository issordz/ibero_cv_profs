const SectionSkeleton = () => (
  <div className="space-y-4" aria-busy="true" aria-label="Cargando sección">
    <div className="flex items-center justify-between gap-4">
      <div className="h-4 w-48 rounded-lg bg-[#efe4e6] animate-pulse" />
      <div className="h-9 w-36 rounded-full bg-[#efe4e6] animate-pulse" />
    </div>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="surface-card p-5 space-y-3"
        style={{ animationDelay: `${i * 80}ms` }}
      >
        <div className="h-5 w-2/3 max-w-xs rounded-md bg-[#efe4e6] animate-pulse" />
        <div className="h-3.5 w-1/2 max-w-[14rem] rounded-md bg-[#f3ecee] animate-pulse" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-20 rounded-lg bg-[#f3ecee] animate-pulse" />
          <div className="h-6 w-24 rounded-lg bg-[#f3ecee] animate-pulse" />
          <div className="h-6 w-16 rounded-lg bg-[#f3ecee] animate-pulse" />
        </div>
      </div>
    ))}
  </div>
)

export default SectionSkeleton
