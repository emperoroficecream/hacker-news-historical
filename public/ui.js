const app = new Vue({
  el: '#app',
  data:  {
    posts: [],
    beforeYears: {
      default: '2012',
      options: [
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018'
      ]
    }
  },
  created () {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(json => {
        this.posts = json;
      })
  }
})