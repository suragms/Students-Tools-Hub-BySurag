import { PDFDocument, degrees } from 'pdf-lib';

/**
 * Merge multiple PDF files into one. Returns a Blob.
 * @param {File[]} files - Array of PDF File objects
 * @returns {Promise<Blob>}
 */
export async function mergePdfs(files) {
    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(src, src.getPageIndices());
        pages.forEach((p) => mergedPdf.addPage(p));
    }
    const bytes = await mergedPdf.save();
    return new Blob([bytes], { type: 'application/pdf' });
}

/**
 * Delete specified pages from a PDF. Indices are 0-based.
 * @param {ArrayBuffer|Uint8Array} pdfBytes - Original PDF bytes
 * @param {number[]} pageIndicesToDelete - 0-based indices of pages to remove
 * @returns {Promise<Blob>}
 */
export async function deletePages(pdfBytes, pageIndicesToDelete) {
    const src = await PDFDocument.load(pdfBytes);
    const count = src.getPageCount();
    const toKeep = [...Array(count).keys()].filter((i) => !pageIndicesToDelete.includes(i));
    const dest = await PDFDocument.create();
    const pages = await dest.copyPages(src, toKeep);
    pages.forEach((p) => dest.addPage(p));
    const bytes = await dest.save();
    return new Blob([bytes], { type: 'application/pdf' });
}

/**
 * Reorder pages in a PDF. newOrder is array of 0-based page indices.
 * @param {ArrayBuffer|Uint8Array} pdfBytes
 * @param {number[]} newOrder - e.g. [2,0,1] to put page 3 first, then 1, then 2
 * @returns {Promise<Blob>}
 */
export async function reorderPages(pdfBytes, newOrder) {
    const src = await PDFDocument.load(pdfBytes);
    const dest = await PDFDocument.create();
    const pages = await dest.copyPages(src, newOrder);
    pages.forEach((p) => dest.addPage(p));
    const bytes = await dest.save();
    return new Blob([bytes], { type: 'application/pdf' });
}

/**
 * Extract selected pages into a new PDF.
 * @param {ArrayBuffer|Uint8Array} pdfBytes
 * @param {number[]} pageIndices - 0-based indices of pages to extract
 * @returns {Promise<Blob>}
 */
export async function extractPages(pdfBytes, pageIndices) {
    const src = await PDFDocument.load(pdfBytes);
    const dest = await PDFDocument.create();
    const pages = await dest.copyPages(src, pageIndices);
    pages.forEach((p) => dest.addPage(p));
    const bytes = await dest.save();
    return new Blob([bytes], { type: 'application/pdf' });
}

/**
 * Rotate specified pages. rotations: { pageIndex: degrees } e.g. { 0: 90, 2: 180 }
 * @param {ArrayBuffer|Uint8Array} pdfBytes
 * @param {Record<number, number>} rotations - 0-based page index to degrees (90, 180, 270)
 * @returns {Promise<Blob>}
 */
export async function rotatePages(pdfBytes, rotations) {
    const doc = await PDFDocument.load(pdfBytes);
    const pages = doc.getPages();
    Object.entries(rotations).forEach(([idxStr, deg]) => {
        const i = parseInt(idxStr, 10);
        if (i >= 0 && i < pages.length && (deg === 90 || deg === 180 || deg === 270)) {
            pages[i].setRotation(degrees(deg));
        }
    });
    const bytes = await doc.save();
    return new Blob([bytes], { type: 'application/pdf' });
}

/**
 * Get page count of a PDF.
 * @param {ArrayBuffer|Uint8Array} pdfBytes
 * @returns {Promise<number>}
 */
export async function getPageCount(pdfBytes) {
    const doc = await PDFDocument.load(pdfBytes);
    return doc.getPageCount();
}

/**
 * Format bytes for display.
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
