# vuecsv
[![Build Status](https://travis-ci.org/ynishi/vuecsv.svg?branch=master)](https://travis-ci.org/ynishi/vuecsv)

* CSV components for Vue.js

## Demo

* see jsfiddle
* https://jsfiddle.net/ynishif/1ztu8x8q/

## Use

* sample is in index.cdn.html
```
npm run build && open dist/index.html
```
* yarn
```
yarn && open dist/index.html
```

* CDN
```
<link rel="stylesheet" href="https://unpkg.com/vuecsv/dist/vuecsv.min.css">
<script type="text/javascript" src="https://unpkg.com/vuecsv/dist/vuecsv.min.js"></script>
```

## Methods

| name | desc |
|:---|:---|
| convert | convert Json(with/without header) to CSV |
| download | download converted data |

## Properties

| name | desc | default |
|:---|:---|:---|
| title | Button title | Download |
| filename | Downloaded filename | download |
| options | convert and download options(compatible papaparse) | default papaparse |
| header | header string of CSV(string map) | undefined |
| dataJson | contents of CSV(array, compatible papaparse) | undefined |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## CONTRIBUTING

* Welcome to contribute!

### Start

* At first, make issue to start discuss, new feature, bug, support, or about any type of activity. 

### develop

* fork repository.
* clone repository.
* build as above.
* coding.
* push your repository.
* make pull request with issue No.

## LICENSE

* This code is released under the MIT License, see LICENSE.
* (C)2018 Yutaka Nishimura
