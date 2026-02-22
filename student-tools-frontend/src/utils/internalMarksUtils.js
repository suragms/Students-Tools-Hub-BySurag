/**
 * Internal marks calculation for university students.
 * Supports configurable weights for assignment, test, and attendance.
 */

export const UNIVERSITY_PRESETS = {
    default: {
        name: 'Default (Equal weight)',
        assignmentWeight: 33.33,
        testWeight: 33.33,
        attendanceWeight: 33.34,
    },
    assignmentHeavy: {
        name: 'Assignment heavy (40-30-30)',
        assignmentWeight: 40,
        testWeight: 30,
        attendanceWeight: 30,
    },
    testHeavy: {
        name: 'Test heavy (25-50-25)',
        assignmentWeight: 25,
        testWeight: 50,
        attendanceWeight: 25,
    },
};

export function calculateInternalMarks(
    assignmentTotal,
    assignmentMax,
    testTotal,
    testMax,
    attendanceMarks,
    attendanceMax,
    weights = UNIVERSITY_PRESETS.default
) {
    const aTotal = parseFloat(assignmentTotal) || 0;
    const aMax = parseFloat(assignmentMax) || 1;
    const tTotal = parseFloat(testTotal) || 0;
    const tMax = parseFloat(testMax) || 1;
    const attM = parseFloat(attendanceMarks) || 0;
    const attMax = parseFloat(attendanceMax) || 1;

    const assignmentPct = aMax > 0 ? (aTotal / aMax) * 100 : 0;
    const testPct = tMax > 0 ? (tTotal / tMax) * 100 : 0;
    const attendancePct = attMax > 0 ? (attM / attMax) * 100 : 0;

    const w = weights;
    const total =
        (assignmentPct * w.assignmentWeight) / 100 +
        (testPct * w.testWeight) / 100 +
        (attendancePct * w.attendanceWeight) / 100;

    return {
        assignmentPct: assignmentPct.toFixed(2),
        testPct: testPct.toFixed(2),
        attendancePct: attendancePct.toFixed(2),
        total: total.toFixed(2),
    };
}
