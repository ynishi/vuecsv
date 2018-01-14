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
  beforeMound () {
  },
  data () {
    return {
      title: 'Download',
      dataJson: [],
      dataCSV: '',
      filename: 'download.csv',
      convOption: {}
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
      const blob = new Blob([bom, this.csvCSV], {type: 'text/csv;charset=utf-8'})
      FS.saveAs(blob, this.filename)
    }
  }
}
</script>

<style scoped></style>
