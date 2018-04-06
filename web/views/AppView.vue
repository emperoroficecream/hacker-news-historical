<template>
  <div>
    <div class="section">
      <router-link to="./post/234">post link</router-link>
      <form @submit.prevent="handleQueryPreference">
        <div class="field">
          <label for="" class="label">Story posted before (year):</label>
          <div class="control is-expanded">
            <div class="select">
                <select id="before-year-selector" v-model="beforeYears.selected">
                  <option v-for="year in beforeYears.options" v-bind:value="year">
                    {{ year }}
                  </option>
                </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Points higher than:</label>
          <div class="control is-expanded">
            <div class="select">
                <select id="points-selector" v-model="pointThresholds.selected">
                  <option v-for="pointThreshold in pointThresholds.options" v-bind:value="pointThreshold">
                    {{ pointThreshold }}
                  </option>
                </select>
            </div>
          </div>
        </div>
        <div class="field">
            <div class="control">
                <button type="submit" class="button is-link">Submit</button>
              </div>
        </div>
      </form>
    </div>
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
  </div>
</template>
<script>
const QUERY_PARAM_YEAR = 'year';
const QUERY_PARAM_POINT = 'pointThreshold';
const DEFAULT_YEAR = '2012';
const DEFAULT_POINT_THRESHOLD = '130';
module.exports = {
  beforeMount () {
    this.loadPosts();
  },
  methods: {
    loadPosts () {
      fetch(`http://localhost:3000/story?${QUERY_PARAM_YEAR}=${DEFAULT_YEAR}&${QUERY_PARAM_POINT}=${DEFAULT_POINT_THRESHOLD}`)
      .then(response => response.json())
      .then(json => {
        this.posts = json;
      });
    },
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
        });
    }
  },
  data: function() {
    return {
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
      }
    }
  }
}
</script>