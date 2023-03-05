// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;
// pragma solidity ^0.8.0;

contract  landregistry  {
    address payable contractOwner;

    constructor() {
        contractOwner = payable(msg.sender);
    }




    struct Landreg {
        uint id;
        uint area;
        string landAddress;
        uint landPrice;
        string allLatitudeLongitude;
        uint propertyPID;
        string physicalSurveyNumber;
        string document;
        string Landpic;
        bool isforSell;
        address payable ownerAddress;
        bool isLandVerified;
    }

    struct User{
        address id;
        string name;
        uint age;
        string city;
        string cinc;
        string document;
        string profilepic;
        string email;
        bool isUserVerified;
    }

    struct LandInspector {
        uint id;
        address _addr;
        string name;
        uint age;
        string designation;
        string city;
    }

    struct LandRequest{
        uint reqId;
        address payable sellerId;
        address payable buyerId;
        uint landId;
        reqStatus requestStatus;
        uint bidPrice;
        bool isPaymentDone;
    }


    enum reqStatus {requested,accepted,rejected,paymentdone,commpleted}


    uint inspectorsCount;
    uint public userCount;
    uint public landsCount;
    uint public documentId;
    uint requestCount;


    mapping(address => LandInspector) public InspectorMapping;
    mapping(uint => address[]) allLandInspectorList;
    mapping(address => bool)  RegisteredInspectorMapping;
    mapping(address => User) public UserMapping;
    mapping(uint => address)  AllUsers;
    mapping(uint => address[])  allUsersList;
    mapping(address => bool)  RegisteredUserMapping;
    mapping(address => uint[])  MyLands;
    mapping(uint => Landreg) public lands;
    mapping(uint => LandRequest) public LandRequestMapping;
    mapping(address => uint[])  MyReceivedLandRequest;
    mapping(address => uint[])  MySentLandRequest;
    mapping(uint => uint[])  allLandList;
    mapping(uint => uint[])  paymentDoneList;


    function isContractOwner(address _addr) public view returns(bool){
        if(_addr==contractOwner)
            return true;
        else
            return false;
    }
     
    function changeContractOwner(address _addr)public {
        require(msg.sender==contractOwner,"you are not contractOwner");

        contractOwner=payable(_addr);
    }

    //-----------------------------------------------LandInspector-----------------------------------------------

    function addLandInspector(address _addr,string memory _name, uint _age, string memory _designation,string memory _city) public returns(bool){
        require(msg.sender==contractOwner,"You are not contractOwner");
        require(RegisteredInspectorMapping[_addr] == false,"New address"); 

        RegisteredInspectorMapping[_addr]=true;
        allLandInspectorList[1].push(_addr);
        InspectorMapping[_addr] = LandInspector(inspectorsCount,_addr,_name, _age, _designation,_city);
        return true;
    }
      function ReturnAllLandIncpectorList() public view returns(address[] memory)
    {
        return allLandInspectorList[1];
    }

  
    function removeLandInspector(address _addr) public{
        require(msg.sender==contractOwner,"You are not contractOwner");
        require(RegisteredInspectorMapping[_addr],"Land Inspector not found");
        RegisteredInspectorMapping[_addr]=false;


        uint len=allLandInspectorList[1].length;
        for(uint i=0;i<len;i++)
        {
            if(allLandInspectorList[1][i]==_addr)
            {
                allLandInspectorList[1][i]=allLandInspectorList[1][len-1];
                allLandInspectorList[1].pop();
                break;
            }
        }
    }
 


    function isLandInspector(address _id) public view returns (bool) {
        if(RegisteredInspectorMapping[_id]){
            return true;
        }else{
            return false;
        }
    }



    //-----------------------------------------------User-----------------------------------------------

    function isUserRegistered(address _addr) public view returns(bool)
    {
        if(RegisteredUserMapping[_addr]){
            return true;
        }else{
            return false;
        }
    }

    function registerUser(string memory _name, uint _age, string memory _city,string memory _cinc, string memory _document, string memory _profilepic, string memory _email
    ) public {
         if (RegisteredUserMapping[msg.sender] == true) {
        // The user is already registered.
        return;
    }
    else{
        // require(!RegisteredUserMapping[msg.sender]);

        RegisteredUserMapping[msg.sender] = true;
        userCount++;
        allUsersList[1].push(msg.sender);
        AllUsers[userCount]=msg.sender;
        UserMapping[msg.sender] = User(msg.sender, _name, _age, _city,_cinc, _document,_profilepic,_email,false);
        //emit Registration(msg.sender);
        }
    }

function verifyUser(address _userId) public {
    require(isLandInspector(msg.sender));
    require(_userId != msg.sender, "Cannot verify yourself");
    UserMapping[_userId].isUserVerified = true;
}

    function isUserVerified(address id) public view returns(bool){
        return UserMapping[id].isUserVerified;
    }
    function ReturnAllUserList() public view returns(address[] memory)
    {
        return allUsersList[1];
    }


    function addLand(uint _area, string memory _address, uint landPrice,string memory _allLatiLongi, uint _propertyPID,string memory _surveyNum, string memory _document,string memory _landpic) public {
        require(isUserVerified(payable(msg.sender)));
        landsCount++;
        lands[landsCount] = Landreg(landsCount, _area, _address, landPrice,_allLatiLongi,_propertyPID, _surveyNum , _document,_landpic,false,payable(msg.sender),false);
        MyLands[msg.sender].push(landsCount);
        allLandList[1].push(landsCount);
        // emit AddingLand(landsCount);
    }

    function ReturnAllLandList() public view returns(uint[] memory)
    {
        return allLandList[1];
    }

    function verifyLand(uint _id) public{

        require(isLandInspector(msg.sender) && lands[_id].ownerAddress != msg.sender, "Cannot verify your own land");



        lands[_id].isLandVerified=true;
    }
    function isLandVerified(uint id) public view returns(bool){
        return lands[id].isLandVerified;
    }

    function myAllLands(address id) public view returns( uint[] memory){
        return MyLands[id];
    }


    function makeItforSell(uint id) public{
        require(lands[id].ownerAddress==msg.sender);
         require(isLandVerified(id), "Land is not verified yet");

        lands[id].isforSell=true;
    }

    // function requestforBuy(uint _landId) public
    // {
    //     require(isUserVerified(msg.sender) && isLandVerified(_landId));
    //     requestCount++;
    //     LandRequestMapping[requestCount]=LandRequest(requestCount,lands[_landId].ownerAddress,payable(msg.sender),_landId,reqStatus.requested,false);
    //     MyReceivedLandRequest[lands[_landId].ownerAddress].push(requestCount);
    //     MySentLandRequest[msg.sender].push(requestCount);
    // }

    function myReceivedLandRequests() public view returns(uint[] memory)
    {
        return MyReceivedLandRequest[msg.sender];
    }
    function mySentLandRequests() public view returns(uint[] memory)
    {
        return MySentLandRequest[msg.sender];
    }
    // function acceptRequest(uint _requestId) public
    // {
    //     require(LandRequestMapping[_requestId].sellerId==msg.sender);
    //     LandRequestMapping[_requestId].requestStatus=reqStatus.accepted;
    // }
    function acceptRequest(uint _requestId) public {
                require(LandRequestMapping[_requestId].sellerId==msg.sender);



    if (LandRequestMapping[_requestId].bidPrice > 0) {
        // Update the land price with the bid price
            lands[
        LandRequestMapping[_requestId].landId].landPrice  = LandRequestMapping[_requestId].bidPrice;
    }

        LandRequestMapping[_requestId].requestStatus = reqStatus.accepted;

}

    function rejectRequest(uint _requestId) public
    {
        require(LandRequestMapping[_requestId].sellerId==msg.sender);
        LandRequestMapping[_requestId].requestStatus=reqStatus.rejected;
    }

    function requesteStatus(uint id) public view returns(bool)
    {
        return LandRequestMapping[id].isPaymentDone;
    }
function changeLandPrice(uint _landId, uint _newPrice) public {
    require(isLandVerified(_landId), "Land is not verified yet");
    require(lands[_landId].ownerAddress == msg.sender, "You are not the owner of this land");

    lands[_landId].landPrice = _newPrice;
    // emit ChangingLandPrice(_landId, _newPrice);
}
function requestforBuyWithBid(uint _landId, uint _bidPrice) public {
    require(isUserVerified(msg.sender));
    require(isLandVerified(_landId), "Land is not verified yet");
    //require(isforseal)
    require(msg.sender != lands[_landId].ownerAddress, "Seller cannot send a buy request for their own land");

    requestCount++;
    LandRequestMapping[requestCount] = LandRequest(requestCount, lands[_landId].ownerAddress, payable(msg.sender), _landId, reqStatus.requested,_bidPrice, false);
    MyReceivedLandRequest[lands[_landId].ownerAddress].push(requestCount);
    MySentLandRequest[msg.sender].push(requestCount);
}

function getLandPrice(uint id) public view returns(uint) {
    return lands[id].landPrice;
}
    
event PaymentMade(uint requestId, uint landId, uint amount, uint price) ;

function makePayment(uint _requestId) public payable {
    require(LandRequestMapping[_requestId].buyerId == msg.sender && LandRequestMapping[_requestId].requestStatus == reqStatus.accepted);

    uint landId = LandRequestMapping[_requestId].landId;
    uint landPrice = lands[landId].landPrice;
    require(msg.value == landPrice, "Amount sent is not equal to land price");

    LandRequestMapping[_requestId].requestStatus = reqStatus.paymentdone;
    lands[landId].ownerAddress.transfer(msg.value);
    LandRequestMapping[_requestId].isPaymentDone = true;
    paymentDoneList[1].push(_requestId);

    emit PaymentMade(_requestId, landId, msg.value,landPrice);
}
        function makePaymentOP(uint _requestId) public payable
    {
        require(LandRequestMapping[_requestId].buyerId==msg.sender && LandRequestMapping[_requestId].requestStatus==reqStatus.accepted);

        LandRequestMapping[_requestId].requestStatus=reqStatus.paymentdone;
        //LandRequestMapping[_requestId].sellerId.transfer(lands[LandRequestMapping[_requestId].landId].landPrice);
        //lands[LandRequestMapping[_requestId].landId].ownerAddress.transfer(lands[LandRequestMapping[_requestId].landId].landPrice);
        lands[LandRequestMapping[_requestId].landId].ownerAddress.transfer(msg.value);
        LandRequestMapping[_requestId].isPaymentDone=true;
        paymentDoneList[1].push(_requestId);
    }
 

    function returnPaymentDoneList() public view returns(uint[] memory)
    {
        return paymentDoneList[1];
    }

    function transferOwnership(uint _requestId,string memory documentUrl) public returns(bool)
    {
        require(isLandInspector(msg.sender));
        if(LandRequestMapping[_requestId].isPaymentDone==false)
            return false;
        documentId++;
        LandRequestMapping[_requestId].requestStatus=reqStatus.commpleted;
        MyLands[LandRequestMapping[_requestId].buyerId].push(LandRequestMapping[_requestId].landId);

        uint len=MyLands[LandRequestMapping[_requestId].sellerId].length;
        for(uint i=0;i<len;i++)
        {
            if(MyLands[LandRequestMapping[_requestId].sellerId][i]==LandRequestMapping[_requestId].landId)
            {
                MyLands[LandRequestMapping[_requestId].sellerId][i]=MyLands[LandRequestMapping[_requestId].sellerId][len-1];
                //MyLands[LandRequestMapping[_requestId].sellerId].length--;
                MyLands[LandRequestMapping[_requestId].sellerId].pop();
                break;
            }
        }
        lands[LandRequestMapping[_requestId].landId].document=documentUrl;
        lands[LandRequestMapping[_requestId].landId].isforSell=false;
        lands[LandRequestMapping[_requestId].landId].ownerAddress=LandRequestMapping[_requestId].buyerId;

        return true;
    }
    

    function makePaymentTestFun(address payable _reveiver) public payable
    {
        _reveiver.transfer(msg.value);
    }


}