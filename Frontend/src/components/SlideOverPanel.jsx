import { X } from 'lucide-react'

const SlideOverPanel = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[#181112]/50 backdrop-blur-[3px] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-soft border-l border-[#efe4e6] animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="h-0.5 w-full" style={{ backgroundColor: '#C41E3A' }} />
        <header className="flex items-center justify-between px-6 py-4 border-b border-[#e6dbdd]">
          <h2 className="text-lg font-semibold text-ink tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-ink-soft hover:text-primary hover:bg-[#f8e9ec] rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-6 overflow-y-auto h-[calc(100dvh-77px)]">
          {children}
        </div>
      </aside>
    </>
  )
}

export default SlideOverPanel
