import Pop from "@/utils/Pop.js";
import { api } from "./AxiosService.js";
import { logger } from "@/utils/Logger.js";
import { Post } from "@/models/Posts.js";
import { AppState } from "@/AppState.js";

class PostsService {

    async getPosts() {
        try {
            const response = await api.get('api/posts')
            logger.log('got posts', response.data)
            const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
            AppState.posts = posts
        }
        catch (error) {
            Pop.meow(error);
        }
    }

}

export const postsService = new PostsService()