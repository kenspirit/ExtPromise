[bluebird]: https://github.com/petkaantonov/bluebird
[Sinon.js]: http://github.com/cjohansen/Sinon.JS.git
[ExtPromise.js]: https://github.com/kenspirit/ExtPromise/blob/master/src/ExtPromise.js
[bluebird.js]: https://github.com/kenspirit/ExtPromise/blob/master/lib/bluebird.js

## ExtPromise  

A simple wrapper to provide Promise style usage on Ext Ajax related calls.  The library used to support Promise feature is [bluebird][].

## Installation
Download the [ExtPromise.js][] under src folder and the [bluebird.js][] under lib folder.  

Include them with ExtJs into your HTML file similar as below:  

```html
  <script type="text/javascript" src="lib/ext-3.4.1/adapter/ext/ext-base.js"></script>
  <script type="text/javascript" src="lib/ext-3.4.1/ext-all.js"></script>
  <script type="text/javascript" src="lib/bluebird.js"></script>
  <script type="text/javascript" src="lib/ExtPromise.js"></script>
```

Global variable `ExtPromise` will be present after the ExtPromise.js is executed.  

## Usage

Simply make an Ajax call using Promise style like:  

```javascript
    var postData = {param: '{name: "foo"}'};
    ExtPromise.Ajax().request({url: 'bar', method: 'POST', params: postData})
        .then(function(result) {
            var json = JSON.parse(result.responseText);
            // Do what ever you want with the result below
        });
```

The basic usage syntax is:  

```javascript
    ExtPromise.Ajax().request(options).then(successCb, failureCb);
```

And I integrate with bluebird is because I especially like its style on error handling:  


```javascript
    ExtPromise.Ajax().request(options).then(successCb, failureCb)
        .catch(function(e) {
            // Properly handle it
        });
```

## Tests [![Build Status](https://secure.travis-ci.org/kenspirit/ExtPromise.png?branch=master)](https://secure.travis-ci.org/kenspirit/ExtPromise)  

### Only test fake Ajax call simulated using [Sinon.js][]

Open `browser_test.html` in a browser.  

### Include test against simple HTTP server hosted by Node.js

Start the server by `node server.js`.

Access `http://localhost:3000/browser_test.html` in a browser.  

### Test by Karma

Start the server by `node server.js`.

`npm test`
