import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log(`Deploying InheritanceRuleCheck contract from: ${deployer}`);

  const deployedInheritanceRuleCheck = await deploy("InheritanceRuleCheck", {
    from: deployer,
    log: true,
    waitConfirmations: hre.network.name === "hardhat" ? 0 : 2, // Skip confirmations for local testing
  });

  console.log(`✅ InheritanceRuleCheck contract deployed at: ${deployedInheritanceRuleCheck.address}`);

  // Verify contract on Etherscan if not on localhost
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("🔍 Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: deployedInheritanceRuleCheck.address,
        constructorArguments: [],
      });
      console.log("✅ Contract verified successfully");
    } catch (error) {
      console.log("⚠️  Contract verification failed:", error);
    }
  }

  console.log(`📋 Deployment summary:`);
  console.log(`   Network: ${hre.network.name}`);
  console.log(`   Contract: InheritanceRuleCheck`);
  console.log(`   Address: ${deployedInheritanceRuleCheck.address}`);
  console.log(`   Deployer: ${deployer}`);
};
export default func;
func.id = "deploy_inheritanceRuleCheck"; // id required to prevent reexecution
func.tags = ["InheritanceRuleCheck"];


