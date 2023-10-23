// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

struct RegistrationParams {
    string name;
    bytes encryptedEmail;
    address upkeepContract;
    uint32 gasLimit;
    address adminAddress;
    uint8 triggerType;
    bytes checkData;
    bytes triggerConfig;
    bytes offchainConfig;
    uint96 amount;
}

/**
 * string name = "test upkeep";
 * bytes encryptedEmail = 0x;
 * address upkeepContract = 0x...;
 * uint32 gasLimit = 500000;
 * address adminAddress = 0x....;
 * uint8 triggerType = 0;
 * bytes checkData = 0x;
 * bytes triggerConfig = 0x;
 * bytes offchainConfig = 0x;
 * uint96 amount = 1000000000000000000;
 */

interface AutomationRegistrarInterface {
    function registerUpkeep(
        RegistrationParams calldata requestParams
    ) external returns (uint256);
}

contract UpkeepIDConditionaltest {
    LinkTokenInterface public  i_link;
    AutomationRegistrarInterface public  i_registrar;

    constructor(
        LinkTokenInterface link,
        AutomationRegistrarInterface registrar
    ) {
        i_link = link;
        i_registrar = registrar;
    }

    function setLink(LinkTokenInterface link) public {
        i_link = link;
    }

    function setRegistrar(AutomationRegistrarInterface registrar) public {
        i_registrar = registrar;
    }

    function registerAndPredictID(address contAdd) public returns(uint256 upkeepID) {
        // LINK must be approved for transfer - this can be done every time or once
        // with an infinite approval
        RegistrationParams memory params = RegistrationParams("test","0x",contAdd,500000,msg.sender,0,"0x","0x","0x",1000000000000000000);
        require(i_link.allowance(msg.sender,address(this)) >= params.amount ,"user allowance is not enough");
        require(i_link.balanceOf(msg.sender) >= params.amount ,"user balance is not enough");

        i_link.transferFrom(msg.sender, address(this), params.amount);
        i_link.approve(address(i_registrar), params.amount);

        upkeepID = i_registrar.registerUpkeep(params);
        if (upkeepID != 0) {
            // DEV - Use the upkeepID however you see fit
            return upkeepID;
        } else {
            revert("auto-approve disabled");
        }
    }
}
