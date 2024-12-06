import Pop from "@/utils/Pop.js";
import { api } from "./AxiosService.js";
import { logger } from "@/utils/Logger.js";
import { Post } from "@/models/Posts.js";
import { AppState } from "@/AppState.js";

class PostsService {
  async  likePostByProfileId(postId) {
        const response = await api.post(`api/posts/${postId}/like`)
        logger.log('liked post', response.data.likes)
    }

    async getPosts() {
            const response = await api.get('api/posts')
            logger.log('got posts', response.data)
            const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
            AppState.posts = posts
    }

    async getPostByProfileId(profileId) {
        AppState.posts = []
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log('get posts by creatorId', response.data)
        const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = posts
 
 }


}

export const postsService = new PostsService()