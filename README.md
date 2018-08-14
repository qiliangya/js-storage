# js-storage

A simple project for resolve sessionStroage and localStroage problem

* Works in above IE8
* Accepts any character(like Object Array...)
* No dependency
* Supports AMD/CommonJS
* ~3KB gzipped!

## Installation

### Direct download
Download the script [here](https://github.com/qiliangya/js-storage/storage-live.min.js) and include it (unless you are packaging scripts somehow else):

```html
<script src="/lib/storage-live.min.js"></script>
```

### Package Managers
Javascript Storage supports [npm](https://www.npmjs.com/package/js-storage) under the name `storage-live`.

#### NPM
```
  $ npm install storage-live --save
```

### Module Loaders
JavaScript Storage can also be loaded as an AMD or CommonJS module.

## Basic Usage

### localStorage
Create a storage, allow storage all the time:

```javascript
Storage.localStorage.set('name', 'value');
```

You can also store an object or array:

```javascript
Storage.localStorage.set('object', { a: 1 });  // { a: 1 }
Storage.localStorage.set('array', [1, 2, 3]);  // [1, 2, 3]
```

Read Storage:

```javascript
Storage.localStorage.get('name'); // => value
Storage.localStorage.get('object'); // => { a: 1 }
Storage.localStorage.get('array'); // => [1, 2, 3]
Storage.localStorage.get('nothing'); // => null
```

Read all Storage:
```javascript
Storage.localStorage // => {name:value,object:{a:1},array:[1, 2, 3], length:3}
```

Delete Storage:
```javascript
Storage.localStorage.remove('name');
```
Delete all Storage:
```javascript
Storage.localStorage.remove();
```

SessionStorage empathy

## Namespace conflicts
If there is any danger of a conflict with the namespace `Storage`, the `noConflict` method will allow you to define a new namespace and preserve the original one. This is especially useful when running the script on third party sites e.g. as part of a widget or SDK.

```javascript
// Assign the js-storage api to a different variable and restore the original "window.Storage"
var Storage2 = Storage.noConflict();
Storage2.set('name', 'value');
```

*Note: The `.noConflict` method is not necessary when using AMD or CommonJS, thus it is not exposed in those environments.*


## Authors

* [qiliangya](https://github.com/qiliangya)