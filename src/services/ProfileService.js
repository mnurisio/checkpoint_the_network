import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"
import { Account } from "@/models/Account.js"


class ProfileService{
  

   async getProfileById(profileId) {
        AppState.activeProfile = null
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log('got profiles', response.data)
        const profile = new Account(response.data)
        AppState.activeProfile = profile
    }

}

export const profileService = new ProfileService()