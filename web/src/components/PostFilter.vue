<template>
  <div class="section">
    <div class="hero">
      <div class="hero-body">
        <form @submit.prevent="handleQueryPreference">
          <div class="start-time form-group">
            <label class="label">After: </label>
            <div class="field">
              <div class="control">
                <div class="select">
                    <select v-model="startYear">
                      <option v-for="year in years" v-bind:value="year">
                        {{ year }}
                      </option>
                    </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="select">
                    <select v-model="startMonth">
                      <option v-for="month in months" v-bind:value="month">
                        {{ month }}
                      </option>
                    </select>
                </div>
              </div>
            </div>
          </div>
          <div class="end-time form-group">
            <label class="label">Before: </label>
            <div class="field">
              <div class="control">
                <div class="select">
                    <select v-model="endYear">
                      <option v-for="year in years" v-bind:value="year">
                        {{ year }}
                      </option>
                    </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="select">
                    <select v-model="endMonth">
                      <option v-for="month in months" v-bind:value="month">
                        {{ month }}
                      </option>
                    </select>
                </div>
              </div>
            </div>
          </div>
          <div class="field form-group">
              <label class="label">Min points: </label>
              <div class="control">
                  <input v-model="minPoints" type="text" class="input" v-bind:placeholder="minPoints">
                </div>
          </div>
          <div class="field form-group">
              <div class="control">
                  <button type="submit" class="button is-link">Submit</button>
                </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from '../store/'
export default {
  name: 'post-filter',
  methods: {
    handleQueryPreference() {
    const vm = this;
    const qsObj = {
      startYear: vm.startYear,
      startMonth: vm.startMonth,
      endYear: vm.endYear,
      endMonth: vm.endMonth,
      minPoints: vm.minPoints
    }
    const qs = Object.keys(qsObj).reduce((acc, key) => {
      acc.push(`${key}=${qsObj[key]}`);
      return acc;
    }, []).join('&');
    fetch('/story?' + qs)
      .then(response => response.json())
      .then((json) => {
        vm.sharedState.posts = json;
        console.log(vm.sharedState.posts);
      });
    }  
  },
  data () {
    const years = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const DEFAULT_START_YEAR = years[0];
    const DEFAULT_START_MONTH = months[0];
    const DEFAULT_END_YEAR = years[years.length - 1];
    const DEFAULT_END_MONTH = months[months.length - 1];
    const DEFAULT_MIN_POINTS = '42';
    return {
      years,
      months,
      startYear: DEFAULT_START_YEAR,
      startMonth: DEFAULT_START_MONTH,
      endYear: DEFAULT_END_YEAR,
      endMonth: DEFAULT_END_MONTH,
      minPoints: DEFAULT_MIN_POINTS,
      sharedState: store.state
    }
  }
}
</script>
<style>
.form-group .field {
  display: inline-block;
  margin-right: 1em;
}
.form-group {
  text-align: left;
};
</style>

