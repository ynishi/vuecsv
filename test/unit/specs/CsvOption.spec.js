import Vue from 'vue'
import CsvOption from '@/components/CsvOption'
import * as td from 'testdouble'

function getRendered (Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm
}

const propsData = {
  quotes: true,
  quoteChar: "'",
  delimiter: '|',
  header: false,
  newlineId: 'nlid1',
  timestamp: true,
  comp: true
}

describe('CsvOption.vue', () => {
  it('should render CsvOption Component', () => {
    const vm = getRendered(CsvOption, {})
    expect(vm.$el.className).to.equal('csvoption')
  })
  it('should render with props', () => {
    const vm = getRendered(CsvOption, propsData)
    expect(vm.quotes).to.equal(true)
    expect(vm.quoteChar).to.equal("'")
    expect(vm.delimiter).to.equal('|')
    expect(vm.header).to.equal(false)
    expect(vm.newlineId).to.equal('nlid1')
    expect(vm.timestamp).to.equal(true)
    expect(vm.comp).to.equal(true)
  })
  it('should have public functions', () => {
    expect(typeof CsvOption.methods.showModal).to.equal('function')
    expect(typeof CsvOption.methods.submit).to.equal('function')
    expect(typeof CsvOption.methods.download).to.equal('function')
  })
  it('should invoke functions', () => {
    const vm = getRendered(CsvOption, propsData)

    var showModel = td.function('vm.showModel')
    showModel()
    td.verify(showModel())
    var submit = td.function('vm.submit')
    submit()
    td.verify(submit())
    var download = td.function('vm.download')
    download()
    td.verify(download())
  })
})
