import CsvDownload from './components/CsvDownload.vue'

function plugin (Vue) {
  Vue.component(CsvDownload.name, CsvDownload)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'

export {
  CsvDownload,
  version
}
