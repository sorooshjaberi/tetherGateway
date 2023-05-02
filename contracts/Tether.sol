// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

interface TetherToken {
    function balanceOf(address _owner) external view returns (uint256 balance);

    function transfer(
        address _to,
        uint256 _value
    ) external returns (bool success);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

    function approve(
        address _spender,
        uint256 _value
    ) external returns (bool success);

    function allowance(
        address _owner,
        address _spender
    ) external view returns (uint256 remaining);
}

contract TetherGateway {
    address owner;
    TetherToken USDT = TetherToken(0x337610d27c682E347C9cD60BD4b3b107C9d34dDd);

    function deposit(uint amount_) public {
        // USDT.approve(address(this), amount_);
        USDT.transferFrom(msg.sender, address(this), amount_);
    }

    function approveContract(uint amount_) public {
        USDT.approve(address(this), amount_);
    }

    function allowanceOfContract()
        public
        view
        returns (uint allowanceOfContract_)
    {
        return USDT.allowance(msg.sender, address(this));
    }

    function withdrawAll() public onlyOwner {
        USDT.transfer(owner, USDT.balanceOf(address(this)));
    }

    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this;
        return msg.data;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can do this");
        _;
    }
}
