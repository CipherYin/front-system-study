"use strict";

var babel = require("babel-core");
console.log(babel);
var arr = [];
for (var i = 0; i < 10; i++) {
  arr[i] = function (i) {
    console.log(i);
  }(i);
}
