import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { InheritanceRuleCheck, InheritanceRuleCheck__factory } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("InheritanceRuleCheck")) as InheritanceRuleCheck__factory;
  const inheritanceContract = (await factory.deploy()) as InheritanceRuleCheck;
  const inheritanceContractAddress = await inheritanceContract.getAddress();

  return { inheritanceContract, inheritanceContractAddress };
}

describe("InheritanceRuleCheck", function () {
  let signers: Signers;
  let inheritanceContract: InheritanceRuleCheck;
  let inheritanceContractAddress: string;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async function () {
    // Check whether the tests are running against an FHEVM mock environment
    if (!fhevm.isMock) {
      console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
      this.skip();
    }

    ({ inheritanceContract, inheritanceContractAddress } = await deployFixture());
  });

  it("should check eligibility for age 18 (eligible)", async function () {
    const clearAge = 18;

    // Encrypt age as euint32
    const encryptedAge = await fhevm
      .createEncryptedInput(inheritanceContractAddress, signers.alice.address)
      .add32(clearAge)
      .encrypt();

    // Call checkEligibility
    const tx = await inheritanceContract
      .connect(signers.alice)
      .checkEligibility(encryptedAge.handles[0], encryptedAge.inputProof);
    await tx.wait();

    // Get the encrypted result
    const encryptedResult = await inheritanceContract.getMyEligibilityResult();

    // Decrypt the result
    const clearResult = await fhevm.userDecryptEbool(
      FhevmType.ebool,
      encryptedResult,
      inheritanceContractAddress,
      signers.alice,
    );

    expect(clearResult).to.be.true;
  });

  it("should check eligibility for age 20 (eligible)", async function () {
    const clearAge = 20;

    // Encrypt age as euint32
    const encryptedAge = await fhevm
      .createEncryptedInput(inheritanceContractAddress, signers.alice.address)
      .add32(clearAge)
      .encrypt();

    // Call checkEligibility
    const tx = await inheritanceContract
      .connect(signers.alice)
      .checkEligibility(encryptedAge.handles[0], encryptedAge.inputProof);
    await tx.wait();

    // Get the encrypted result
    const encryptedResult = await inheritanceContract.getMyEligibilityResult();

    // Decrypt the result
    const clearResult = await fhevm.userDecryptEbool(
      FhevmType.ebool,
      encryptedResult,
      inheritanceContractAddress,
      signers.alice,
    );

    expect(clearResult).to.be.true;
  });

  it("should check eligibility for age 17 (not eligible)", async function () {
    const clearAge = 17;

    // Encrypt age as euint32
    const encryptedAge = await fhevm
      .createEncryptedInput(inheritanceContractAddress, signers.alice.address)
      .add32(clearAge)
      .encrypt();

    // Call checkEligibility
    const tx = await inheritanceContract
      .connect(signers.alice)
      .checkEligibility(encryptedAge.handles[0], encryptedAge.inputProof);
    await tx.wait();

    // Get the encrypted result
    const encryptedResult = await inheritanceContract.getMyEligibilityResult();

    // Decrypt the result
    const clearResult = await fhevm.userDecryptEbool(
      FhevmType.ebool,
      encryptedResult,
      inheritanceContractAddress,
      signers.alice,
    );

    expect(clearResult).to.be.false;
  });

  it("should check eligibility for age 10 (not eligible)", async function () {
    const clearAge = 10;

    // Encrypt age as euint32
    const encryptedAge = await fhevm
      .createEncryptedInput(inheritanceContractAddress, signers.bob.address)
      .add32(clearAge)
      .encrypt();

    // Call checkEligibility
    const tx = await inheritanceContract
      .connect(signers.bob)
      .checkEligibility(encryptedAge.handles[0], encryptedAge.inputProof);
    await tx.wait();

    // Get the encrypted result
    const encryptedResult = await inheritanceContract.getEligibilityResult(signers.bob.address);

    // Decrypt the result
    const clearResult = await fhevm.userDecryptEbool(
      encryptedResult,
      inheritanceContractAddress,
      signers.bob,
    );

    expect(clearResult).to.be.false;
  });
});

