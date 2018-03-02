const app = new Vue({
  el: '#app',
  data:  {
    posts: []
  },
  created () {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(json => {
        this.posts = json;
      })
  }
})