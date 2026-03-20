const HEXA_CV_URL = 'https://www.hexacv.online/';
const HEXASTACK_URL = 'https://hexastacksolutions.com/';

function HexaCVAd() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-4">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider">Sponsored</span>
            <a
                href={HEXA_CV_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
            >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume Builder (Hexa CV)
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
            <p className="text-xs text-slate-500">Create professional resumes for free</p>
        </div>
    );
}

function HexaStackAd() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-4">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider">Sponsored</span>
            <a
                href={HEXASTACK_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
            >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 11-4 0 2 2 0 014 0ZM7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
                </svg>
                Custom Software & POS (HexaStack)
            </a>
            <p className="text-xs text-slate-500">
                Web apps, POS & billing systems, plus AI automation for Kerala businesses and Gulf clients.
            </p>
        </div>
    );
}

export default function AdBanner({ position = 'top' }) {
    const sizes = {
        top: 'min-h-[90px]',
        'in-content': 'min-h-[90px]',
        bottom: 'min-h-[120px]',
        sidebar: 'min-h-[250px]',
    };
    const containerClass = `${sizes[position] || sizes.top} w-full bg-slate-50 border border-slate-200 flex items-center justify-center rounded-xl`;

    const SponsoredStack = (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full border-b border-slate-200">
                <HexaCVAd />
            </div>
            <div className="w-full">
                <HexaStackAd />
            </div>
        </div>
    );

    if (position === 'bottom') {
        return (
            <div id="ad-footer" className={containerClass} data-ad-slot="footer">
                {SponsoredStack}
            </div>
        );
    }

    return (
        <div id={`ad-${position}`} className={containerClass} data-ad-slot={position}>
            {position === 'in-content' ? (
                <span className="text-slate-400 text-xs">Ad placeholder</span>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">Ad</span>
                    {SponsoredStack}
                </div>
            )}
        </div>
    );
}
