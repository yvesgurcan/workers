!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="dist/",t(t.s=0)}([function(module,exports){eval("var WORKER_ID = 'webWorker';\n\nonmessage = function onmessage(event) {\n  console.log(WORKER_ID, 'received message', {\n    data: event.data\n  });\n  var response = {\n    number: Math.log(event.data.number)\n  };\n  postMessage(response);\n  console.log(WORKER_ID, 'responded', {\n    response: response\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9teVdlYldvcmtlcnMvTXlXZWJXb3JrZXIuanM/N2IyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBXT1JLRVJfSUQgPSAnd2ViV29ya2VyJztcblxub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coV09SS0VSX0lELCAncmVjZWl2ZWQgbWVzc2FnZScsIHsgZGF0YTogZXZlbnQuZGF0YSB9KVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7IG51bWJlcjogTWF0aC5sb2coZXZlbnQuZGF0YS5udW1iZXIpIH07XG5cbiAgICBwb3N0TWVzc2FnZShyZXNwb25zZSlcblxuICAgIGNvbnNvbGUubG9nKFdPUktFUl9JRCwgJ3Jlc3BvbmRlZCcsIHsgcmVzcG9uc2UgfSlcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBQUE7QUFBQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n")}]);