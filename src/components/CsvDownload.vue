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
      type: Object
    },
    header: {
      type: Object
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
      if (typeof this.header === 'undefined' || this.header === '') {
        this.dataCSV = Papa.unparse(this.dataJson, this.convOption)
      } else {
        var d = {
          fields: Object.values(this.header),
          data: []
        }
        for (let i = 0; i < this.dataJson.length; i++) {
          var a = []
          for (let key in this.header) {
            var o = this.dataJson[i]
            a.push(o[key])
          }
          d.data.push(a)
        }
        this.dataCSV = Papa.unparse(d, this.convOption)
      }
    },
    download () {
      this.convert()
      if (typeof this.dataCSV === 'undefined' || this.dataCSV === '') {
        alert('no data')
        return
      }
      const blob = new Blob([this.dataCSV], {type: 'text/csv;charset=utf-8'})
      FS.saveAs(blob, this.filename)
    }
  }
}
</script>

<style scoped></style>
