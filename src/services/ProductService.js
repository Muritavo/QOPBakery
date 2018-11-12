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
    LIST_PRODUCTS: "products",
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
        console.log("Ta chamando aqui");

        return await Axios.get(ENDPOINTS.LIST_PRODUCTS, {
            [PARAMS.WEEK_DAY]: weekDay
        }, { cancelToken: defineTimeout(5).token })
    }

    async addProduct(name, image, ingredients, value) {
        return await Axios.post(ENDPOINTS.ADD_PRODUCTS, {
            name, image, ingredients, value
        }, { cancelToken: defineTimeout(5).token })
    }

    async getTodayOffer() {
        return await Axios.get(ENDPOINTS.TODAY_OFFER, null, { cancelToken: defineTimeout(5).token })
    }

    async setTodayOffer(productId, commonValue, discountValue) {
        return await Axios.post(ENDPOINTS.SET_TODAY_OFFER, {
            productId,
            commonValue,
            discountValue
        }, { cancelToken: defineTimeout(5).token })
    }

    async addToWeek(productId, weekDay) {
        return await Axios.post(ENDPOINTS.ADD_TO_WEEK, {
            productId, weekDay
        }, { cancelToken: defineTimeout(5).token })
    }

    async removeFromWeek(productId, weekDay) {
        return await Axios.post(ENDPOINTS.REMOVE_FROM_WEEK, {
            productId, 
            weekDay
        }, { cancelToken: defineTimeout(5).token })
    }
}