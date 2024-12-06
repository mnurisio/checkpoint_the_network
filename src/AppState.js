import { reactive } from 'vue'
import { Ad } from './models/Ads.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  
  /** @type {import('./models/Posts.js').Post[]} user info from the database*/
  posts: [],

  /** @type {import('./models/Ads.js').Ad[]} user info from the database*/
  ads: []
})

