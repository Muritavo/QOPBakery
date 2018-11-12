const MOCKED_PRODUCTS = [
    {
        id: 0,
        name: "Produto 1",
        ingredients: ["Ingrediente 1", "Ingrediente 2"],
        value: 10,
        weekDays: [0, 1, 2, 3, 4, 5, 6]
    },
    {
        id: 1,
        name: "Produto 2",
        ingredients: ["Ingrediente 1", "Ingrediente 2"],
        value: 8,
        weekDays: [0, 1]
    }
]

let MOCKED_DAY_OFFER = {
    id: 0,
    name: "Produto 1",
    ingredients: ["Ingrediente 1", "Ingrediente 2"],
    value: 11,
    discountPercent: 15
}

async function getProducts(weekDay) {
    return !!weekDay ? MOCKED_PRODUCTS.filter(p => p.weekDays.indexOf(weekDay) != -1) : MOCKED_PRODUCTS;
}

async function addProduct(name, image, ingredients, value) {
    const biggestId = MOCKED_PRODUCTS.reduce((a, p) => p.id > a ? p.id : a, 0);
    MOCKED_PRODUCTS.push({
        id: biggestId + 1,
        name,
        ingredients,
        value
    })
    return MOCKED_PRODUCTS;
}

async function getTodayOffer() {
    return MOCKED_DAY_OFFER;
}

async function setTodayOffer(productId, commonValue, discountValue) {
    return MOCKED_DAY_OFFER = { ...MOCKED_PRODUCTS.find(p => p.id == productId), value: commonValue, discountPercent: discountValue };
}

async function addToWeek(productId, weekDay) {
    const product = MOCKED_PRODUCTS.find(p => p.id == productId);
    if (!product.weekDays)
        product.weekDays = [];
    if (product.weekDays.indexOf(weekDay) == -1) {
        product.weekDays.push(weekDay);
    }
    return;
}

async function removeFromWeek(productId, weekDay) {
    const product = MOCKED_PRODUCTS.find(p => p.id == productId);

    const indexOfWeekDay = product.weekDays.indexOf(weekDay);
    if (indexOfWeekDay != -1) {
        product.weekDays.splice(weekDay, 1);
    }
    return;
}

export { MOCKED_DAY_OFFER, MOCKED_PRODUCTS };
const mock = jest.fn().mockImplementation(() => {
    return { getProducts: getProducts, addToWeek: addToWeek, removeFromWeek: removeFromWeek, setTodayOffer: setTodayOffer, getTodayOffer: getTodayOffer, addProduct: addProduct };
});

export default mock;