const STORAGE_KEY = 'stu_analytics';
const SESSION_KEY = 'stu_session';

function getData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    return { pageViews: {}, totalPageViews: 0, totalSessions: 0 };
}

function saveData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
}

export function initSession() {
    try {
        if (!sessionStorage.getItem(SESSION_KEY)) {
            sessionStorage.setItem(SESSION_KEY, '1');
            const data = getData();
            data.totalSessions = (data.totalSessions || 0) + 1;
            saveData(data);
        }
    } catch {}
}

export function recordPageView(path) {
    try {
        initSession();
        const data = getData();
        data.pageViews = data.pageViews || {};
        data.pageViews[path] = (data.pageViews[path] || 0) + 1;
        data.totalPageViews = (data.totalPageViews || 0) + 1;
        saveData(data);
    } catch {}
}

export function getStats() {
    return getData();
}

export function resetStats() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ pageViews: {}, totalPageViews: 0, totalSessions: 0 }));
    } catch {}
}
