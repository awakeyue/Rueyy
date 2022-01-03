<template>
  <div class="weather-wrap" v-if="!loading">
    <div class="top">
      <div class="left">
        <img class="icon" :src="weatherIcon" alt="" />
        <div class="l-bottom">
          <p>
            <span class="temp"
              >{{ weather.temp || '0' }}<span class="unit">°C</span></span
            >
            <span class="wea">{{ weather.weather || '-' }}</span>
          </p>
        </div>
      </div>
      <div class="right">
        <div class="r-item">
          <p>{{ weather.WS || '-' }}</p>
          <p class="r-item-label">{{ weather.WD || '风向' }}</p>
        </div>
        <div class="r-item">
          <p>{{ weather.SD || '-'  }}</p>
          <p class="r-item-label">湿度</p>
        </div>
        <div class="r-item">
          <p>{{ weather.pm25 || '-' }}</p>
          <p class="r-item-label">PM25</p>
        </div>
        <div class="r-item">
          <p>{{ weather.wse || '-' }}</p>
          <p class="r-item-label">风速</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span>
        <span class="clickable" title="更换城市" @click="changeWeatherCity"
          ><n-icon size="10"><loc-icon /></n-icon>{{ weather.cityname || '无效城市' }}</span
        >
        <span style="margin-left: 10px">{{ weather.time || '00:00' }}更新</span>
      </span>
      <span title="查看更多" @click="viewMore">
        <n-icon class="more clickable"><forward-icon></forward-icon></n-icon>
      </span>
    </div>

    <n-modal
      v-model:show="showCity"
      :mask-closable="false"
      preset="dialog"
      title="更改城市"
      positive-text="确认"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
      negative-text="算了"
    >
      <n-input placeholder="请输入城市名" v-model:value="city"></n-input>
      <div style="margin-top: 10px;">
        <n-tag class="clickable" style="margin-right: 10px;" v-for="(str, idx) in historyInputs" :key="idx" size="small" @click="city = str">{{str}}</n-tag>
      </div>
    </n-modal>
    <n-modal v-model:show="showMore" preset="dialog" style="width: 90vw; min-width: 600px;" title="未来一周气温变化">
      <div id="chart" style="width: 100%; height: 600px;"></div>
    </n-modal>
  </div>
  <div class="weather-wrap" v-else>
    <n-skeleton text :repeat="8" />
    <n-skeleton text style="width: 50%" />
  </div>
</template>

<script lang="js">
import { queryWeather, getLocation } from '@/api/index'
import { LocationOutline as locIcon, ChevronForwardOutline as forwardIcon } from '@vicons/ionicons5'
import { defineComponent, onMounted, reactive, computed, toRefs, ref } from 'vue'
import { useMessage } from 'naive-ui'
import echarts from '@/utils/charts'
import { getTempOption } from '@/utils/chartsOptions'
import weatherIcon1 from '@/assets/svg/weather/clear-day.svg'
import weatherIcon1Night from '@/assets/svg/weather/clear-night.svg'
import weatherIcon2 from '@/assets/svg/weather/partly-cloudy-day.svg'
import weatherIcon2Night from '@/assets/svg/weather/partly-cloudy-night.svg'
import weatherIcon3 from '@/assets/svg/weather/overcast.svg'
import weatherIcon4 from '@/assets/svg/weather/drizzle.svg'
import weatherIcon5 from '@/assets/svg/weather/hail.svg'
import weatherIcon6 from '@/assets/svg/weather/rain.svg'
import weatherIcon7 from '@/assets/svg/weather/sleet.svg'
import weatherIcon8 from '@/assets/svg/weather/snow.svg'
import weatherIcon9 from '@/assets/svg/weather/partly-cloudy-day-rain.svg'
import weatherIcon9Night from '@/assets/svg/weather/partly-cloudy-night-rain.svg'
import weatherIcon10 from '@/assets/svg/weather/partly-cloudy-day-snow.svg'
import weatherIcon10Night from '@/assets/svg/weather/partly-cloudy-night-snow.svg'
import weatherIcon11 from '@/assets/svg/weather/mist.svg'
import weatherIcon12 from '@/assets/svg/weather/hurricane.svg'
import weatherIcon13 from '@/assets/svg/weather/dust-wind.svg'
import weatherIcon14 from '@/assets/svg/weather/dust.svg'
import weatherIcon15 from '@/assets/svg/weather/tornado.svg'
import weatherIcon16 from '@/assets/svg/weather/wind.svg'
import weatherIcon17 from '@/assets/svg/weather/haze.svg'
import weatherIcon18 from '@/assets/svg/weather/thunderstorms-rain.svg'
import notAvailable from '@/assets/svg/weather/not-available.svg'

