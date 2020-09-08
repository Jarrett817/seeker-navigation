// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"i8is":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderOptions = void 0;
var $searchForm = $('.searchForm');

var renderOptions = function renderOptions() {
  var $option = $("\n            <div class=\"visible\">\n             <div class=\"shade\"></div>\n             <div class=\"option-wrapper\">\n                <span>\u4FEE\u6539\u5FEB\u6377\u65B9\u5F0F</span>\n                <span>\u7F51\u5740</span>\n                <input  type=\"text\" class=\"url-input\" autofocus>\n                <div class=\"buttons\">\n                <button class=\"delete\">\u5220\u9664</button>\n                <button class=\"cancel\">\u53D6\u6D88</button>\n                <button class=\"ok\">\u5B8C\u6210</button>\n                </div>\n            </div>\n            </div>\n").insertBefore($searchForm);
};

exports.renderOptions = renderOptions;
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _option = require("./option");

var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}]; //对输入的字符串格式化

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  //渲染之前先删除已添加的节点重新渲染
  $siteList.find('li:not(.last)').remove(); //每次渲染都遍历hash

  hashMap.forEach(function (node, index) {
    var $newLi = $("\n    <li>\n    <div class=\"site\">\n      <div class=\"logo\">".concat(node.logo, "</div>\n        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n          <div class=\"options\">\n            <svg class=\"icon\" aria-hidden=\"true\">\n              <use xlink:href=\"#icon-xuanxiang\"></use>\n            </svg>\n            </div>\n          </div>\n    </li>")).insertBefore($lastLi);
    $newLi.on('click', function () {
      window.open(node.url);
    }); //关闭弹框

    var closeOptions = function closeOptions() {
      $('.visible').remove();
    }; //删除


    $newLi.on('click', '.options', function (e) {
      //弹出对话框并且使遮罩显示
      (0, _option.renderOptions)();
      e.stopPropagation();
      $('.delete').on('click', function () {
        closeOptions();
        confirm('确认删除？') ? hashMap.splice(index, 1) : null;
        render();
      });
      $('.cancel').on('click', function () {
        closeOptions();
        render();
      });

      var updateUrl = function updateUrl() {
        //先获取input的输入
        var input = $('.url-input');
        var url = input.val();
        console.log($('.url-input'));

        if (url) {
          if (url.indexOf('http') !== 0) {
            url = 'https://' + url;
          }

          hashMap[index].logo = simplifyUrl(url)[0].toUpperCase();
          hashMap[index].url = url;
          input.remove(0);
          console.log(hashMap);
          closeOptions();
          render();
        } else {
          alert('未输入网址！');
          return;
        }
      };

      $('.ok').on('click', function () {
        updateUrl();
      });
      $('.option-wrapper').on('keypress', function (e) {
        var key = e.key;

        if (key === 'Enter') {
          updateUrl();
        }
      });
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入你要添加的网站');

  if (!url) {
    alert('未输入网址！！');
    return;
  }

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
}); //关闭前保存

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;

  if ($('.visible')) {
    return;
  }

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{"./option":"i8is"}]},{},["epB2"], null)
//# sourceMappingURL=main.94804436.js.map