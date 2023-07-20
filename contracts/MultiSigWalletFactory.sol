// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Factory.sol";
import "./MultiSigWallet.sol";

contract MultiSigWalletFactory is Factory {

    /*
     * Public functions
     */
    /// @dev Allows verified creation of multisignature wallet.
    /// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    /// @return wallet wallet address.
    function create(address[] memory _owners, uint _required)
        public
        returns (address wallet)
    {
        wallet = address(new MultiSigWallet(_owners, _required));
        register(wallet);
    }
}
