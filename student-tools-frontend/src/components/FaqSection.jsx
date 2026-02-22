import { useState } from 'react';

/**
 * Accordion FAQ section for tool pages. Optional: pass schema for JSON-LD.
 */
export default function FaqSection({ faqs = [], schema }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">FAQ</h2>
            <ul className="space-y-2">
                {faqs.map((item, i) => (
                    <li key={i} className="rounded-lg border border-slate-200 bg-slate-50/50 overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full text-left px-4 py-3 font-medium text-slate-900 hover:bg-slate-100 transition-colors flex justify-between items-center"
                        >
                            {item.q}
                            <span className="text-slate-500 shrink-0 ml-2">{openIndex === i ? '−' : '+'}</span>
                        </button>
                        {openIndex === i && (
                            <div className="px-4 pb-3 text-slate-600 text-sm">
                                {item.a}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {schema && (
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            )}
        </section>
    );
}
