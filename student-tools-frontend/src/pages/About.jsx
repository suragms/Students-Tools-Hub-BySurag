import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function About() {
    return (
        <div className="max-w-3xl mx-auto">
            <SeoHead
                title="About StudentTools Hub"
                description="Free smart tools for degree and PG students. No sign-up required. Built for BCA, BSc, BCom, BTech, MCA, MBA students."
            />
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
            <h1 className="text-3xl font-bold text-slate-900 mb-6">About StudentTools Hub</h1>
            <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 mb-4">
                    StudentTools Hub is a collection of free, browser-based tools designed for degree and postgraduate students.
                </p>
                <p className="text-slate-600 mb-4">
                    Our mission is to help students with academic calculations, PDF editing, study planning, and more—without requiring sign-up or login.
                </p>
                <p className="text-slate-600">
                    All tools run entirely in your browser. Your data never leaves your device.
                </p>
            </div>
        </div>
    );
}
