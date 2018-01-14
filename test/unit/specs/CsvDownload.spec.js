import Vue from 'vue'
import CsvDownload from '@/components/CsvDownload'
import * as td from 'testdouble'

describe('CsvDownload.vue', () => {
  it('should render CsvDownload Component', () => {
    const Constructor = Vue.extend(CsvDownload)
    const vm = new Constructor().$mount()
    expect(vm.$el.className).to.equal('csvdownload')
  })
  it('should convert csv', () => {
    const Constructor = Vue.extend(CsvDownload)
    const vm = new Constructor().$mount()
    const testDataJson = [{'a': 1, 'b': 2}, {'a': 3, 'b': 4}]

    vm.dataJson = testDataJson
    vm.convert()

    const expected = 'a,b\r\n1,2\r\n3,4'

    expect(expected).to.equal(vm.dataCSV)
  })
  it('should called download', () => {
    const Constructor = Vue.extend(CsvDownload)
    const vm = new Constructor().$mount()

    var download = td.function('vm.download')
    download()
    td.verify(download())
  })
})
