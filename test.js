var tape = require('tape')
var dethunk = require('./')

tape('Dethunk RanOnce Test Series', function (t) {
  t.plan(3)

  var ranDwStack = 0
  var runDwStack = dethunk(function (cb) {
    ranDwStack++
    cb()
  })

  runDwStack(function () {
    t.same(ranDwStack, 1, 'Dethunk Ran Test #1')
  })
  runDwStack(function () {
    t.same(ranDwStack, 1, 'Dethunk Ran Test #2')
  })
  runDwStack(function () {
    t.same(ranDwStack, 1, 'Dethunk Ran Test #3')
  })
})

tape('Dethunk RanOnce On Async Test Series', function (t) {
  t.plan(3)

  var ranDwStack = 0
  var runDwStack = dethunk(function (cb) {
    process.nextTick(function () {
      ranDwStack++
      cb()
    })
  })

  runDwStack(function () {
    t.same(ranDwStack, 1, 'Dethunk Ran On Async Test #1')
  })
  runDwStack(function () {
    t.same(ranDwStack, 1, 'Dethunk Ran On Async Test #2')
  })
  runDwStack(function () {
    t.same(ranDwStack, 1, 'Dethunk Ran On Async Test #3')
  })
})

tape('Dethunk Argument Passing Tests', function (t) {
  t.plan(6)

  var ranDwStack = 0
  var runDwStack = dethunk(function (cb) {
    ranDwStack++
    cb({greetings: 'martian'})
  })

  runDwStack(function (val) {
    t.same(ranDwStack, 1, 'Dethunk Argument Passing Test #1')
    t.same(val, {greetings: 'martian'})
    runDwStack(function (val) {
      t.same(ranDwStack, 1, 'Dethunk Argument Passing Test #2')
      t.same(val, {greetings: 'martian'})
      runDwStack(function (val) {
        t.same(ranDwStack, 1, 'Dethunk Argument Passing Test #3')
        t.same(val, {greetings: 'martian'})
      })
    })
  })
})

tape('Dethunk Optional Callback Tests', function (t) {
  t.plan(2)

  var ranDwStack = 0
  var runDwStack = dethunk(function (cb) {
    ranDwStack++
    cb({greetings: 'martian'})
  })

  runDwStack()
  runDwStack(function (val) {
    t.same(ranDwStack, 1, 'Dethunk Optional Callback Test #1')
    t.same(val, {greetings: 'martian'})
  })
})

tape('Dethunk Remain Asynced Tests', function (t) {
  t.plan(2)

  var runDwStack = dethunk(function (cb) {
    process.nextTick(cb)
  })

  var sync = true
  runDwStack(function () {
    t.ok(!sync, 'Dethunk SyncFalse Test #1')
    var innerSync = true
    runDwStack(function () {
      t.ok(!innerSync, 'Dethunk SyncFalse Test #2')
    })
    innerSync = false
  })
  sync = false
})
