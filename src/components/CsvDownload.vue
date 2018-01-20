<template>
  <div class="csvdownload">
      <button @click="download">{{ title }}</button>
      <optionModal v-on:downloadByModal="emitDownload" v-on:sendOptions="emitOptions"></optionModal>
  </div>
</template>

<script>
import Papa from 'papaparse'
import * as FS from 'file-saver'

import CsvOption from './CsvOption.vue'

export default {
  name: 'CsvDownload',
  components: {
    'optionModal': CsvOption
  },
  props: {
    title: {
      type: String,
      default: 'Download'
    },
    filename: {
      type: String,
      default: 'download'
    },
    options: {
      type: Object,
      default: () => {
        return {
          quotes: true,
          quoteChar: '"',
          delimiter: ',',
          newline: '\r\n',
          header: true,
          timestamp: false,
          comp: false
        }
      }
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
    convert (options) {
      var dataCSV
      if (typeof this.header === 'undefined' || this.header === '') {
        dataCSV = Papa.unparse(this.dataJson, options)
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
        dataCSV = Papa.unparse(d, options)
      }
      return dataCSV
    },
    emitOptions (options) {
      this.options = options
    },
    emitDownload (options) {
      this._download(options)
    },
    download () {
      this._download(this.options)
    },
    _makeFilename (base, delimiter, timestamp) {
      var t = base
      if (timestamp) {
        const now = new Date()
        t += '_' + now.getFullYear() +
               ('0' + (now.getMonth() + 1)).slice(-2) +
               ('0' + now.getDate()).slice(-2) +
               ('0' + now.getHours()).slice(-2) +
               ('0' + now.getMinutes()).slice(-2)
      }

      switch (delimiter) {
        case '\t':
          t += '.tsv'
          break
        case ',':
          t += '.csv'
          break
        default:
          t += '.txt'
          break
      }
      return t
    },
    _download (options) {
      var filename
      var opts

      if (typeof options.filename === 'undefined' || options.filename === '') {
        filename = this.filename
      } else {
        filename = options.filename
      }
      filename = this._makeFilename(filename, options.delimiter, options.timestamp)
      if (typeof options === 'undefined' || options === '') {
        opts = this.options
      } else {
        opts = options
      }
      const dataCSV = this.convert(opts)
      if (typeof dataCSV === 'undefined' || dataCSV === '') {
        alert('no data')
        return
      }
      const blob = new Blob([dataCSV], {type: 'text/csv;charset=utf-8'})
      FS.saveAs(blob, filename)
    }
  }
}
</script>

<style scoped></style>
