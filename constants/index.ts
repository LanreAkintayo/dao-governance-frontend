import daoAbi from "./abi.json"
import daoAddresses from "./daoAddresses.json"
import erc20Abi from "./erc20Abi.json"

interface IContractAddresses {
    [key:string]: string[]
}
const contractAddresses:IContractAddresses = daoAddresses

export const DEPLOYER = "0xec2B1547294a4dd62C0aE651aEb01493f8e4cD74"
export const larAddress = "0x65a13405bAB1DC40AC8137BbbC70644cE1d8ae4f";

export const daoAddress = "0x51D3F6d614EF05B5942dC316e8f0c8E3458Ef33a";

export {daoAbi, contractAddresses, erc20Abi}

export const supportedChainId = 11155111;
 