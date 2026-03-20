const HEXA_CV_URL = 'https://www.hexacv.online/';
const HEXASTACK_URL = 'https://hexastacksolutions.com/';
const HEXA_CV_IMAGE = '/hexacv-logo.svg';
const HEXASTACK_IMAGE = 'https://www.hexastacksolutions.com/logo-full-white.png';

function HexaCVAd() {
    return (
        <div className="flex flex-col justify-center gap-2 py-4 px-3">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider">Sponsored</span>
            <a
                href={HEXA_CV_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group w-full rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
            >
                <div className="flex items-center gap-3">
                    <img
                        src={HEXA_CV_IMAGE}
                        alt="HexaCV - Free ATS Resume Builder"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 object-contain"
                    />
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-2">
                            <span className="text-slate-900">HexaCV</span>
                            <span className="text-slate-400 text-xs font-semibold">ATS Resume Builder</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            Free ATS resume builder. No login. Match job keywords and download your ATS-optimized PDF.
                        </p>
                    </div>
                    <span className="text-blue-600 group-hover:text-blue-700 text-sm font-semibold">→</span>
                </div>
            </a>
        </div>
    );
}

function HexaStackAd() {
    return (
        <div className="flex flex-col justify-center gap-2 py-4 px-3">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider">Sponsored</span>
            <a
                href={HEXASTACK_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group w-full rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 text-sm font-medium text-white shadow-sm hover:border-slate-700 hover:shadow-md transition-all"
            >
                <div className="flex items-center gap-3">
                    <img
                        src={HEXASTACK_IMAGE}
                        alt="HexaStack Solutions - Custom Software & POS"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 object-contain bg-white/5 rounded"
                    />
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-2">
                            <span className="text-white">HexaStack</span>
                            <span className="text-slate-400 text-xs font-semibold">Custom Software & POS</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                            Custom software, websites, POS & billing systems, plus AI automation for Kerala & UAE businesses.
                        </p>
                    </div>
                    <span className="text-blue-300 group-hover:text-blue-200 text-sm font-semibold">→</span>
                </div>
            </a>
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
                <div className="w-full">{SponsoredStack}</div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">Ad</span>
                    {SponsoredStack}
                </div>
            )}
        </div>
    );
}
