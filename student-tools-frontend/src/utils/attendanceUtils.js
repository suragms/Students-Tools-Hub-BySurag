export const calculateAttendancePercentage = (total, attended) => {
    if (!total || total == 0) return 0;
    return ((attended / total) * 100).toFixed(2);
};

export const calculateBunkOrAttend = (total, attended, targetParams = 75) => {
    const t = parseInt(total) || 0;
    const a = parseInt(attended) || 0;
    const target = parseFloat(targetParams) || 75;
    const currentPct = (a / t) * 100;

    if (currentPct >= target) {
        // Safe: How many can bunk?
        // (a) / (t + x) >= target/100
        // a >= (target * t + target * x) / 100
        // 100a >= target * t + target * x
        // 100a - target * t >= target * x
        // x <= (100a - target * t) / target

        // Simpler: Keep bunking until (a / (t + x)) < target/100
        let bunkable = 0;
        while ((a / (t + bunkable + 1)) * 100 >= target) {
            bunkable++;
        }
        return { status: 'SAFE', count: bunkable, message: `You can bunk ${bunkable} more classes safely!` };
    } else {
        // Danger: How many to attend?
        // (a + x) / (t + x) >= target/100
        // 100(a + x) >= target(t + x)
        // 100a + 100x >= target*t + target*x
        // 100x - target*x >= target*t - 100a
        // x(100 - target) >= target*t - 100a
        // x >= (target*t - 100a) / (100 - target)

        let needed = Math.ceil((target * t - 100 * a) / (100 - target));
        if (needed < 0) needed = 0; // Should not happen if strictly < target, but safety check
        return { status: 'DANGER', count: needed, message: `You need to attend ${needed} more classes to reach ${target}%.` };
    }
};

export const calculateInternals = (tests, assignments, seminars, attendanceMarks) => {
    // Tests: Average of all entered tests
    const validTests = tests.filter(t => t.max > 0);
    let testScore = 0;
    if (validTests.length > 0) {
        const totalPercentage = validTests.reduce((sum, t) => sum + (t.obtained / t.max), 0);
        // Assuming we want the average scaled to some weight? 
        // For now, let's just take the average percentage * 100? Or just simple average of marks?
        // User didn't specify weight. Let's assume standard Internal Assessment often has a fixed weight for tests.
        // Let's calculate the "Average Percentage" in tests.
        testScore = (totalPercentage / validTests.length) * 100;
        // Wait, usually it's "Average of Marks". Let's assume tests are out of similar max marks or we normalize them.
        // Let's return the sum of weighted averages if needed, but for simplicity:
        // Let's assume the user wants the raw sum of these components for the "Total Internals".
        // Actually, usually Internals = (Test Avg) + Assignments + Seminars + Attendance.
        // Let's assume Tests are scaled to a max of say 20 or 25. 
        // Let's just return the RAW sum for now and let the user input the "Max" for each component visually if needed.
        // Actually, improved logic: Return { testAvg, assignmentTotal, seminarTotal, total }

        // Let's stick to the prompt: "Internal Tests: Inputs for Test 1, Test 2... Auto-calculate average."
        // We will calculate the average of the *percentages* obtained in tests, then maybe scale it?
        // No, simpler: Just Average of (Obtained). Assuming they are out of the same Max. 
        // If not, Average % is safer.
    }

    // Let's try: Average of (Obtained Marks).
    const totalTestMarks = validTests.reduce((sum, t) => sum + parseFloat(t.obtained || 0), 0);
    const avgTestMarks = validTests.length ? (totalTestMarks / validTests.length).toFixed(2) : 0;

    const totalAssignments = assignments.reduce((sum, a) => sum + parseFloat(a.obtained || 0), 0);
    const totalSeminars = seminars.reduce((sum, s) => sum + parseFloat(s.obtained || 0), 0);
    const attMarks = parseFloat(attendanceMarks || 0);

    return {
        testAvg: avgTestMarks,
        assignments: totalAssignments,
        seminars: totalSeminars,
        attendance: attMarks,
        total: (parseFloat(avgTestMarks) + totalAssignments + totalSeminars + attMarks).toFixed(2)
    };
};
