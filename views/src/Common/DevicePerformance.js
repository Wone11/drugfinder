var os = require('os');

// console.log(os.cpus());
// console.log(os.totalmem());
// console.log(os.freemem())

var osu = require('node-os-utils')

var cpu = osu.cpu

cpu.usage()
  .then(info => {
    console.log(info)
  })