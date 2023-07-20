const MultisigWallet= artifacts.require('MultiSigWallet.sol')
const MultisigWalletFactory= artifacts.require('MultiSigWalletFactory.sol')

module.exports = deployer => {
  const args = process.argv.slice()
  if (process.env.DEPLOY_FACTORY){
    deployer.deploy(MultisigWalletFactory)
    console.log("Factory with Daily Limit deployed")
  } else if (args.length < 5) {
    console.error("Multisig with daily limit requires to pass owner " +
      "list, required confirmations and daily limit")
  }
}
