import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import Pop from "@/utils/Pop.js";
import { Ad } from "@/models/Ads.js";
import { AppState } from "@/AppState.js";


class AdsService {

    async getAds() {
        try {
            const response = await api.get('api/ads')
            logger.log('got ads', response.data)
            const ads = response.data.map(adPOJO => new Ad(adPOJO))
            AppState.ads = ads
        }
        catch (error) {
            Pop.meow(error);
        }
    }
}

export const adsService = new AdsService()