pragma solidity ^0.5.17;

/*******************************************************************************
 *
 * Copyright (c) 2020 Modenero Corp.
 * Released under the MIT License.
 *
 * nexa Exchange - A 100% non-custodial, cross-chain exchange.
 *
 * Version 20.11.6
 *
 * https://modenero.com
 * support@modenero.com
 */


/*******************************************************************************
 *
 * SafeMath
 */
library SafeMath {
    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}


/*******************************************************************************
 *
 * ECRecovery
 *
 * Contract function to validate signature of pre-approved token transfers.
 * (borrowed from LavaWallet)
 */
contract ECRecovery {
    function recover(bytes32 hash, bytes memory sig) public pure returns (address);
}


/*******************************************************************************
 *
 * ERC Token Standard #20 Interface
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
 */
contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


/*******************************************************************************
 *
 * ApproveAndCallFallBack
 *
 * Contract function to receive approval and execute function in one call
 * (borrowed from MiniMeToken)
 */
contract ApproveAndCallFallBack {
    function approveAndCall(address spender, uint tokens, bytes memory data) public;
    function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public;
}


/*******************************************************************************
 *
 * Owned contract
 */
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }

    function acceptOwnership() public {
        require(msg.sender == newOwner);

        emit OwnershipTransferred(owner, newOwner);

        owner = newOwner;

        newOwner = address(0);
    }
}


/*******************************************************************************
 *
 * ModeneroDb Interface
 */
contract ModeneroDbInterface {
    /* Interface getters. */
    function getAddress(bytes32 _key) external view returns (address);
    function getBool(bytes32 _key)    external view returns (bool);
    function getBytes(bytes32 _key)   external view returns (bytes memory);
    function getInt(bytes32 _key)     external view returns (int);
    function getString(bytes32 _key)  external view returns (string memory);
    function getUint(bytes32 _key)    external view returns (uint);

    /* Interface setters. */
    function setAddress(bytes32 _key, address _value) external;
    function setBool(bytes32 _key, bool _value) external;
    function setBytes(bytes32 _key, bytes calldata _value) external;
    function setInt(bytes32 _key, int _value) external;
    function setString(bytes32 _key, string calldata _value) external;
    function setUint(bytes32 _key, uint _value) external;

    /* Interface deletes. */
    function deleteAddress(bytes32 _key) external;
    function deleteBool(bytes32 _key) external;
    function deleteBytes(bytes32 _key) external;
    function deleteInt(bytes32 _key) external;
    function deleteString(bytes32 _key) external;
    function deleteUint(bytes32 _key) external;
}


/*******************************************************************************
 *
 * @notice nexa Exchange
 *
 * @dev Developer details.
 */
