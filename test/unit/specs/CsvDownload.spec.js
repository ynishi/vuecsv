import Vue from 'vue'
import CsvDownload from '@/components/CsvDownload'
import * as td from 'testdouble'

function getRendered (Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm
}

const testHeader = {
        'a': 'headerA',
        'b': 'headerB'
        }

const testDataJson = [
  {
    'a': 1,
    'b': 2
  },
  {
    'a': 3,
    'b': 4
  }
]

describe('CsvDownload.vue', () => {
  it('should render CsvDownload Component', () => {
    const vm = getRendered(CsvDownload, {})
    expect(vm.$el.className).to.equal('csvdownload')
  })
  it('should render with props', () => {
    const propsData = {
      title: 'testTitle',
      filename: 'testFile.csv',
      convOption: { opt1: 'testOpt' },
      dataJson: testDataJson
    }
    const vm = getRendered(CsvDownload, propsData)
    expect(vm.title).to.equal('testTitle')
    expect(vm.filename).to.equal('testFile.csv')
    expect(vm.convOption.opt1).to.equal('testOpt')
    expect(vm.dataJson).to.equal(testDataJson)
  })
  it('should convert csv', () => {
    const vm = getRendered(CsvDownload, { dataJson: testDataJson })
    vm.convert()
    const expected = 'a,b\r\n1,2\r\n3,4'
    expect(expected).to.equal(vm.dataCSV)
  })
  it('should convert csv with header', () => {
    const vm = getRendered(CsvDownload, { header: testHeader, dataJson: testDataJson })
    vm.convert()
    const expected = 'headerA,headerB\r\n1,2\r\n3,4'
    expect(expected).to.equal(vm.dataCSV)
  })
  it('should called download', () => {
    const vm = getRendered(CsvDownload, {})

    var download = td.function('vm.download')
    download()
    td.verify(download())
  })
})
