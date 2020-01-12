var ip = require("ip");


const myIp = () =>{
    return ip.address();
} 

exports.myIp = myIp;
