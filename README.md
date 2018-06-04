# dethunk

[![dWebShield-Official](https://img.shields.io/badge/DWEB-Official-brightgreen.svg)](https://https://github.com/benchlab/dweb)[![dWebShield-Auth](https://img.shields.io/badge/DWEB-Auth-brightgreen.svg)](https://https://github.com/benchlab/dweb)
[![build status](http://img.shields.io/travis/benchlab/dethunk.svg?style=flat)](http://travis-ci.org/benchlab/dethunk)<br>
[![dWebShield](https://github.com/benchlab/dweb-shields/blob/master/shields/dweb-protocol-shield.svg)](https://github.com/benchlab/dweb)

Cached results via a deferred computation of parameter-less async functions. Used in dBrowser and with dDrive. 

## Table of Contents

- [Preview](#preview)
- [Installation](#installation)
- [Terms](#terms)
- [Usage](#usage)
- [API](#api)
- [Related Projects](#related-projects)
- [Why Decentralized Internet](#why-the-internet-must-have-a-decentralized-alternative)
- [Bench On The dWeb](#bench-on-the-dweb)
- [License](#license)
- [Copyright](#license)

## Preview
[![dWebShield](https://raw.githubusercontent.com/benchlab/bench-design/master/previews/dethunk.png)](https://github.com/benchlab/dethunk)

## Installation

```
npm i --save dethunk
```
```
yarn add dethunk
```
```
dpack add dethunk
```

## Terms
- **dfeed** - dFeeds are just what they sound like - data feeds. Feeds are permanent data structures that can be shared on the dat network.
- **dwstream** - dWeb Streams are similar to Node.js streams, a tool in the code for reading or writing data. Streams are temporary and almost always returned by functions within modular libraries within the dWeb ecosystem.
- **channel** - dWeb Streams and regular streams, tend to either be readable (giving data) or writable (receiving data). Channeling is when you connected a `Readable dWeb Stream` to a `Writeable dWeb Stream`. 
- **duplicating dwstream** - A stream returned by the duplicate() function can be piped to a peer on the dWeb network. We use this to sync a peer's dFeeds on the dWeb network. 
- **flocking** - Flocking is when a peer, like yourself, adds themselves to the dWeb network, look for other peers and can also refer to peers sharing data with other peers. Channeling a `Duplication dFeed` is when one peer shares a data feed with another single peer. In essence, that data feed is now distributed and then `Seeded` by those two peers. Subsequent peers who `Flock` to that data, become seeds either while viewing or streaming that seed or if they prefer, can seed that data for any period of time. 

## Usage
The follow are several usage examples for the `dethunk` library. 

### Cached Result 

Below, we will create a call "dethunkTest", which will generate a random number and cache the result. Then we will call the same function again and will show how it will only display the same result via the first "dethunkTest" call, since the result was cached - thanks to `dethunked`.

``` js
var dethunk = require('dethunk')

var dethunkTest = dethunk(function (callback) { // We should only accept one inner function - which has to be a callback here.
  console.log('Waiting one second and then returning a random number.')
  setTimeout(function () {
    callback(Math.random())
  }, 1000)
})

dethunkTest(function (num) {  // The first time we call dethunkTest, we call an inner function to generate a random number.
  console.log(num) // We then print that number to the console.
})

dethunkTest(function (num) {  // If dethunkTest is called again, first it waits for the original call to finish and then runs.
  console.log(num) // In this console.log result, is that it's simply a cached version of the original call.
})
```

### Deferred Computation

``` js
var connDb = dethunk(function (callback) {
  db.open(databaseConnStr, callback)
})

var queryDatabase = function (query, callback) {
  connDb(function (err, db) {
    if (err) return callback(err)
    db.query(query, callback)
  })
}

queryDatabase('1st query', function (err, result) { ... } )

queryDatabase('2nd query', function (err, result) { ... } )
```
The first time `connDb` is called and executed, it attempts to connect to and open a specific database.
Any subsequent calls will wait for the first call to complete and then will execute. 

The key piece of `dethunk`, is the fact we can pass any error via connDb to the `queryDatabase` inner-function callback. 

### Example Of How Errors Don't Cache

If the first call ran results in an error, it won't cache. 

``` js
var dethunkBad = dethunk(function (callback) {
  console.log('returning an error')
  callback(new Error('ultimate fail'))
})

dethunkBad(function (err) { // `dethunkBad` is called the first time
  console.log(err)
});

dethunkBad(function (err) { // `dethunkBad` is called again since the first one failed. 
  console.log(err)
})
```

## API 


## Related Projects
- [dws2](https://github.com/distributedweb/dws2) - dwStreams2
- [dws2wrap](https://github.com/distributedweb/dws2wrap) - dwStreams2 Wrapper
- [dws2wrap-codec](https://github.com/distributedweb/dws2wrap-codec) - dwStreams2 Codec
- [dws2wrap-strings](https://github.com/distributedweb/dws2wrap-strings) - dwStreams2 Strings
- [dws2wrap-array](https://github.com/distributedweb/dws2wrap-array) - dwStreams2 Array

## Why The Internet Must Have A Decentralized Alternative
Today, the internet is more censored than ever and it's only getting worse. Our mission with the [dWeb Protocol](https://github.com/benchlab/dweb) was to create a truly powerful P2P protocol, around [benOS](https://github.com/benchlab/benos), [dBrowser](https://github.com/benchlab/dbrowser) and many of benOS' underlying libraries to bring the most powerful P2P products to life. In the last few months, by rebuilding P2P technologies that have existed since the early 2000s, we have built a powerful suite of decentralized libraries for benOS and the Bench Network, that will only improve over time. But we also brought new ideas to life, like:

- [dDrive](https://github.com/benchlab/ddrive)
- [dExplorer](https://github.com/benchlab/dexplorer)
- [dDatabase](https://github.com/benchlab/ddatabase)
- [dSites](https://github.com/benchlab/dsites)
- [dPack](https://github.com/benchlab/dpack) 
- [benFS](https://github.com/benchlab/benfs)
- [DCDN](https://github.com/benchlab/dcdn)
- [Rocketainer](https://github.com/benchlab/rocketainer) 
- [RocketOS](https://github.com/benchlab/rocketos) 
- [dNames](https://github.com/benchlab/dnames) 
- [P2PDNS](https://github.com/benchlab/p2pdns) 
- [dWebFS](https://github.com/benchlab/dwebfs) 
- [dWebDB](https://github.com/benchlab/dwebdb) 
- [MeteorIDE](https://github.com/benchlab/meteorIDE) 
- [Kepler](https://github.com/benchlab/kepler) 
- [Neutron](https://github.com/benchlab/neutron) 
- [Designate](https://github.com/benchlab/designate) 
- [Nova](https://github.com/benchlab/nova) 

and more! These were the protocols and libraries that we needed to create a completely decentralized operating system, where everything was distributed, protected and people were once again in control of their data. benOS is made up of over 1100+ different libraries that we are releasing on a day-by-day basis as we move them to a stable/production state. While financial support is great for this open source project, we need developers who want to be some of the first to build the `dApps` and `dSites` of the future. We have to take back what our forefathers originally designed for freedom, by making our code the law, instead of releasing weak and highly centralized applications where law cannot be applied because the code lacks the foundation to implement a legal framework for itself. Join us for a truly historic journey on the [BenchLabs Telegram](https://t.me/benchlabs). See you there. 

### Bench On The dWeb
[dweb://bench.dnames.io](dweb://bench.dnames.io) // dNames Short Link 
[dweb://3EDAE09848B77401445B7739CAFCE442DDE1752AED63025A1F94E6A86D7E9F04](dweb://3EDAE09848B77401445B7739CAFCE442DDE1752AED63025A1F94E6A86D7E9F04) // dWeb Key Link 

In order to make the links above clickable or to view these links period, you will need [dBrowser](https://github.com/benchlab/dbrowser) (Available for Mac OSX, Linux, Windows and soon to be available on iOS/Android)

#### "The Code Is The Law" - Stan Larimer - Godfather of BitShares.

## License
[MIT](LICENSE.md)

## Copyright 
Copyright (c) 2018 Bench Computer, Inc. All rights reserved. 
