const randomSubArray = (arr, size) => {
    const newArr = [...arr];
    newArr.sort(() => 0, 5 - Math.random());

    return newArr.slice(0, size);
};

const randomSuggestProducts = (products) => {
    const keyboards = products.filter((product) => product.category === 'BÀN PHÍM CƠ');
    const keycaps = products.filter((product) => product.category === 'KEYCAP');
    const kits = products.filter((product) => product.category === 'KIT');

    const NUMBER_OF_SUGGESSTIONS = 4;

    return {
        products: randomSubArray(products, NUMBER_OF_SUGGESSTIONS),
        keyboards: randomSubArray(keyboards, NUMBER_OF_SUGGESSTIONS),
        keycaps: randomSubArray(keycaps, NUMBER_OF_SUGGESSTIONS),
        kits: randomSubArray(kits, NUMBER_OF_SUGGESSTIONS),
    };
};

export default randomSuggestProducts;
