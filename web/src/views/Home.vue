<template>
  <div class="home">
    <PostFilter/>
    <Posts/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostFilter from '@/components/PostFilter.vue'
import Posts from '@/components/Posts.vue'
import { store } from '@/store'

export default {
  name: 'home',
  data () {
    return {
      sharedState: store.state
    }
  },
  components: {
    PostFilter,
    Posts
  }
}
</script>
