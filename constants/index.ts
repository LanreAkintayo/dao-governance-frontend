import daoAbi from "./abi.json"
import daoAddresses from "./daoAddresses.json"
import erc20Abi from "./erc20Abi.json"

interface IContractAddresses {
    [key:string]: string[]
}
const contractAddresses:IContractAddresses = daoAddresses

export const DEPLOYER = "0xec2B1547294a4dd62C0aE651aEb01493f8e4cD74"
export const larAddress = "0x17B9D1f610645DB2b10297e9F4924f6E9557a080"

export const daoAddress = "0x56EA0cC500FcE3d874D51F76D4C90d3C3C85e720"

export {daoAbi, contractAddresses, erc20Abi}

export const supportedChainId = 80001
 