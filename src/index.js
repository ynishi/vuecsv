import CsvDownload from './components/CsvDownload.vue'
import CsvOption from './components/CsvOption.vue'

function plugin (Vue) {
  Vue.component(CsvDownload.name, CsvDownload)
  Vue.component(CsvOption.name, CsvOption)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'

export {
  CsvDownload,
  CsvOption,
  version
}
