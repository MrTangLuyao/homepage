/* jscpp-worker.js — runs JSCPP in a Web Worker with blocking stdin via Atomics */
importScripts('JSCPP.es5.min.js');

var stdinCtrl = null;   // Int32Array[0]=state, [1]=data len
var stdinData = null;   // Uint8Array for stdin bytes

self.__stdinCtrl = null;
self.__stdinData = null;

self.onmessage = function(msg) {
  var d = msg.data;
  if (d.type !== 'run') return;

  stdinCtrl = new Int32Array(d.sharedCtrl);
  stdinData = d.sharedData;
  self.__stdinCtrl = stdinCtrl;
  self.__stdinData = stdinData;

  var jscpp = self.JSCPP;
  var run = typeof jscpp.run === 'function'
    ? jscpp.run.bind(jscpp)
    : (jscpp.default && typeof jscpp.default.run === 'function')
      ? jscpp.default.run.bind(jscpp.default)
      : null;

  if (!run) {
    self.postMessage({ type: 'error', message: 'JSCPP not loaded' });
    return;
  }

  self.__cOut = function(s) {
    self.postMessage({ type: 'output', text: s });
  };

  try {
    run(d.code, '', { maxTimeout: 0 });
    self.postMessage({ type: 'done' });
  } catch(e) {
    self.postMessage({ type: 'error', message: e.message || String(e) });
  } finally {
    delete self.__cOut;
  }
};
