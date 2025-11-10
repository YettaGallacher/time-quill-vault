import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedInheritanceRuleCheck = await deploy("InheritanceRuleCheck", {
    from: deployer,
    log: true,
  });

  console.log(`InheritanceRuleCheck contract: `, deployedInheritanceRuleCheck.address);
};
export default func;
func.id = "deploy_inheritanceRuleCheck"; // id required to prevent reexecution
func.tags = ["InheritanceRuleCheck"];


