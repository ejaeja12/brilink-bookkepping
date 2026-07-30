export function adminFeeRules(nom: number) {
    if (nom === 0) {
        return 0;
    } else if (nom <= 1000000) {
        return 3000;
    } else if (nom < 2500000) {
        return 5000;
    } else if (nom < 4500000) {
        return 10000;
    } else if (nom < 7000000) {
        return 15000;
    } else {
        return nom * 0.003;
    }
}
