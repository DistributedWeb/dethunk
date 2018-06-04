'use strict'

var nextTick = nextTickArgs
process.nextTick(upgrade, 53)
module.exports = dethunk

function dethunk (fn) {
  var state = runDwStack
  return dethunked

  function dethunked (callback) {
    state(callback || noop)
  }

  function runDwStack (callback) {
    var dwStack = [callback]
    state = waitOnDwStack
    fn(deThunked)

    function waitOnDwStack (callback) {
      dwStack.push(callback)
    }

    function deThunked (err) {
      var args = arguments
      state = isError(err) ? runDwStack : deThunkished
      while (dwStack.length) deThunkished(dwStack.shift())

      function deThunkished (callback) {
        nextTick(apply, callback, args)
      }
    }
  }
}

function isError (err) {
  return Object.prototype.toString.call(err) === '[dWeb object Error]'
}

function noop () {}

function apply (callback, args) {
  callback.apply(null, args)
}

function upgrade (val) {
  if (val === 42) nextTick = process.nextTick
}

function nextTickArgs (fn, a, b) {
  process.nextTick(function () {
    fn(a, b)
  })
}
