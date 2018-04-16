<template>
  <div class="section">
    <div class="hero">
      <div class="hero-body">
        <h1 class="title">{{ post.title }}</h1>
        <div class="post-content">
          {{ post.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/'
export default {
  name: 'post',
  props: ['id'],
  computed:{
    post () {
      const vm = this;
      return this.shareState.posts.find(p => Number(p.id) === Number(vm.id));
    }
  },
  data () {
    return {
      shareState: store.state
    }
  }
}
</script>

<style>
  .post-content {
    text-align: left;
  }
</style>
