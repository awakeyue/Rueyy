<template>
   <div class="weather-wrap" v-if="JSON.stringify(weather) !== '{}'">
     <div class="top">
       <div class="left">
        <img class="icon" :src="weatherIcon" alt="">
        <div class="l-bottom">
          <p>
            <span class="temp">{{weather.temp}}<span class="unit">°C</span></span>
            <span class="wea">{{weather.weather}}</span>
          </p>
        </div>
      </div>
      <div class="right">
        <div class="r-item">
          <p>{{weather.WS}}</p>
          <p class="r-item-label">{{weather.WD}}</p>
        </div>
        <div class="r-item">
          <p>{{weather.SD}}</p>
          <p class="r-item-label">湿度</p>
        </div>
        <div class="r-item">
          <p>{{weather.pm25}}</p>
          <p class="r-item-label">PM25</p>
        </div>
        <div class="r-item">
          <p>{{weather.wse}}</p>
          <p class="r-item-label">风速</p>
        </div>
      </div>
     </div>
     <div class="bottom">
       <span>
        <span class="clickable" title="更换城市"><n-icon size="10"><loc-icon /></n-icon>{{weather.cityname}}</span>
        <span style="margin-left: 10px;">{{weather.time}}更新</span>
       </span>
       <span title="查看更多">
         <n-icon class="more clickable"><forward-icon></forward-icon></n-icon>
       </span>
     </div>
   </div>
</template>

<script lang="js">
import { queryWeather, getLocation } from '@/api/index'
import { LocationOutline as locIcon, ChevronForwardOutline as forwardIcon } from '@vicons/ionicons5'
import { defineComponent, onMounted, reactive, computed, toRefs } from 'vue'
import { useMessage } from 'naive-ui'
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
      weather: {}
    })
    const getData = async () => {
      try {
        const locationInfo = await getLocation(window.currentIp) // 根据ip获取城市信息
        const city = locationInfo ? locationInfo.city : '深圳'
        const { data } = await queryWeather(city.replace('市', ''))
        state.weather = data
      } catch (error) {
        message.error('请求失败！')
      }
    }
    onMounted(async () => {
      getData()
    })
    return {
      ...toRefs(state),
      weatherIcon: computed(() => {
        const wea = state.weather.weather
        let icon = WEA_ICON_MAP[wea] // 直接从iconMap中查找icon
        if (!icon) { // 如果找不到，根据icon名，看看是否包含
          key = Object.keys(WEA_ICON_MAP).find(key => wea.includes(key))
          icon = WEA_ICON_MAP[key]
        }
        if (!icon) { // 返回无匹配icon
          icon = notAvailable
        }
        return icon
      })
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
      transition: all .3s;
      &:hover {
        transform: scale(1.5);
      }
    }
  }
}
</style>