const isNight = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7].includes(new Date().getHours())
// 好难搞，天气类型太多了
const WEA_ICON_MAP = {
  "晴": isNight ? weatherIcon1Night : weatherIcon1,
  "多云": isNight? weatherIcon2Night : weatherIcon2,
  "阴": weatherIcon3,
  "小雨": weatherIcon4,
  "冰雹": weatherIcon5,
  "阵雨": isNight ? weatherIcon9Night : weatherIcon9,
  "中雨": weatherIcon6,
  "大雨": weatherIcon6,
  "暴雨": weatherIcon6,
  "冻雨": weatherIcon6,
  "大暴雨": weatherIcon6,
  "特大暴雨": weatherIcon6,
  "雷阵雨": weatherIcon18,
  "雨夹雪": weatherIcon7,
  "小雪": weatherIcon8,
  "中雪": weatherIcon8,
  "大雪": weatherIcon8,
  "阵雪": isNight ? weatherIcon10Night : weatherIcon10,
  "暴雪": weatherIcon8,
  "雾": weatherIcon11,
  "飓风": weatherIcon12,
  "台风": weatherIcon12,
  "龙卷风": weatherIcon15,
  "沙尘暴": weatherIcon13,
  "强沙尘暴": weatherIcon13,
  "浮尘": weatherIcon14,
  "扬沙": weatherIcon13,
  "风": weatherIcon16,
  "霾": weatherIcon17
}
export default defineComponent({
  name: 'WeatherBox',
  components: {
    locIcon,
    forwardIcon
  },
  setup () {
    const message = useMessage()
    const state = reactive({
      weather: {},
      showCity: false,
      city: '',
      loading: false,
      historyInputs: [],
      showMore: false
    })

    const weatherIcon = computed(() => {
      const wea = state.weather.weather || ''
      let icon = WEA_ICON_MAP[wea] // 直接从iconMap中查找icon
      if (!icon) { // 如果找不到，根据icon名，看看是否包含
        const _key = Object.keys(WEA_ICON_MAP).find(key => wea.includes(key))
        icon = WEA_ICON_MAP[_key]
      }
      if (!icon) { // 返回无匹配icon
        icon = notAvailable
      }
      return icon
    })

    const getData = async (city, msg = '没有查到天气信息') => {
      state.loading = true
      try {
        const { data } = await queryWeather(city.replace('市', ''))
        state.weather = data || { }
        if (!data) {
          message.error(msg)
        }
        state.loading = false
      } catch (error) {
        message.error(msg)
        state.loading = false
      }
    }

    const getCity = async () => {
      const locationInfo = await getLocation(window.currentIp) // 根据ip获取城市信息
      return locationInfo ? locationInfo.city : '深圳'
    }

    const changeWeatherCity = () => {
      state.showCity = true
      state.city = state.weather.cityname
    }

    const onPositiveClick = () => {
      state.weather = {}
      getData(state.city, '没有查到天气信息，请换一个城市试试')
      state.showCity = false
      if (!state.historyInputs.includes(state.city)) {
        state.historyInputs.length === 5 && state.historyInputs.pop()
        state.historyInputs.push(state.city)
      }
    }

    const onNegativeClick = () => {
      state.showCity = false
    }

    const viewMore = async () => {
      state.showMore = true
      const { data } = await queryWeather(state.weather.cityname, 2)
      const list = data.map(item => {
        return {
          date: item.day,
          weather: item.weather,
          highTemp: parseInt(item.celsius.replace('℃', '').split('/')[0]),
          lowTemp: parseInt(item.celsius.replace('℃', '').split('/')[1])
        }
      })
      echarts.dispose(document.getElementById('chart'))
      const chart = echarts.init(document.getElementById('chart'))
      const option = getTempOption(list)
      chart.setOption(option)
    }

    onMounted(async () => {
      const city = await getCity()
      getData(city)
    })
    return {
      ...toRefs(state),
      weatherIcon,
      onPositiveClick,
      onNegativeClick,
      changeWeatherCity,
      viewMore
    }
  }
})
</script>

<style lang="scss" scoped>
.weather-wrap {
  height: 200px;
  .top {
    display: flex;
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 120px;
      height: 120px;
      object-fit: cover;
    }
    .temp {
      font-size: 36px;
      font-weight: bold;
      // line-height: 1em;
      position: relative;
      margin-right: 20px;
    }
    .unit {
      font-size: 12px;
      position: absolute;
      top: 0px;
    }
    .city {
      font-size: 12px;
    }
  }
  .right {
    width: 0;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
    .r-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 50%;
      border-radius: 2px;
      &-label {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 12px;
    .more {
      cursor: pointer;
      padding: 0 10px;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.5);
      }
    }
  }
}
</style>
