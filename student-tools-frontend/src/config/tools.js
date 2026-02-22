export const TOOL_LINKS = [
    { to: '/tools/cgpa', label: 'CGPA Calculator' },
    { to: '/tools/attendance', label: 'Attendance Calculator' },
    { to: '/tools/internal-marks', label: 'Internal Marks Calculator' },
    { to: '/tools/planner', label: 'Study Planner' },
    { to: '/tools/exam-countdown', label: 'Exam Countdown' },
    { to: '/tools/notes', label: 'Notes Maker' },
    { to: '/tools/pdf', label: 'PDF Tools' },
];

export const CATEGORIES = {
    academic: 'Academic Calculators',
    pdf: 'PDF Tools',
    productivity: 'Productivity Tools',
    upcoming: 'Upcoming Tools',
};

export const TOOLS = [
    {
        title: 'CGPA Calculator',
        description: 'Calculate and track your grade point average across semesters. Credit-based, percentage conversion.',
        path: '/tools/cgpa',
        icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
        category: CATEGORIES.academic,
        badge: 'popular',
    },
    {
        title: 'Attendance Calculator',
        description: 'Know exactly how many classes you can afford to miss. Reach 75% or your target.',
        path: '/tools/attendance',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        category: CATEGORIES.academic,
    },
    {
        title: 'Internal Marks Calculator',
        description: 'Assignment, test, and attendance weighted. University format presets.',
        path: '/tools/internal-marks',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        category: CATEGORIES.academic,
    },
    {
        title: 'Study Planner',
        description: 'Enter subjects and exam date. Get a daily study schedule.',
        path: '/tools/planner',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
        category: CATEGORIES.productivity,
    },
    {
        title: 'Exam Countdown',
        description: 'Set your exam date. Live countdown in days, hours, minutes, seconds.',
        path: '/tools/exam-countdown',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        category: CATEGORIES.productivity,
        badge: 'new',
    },
    {
        title: 'Notes Maker',
        description: 'Structure and organize your study notes in one place.',
        path: '/tools/notes',
        icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        category: CATEGORIES.upcoming,
        comingSoon: true,
        badge: 'comingSoon',
    },
    {
        title: 'PDF Tools',
        description: 'Merge, delete, reorder, extract, and rotate PDF pages. All in your browser.',
        path: '/tools/pdf',
        icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
        category: CATEGORIES.pdf,
    },
];

export const PDF_TOOLS = [
    { title: 'Merge PDF', description: 'Combine multiple PDFs into one file.', path: '/tools/pdf/merge', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { title: 'Delete Pages', description: 'Remove unwanted pages from your PDF.', path: '/tools/pdf/delete', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
    { title: 'Reorder Pages', description: 'Drag and drop to reorder PDF pages.', path: '/tools/pdf/reorder', icon: 'M4 8h16M4 16h16' },
    { title: 'Extract Pages', description: 'Extract specific pages into a new PDF.', path: '/tools/pdf/extract', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
    { title: 'Rotate Pages', description: 'Rotate pages 90°, 180°, or 270°.', path: '/tools/pdf/rotate', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
];
