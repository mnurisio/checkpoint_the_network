import Pop from "@/utils/Pop.js";
import { api } from "./AxiosService.js";
import { logger } from "@/utils/Logger.js";
import { Post } from "@/models/Posts.js";
import { AppState } from "@/AppState.js";

class PostsService {

 async searchPosts(searchQuery) {
    const response = await api.get(`api/posts?query=${searchQuery}`)
    logger.log('search posts', response.data)
    const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages

  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('delete post', response.data)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postIndex, 1)

  }

  async createPost(editablePostData) {
    const response = await api.post('api/posts', editablePostData)
    logger.log('created post', response.data)
    const post = new Post(response.data)
    AppState.posts.unshift(post)
  }


  async changeHomePage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('changing home page', response.data)
    const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }


  async likePostByProfileId(postId) {
    const response = await api.post(`api/posts/${postId}/like`)
    logger.log('liked post', response.data.likes)
    const post = new Post(response.data)
    AppState.posts.push(post)
  }

  async getPosts() {
    const response = await api.get('api/posts')
    logger.log('got posts', response.data)
    const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async getPostByProfileId(profileId) {
    AppState.posts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('get posts by creatorId', response.data)
    const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  clearPosts() {
    AppState.posts = []
    AppState.currentPage = 0
    AppState.totalPages = 0
  }


}

export const postsService = new PostsService()