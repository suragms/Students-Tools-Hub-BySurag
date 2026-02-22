import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export default function PageThumbnail({ file, pageNumber, selected, onSelect, selectable = false, rotation = 0 }) {
    const [error, setError] = useState(false);
    const fileUrl = file instanceof File ? URL.createObjectURL(file) : file;

    return (
        <div className="relative inline-block">
            {selectable && (
                <label className="absolute top-2 left-2 z-10 flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={!!selected}
                        onChange={(e) => onSelect?.(e.target.checked)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
                    />
                    <span className="text-xs font-medium text-slate-700 bg-white/90 px-1 rounded">Page {pageNumber}</span>
                </label>
            )}
            <div className={`border rounded-lg overflow-hidden bg-white shadow-sm ${selected ? 'ring-2 ring-slate-900' : ''}`} style={{ width: 120 }}>
                {error ? (
                    <div className="min-h-[160px] flex items-center justify-center text-slate-400 text-xs p-2">
                        Preview unavailable
                    </div>
                ) : (
                    <Document
                        file={fileUrl}
                        onLoadError={() => setError(true)}
                        loading={
                            <div className="min-h-[160px] flex items-center justify-center text-slate-400 text-xs">
                                Loading...
                            </div>
                        }
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={120}
                            rotate={rotation}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                )}
            </div>
            {!selectable && (
                <p className="text-xs text-slate-500 text-center mt-1">Page {pageNumber}</p>
            )}
        </div>
    );
}
