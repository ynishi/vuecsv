import HelloWorld from './components/HelloWorld.vue'

function plugin (Vue) {
  Vue.component(HelloWorld.name, HelloWorld)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'

export {
  HelloWorld,
  version
}
