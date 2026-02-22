import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUploader({ onDrop, multiple = false, maxFiles = 10, disabled = false }) {
    const onDropCallback = useCallback(
        (acceptedFiles) => {
            onDrop?.(acceptedFiles);
        },
        [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop: onDropCallback,
        accept: { 'application/pdf': ['.pdf'] },
        multiple,
        maxFiles,
        disabled,
    });

    return (
        <div className="space-y-2">
            <div
                {...getRootProps()}
                className={`
                    rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors
                    ${disabled ? 'cursor-not-allowed opacity-50 bg-slate-50' : ''}
                    ${isDragActive ? 'border-slate-900 bg-slate-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/50'}
                `}
            >
                <input {...getInputProps()} />
                <p className="text-slate-600 font-medium">
                    {isDragActive ? 'Drop PDFs here' : 'Drop PDFs here or click to select'}
                </p>
                <p className="text-slate-400 text-sm mt-1">
                    {multiple ? `Up to ${maxFiles} PDF files` : 'Single PDF file'}
                </p>
            </div>
            {fileRejections?.length > 0 && (
                <p className="text-red-600 text-sm">
                    {fileRejections[0].errors[0]?.message || 'Invalid file. Please upload PDF only.'}
                </p>
            )}
        </div>
    );
}
