// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"epB2":[function(require,module,exports) {
$(function () {
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                var local = getDate();
                local.push({
                    title: $(this).val(),
                    done: false
                });
                saveDate(local);
                load();
                $(this).val("");
            }
        }
    });
    $("ol, ul").on("click", "a", function () {
        var data = getDate();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveDate(data);
        load();
    });
    $("ol, ul").on("click", "input", function () {
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveDate(data);
        load();
    });

    function getDate() {
        var data = localStorage.getItem("todoList");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function saveDate(data) {
        localStorage.setItem("todoList", JSON.stringify(data));
    }

    function load() {
        var data = getDate();
        $("ol, ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function (i, data) {
            if (data.done) {
                $("ul").prepend("\n                  <li>\n                    <input type=\"checkbox\" checked >\n                    <p>" + data.title + "</p>\n                    <a href=\"javascript:;\" id=" + i + "></a>\n                  </li>");
                doneCount++;
            } else {
                $("ol").prepend("\n                    <li>\n                      <input type=\"checkbox\" >\n                      <p>" + data.title + "</p>\n                      <a href=\"javascript:;\" id=" + i + "></a>\n                    </li>");
                todoCount++;
            }
        });
        $("#todoCount").text(todoCount);
        $("#doneCount").text(doneCount);
    }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.477b51a6.map