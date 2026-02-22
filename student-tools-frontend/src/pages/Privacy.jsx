import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function Privacy() {
    return (
        <div className="max-w-3xl mx-auto">
            <SeoHead
                title="Privacy Policy"
                description="Privacy policy for StudentTools Hub. We do not store or collect personal data."
            />
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                <p>StudentTools Hub is designed to respect your privacy. All tools run client-side in your browser.</p>
                <p>We do not collect, store, or transmit your personal data or files to our servers. PDF files and calculation inputs are processed locally.</p>
                <p>If we use analytics or advertising, please refer to third-party policies for those services.</p>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
}
