<template>
  <div class="csvoption">
    <button @click="showModal">
      options
    </button>
    <b-modal ref="CSVOptionModalRef"
      title="CSV Download Options"
      @ok="_ok"
      @shown="showModal">
      <form @submit.stop.prevent="submit">
        <div id="quoteForm">
          <label>Quote: </label>
          <input type="checkbox" id="quotesCheckbox" v-model="_quotes">
          <label for="quotesCheckbox">On</label>
          <select id="quateCharSelect" v-model="_quoteChar" v-on:change="_onChangeQuoteChar">
           <option disabled value="">Please select...</option>
           <option v-for="(option,index) in _quoteCharOptionsData"
             :value="option.value" :key="index"> {{ option.text }} </option>
          </select>
          <input v-model="_quoteCharText"
           :placeholder="_quoteCharOtherSelected ? 'Type quote...' : 'Other(select other...)' "
           :disabled="!_quoteCharOtherSelected">
        </div>
        <div id="delimiterForm">
          <label for="delimiterSelect">Delimiter: </label>
          <select id="delimiterSelect" v-model="_delimiter" v-on:change="_onChangeDelimiter">
           <option disabled value="">Please select...</option>
           <option v-for="(option, index) in _delimiterOptionsData"
             :value="option.value" :key="index"> {{ option.text }} </option>
          </select>
          <input v-model="_delimiterCharText"
           :placeholder="_delimiterCharOtherSelected ? 'Type delimiter...' : 'Other(select other...)' "
           :disabled="!_delimiterCharOtherSelected">
        </div>
        <div id="headerForm">
          <label>Show header: </label>
          <input type="checkbox" id="headerCheckbox" v-model="_header">
          <label for="headerCheckbox">On</label>
        </div>
        <div id="newlineForm">
          <label>NewLine: </label>
          <div v-for="(value, key) in _newlineData" :key="key">
            <input type="radio" :id="key" :value="key" v-model="_newlineId">
            <label :for="key">{{ value.text }}</label>
          </div>
        </div>
        <div id="timestampForm">
          <label>Add timestamp to filename: </label>
          <input type="checkbox" id="timestampCheckbox" v-model="_timestamp">
          <label for="timestampCheckbox">On</label>
        </div>
        <div id="compForm">
          <label>Compress: (not available)</label>
          <input type="checkbox" id="compressCheckbox" v-model="_comp" disabled>
          <label for="compressCheckbox">On(zip)</label>
        </div>
      </form>
      <b-btn variant="secondary" @click="_setDefault">
        Reset
      </b-btn>
      <b-btn variant="secondary" @click="download">
        Download
      </b-btn>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

const OTHER = 'other'
const DefaultQuotes = true
const DefaultQuoteChar = '"'
const DefaultCharText = ''
const DefaultOtherSelected = false
const DefaultDelimiter = ','
const DefaultNewlineId = 'nlid1'
const DefaultHeader = true
const DefaultTimestamp = false
const DefaultComp = false

