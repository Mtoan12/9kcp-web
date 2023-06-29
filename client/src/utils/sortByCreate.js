export const sortByCreateAt = (products) => {
    return [...products].sort((a, b) => b.createAt - a.createAt);
};
