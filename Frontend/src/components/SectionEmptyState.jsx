const SectionEmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => (
  <div className="surface-card px-6 py-10 sm:px-8 text-center">
    {Icon && (
      <div
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: 'rgba(196, 30, 58, 0.08)', color: '#C41E3A' }}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>
    )}
    <h3 className="text-base font-semibold text-ink">{title}</h3>
    {description && (
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted leading-relaxed">
        {description}
      </p>
    )}
    {actionLabel && onAction && (
      <button type="button" onClick={onAction} className="btn-primary mt-6 px-5 py-2.5 text-sm">
        {actionLabel}
      </button>
    )}
  </div>
)

export default SectionEmptyState
