import Axios, { CancelToken } from "axios";

const defineTimeout = (seconds) => {
    let source = CancelToken.source();
    setTimeout(() => {
        console.warn("canceling token");

        source.cancel();
    }, seconds * 1000);
    return source
};

const ENDPOINTS = {
    LIST_PRODUCTS: "products/",
    ADD_PRODUCTS: "products",
    GET_TODAY_OFFER: "todayOffer",
    SET_TODAY_OFFER: "todayOffer",
    ADD_TO_WEEK: "weekly",
    REMOVE_FROM_WEEK: "weekly"
}

const PARAMS = {
    WEEK_DAY: "weekDay"
}

export default class ProductService {
    async getProducts(weekDay) {
        return (await Axios.get(ENDPOINTS.LIST_PRODUCTS + (weekDay || ""), { cancelToken: defineTimeout(5).token })).data;
    }

    async addProduct(name, image, ingredients, value) {
        return (await Axios.post(ENDPOINTS.ADD_PRODUCTS, {
            name, image, ingredients, value
        }, { cancelToken: defineTimeout(5).token })).data
    }

    async getTodayOffer() {
        return (await Axios.get(ENDPOINTS.GET_TODAY_OFFER, null, { cancelToken: defineTimeout(5).token })).data
    }

    async setTodayOffer(productId, commonValue, discountValue) {
        return (await Axios.post(ENDPOINTS.SET_TODAY_OFFER, {
            productId,
            commonValue,
            discountValue
        }, { cancelToken: defineTimeout(5).token })).data
    }

    async addToWeek(productId, weekDay) {
        return (await Axios.post(ENDPOINTS.ADD_TO_WEEK, {
            productId, weekDay
        }, { cancelToken: defineTimeout(5).token })).data
    }

    async removeFromWeek(productId, weekDay) {
        return (await Axios.post(ENDPOINTS.REMOVE_FROM_WEEK, {
            productId,
            weekDay
        }, { cancelToken: defineTimeout(5).token })).data
    }
}