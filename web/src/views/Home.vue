<template>
  <div class="home">
    <div class="section">
      <div class="hero is-primary">
        <div class="hero-body">
          <h1 class="title">HN Offline</h1>
          <h2 class="subtitle">Hacker News you can read anywhere, anytime</h2>
        </div>
      </div>
    </div>
    <PostFilter/>
    <PostList/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostFilter from '@/components/PostFilter.vue'
import PostList from '@/components/PostList.vue'
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
    PostList
  }
}
</script>
<style>
.subtitle {
  text-align: left;
}

.hero, .hero-body, .section {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>

