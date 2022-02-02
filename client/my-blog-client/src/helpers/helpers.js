
export const createDate = (val) => {
    const d = new Date(val);
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    return {
        date, 
        month,
        year
    }
}