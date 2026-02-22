import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto">
            <SeoHead
                title="Contact"
                description="Contact StudentTools Hub for feedback or support."
            />
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Contact</h1>
            <p className="text-slate-600 mb-4">
                For feedback, suggestions, or support, please reach out via your preferred channel.
            </p>
            <p className="text-slate-500 text-sm">
                Built by Surag M S | Hexstack Ai Solutions
            </p>
        </div>
    );
}
