export const formatPrice = (price) => {
    return price ? price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : '';
};
