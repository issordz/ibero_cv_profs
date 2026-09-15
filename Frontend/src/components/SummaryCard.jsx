import { Edit2, Trash2, AlertTriangle } from 'lucide-react'

const MISSING_RE = /^(sin informaci[oó]n|s\/?i|n\/?a|na|-|—|null|undefined)$/i

const normalizeDisplay = (value) => {
  if (value == null) return { missing: true, text: 'Sin información' }
  const text = String(value).trim()
  if (!text || MISSING_RE.test(text)) {
    return { missing: true, text: 'Sin información' }
  }
  return { missing: false, text }
}

const SummaryCard = ({ title, subtitle, details, onEdit, onDelete, readOnly = false, hasWarning = false }) => {
  const titleDisp = normalizeDisplay(title)
  const subtitleDisp = subtitle ? normalizeDisplay(subtitle) : null
  const detailItems = (details || [])
    .filter((d) => d != null && String(d).trim() !== '')
    .map((d) => normalizeDisplay(d))

  const showWarning = hasWarning || titleDisp.missing || detailItems.some((d) => d.missing)

  return (
    <article
      className="surface-card overflow-hidden"
      style={showWarning ? { borderColor: '#f0d4a8' } : undefined}
    >
      <div className="p-4 sm:p-5 flex items-start gap-3">
        {showWarning && (
          <div
            className="mt-0.5 h-full w-1 shrink-0 self-stretch rounded-full min-h-[2.5rem]"
            style={{ backgroundColor: '#d97706' }}
            aria-hidden
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4
                className={`text-[0.95rem] font-semibold leading-snug ${
                  titleDisp.missing ? 'text-ink-soft italic font-medium' : 'text-ink'
                }`}
              >
                {titleDisp.text.length > 49 ? `${titleDisp.text.substring(0, 49)}…` : titleDisp.text}
              </h4>
              {subtitleDisp && (
                <p
                  className={`text-sm mt-1 ${
                    subtitleDisp.missing ? 'text-ink-soft italic' : 'text-ink-muted'
                  }`}
                >
                  {subtitleDisp.text}
                </p>
              )}
              {detailItems.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {detailItems.map((detail, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md ${
                        detail.missing
                          ? 'bg-amber-50 text-amber-800 border border-amber-200/80'
                          : 'bg-surface-warm text-ink-muted'
                      }`}
                    >
                      {detail.text}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {!readOnly && (onEdit || onDelete) && (
              <div className="flex items-center gap-1 shrink-0">
                {onEdit && (
                  <button
                    type="button"
                    onClick={onEdit}
                    className="p-2 text-ink-soft hover:text-primary hover:bg-[#f8e9ec] rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={onDelete}
                    className="p-2 text-ink-soft hover:text-primary hover:bg-[#f8e9ec] rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showWarning && (
        <div
          className="flex items-center gap-2 px-4 py-2.5 text-sm border-t"
          style={{ backgroundColor: '#fffbeb', color: '#854d0e', borderColor: '#f0d4a8' }}
        >
          <AlertTriangle size={14} className="flex-shrink-0" style={{ color: '#d97706' }} />
          <span>
            Hay campos sin identificar. Usa <strong>Editar</strong> para completarlos.
          </span>
        </div>
      )}
    </article>
  )
}

export default SummaryCard
