const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("landregistry contract", function () {
  let landregistry;
  let owner;
  let newOwner;
  before(async function () {
    [owner, newOwner] = await ethers.getSigners();
    const landregistryFactory = await ethers.getContractFactory("landregistry");
    landregistry = await landregistryFactory.deploy();
    await landregistry.deployed();
  });

  describe("isContractOwner()", function () {
    it("should return true if the caller is the contract owner", async function () {
      const isOwner = await landregistry.isContractOwner(owner.address);
      expect(isOwner).to.equal(true);
    });

    it("should return false if the caller is not the contract owner", async function () {
      const otherAddress = "0x1234567890123456789012345678901234567890";
      const isOwner = await landregistry.isContractOwner(otherAddress);
      expect(isOwner).to.equal(false);
    });
  });

  describe("changeContractOwner()", function () {
    it("should update the contract owner", async function () {
      // Call the changeContractOwner function
      await landregistry.connect(owner).changeContractOwner(newOwner.address);

      // Check if the contract owner has been updated
      const isOwner = await landregistry.isContractOwner(owner.address);
      const isNewOwner = await landregistry.isContractOwner(newOwner.address);

      expect(isOwner).to.be.false;
      expect(isNewOwner).to.be.true;
    });
it("should not allow non-contract owners to call the function", async function () {
  // Create a new account that is not the contract owner
  const nonOwner = await ethers.getSigner();

  // Call the function from a non-contract owner account
  await expect(
    landregistry.connect(nonOwner).changeContractOwner(owner.address)
  ).to.be.revertedWith("you are not contractOwner");
});

  });
});
