export const GRADING_SCALE = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "P": 4,
    "F": 0,
    "Ab": 0
};

/** 4-point scale (some universities) */
export const GRADING_SCALE_4 = {
    "A": 4,
    "B": 3,
    "C": 2,
    "D": 1,
    "F": 0,
};

export const SCALE_PRESETS = {
    "10point": { name: "10-point (O, A+, A, B+...)", scale: GRADING_SCALE, percentFactor: 9.5 },
    "4point": { name: "4-point (A, B, C, D, F)", scale: GRADING_SCALE_4, percentFactor: 25 },
};

export const getGradePoint = (grade, scale = GRADING_SCALE) => {
    return scale[grade] ?? 0;
};

export const calculateSGPA = (subjects, scale = GRADING_SCALE) => {
    if (!subjects || subjects.length === 0) return 0;

    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach(subject => {
        const credits = parseFloat(subject.credits) || 0;
        const gradePoint = getGradePoint(subject.grade, scale);

        totalCredits += credits;
        totalPoints += (credits * gradePoint);
    });

    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
};

export const calculateCumulativeCGPA = (currentSGPA, currentCredits, prevCGPA, prevCredits) => {
    const sgpa = parseFloat(currentSGPA) || 0;
    const currCreds = parseFloat(currentCredits) || 0;
    const pCGPA = parseFloat(prevCGPA) || 0;
    const pCreds = parseFloat(prevCredits) || 0;

    const totalCredits = currCreds + pCreds;
    if (totalCredits === 0) return 0;

    const weightedSum = (sgpa * currCreds) + (pCGPA * pCreds);
    return (weightedSum / totalCredits).toFixed(2);
};

export const percentageFromCGPA = (cgpa, percentFactor = 9.5) => {
    return (parseFloat(cgpa) * percentFactor).toFixed(2);
};
