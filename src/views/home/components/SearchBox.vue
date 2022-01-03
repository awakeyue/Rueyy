<template>
  <div class="search-box flex-center">
    <n-grid cols="8" item-responsive>
     <n-grid-item span="8 600:4" offset="0 600:2">
       <n-input-group class="flex-center">
        <n-input ref="inputRef" v-model:value="searchValue" size="large" round clearable placeholder="请搜索" />
        <n-button type="info" size="large" round @submit.prevent="" @keyup.enter="onSearch" @click="onSearch"><n-icon><search-icon /></n-icon></n-button>
      </n-input-group>
      <div class="tag-wrap">
        <div>
          <n-tag
            v-for="(item, idx) in urlMap"
            :key="idx"
            size="small"
            round
            class="tag"
            :title="item.url"
            :bordered="false"
            :type="idx === tagActiveIndex ? 'info' :'default'"
            @click="handleTagChange(idx)">{{item.label}}</n-tag>
        </div>
        <n-tag
          size="small"
          class="tag setting"
          round
          @click="showModal = true"><n-icon><settings-icon /></n-icon></n-tag>
      </div>
     </n-grid-item>
   </n-grid>
   <n-modal style="width: 80%;" v-model:show="showModal" :on-after-leave="onAfterLeave" :mask-closable="false" preset="dialog" title="自定义搜索">
    <transition-group name="list">
      <n-card content-style="padding: 10px;" v-for="(item, idx) in urlMapCopy" :key="idx">
          <div style="display: flex;">
            <n-grid cols="3" :x-gap="24" :y-gap="10" item-responsive>
              <n-grid-item span="3 800:1"><n-input v-model:value="item.label" placeholder="请输入标签"></n-input></n-grid-item>
              <n-grid-item span="3 800:2"><n-input v-model:value="item.url" placeholder="请输入url"></n-input></n-grid-item>
            </n-grid>
            <div class="flex-center" style="margin-left: 20px;">
              <n-button :disabled="urlMapCopy.length === 1" @click="deleteUrl(idx)"><n-icon><trash-icon /></n-icon></n-button>
            </div>
          </div>
        </n-card>
      </transition-group>
      <n-card content-style="padding: 10px;">
        <n-button @click="addUrl"><n-icon><add-icon /></n-icon></n-button>
      </n-card>
      <template #action>
        <div>
          <n-button style="margin-right: 20px;" @click="onCancel">取消</n-button>
          <n-button type="primary" @click="onConfirm">确认</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs, toRaw } from 'vue'
import { Search as SearchIcon,
         SettingsOutline as SettingsIcon,
         TrashOutline as trashIcon,
         Add as addIcon
        } from '@vicons/ionicons5'
import { setStorage, getStorage } from '@util/common'
import { cloneDeep } from 'lodash'
import anime from 'animejs'
interface urlItem {
  label: string,
  url: string
}
export default defineComponent({
  name: 'SearchBox',
  components: {
    SearchIcon,
    SettingsIcon,
    trashIcon,
    addIcon
  },
  setup (props, context) {
    const urlList: Array<urlItem> = [
      {
        label: '百度',
        url: 'https://www.baidu.com/s?ie=UTF-8&wd=',
      },
      {
        label: '必应',
        url: 'https://cn.bing.com/search?q='
      },
      {
        label: '掘金',
        url: 'https://juejin.cn/search?query='
      },
      {
        label: 'github',
        url: 'https://github.com/search?q='
      }
    ]
    const _urlList = getStorage('URL_MAP') || urlList
    const state = reactive({
      urlMap: cloneDeep(_urlList),
      urlMapCopy: cloneDeep(_urlList),
      tagActiveIndex: ref(0),
      searchValue: ref(''),
      showModal: ref(false),
      inputRef: ref()
    })

    const onSearch = () => {
      const url = state.urlMap[state.tagActiveIndex].url
      window.open(url + state.searchValue)
    }
    const getTagActive = () => {
      const storageTagIndex = localStorage.getItem('SEARCH_TYPE') || 0
      state.tagActiveIndex = Number(storageTagIndex)
    }
    const bindInputKeyup = () => {
      state.inputRef.$el.addEventListener('keyup', (e: any) => {
        if (e.keyCode === 13) {
          onSearch()
        }
      })
    }

    const addUrl = () => {
      state.urlMapCopy.push({
        label: '',
        url: ''
      })
    }

    const deleteUrl = (index: number) => {
      state.urlMapCopy.splice(index, 1)
    }

    const handleTagChange = (idx: number) => {
      state.tagActiveIndex = idx
      setStorage('SEARCH_TYPE', String(idx))
    }

    const onConfirm = () => {
      state.urlMap = cloneDeep(state.urlMapCopy.filter(({url, label}: urlItem) => url !== '' && label !== ''))
      state.urlMapCopy = state.urlMapCopy.filter(({url, label}: urlItem) => url !== '' && label !== '')
      state.showModal = false
      setStorage('URL_MAP', state.urlMap)
    }

    const onCancel = () => {
      state.urlMapCopy = cloneDeep(state.urlMap)
      state.showModal = false
    }

    const onAfterLeave = () => {
      console.log('yiguanbi')
    }

    onMounted(() => {
      getTagActive()
      bindInputKeyup()
      anime({
        targets: ['.search-box'],
        translateX: [-1000, 0]
      })
    })
    return {
      ...toRefs(state),
      onSearch,
      addUrl,
      deleteUrl,
      handleTagChange,
      onConfirm,
      onCancel,
      onAfterLeave
    }
  }
})
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  height: 240px;
  margin-bottom: 20px;
  .tag-wrap {
    padding: 4px 10px;
    display: flex;
    // justify-content: space-between;
    .tag {
      margin-right: 5px;
      cursor: pointer;
    }
    .setting {
      opacity: .1;
      transition: .5s;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>