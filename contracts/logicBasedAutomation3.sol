// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.19;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract offerManager is AutomationCompatibleInterface{

    using SafeMath for uint256;
    using Counters for Counters.Counter;

    enum OfferState {
                Published,
                Accepted,
                Expired, 
                Canceled 
    }

    struct Offer {
        uint256 offerId;
        uint256 acceptTimeStamp;
        uint256 expiryTime;
        OfferState state;
        address publisher;
    }

    uint256 [] public OfferIds;
    mapping(uint256 => Offer) public Offers;
    Counters.Counter private offerIdCounter;

    constructor() {offerIdCounter.increment();}

    event Expired(uint256  offerId);
    event Published(uint256  offerId);
    event Accepted(uint256  offerId);
    event Canceled(uint256 offerId);

    function submitOffer(uint256 _expiryTime) external  {
        require(_expiryTime >= block.timestamp ,"expiryTime cannot be in the past");

        Offer memory newOffer = Offer(
            offerIdCounter.current(),
            0,
            _expiryTime,
            OfferState.Published,
            msg.sender
        );
        
        Offers[offerIdCounter.current()] = newOffer;
        OfferIds.push(offerIdCounter.current());

        emit Published(offerIdCounter.current());
        offerIdCounter.increment();
    }

    function acceptOffer(uint256 _offerId) external {
        require(_offerId == Offers[_offerId].offerId,"Offer does not exist");
        require( Offers[_offerId].state == OfferState.Published ,"Only published offers can be accepted");
        require(!isExpired(_offerId),"This Offer is expired");
        require(msg.sender != Offers[_offerId].publisher,"publisher cannot accept his Offer");
   
        Offers[_offerId].state = OfferState.Accepted;
        Offers[_offerId].publisher = msg.sender;
        Offers[_offerId].acceptTimeStamp = block.timestamp;

        emit Accepted(_offerId);
    }

    function cancelOffer(uint256 _offerId) external {
        require(msg.sender == Offers[_offerId].publisher, "Only publisher can cancel the offer");
        require(Offers[_offerId].state == OfferState.Published, "You can only cancel a Published Offer");

        Offers[_offerId].state = OfferState.Canceled;
        emit Canceled(_offerId);
    }

    function isExpired(uint256 _offerId)public view returns (bool isexpired){
        require(Offers[_offerId].offerId == _offerId,"Offer does not exist");
        if(Offers[_offerId].state == OfferState.Published &&
         Offers[_offerId].expiryTime < block.timestamp)
        {
            isexpired = true;
        }
    }

    function expire(uint256 _offerId) public {
        require(isExpired(_offerId),"It is not expired");
        Offers[_offerId].state = OfferState.Expired;
        emit Expired(_offerId);
    }

    function checkUpkeep(bytes calldata checkData)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /*performData*/)
    {
      (uint256 lowerBound, uint256 upperBound) = abi.decode(checkData,(uint256, uint256));

      if(true!= true){
        uint256 u = 50 + 46;
      }

    }

    function giveByte(uint256 a,uint256 b) public pure returns(bytes memory){
          bytes memory performData = abi.encode(a, b);
          return performData;
    }
    
    function giveByte(bytes memory data) public pure returns(uint256,uint256){
      (uint256 lowerBound, uint256 upperBound) = abi.decode(data,(uint256, uint256));
          return (lowerBound,upperBound);
    }

    function performUpkeep(bytes calldata /* performData */) external override {
    
      }
    }
   



