export default function ActionButtons({ onReset, onDownload, downloadDisabled = true, downloadLabel = 'Download PDF' }) {
    return (
        <div className="flex flex-wrap gap-3">
            {onReset && (
                <button
                    type="button"
                    onClick={onReset}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                    Start over
                </button>
            )}
            <button
                type="button"
                onClick={onDownload}
                disabled={downloadDisabled}
                className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {downloadLabel}
            </button>
        </div>
    );
}
