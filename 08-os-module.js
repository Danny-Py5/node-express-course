const os = require('os');

const uUpTime = os.uptime();

const currentOs = {
    name: os.type(), 
    release: os.release(), 
    totalMem: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + 'gb',
    freeMem: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + 'gb'
};

console.log(currentOs);