export default {
  name: 'CsvOption',
  props: {
    // private var for form
    _quotes: {
      type: Boolean,
      default: DefaultQuotes
    },
    _quoteChar: {
      type: String,
      default: DefaultQuoteChar
    },
    _quoteCharOptionsData: {
      type: Array,
      default: () => {
        return [
          {text: '"(Double Quote)', value: '"'},
          {text: "'(Single Quote)", value: "'"},
          {text: 'Other...', value: OTHER}
        ]
      }
    },
    _quoteCharText: {
      type: String,
      default: DefaultCharText
    },
    _quoteCharOtherSelected: {
      type: Boolean,
      default: DefaultOtherSelected
    },
    _delimiter: {
      type: String,
      default: DefaultDelimiter
    },
    _delimiterOptionsData: {
      type: Array,
      default: () => {
        return [
          {text: ',(Comma)', value: ','},
          {text: 'Tab', value: '\t'},
          {text: '|(Pipe)', value: '|'},
          {text: ' (single space)', value: ' '},
          {text: 'Other...', value: OTHER}
        ]
      }
    },
    _delimiterCharText: {
      type: String,
      default: DefaultCharText
    },
    _delimiterCharOtherSelected: {
      type: Boolean,
      default: DefaultOtherSelected
    },
    _newlineData: {
      type: Object,
      default: () => {
        return {
          nlid1: {text: 'CRLF(\\r\\n, for Windows)', value: '\r\n'},
          nlid2: {text: 'LF(\\n, for MacOSX and UNIX like)', value: '\n'},
          nlid3: {text: 'CR(\\r, for MacOS~9)', value: '\r'}
        }
      }
    },
    _newlineId: {
      type: String,
      default: DefaultNewlineId
    },
    _header: {
      type: Boolean,
      default: DefaultHeader
    },
    _timestamp: {
      type: Boolean,
      default: DefaultTimestamp
    },
    _comp: {
      type: Boolean,
      default: DefaultComp
    },
    quotes: {
      type: Boolean,
      default: DefaultQuotes
    },
    quoteChar: {
      type: String,
      default: DefaultQuoteChar
    },
    quoteCharOtherSelected: {
      type: Boolean,
      default: DefaultOtherSelected
    },
    delimiter: {
      type: String,
      default: DefaultDelimiter
    },
    delimiterCharOtherSelected: {
      type: Boolean,
      default: DefaultOtherSelected
    },
    header: {
      type: Boolean,
      default: DefaultHeader
    },
    newlineId: {
      type: String,
      default: DefaultNewlineId
    },
    timestamp: {
      type: Boolean,
      default: DefaultTimestamp
    },
    comp: {
      type: Boolean,
      default: DefaultComp
    }
  },
  methods: {
    _onChangeQuoteChar () {
      if (this._quoteChar === OTHER) {
        this._quoteCharOtherSelected = true
      } else {
        this._quoteCharOtherSelected = false
      }
    },
    _onChangeDelimiter () {
      if (this._delimiter === OTHER) {
        this._delimiterCharOtherSelected = true
      } else {
        this._delimiterCharOtherSelected = false
      }
    },
    _setDefault () {
      this._quotes = DefaultQuotes
      this._quoteChar = DefaultQuoteChar
      this._quoteCharText = DefaultCharText
      this._quoteCharOtherSelected = DefaultOtherSelected
      this._delimiter = DefaultDelimiter
      this._delimiterCharText = DefaultCharText
      this._delimiterCharOtherSelected = DefaultOtherSelected
      this._header = DefaultHeader
      this._newlineId = DefaultNewlineId
      this._timestamp = DefaultTimestamp
      this._comp = DefaultComp
    },
    _commit () {
      this.quotes = this._quotes
      this.quoteCharOtherSelected = this._quoteCharOtherSelected
      if (this.quoteCharOtherSelected) {
        this.quoteChar = this._quoteCharText
      } else {
        this.quoteChar = this._quoteChar
      }
      this.delimiterCharOtherSelected = this._delimiterCharOtherSelected
      if (this.delimiterCharOtherSelected) {
        this.delimiter = this._delimiterCharText
      } else {
        this.delimiter = this._delimiter
      }
      this.header = this._header
      this.timestamp = this._timestamp
      this.comp = this._comp
      this.newlineId = this._newlineId
    },
    _prepare () {
      this._quotes = this.quotes
      this._quoteCharOtherSelected = this.quoteCharOtherSelected
      if (this._quoteCharOtherSelected) {
        this._quoteChar = OTHER
        this._quoteCharText = this.quoteChar
      } else {
        this._quoteChar = this.quoteChar
        this._quoteCharText = ''
      }
      this._delimiterCharOtherSelected = this.delimiterCharOtherSelected
      if (this._delimiterCharOtherSelected) {
        this._delimiter = OTHER
        this._delimiterCharText = this.delimiter
      } else {
        this._delimiter = this.delimiter
        this._delimiterCharText = ''
      }
      this._header = this.header
      this._timestamp = this.timestamp
      this._comp = this.comp
      this._newlineId = this.newlineId
    },
    download () {
      var options = {
        quotes: this._quotes,
        quoteChar: this._quoteChar,
        delimiter: this._delimiter,
        newline: this._newlineData[this._newlineId].value,
        header: this._header,
        timestamp: this._timestamp,
        comp: this._comp
      }
      this.$emit('downloadByModal', options)
    },
    showModal () {
      this._prepare()
      this.$refs.CSVOptionModalRef.show()
    },
    _ok (evt) {
      evt.preventDefault()
      this.submit()
    },
    submit () {
      this._commit()
      var options = {
        quotes: this.quotes,
        quoteChar: this.quoteChar,
        delimiter: this.delimiter,
        newline: this._newlineData[this.newlineId].value,
        header: this.header,
        timestamp: this.timestamp,
        comp: this.comp
      }
      this.$emit('sendOptions', options)
      this.$refs.CSVOptionModalRef.hide()
    }
  }
}
</script>

<style scoped>

</style>
