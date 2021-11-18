exports.arrayifyNbr = (nbr) => {
    if (nbr) {
        return Array.from({ length: nbr }, (_, x) => x);
    } else {
        return [];
    }
}
