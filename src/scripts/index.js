require('./lib/zepto/dist/zepto.js');
var IScroll = require('./lib/iscroll/build/iscroll.js');

var indexTpl = require('./index.string');
document.body.innerHTML += indexTpl;

$(function () {
  // console.log(0);
//window.onload = function () {
  var myScroll = new IScroll('#index-scroll');
//}
});
