require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
};

const goerli_url=process.env.goerli_url
const private_key=process.env.private_key;
// console.warn(goerli_url)
module.exports={
   solidity:'0.8.17',
   networks:{
    goerli:{
      url:goerli_url,
      accounts:[private_key]
    }
   }
}
