<template>
  <div id="corn-box">
   <el-form :model="form" label-width="80px">
      <el-form-item style="margin-top: -10px; margin-bottom:0px;">
       <cron v-if="showCronBox" v-model="form.cronExpression"></cron>
       <span style="color: #E6A23C; font-size: 12px;">corn从左到右（用空格隔开）：秒 分 小时 月份中的日期 月份 星期中的日期 年份</span>
     </el-form-item>
     <el-form-item label="Cron">
       <el-input v-model="inputCronExpression" auto-complete="off">
          <el-button slot="append" v-if="!showCronBox" icon="el-icon-arrow-up" @click="showCronBox = true" title="打开图形配置"></el-button>
          <el-button slot="append" v-else icon="el-icon-arrow-down" @click="showCronBox = false" title="关闭图形配置"></el-button>
       </el-input>
     </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cron from '../components/cron'
import { formatCorn } from '../utils/formatCorn'

export default {
  name: 'Corn',
  components: {
    cron
  },
  data () {
    return {
      showCronBox: false,
      inputCronExpression: '',
      form: {
        cronExpression: ''
      }
    }
  },
  watch: {
    'form.cronExpression' (newVal, oldVal) {
      let newValArr = newVal.split(' ')
      let inputVal = newValArr.map(item => {
        let res = formatCorn(item)

        return res
      })
      console.log('🚚', inputVal)
      this.inputCronExpression = inputVal.join(' ')
    }
  }
}
</script>

<style>
#corn-box {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 700px;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
