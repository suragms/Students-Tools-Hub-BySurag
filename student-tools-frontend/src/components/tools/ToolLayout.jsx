import { Link } from 'react-router-dom';
import SeoHead from '../SeoHead';
import FaqSection from '../FaqSection';
import Breadcrumbs from '../ui/Breadcrumbs';
import AdBanner from '../layout/AdBanner';

export default function ToolLayout({
    title,
    description,
    breadcrumbs = [],
    intro,
    steps = [],
    children,
    faq = [],
    relatedTools = [],
}) {
    return (
        <div className="max-w-4xl mx-auto">
            <SeoHead title={title} description={description} />
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
            {intro && <p className="text-slate-600 mb-6">{intro}</p>}
            {steps?.length > 0 && (
                <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900 mb-3">How to use</h2>
                    <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
                        {steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>
            )}
            <div className="mb-8">{children}</div>
            <AdBanner position="in-content" />
            {faq?.length > 0 && (
                <section className="mt-12">
                    <FaqSection faqs={faq} />
                </section>
            )}
            {relatedTools?.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Related tools</h2>
                    <ul className="flex flex-wrap gap-3">
                        {relatedTools.map(({ to, label }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
