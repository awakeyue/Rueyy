<template>
  <div class="music-box" v-if="data && data.name">
    <div class="top">
      <div class="left">
        <div class="music-info">
          <n-text tag="div" class="name">
            <n-ellipsis tooltip :line-clamp="2">{{data.name}}</n-ellipsis>
          </n-text>
          <n-text tag="div" class="singer" depth="3">
            <n-ellipsis tooltip :line-clamp="1">{{data.artistsname}}</n-ellipsis>
          </n-text>
        </div>
        <div class="music-controls">
          <n-icon size="30" class="clickable" @click="changeMusic"><play-back></play-back></n-icon>
          <n-icon size="46" class="clickable" @click="handlePlay">
            <component :is="componentId"></component>
          </n-icon>
          <n-icon size="30" class="clickable" @click="changeMusic"><play-forward></play-forward></n-icon>
        </div>
      </div>
      <div class="right">
        <div class="img-wrap" id="img" :style="{'box-shadow': `0 0 5px 0 ${theme === 'light' ? '#000' : '#fff'}`}">
          <img class="img" :src="data.picurl" :alt="data.name">
        </div>
      </div>
    </div>
    <div class="bottom">
      <audio
        loop
        ref="audio"
        :src="data.url"
        @timeupdate="onTimeUpdate"
        @loadedmetadata="onLoadedmetadata"
        @error="onError"></audio>
      <span class="time">{{formatCurrentTime}}</span>
      <n-slider class="precessbar" :format-tooltip="formatTime" v-model:value="time.current" :max="time.total" :on-update:value="onSliderChange" />
      <span class="time">{{formatTime(time.total)}}</span>
    </div>
  </div>
  <div class="music-box" v-else>
    <div class="top">
      <div class="left">
        <div class="music-info"><n-skeleton text :repeat="2" /></div>
        <div class="music-controls"><n-skeleton :height="50" /></div>
      </div>
      <div class="right">
        <n-skeleton circle :height="100" :width="100" />
      </div>
    </div>
    <div class="bottom">
      <n-skeleton />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, shallowRef, nextTick, computed, inject } from 'vue'
import { getRandomMusic } from '@/api/index'
import anime from 'animejs'
import { PlayCircleOutline as playIcon,
         PauseCircleOutline as pauseIcon,
         PlaySkipForwardOutline as playForward,
         PlaySkipBackOutline as playBack }from '@vicons/ionicons5'
export default defineComponent({
  name: 'RandomMusic',
  components: {
    playIcon,
    pauseIcon,
    playBack,
    playForward
  },
  setup () {
    const state = reactive({
      audio: '', // ref
      data: {
        url: '',
        picurl: '',
        name: '',
        artistsname: ''
      },
      componentId: shallowRef(playIcon),
      time: {
        current: 0,
        total: 0
      }
    })
    const theme = inject('theme')
    const getAnimeInstance = ((): any => { // 返回单例
      let animeInstance: any = null
      return () => {
        return animeInstance || (animeInstance = anime({
          targets: ['#img'],
          rotate: 360,
          duration: 12000,
          loop: true,
          easing: 'linear'
        }))
      }
    })()
    const formatCurrentTime = computed(() => {
      return formatTime(state.time.current)
    })
    const formatTime = (second: number) => {
      const m = Math.floor(second / 60)
      const s = second % 60
      const res = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
      return res
    }
    const getData = async (playImmediately: boolean = false) => {
      const { data } = await getRandomMusic()
      state.data = data
      playImmediately && nextTick(() => {
        state.audio && handlePlay()
      })
    }
    const audioPlay = () => {
      state.audio.play()
      state.componentId = pauseIcon
    }
    const audioPause = () => {
      state.audio.pause()
      state.componentId = playIcon
    }
    const handlePlay = () => {
      const instance = getAnimeInstance()
      if (state.audio.paused) {
        audioPlay()
        instance.play()
      } else {
        audioPause()
        instance.pause()
      }
    }
    const changeMusic = () => {
      const instance = getAnimeInstance()
      instance.restart()
      instance.pause()
      audioPause()
      getData(true)
    }

    const onError = (e: any) => {
      console.log(e)
      getData(true)
    }
    const onTimeUpdate = (e: any) => {
      state.time.current = parseInt(e.target.currentTime)
    }
    const onLoadedmetadata = (e: any) => {
      state.time.total = parseInt(e.target.duration)
    }
    const onSliderChange = (value: number) => {
      state.audio.currentTime = value
    }

    onMounted(() => {
      getData()
    })
    return {
       ...toRefs(state),
       theme,
       formatCurrentTime,
       handlePlay,
       changeMusic,
       onError,
       onTimeUpdate,
       onLoadedmetadata,
       onSliderChange,
       formatTime
    }
  }
})
</script>

<style lang="scss" scoped>
.music-box {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    flex: 1;
  }
  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    .precessbar {
      margin: 0 10px;
    }
    .time {
      font-size: 12px;
    }
  }
  .left, .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .music-controls {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .music-info {
      width: 100%;
      .name {
        font-size: 16px;
        text-align: center;
      }
      .singer {
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .right {
    .img-wrap {
      padding: 4px;
      border-radius: 50%;
      background-color: #222222;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
    }
    
  }
}

</style>