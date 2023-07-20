require('dotenv').config()

var HDWalletProvider = require('truffle-hdwallet-provider')
var KlaytnHDWalletProvider = require('truffle-hdwallet-provider-klaytn')
var Caver = require('caver-js')

var rinkebyMnemonic = process.env.RINKEBY_MNEMONIC || ''
var goerliMnemonic = process.env.GOERLI_MNEMONIC || ''
var mumbaiMnemonic = process.env.MUMBAI_MNEMONIC || ''
var mainnetMnemonic = process.env.MAINNET_MNEMONIC || ''
var klaytnPrivateKey = process.env.KLAYTN_PRIVATE_KEY || ''
var baobabPrivateKey = process.env.BAOBAB_PRIVATE_KEY || ''
var infuraKey = process.env.INFURA_KEY || '';

var kasAccessKeyId = process.env.KAS_ACCESS_KEY_ID || ''
var kasSecretAccessKey = process.env.KAS_SECRET_KEY || ''

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 9545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    timetest: {
      provider: function () {
        return new HDWalletProvider(goerliMnemonic, 'https://testnet-rpc.timenetwork.io')
      },
      from: '0x239D21085b898C8c276B6c07E034290EbAF53208',
      network_id: '2731',
      networkCheckTimeout: 100000,
      gas: '30000000',
      gasLimit: '21000',
      gasPrice: 1000000000
    },
    baobab: {
      provider: () => {
        const options = {
          headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(kasAccessKeyId + ':' + kasSecretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: '1001' }
          ],
          keepAlive: false,
        }
//        return new KlaytnHDWalletProvider(baobabPrivateKey, "https://api.baobab.klaytn.net:8651")
        return new KlaytnHDWalletProvider(baobabPrivateKey, new Caver.providers.HttpProvider("https://api.baobab.klaytn.net:8651", options))
      },
      from: '0xF9E4497F40Af11952ea0b7947b9b42a1A9959c30',
      network_id: '1001',
      networkCheckTimeout: 10000,
      gas: '8500000',
      gasPrice:'750000000000'
    },
    klaytn: {
      provider: () => {
        const options = {
          headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(kasAccessKeyId + ':' + kasSecretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: '8217' }
          ],
          keepAlive: false,
        }
        // return new KlaytnHDWalletProvider(klaytnPrivateKey, new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", options))
        return new KlaytnHDWalletProvider(klaytnPrivateKey, new Caver.providers.HttpProvider("https://public-en-cypress.klaytn.net", options))
        
      },
      //from: '0x88B0b03634BbB91fFc735Cf4D5e866fFa3DF45D6',
      from: '0x7f776808F6324B3F5146d82558053bEC90B8c159',
      network_id: '8217',
      networkCheckTimeout: 10000,
      gas: '8500000',
      gasPrice:'25000000000'
    }

    // Another network with more advanced options...
    // advanced: {
      // port: 8777,             // Custom port
      // network_id: 1342,       // Custom network
      // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      // from: <address>,        // Account to send txs from (default: accounts[0])
      // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },

    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
      // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
      // network_id: 3,       // Ropsten's id
      // gas: 5500000,        // Ropsten has a lower block limit than mainnet
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },

    // Useful for private networks
    // private: {
      // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
      // network_id: 2111,   // This network is yours, in the cloud.
      // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17",   // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,       // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {         // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 10000000   //200
        },
        // evmVersion: "byzantium"
      }
    }
  },

  plugins: [
    // 'truffle-contract-size' // plugin to check the contract size
  ]
}
