<template>
  <post :id="postId"></post>
</template>

<script>
import Post from '@/components/Post.vue'
export default {
  name: 'single-post-view',
  props: ['postId'],
  components: {
    Post
  }
}
</script>

<style>

</style>
