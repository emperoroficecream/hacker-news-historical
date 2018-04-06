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

const QUERY_PARAM_YEAR = 'year';
const QUERY_PARAM_POINT = 'pointThreshold';
const DEFAULT_YEAR = '2012';
const DEFAULT_POINT_THRESHOLD = '130';

const routes = [
  { path: '/foo', component: { template: '<div>Foo</div>' } }
];

const App = require('./views/AppView.vue');
const PostView = require('./views/PostView.vue');

const router = new VueRouter({ 
  routes: [
    { path: '/post/:id', component: PostView }
  ]
 });


const app = new Vue({
  el: '#app',
  router, 
  render: h => h(App),
  created () {
    console.log('created document.readyState', document.readyState);
    swStarter();
  },
  mounted () {
    console.log('mounted document.readyState', document.readyState);
  }
})