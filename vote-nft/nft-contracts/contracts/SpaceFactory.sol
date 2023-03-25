// NFT Auction Contract 
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INFTCollection {
	function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

contract SpaceFactory is Ownable {
    using SafeMath for uint256;    

    address public feeAddress;
    uint256 public createFee;
    
    // Auction struct which holds all the required info
    struct Space {
        uint256 spaceId;
        string logo;
        string name;
        string about;
        string category;
        address nftAddr;
        uint256 nftType;  // 0:ERC721, 1: ERC1155
        address creator;
        uint256 createLimit; // holder who has over createLimit can create proposal
        string socialMetadata;        
    }

    // spaceId => Space mapping
    mapping(uint256 => Space) public spaces;
	uint256 public currentSpaceId;   
    
    // SpaceCreated is fired when an space is created
    event SpaceCreated(
        uint256 spaceId,
        string logo,
        string name,
        string about,
        string category,
        address nftAddr,
        uint256 nftType,
        address creator,
        uint256 createLimit,
        string socialMetadata
    );
    
    event SpaceUpdated(
        uint256 spaceId,
        string logo,
        string name,
        string about,
        string category,
        address nftAddr,
        uint256 nftType,
        address creator,
        uint256 createLimit,
        string socialMetadata
    );
    
    constructor (address _feeAddress) {
		require(_feeAddress != address(0), "Invalid commonOwner");
        feeAddress = _feeAddress;
        createFee = 0.001 ether;        
        currentSpaceId = 0;
	}

    
    function setFeeAddress(address _feeAddress) external onlyOwner {
        require(_feeAddress != address(0x0), "invalid address");		
        feeAddress = _feeAddress;		
    }
    function setFeeValue(uint256 _createFee) external onlyOwner {	
        createFee = _createFee;
    }

    function createSpace(
        string memory _logo, 
        string memory _name,
        string memory _about, 
        string memory _category, 
        address _nftAddr, 
        uint256 _createLimit,
        string memory _socialMetadata
        ) external payable 
    {   
        require(IsERC721(_nftAddr) || IsERC1155(_nftAddr), "Invalid Collection Address");

        uint256 nftType = 0;
        if (IsERC1155(_nftAddr)) {
            nftType = 1;
        }

        if (createFee > 0) {
            require(msg.value >= createFee, "too small amount");
            (bool result, ) = payable(feeAddress).call{value: createFee}("");
            require(result, "Failed to send fee to feeAddress");
        }
        
        
		currentSpaceId = currentSpaceId.add(1);
		spaces[currentSpaceId].spaceId = currentSpaceId;
		spaces[currentSpaceId].logo = _logo;
		spaces[currentSpaceId].name = _name;
        spaces[currentSpaceId].about = _about;
        spaces[currentSpaceId].category = _category;
        spaces[currentSpaceId].nftAddr = _nftAddr;
        spaces[currentSpaceId].nftType = nftType;
        spaces[currentSpaceId].creator = msg.sender;
        spaces[currentSpaceId].createLimit = _createLimit;
		spaces[currentSpaceId].socialMetadata = _socialMetadata;
        emit SpaceCreated(currentSpaceId, _logo, _name, _about, _category, _nftAddr, nftType, msg.sender, _createLimit, _socialMetadata);
    }

    function updateSpace(
        uint256 _spaceId,
        string memory _logo, 
        string memory _name,
        string memory _about, 
        string memory _category, 
        address _nftAddr, 
        uint256 _createLimit,
        string memory _socialMetadata
        ) external 
    {   
        require(IsERC721(_nftAddr) || IsERC1155(_nftAddr), "Invalid Collection Address");
        require(_spaceId <= currentSpaceId, 'invalid _spaceId');
        require(msg.sender == spaces[_spaceId].creator || msg.sender == owner(), "Error, you are not the creator"); 

        uint256 nftType = 0;
        if (IsERC1155(_nftAddr)) {
            nftType = 1;
        }

		spaces[_spaceId].logo = _logo;
		spaces[_spaceId].name = _name;
        spaces[_spaceId].about = _about;
        spaces[_spaceId].category = _category;
        spaces[_spaceId].nftAddr = _nftAddr;
        spaces[_spaceId].nftType = nftType;
        spaces[_spaceId].createLimit = _createLimit;
		spaces[_spaceId].socialMetadata = _socialMetadata;
        emit SpaceUpdated(_spaceId, _logo, _name, _about, _category, _nftAddr, nftType, msg.sender, _createLimit, _socialMetadata);
    }

    function IsERC721(address collection) view private returns(bool) {
        INFTCollection nft = INFTCollection(collection); 
        try nft.supportsInterface(0x80ac58cd) returns (bool result) {
            return result;
        } catch {
            return false;
        }
    }

	function IsERC1155(address collection) view private returns(bool) {
        INFTCollection nft = INFTCollection(collection); 
        try nft.supportsInterface(0xd9b67a26) returns (bool result) {
            return result;
        } catch {
            return false;
        }
    }

    function withdraw() external onlyOwner {
		uint balance = address(this).balance;
		require(balance > 0, "insufficient balance");		
		(bool result, ) = payable(msg.sender).call{value: balance}("");
        require(result, "Failed to withdraw balance"); 
	}
    receive() external payable {}
}