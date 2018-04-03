const swStarter = require('./sw-starter');
const sendMessage = require('./messenger');

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

const DEFAULT_YEAR = '2012';
const DEFAULT_POINT_THRESHOLD = '130';
const QUERY_PARAM_YEAR = 'year';
const QUERY_PARAM_POINT = 'pointThreshold';

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
      selected: DEFAULT_YEAR
    },
    pointThresholds: {
      options: [
        '30',
        '50',
        '80',
        '130',
        '210',
        '340',
        '550',
        '890',
      ],
      selected: DEFAULT_POINT_THRESHOLD
    },
  },
  created () {
    swStarter();
    fetch(`http://localhost:3000/story?${QUERY_PARAM_YEAR}=${DEFAULT_YEAR}&${QUERY_PARAM_POINT}=${DEFAULT_POINT_THRESHOLD}`)
      .then(response => response.json())
      .then(json => {
        this.posts = json;
        window.posts = this.posts;
        setTimeout(function() {
          sendMessage(JSON.stringify(window.posts));
        }, 2000);
      });
  },
  mounted () {
    console.log('mounted document.readyState', document.readyState);
  },
  methods: {
    handleQueryPreference(e) {
      const vm = this;
      const qsObj = {
        year: vm.beforeYears.selected,
        pointThreshold: vm.pointThresholds.selected
      }
      const qs = Object.keys(qsObj).reduce((acc, key) => {
        acc.push(`${key}=${qsObj[key]}`);
        return acc;
      }, []).join('&');
      fetch('http://localhost:3000/story?' + qs)
        .then(response => response.json())
        .then(json => {
          this.posts = json;
          window.posts = this.posts;
        });
    }
  }
})