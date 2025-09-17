export const formatNumber = (number) => {
    const suffixes = {
        B: 1_000_000_000,
        M: 1_000_000,
        K: 1_000
    };

    let result = number;

    Object.entries(suffixes).forEach(([suffix, threshold]) => {
        if (number >= threshold) {
            result = (number / threshold).toFixed(1) + suffix;
        }
    });

    return result;
}