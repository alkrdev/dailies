export const sortByAreaString = (a: any, b: any) => {
    const nameA = a.Area.toUpperCase(); // ignore upper and lowercase
    const nameB = b.Area.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
};