<template>
  <div class="section">
      <ul class="">
          <li v-for="post in posts" v-bind:key="post.id" class="hero">
            <div class="hero-body">
                <h4 class="title is-4">
                  <a v-bind:href="'./post/' + post.id">{{ post.title }}</a>
                </h4>
                <div class="tags has-addons">
                    <span class="tag is-primary">points: {{ post.score }}</span>
                    <span class="tag">comments: {{ post.descendants }}</span>
                    <span class="tag">{{ post.time | formatUnixTime }}</span>
                    <span class="tag">posted by {{ post.author }} </span>
                </div>
            </div>
          </li>
        </ul>
  </div>
</template>

<script>
import { store } from '../store'
export default {
  name: 'posts',
  data () {
    return {
      sharedState: store.state
    }
  },
  computed: {
    posts () {
      return this.sharedState.posts;
    }
  },
  filters: {
    formatUnixTime: function(unixTime) {
      const time = new Date(parseInt(unixTime) * 1000);
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const hour = time.getHours();
      const minute = ('0' + time.getMinutes()).slice(-2);
      const second = ('0' + time.getSeconds()).slice(-2);
      return `${year}-${month}-${date}, ${hour}:${minute}:${second}`;
    }
  }
}
</script>

<style>
.title {
  text-align: left;
}
</style>
