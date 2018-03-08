Vue.filter('formatUnixTime', (unixTime) => {
  const time = new Date(parseInt(unixTime) * 1000);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hour = time.getHours();
  const minute = ('0' + time.getMinutes()).slice(-2);
  const second = ('0' + time.getSeconds()).slice(-2);
  return `${year}-${month}-${date}, ${hour}:${minute}:${second}`;
})

const app = new Vue({
  el: '#app',
  data:  {
    posts: [],
    beforeYears: {
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
      ],
      selected: '2012'
    },
    points: '30'
  },
  created () {
    fetch('http://localhost:3000/story')
      .then(response => response.json())
      .then(json => {
        this.posts = json;
      });
  },
  methods: {
    handleQueryPreference(e) {
      const vm = this;
      const qsObj = {
        year: vm.beforeYears.selected,
        points: vm.points
      }
      const qs = Object.keys(qsObj).reduce((acc, key) => {
        acc.push(`${key}=${qsObj[key]}`);
        return acc;
      }, []).join('&');
      fetch('http://localhost:3000/story?' + qs)
        .then(response => response.json())
        .then(json => {
          this.posts = json;
        });
    }
  }
})