contract nexaExchange is Owned {
    using SafeMath for uint;

    /* Initialize predecessor contract. */
    address private _predecessor;

    /* Initialize successor contract. */
    address private _successor;

    /* Initialize revision number. */
    uint private _revision;

    /* Initialize Modenero Db contract. */
    ModeneroDbInterface private _modeneroDb;

    /**
     * Set Namespace
     *
     * Provides a "unique" name for generating "unique" data identifiers,
     * most commonly used as database "key-value" keys.
     *
     * NOTE: Use of `namespace` is REQUIRED when generating ANY & ALL
     *       ModeneroDb keys; in order to prevent ANY accidental or
     *       malicious SQL-injection vulnerabilities / attacks.
     */
    string private _namespace = 'nexaexchange';

    /* Initialize (token) balances. */
    mapping(address => mapping(address => uint)) private _balances;

    /* Initialize (escrow) balances. */
    mapping(bytes32 => uint) private _escrows;

    /* Initialize (escrow) taker authorizations. */
    mapping(bytes32 => address) private _takers;

    /* Initialize (escrow) expirations. */
    mapping(bytes32 => uint) private _expirations;

    /* Initialize expired signature flags. */
    mapping(bytes32 => bool) private _expiredSignatures;

    /* Initialize revision depth. */
    // NOTE: Allows for balance and transaction aggregation
    //       from legacy nexa Exchange contract instance(s).
    // FIXME Determine the MAXIMUM depth and set here.
    //       Estimated to be between 100-200
    uint private _MAX_REVISION_DEPTH = 0;

    event Created(
        address indexed primary,
        address secondary,
        bytes data
    );

    event Completed(
        address indexed primary,
        address secondary,
        bytes data
    );

    event Deposit(
        address indexed token,
        address owner,
        uint tokens,
        bytes data
    );

    event Escrowed(
        address indexed maker,
        address taker,
        address token,
        uint amount
    );

    event Transfer(
        address indexed token,
        address sender,
        address receiver,
        uint tokens
    );

    event Withdraw(
        address indexed token,
        address owner,
        uint tokens
    );


    /***************************************************************************
     *
     * Constructor
     */
    constructor() public {
        /* Initialize ModeneroDb (eternal) storage database contract. */
        // NOTE We hard-code the address here, since it should never change.
        // _modeneroDb = ModeneroDbInterface(0xE865Fe1A1A3b342bF0E2fcB11fF4E3BCe58263af);
        _modeneroDb = ModeneroDbInterface(0x4C2f68bCdEEB88764b1031eC330aD4DF8d6F64D6); // ROPSTEN
        // _modeneroDb = ModeneroDbInterface(0x3e246C5038287DEeC6082B95b5741c147A3f49b3); // KOVAN

        /* Initialize (aname) hash. */
        bytes32 hash = keccak256(abi.encodePacked('aname.', _namespace));

        /* Set predecessor address. */
        _predecessor = _modeneroDb.getAddress(hash);

        /* Verify predecessor address. */
        if (_predecessor != address(0x0)) {
            /* Make address payable. */
            address payable predecessor = address(uint160(_predecessor));

            /* Retrieve the last revision number (if available). */
            uint lastRevision = nexaExchange(predecessor).getRevision();

            /* Set (current) revision number. */
            _revision = lastRevision + 1;
        }
    }

    /**
     * @dev Only allow access to an authorized Modenero administrator.
     */
    modifier onlyAuthByModenero() {
        /* Verify write access is only permitted to authorized accounts. */
        require(_modeneroDb.getBool(keccak256(
            abi.encodePacked(msg.sender, '.has.auth.for.', _namespace))) == true);

        _;      // function code is inserted here
    }


    /**
     * Deposit
     *
     * Provides support for "pre-approved" token deposits.
     *
     * NOTE: Required pre-allowance/approval is required in order
     *       to successfully complete the transfer.
     */
    function deposit(
        address _token,
        address _from,
        uint _tokens,
        bytes calldata _data
    ) external returns (bool success) {
        /* Make deposit. */
        return _deposit(_token, _from, _tokens, _data);
    }

    /**
     * Receive Approval
     *
     * Will typically be called from `approveAndCall`.
     *
     * NOTE: Owner can assign ANY address to receive the deposit
     *       (including their own). By default, owner will be used.
     */
    function receiveApproval(
        address _from,
        uint _tokens,
        address _token,
        bytes memory _data
    ) public returns (bool success) {
        /* Make deposit. */
        return _deposit(_token, _from, _tokens, _data);
    }

    /**
     * Deposit
     *
     * Deposits ANY ERC20-compatible token into this contract.
     *
     * NOTE: Owners maintain 100% control* of their token(s)
     *       at all times.
     *
     *       * Administrators have the ability to return tokens
     *         back to their ORIGINAL owners AT ANY TIME.
     *         FOR COMPLIANCE PURPOSES ONLY
     */
    function _deposit(
        address _token,
        address _from,
        uint _tokens,
        bytes memory _data
    ) private returns (bool success) {
        /* Transfer the ERC-20 tokens into Cache. */
        // NOTE: Transfer tokens before credit to prevent re-entry attack.
        ERC20Interface(_token).transferFrom(
            _from, address(this), _tokens);

        /* Initialize receiver (address). */
        address receiver = address(0x0);

        /**
         * If `_data` is an `address`, then set the value to `receiver`.
         * e.g. when `approveAndCall` is made from a contract
         * (representing the owner).
         */
        if (_data.length == 20) {
            /* Retrieve the receiver's address from `data` payload. */
            receiver = _bytesToAddress(_data);
        } else {
            /* Set receiver to `from` (also the token owner). */
            receiver = _from;
        }

        /* Increase receiver balance. */
        _balances[_token][receiver] =
            _balances[_token][receiver].add(_tokens);

        /* Broadcast event. */
        emit Deposit(_token, receiver, _tokens, _data);

        /* Return success. */
        return true;
    }

    /**
     * Withdraw
     */
    function withdraw(
        address _token,
        uint _tokens
    ) public returns (bool success) {
        return _withdraw(msg.sender, _token, _tokens);
    }

    /**
     * Withdraw
     *
     * We allow administrative withdrawls of tokens held
     * in the nexa Exchange, FOR COMPLIANCE PURPOSES ONLY.
     *
     * NOTE: This function is reserved for exclusive use by
     *       Modenero Administration ONLY.
     *
     *       Tokens withdrawn by an administrator can
     *       ONLY be transferred to the ORIGINAL owner.
     */
    function withdraw(
        address _owner,
        address _token,
        uint _tokens
    ) onlyAuthByModenero external returns (bool success) {
        return _withdraw(_owner, _token, _tokens);
    }

    /**
     * Withdraw
     *
     * Allows the withdrawl of tokens held in the nexa Exchange
     * back to the ORIGINAL owner.
     */
    function _withdraw(
        address _owner,
        address _token,
        uint _tokens
    ) private returns (bool success) {
        /* Validate balance. */
        if (_balances[_token][_owner] < _tokens) {
            revert('Oops! You DO NOT have enough tokens.');
        }

        /* Decrease owner balance by token amount. */
        // NOTE: Decrease balance before transfer to prevent re-entry attack.
        _balances[_token][_owner] =
            _balances[_token][_owner].sub(_tokens);

        /* Transfer requested tokens to owner. */
        ERC20Interface(_token).transfer(_owner, _tokens);

        /* Broadcast event. */
        emit Withdraw(_token, _owner, _tokens);

        /* Return success. */
        return true;
    }

    /**
     * Transfer
     *
     * Transfers the "specified" ERC-20 tokens held by the sender
     * to the receiver's account.
     */
    function transfer(
        address _token,
        address _to,
        uint _tokens
    ) external returns (bool success) {
        return _transfer(
            _token, msg.sender, _to, _tokens);
    }

    /**
     * (Relayed) Transfer
     *
     * This transfer requires an off-chain (EC) signature, from the
     * account holder, detailing the transaction.
     *
     * Staekholder
     * -----------
     *
     * Users may choose to boost the speed of execution for their
     * transfer request, decreasing the delivery time to near instant
     * (highest priority for miners to process) confirmation.
     *
     * TODO: Let's implement GasToken to provide staekholders an opportunity
     *       to hedge against the volatility of future gas prices.
     *       (source: https://gastoken.io/)
     */
    function transfer(
        address _token,             // contract address
        address _from,              // sender's address
        address _to,                // receiver's address
        uint _tokens,               // quantity of tokens
        address _feeToken,          // fee token
        uint _feeAmount,            // fee amount
        uint _expires,              // expiration time
        uint _nonce,                // unique integer
        bytes calldata _signature   // signed message
    ) external returns (bool success) {
        /* Calculate transfer hash. */
        bytes32 transferHash = keccak256(abi.encodePacked(
            address(this),
            _token,
            _from,
            _to,
            _tokens,
            _feeToken,
            _feeAmount,
            _expires,
            _nonce
        ));

        /* Validate request has authorized signature. */
        bool requestHasAuthSig = _requestHasAuthSig(
            _from,
            transferHash,
            _expires,
            _signature
        );

        /* Validate authorization. */
        if (!requestHasAuthSig) {
            revert('Oops! This relay request is NOT valid.');
        }

        /* Validate boost fee and pay (if necessary). */
        // TODO: Allow approved tokens to be used as fee.
        // if (_feeToken != 0x0 && _feeAmount > 0) {
        //     _addFee(_from, _feeToken, _feeAmount);
        // }

        /* Request token transfer. */
        return _transfer(
            _token, _from, _to, _tokens);
    }

    /**
     * Transfer
     *
     * Transfers the "specified" ERC-20 token(s) held by the sender
     * to the receiver's account.
     */
    function _transfer(
        address _token,
        address _from,
        address _to,
        uint _tokens
    ) private returns (bool success) {
        /* Validate balance. */
        if (_balances[_token][_from] < _tokens) {
            revert('Oops! You DO NOT have enough tokens.');
        }

        /* Remove the transfer value from sender's balance. */
        // NOTE: We decrease balance before adding to prevent re-entry attack.
        _balances[_token][_from] = _balances[_token][_from].sub(_tokens);

        /* Add the transfer value to the receiver's balance. */
        _balances[_token][_to] = _balances[_token][_to].add(_tokens);

        /* Broadcast event. */
        emit Transfer(
            _token,
            _from,
            _to,
            _tokens
        );

        /* Return success. */
        return true;
    }

    /**
     * Create Escrow
     */
    function createEscrow (
        address _token,
        address _taker,
        bytes32 _secretHash,
        uint _amount,
        uint _expiration
    ) external {
        /* Validate account balance. */
        require(_balances[_token][msg.sender] >= _amount,
            'You DO NOT have enough funds in your account.');

        /* Reduce token balance by escrow amount. */
        _balances[_token][msg.sender] =
            _balances[_token][msg.sender].sub(_amount);

        /* Set order id. */
        bytes32 orderid = generateOrderid(msg.sender, _token, _secretHash);

        /* Increase escrow balance by escrow amount. */
        _escrows[orderid] = _escrows[orderid].add(_amount);

        /* Increase escrow balance by escrow amount. */
        _expirations[orderid] = _expiration;

        /* Authorize a taker to an order id. */
        _takers[orderid] = _taker;

        /* Broadcast event. */
        emit Escrowed(
            msg.sender,
            _taker,
            _token,
            _amount
        );
    }

    /**
     * Payout
     *
     * NOTE: SHA-256 is available in CashScript.
     *       (source: https://cashscript.org/docs/language/functions/#sha256)
     */
    function payout (
        address _maker,
        address _tokenAddress,
        bytes32 _secret
    ) external {
        bytes32 secretHash = generateSecretHash(_secret);

        /* Set order id. */
        bytes32 orderid = generateOrderid(_maker, _tokenAddress, secretHash);

        address taker = _takers[orderid];

        require(msg.sender == taker);

        uint expiration = _expirations[orderid];

        /* Validate expiration. */
        // NOTE: We require takers to payout BEFORE the expiration block height is reached.
        require(block.number <= expiration);

        /* Set escrow value. */
        uint escrowValue = _escrows[orderid];

        /* Close escrow. */
        _escrows[orderid] = 0;

        /* Reduce token balance by escrow amount. */
        _balances[_tokenAddress][taker] =
            _balances[_tokenAddress][taker].add(escrowValue);
    }

    /**
     * Reclaim
     *
     * In the event that the swap expires (reaches a specified block height),
     * the seller can request a 100% refund.
     */
    function reclaim (
        address _tokenAddress,
        bytes32 _secretHash
    ) public {
        /* Set order id. */
        bytes32 orderid = generateOrderid(msg.sender, _tokenAddress, _secretHash);

        uint expiration = _expirations[orderid];

        /* Validate expiration. */
        // NOTE: We require makers to wait until AFTER the expiration block height is reached.
        require(block.number >= expiration);

        uint escrowValue = _escrows[orderid];

        /* Increase escrow balance by escrow amount. */
        _escrows[orderid] = 0;

        /* Reduce token balance by escrow amount. */
        _balances[_tokenAddress][msg.sender] =
            _balances[_tokenAddress][msg.sender].add(escrowValue);
    }


    /***************************************************************************
     *
     * GETTERS
     *
     */

    /**
     * Get the token balance for account `tokenOwner`
     */
    function balanceOf(
        address _token,
        address _owner
    ) external view returns (uint balance) {
        /* Return balance. */
        return balanceOf(
            _token, _owner, _MAX_REVISION_DEPTH);
    }

    /**
     * Get the token balance for account `tokenOwner`
     *
     * NOTE: Supports a virtually unlimited depth,
     *       limited ONLY by the supplied gas amount.
     */
    function balanceOf(
        address _token,
        address _owner,
        uint _depth
    ) public view returns (uint balance) {
        /* Retrieve (current) balance. */
        balance = _balances[_token][_owner];

        /* Initialize legacy instance (to current predecessor). */
        address legacyInstance = getPredecessor();

        /* Validate legacy instance. */
        if (legacyInstance != address(0x0)) {
            /* Initialize total legacy balance. */
            uint totalLegacyBalance = 0;

            /* Loop through legacy instances for balance. */
            for (uint i = 0; i < _depth; i++) {
                /* Retrieve balance. */
                uint legacyBalance = nexaExchange(legacyInstance)
                    .balanceOf(_token, _owner);

                /* Add to legacy balance total. */
                totalLegacyBalance = totalLegacyBalance.add(legacyBalance);

                /* Set the next legacy instance / predecessor (if available). */
                legacyInstance = nexaExchange(legacyInstance).getPredecessor();

                /* Validate legacy instance. */
                if (legacyInstance == address(0x0)) {
                    /* Break the loop. */
                    break;
                }
            }

            /* Add total legacy balance. */
            balance = balance.add(totalLegacyBalance);
        }
    }

    function generateSecretHash(
        bytes32 _secret
    ) public pure returns (bytes32) {
        return sha256(abi.encodePacked(_secret));
    }

    function generateOrderid(
        address _maker,
        address _tokenAddress,
        bytes32 _secretHash
    ) public pure returns (bytes32) {
        /* Generate order id. */
        bytes32 orderid = sha256(abi.encodePacked(_maker, _tokenAddress, _secretHash));

        /* Return order id. */
        return orderid;
    }


    function getEscrow(
        address _maker,
        address _tokenAddress,
        bytes32 _secretHash
    ) external view returns (
        address,
        uint
    ) {
        /* Set order id. */
        bytes32 orderid = generateOrderid(_maker, _tokenAddress, _secretHash);

        return (
            _takers[orderid],
            _expirations[orderid]
        );
    }

    /**
     * Get Revision (Number)
     */
    function getRevision() public view returns (uint) {
        return _revision;
    }

    /**
     * Get Predecessor (Address)
     */
    function getPredecessor() public view returns (address) {
        return _predecessor;
    }

    /**
     * Get Successor (Address)
     */
    function getSuccessor() public view returns (address) {
        return _successor;
    }


    /***************************************************************************
     *
     * SETTERS
     *
     */

    /**
     * Set Successor
     *
     * This is the contract address that replaced this current instnace.
     */
    function setSuccessor(
        address _newSuccessor
    ) onlyAuthByModenero external returns (bool success) {
        /* Set successor contract. */
        _successor = _newSuccessor;

        /* Return success. */
        return true;
    }


    /***************************************************************************
     *
     * INTERFACES
     *
     */

    /**
     * Supports Interface (EIP-165)
     *
     * (see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md)
     *
     * NOTE: Must support the following conditions:
     *       1. (true) when interfaceID is 0x01ffc9a7 (EIP165 interface)
     *       2. (false) when interfaceID is 0xffffffff
     *       3. (true) for any other interfaceID this contract implements
     *       4. (false) for any other interfaceID
     */
    function supportsInterface(
        bytes4 _interfaceID
    ) external pure returns (bool) {
        /* Initialize constants. */
        bytes4 InvalidId = 0xffffffff;
        bytes4 ERC165Id = 0x01ffc9a7;

        /* Validate condition #2. */
        if (_interfaceID == InvalidId) {
            return false;
        }

        /* Validate condition #1. */
        if (_interfaceID == ERC165Id) {
            return true;
        }

        // TODO Add additional interfaces here.

        /* Return false (for condition #4). */
        return false;
    }

    /**
     * ECRecovery Interface
     */
    function _ecRecovery() private view returns (
        ECRecovery ecrecovery
    ) {
        /* Initialize hash. */
        bytes32 hash = keccak256('aname.ecrecovery');

        /* Retrieve value from Modenero Db. */
        address aname = _modeneroDb.getAddress(hash);

        /* Initialize interface. */
        ecrecovery = ECRecovery(aname);
    }


    /***************************************************************************
     *
     * UTILITIES
     *
     */

    /**
     * Request Hash Authorized Signature
     *
     * Validates ALL signature requests by:
     *     1. Uses ECRecovery to validate the signature.
     *     2. Verify expiration against the current block number.
     *     3. Sets a flag to block re-use of signature.
     */
    function _requestHasAuthSig(
        address _from,
        bytes32 _authHash,
        uint _expires,
        bytes memory _signature
    ) private returns (bool success) {
        /* Calculate signature hash. */
        bytes32 sigHash = keccak256(abi.encodePacked(
            '\x19Ethereum Signed Message:\n32', _authHash));

        /* Validate signature expiration. */
        if (_expiredSignatures[sigHash]) {
            return false;
        }

        /* Set expiration flag. */
        // NOTE: Set a flag here to prevent double-spending.
        _expiredSignatures[sigHash] = true;

        /* Validate the expiration time. */
        if (block.number > _expires) {
            return false;
        }

        /* Retrieve the authorized account (address). */
        address authorizedAccount =
            _ecRecovery().recover(sigHash, _signature);

        /* Validate the signer matches owner of the tokens. */
        if (_from != authorizedAccount) {
            return false;
        }

        /* Return success. */
        return true;
    }

    /**
     * Is (Owner) Contract
     *
     * Tests if a specified account / address is a contract.
     */
    function _ownerIsContract(
        address _owner
    ) private view returns (bool isContract) {
        /* Initialize code length. */
        uint codeLength;

        /* Run assembly. */
        assembly {
            /* Retrieve the size of the code on target address. */
            codeLength := extcodesize(_owner)
        }

        /* Set test result. */
        isContract = (codeLength > 0);
    }

    /**
     * Bytes-to-Address
     *
     * Converts bytes into type address.
     */
    function _bytesToAddress(
        bytes memory _address
    ) private pure returns (address) {
        uint160 m = 0;
        uint160 b = 0;

        for (uint8 i = 0; i < 20; i++) {
            m *= 256;
            // b = uint160(_address[i]); // NOTE: This line broke in v0.5.0
            b = uint160(uint8(_address[i])); // NOTE: This HAS NOT been tested yet.
            m += (b);
        }

        return address(m);
    }

    /**
     * Convert Bytes to Bytes32
     */
    function _bytesToBytes32(
        bytes memory _data,
        uint _offset
    ) private pure returns (bytes32 result) {
        /* Loop through each byte. */
        for (uint i = 0; i < 32; i++) {
            /* Shift bytes onto result. */
            result |= bytes32(_data[i + _offset] & 0xFF) >> (i * 8);
        }
    }

    /**
     * Convert Bytes32 to Bytes
     *
     * NOTE: Since solidity v0.4.22, you can use `abi.encodePacked()` for this,
     *       which returns bytes. (https://ethereum.stackexchange.com/a/55963)
     */
    function _bytes32ToBytes(
        bytes32 _data
    ) private pure returns (bytes memory result) {
        /* Pack the data. */
        return abi.encodePacked(_data);
    }
}
