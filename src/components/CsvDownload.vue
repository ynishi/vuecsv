<template>
  <div class="csvdownload">
    <button @click="download">{{ title }}</button>
  </div>
</template>

<script>
import Papa from 'papaparse'
import * as FS from 'file-saver'

export default {
  name: 'CsvDownload',
  props: {
    title: {
      type: String,
      default: 'Download'
    },
    filename: {
      type: String,
      default: 'download.csv'
    },
    convOption: {
      type: Object,
      default: {}
    },
    dataJson: {
      type: Array
    }
  },
  data () {
    return {
      dataCSV: ''
    }
  },
  methods: {
    convert () {
      this.dataCSV = Papa.unparse(this.dataJson, this.convOption)
    },
    download () {
      this.convert()
      if (typeof this.dataCSV === 'undefined' || this.dataCSV === '') {
        alert('no data')
        return
      }
      const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
      const blob = new Blob([bom, this.dataCSV], {type: 'text/csv;charset=utf-8'})
      FS.saveAs(blob, this.filename)
    }
  }
}
</script>

<style scoped></style>
