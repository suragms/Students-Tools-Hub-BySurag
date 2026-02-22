import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FileUploader from '../../components/pdf/FileUploader';
import ActionButtons from '../../components/pdf/ActionButtons';
import PageThumbnail from '../../components/pdf/PageThumbnail';
import { mergePdfs, formatFileSize } from '../../utils/pdfUtils';
import SeoHead from '../../components/SeoHead';
import FaqSection from '../../components/FaqSection';

const MERGE_FAQ = [
    { q: 'How does Merge PDF work?', a: 'Upload multiple PDFs, drag to reorder, then click Merge & Download. All processing happens in your browser—no upload to server.' },
    { q: 'How many PDFs can I merge?', a: 'You can merge up to 10 PDFs at once. For very large files, we recommend staying under 50MB total for best performance.' },
];

function SortableFileItem({ file, index, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: file.name + index });
    const style = { transform: CSS.Transform.toString(transform), transition };
    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white">
            <button type="button" className="cursor-grab touch-none p-1 text-slate-400 hover:text-slate-600" {...attributes} {...listeners} aria-label="Drag to reorder">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
            </button>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
            </div>
            <div className="shrink-0 w-20">
                <PageThumbnail file={file} pageNumber={1} />
            </div>
            <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
        </div>
    );
}

export default function MergePDF() {
    const [files, setFiles] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleDrop = useCallback((acceptedFiles) => {
        setError(null);
        setFiles((prev) => [...prev, ...acceptedFiles].slice(0, 10));
    }, []);

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setFiles((prev) => {
                const oldIndex = prev.findIndex((f, i) => f.name + i === active.id);
                const newIndex = prev.findIndex((f, i) => f.name + i === over.id);
                if (oldIndex === -1 || newIndex === -1) return prev;
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            setError('Add at least 2 PDFs to merge.');
            return;
        }
        setProcessing(true);
        setError(null);
        try {
            const blob = await mergePdfs(files);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'merged.pdf';
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError(err?.message || 'Merge failed. Try again.');
        } finally {
            setProcessing(false);
        }
    };

    const handleReset = () => {
        setFiles([]);
        setError(null);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <SeoHead title="Merge PDF Online for Students – Free & No Signup" description="Combine multiple PDFs into one. Free, browser-based. No upload to server. For BCA, BSc, BCom, MCA students." />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Merge PDF</h1>
            <p className="text-slate-600 mb-8">Upload PDFs, reorder them, and merge into a single file. All processing in your browser.</p>

            {files.length === 0 && <FileUploader onDrop={handleDrop} multiple maxFiles={10} />}

            {files.length > 0 && (
                <>
                    <FileUploader onDrop={handleDrop} multiple maxFiles={10 - files.length} disabled={files.length >= 10} />
                    <div className="mt-6 space-y-2">
                        <p className="text-sm font-medium text-slate-700">Drag to reorder (order = merge order)</p>
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={files.map((f, i) => f.name + i)} strategy={verticalListSortingStrategy}>
                                {files.map((file, i) => (
                                    <SortableFileItem key={file.name + i} file={file} index={i} onRemove={removeFile} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                    <div className="mt-6">
                        <ActionButtons onReset={handleReset} onDownload={handleMerge} downloadDisabled={processing || files.length < 2} downloadLabel={processing ? 'Merging...' : 'Merge & Download'} />
                    </div>
                </>
            )}

            <FaqSection faqs={MERGE_FAQ} />
            <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">More PDF tools</h2>
                <ul className="flex flex-wrap gap-3">
                    {['/tools/pdf/delete', '/tools/pdf/reorder', '/tools/pdf/extract', '/tools/pdf/rotate'].map((path) => (
                        <li key={path}>
                            <Link to={path} className="text-blue-600 hover:underline font-medium">{path.split('/').pop()}</Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
