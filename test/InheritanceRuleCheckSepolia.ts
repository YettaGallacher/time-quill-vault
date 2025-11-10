import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm, deployments } from "hardhat";
import { InheritanceRuleCheck } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("InheritanceRuleCheckSepolia", function () {
  let signers: Signers;
  let inheritanceContract: InheritanceRuleCheck;
  let inheritanceContractAddress: string;
  let step: number;
  let steps: number;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const InheritanceRuleCheckDeployment = await deployments.get("InheritanceRuleCheck");
      inheritanceContractAddress = InheritanceRuleCheckDeployment.address;
      inheritanceContract = await ethers.getContractAt("InheritanceRuleCheck", InheritanceRuleCheckDeployment.address);
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { alice: ethSigners[0] };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;
  });

  it("should check eligibility for age 18 (eligible)", async function () {
    steps = 8;
    this.timeout(4 * 40000);

    const clearAge = 18;

    progress(`Encrypting age ${clearAge}...`);
    const encryptedAge = await fhevm
      .createEncryptedInput(inheritanceContractAddress, signers.alice.address)
      .add32(clearAge)
      .encrypt();

    progress(
      `Call checkEligibility(${clearAge}) InheritanceRuleCheck=${inheritanceContractAddress} handle=${ethers.hexlify(encryptedAge.handles[0])} signer=${signers.alice.address}...`,
    );
    const tx = await inheritanceContract
      .connect(signers.alice)
      .checkEligibility(encryptedAge.handles[0], encryptedAge.inputProof);
    await tx.wait();

    progress(`Call InheritanceRuleCheck.getMyEligibilityResult()...`);
    const encryptedResult = await inheritanceContract.getMyEligibilityResult();

    progress(`Decrypting eligibility result=${encryptedResult}...`);
    const clearResult = await fhevm.userDecryptEbool(
      FhevmType.ebool,
      encryptedResult,
      inheritanceContractAddress,
      signers.alice,
    );
    progress(`Clear eligibility result=${clearResult}`);

    expect(clearResult).to.be.true;
  });

  it("should check eligibility for age 17 (not eligible)", async function () {
    steps = 8;
    this.timeout(4 * 40000);

    const clearAge = 17;

    progress(`Encrypting age ${clearAge}...`);
    const encryptedAge = await fhevm
      .createEncryptedInput(inheritanceContractAddress, signers.alice.address)
      .add32(clearAge)
      .encrypt();

    progress(
      `Call checkEligibility(${clearAge}) InheritanceRuleCheck=${inheritanceContractAddress} handle=${ethers.hexlify(encryptedAge.handles[0])} signer=${signers.alice.address}...`,
    );
    const tx = await inheritanceContract
      .connect(signers.alice)
      .checkEligibility(encryptedAge.handles[0], encryptedAge.inputProof);
    await tx.wait();

    progress(`Call InheritanceRuleCheck.getMyEligibilityResult()...`);
    const encryptedResult = await inheritanceContract.getMyEligibilityResult();

    progress(`Decrypting eligibility result=${encryptedResult}...`);
    const clearResult = await fhevm.userDecryptEbool(
      FhevmType.ebool,
      encryptedResult,
      inheritanceContractAddress,
      signers.alice,
    );
    progress(`Clear eligibility result=${clearResult}`);

    expect(clearResult).to.be.false;
  });
});

