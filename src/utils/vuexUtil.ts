// 封装vuex映射方法，方便vue3使用
import { mapState, mapGetters, useStore, createNamespacedHelpers } from 'vuex'
import { computed } from 'vue'

const useMapper = (mapper: any, mapFn: Function) => {
  const store = useStore()
  
  // 获取对应对象functions: { name: function }
  const storeStateFns = mapFn(mapper)
  // 存储转换后的数据
  const storeState: any = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })
  return storeState
}

export const useState = (param: string | Array<string>, mapper?: Array<string>) => {
  const moduleName = typeof param === 'string' ? param : null
  mapper = Array.isArray(param) ? param : mapper
  let mapFn = mapState
  if (moduleName) {
    mapFn = createNamespacedHelpers(moduleName).mapState
  }
  return useMapper(mapper, mapFn)
}

export const useGetters = (param: string | Array<string>, mapper?: Array<string>) => {
  const moduleName = typeof param === 'string' ? param : null
  mapper = Array.isArray(param) ? param : mapper
  let mapFn = mapGetters
  if (moduleName) {
    mapFn = createNamespacedHelpers(moduleName).mapGetters
  }
  return useMapper(mapper, mapFn)
}