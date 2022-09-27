import abi from "./abi.json"
import daoAddresses from "./daoAddresses.json"
import erc20Abi from "./erc20Abi.json"

interface IContractAddresses {
    [key:string]: string[]
}
const contractAddresses:IContractAddresses = daoAddresses

export const DEPLOYER = "0xDD4c43c13e6F1b2374Ed9AAabBA7D56Bb4a68A03"
export const larAddress = "0x7AB3bE7df12321Ab0f54FbbB5CECCC4a66ae2030"

export {abi, contractAddresses, erc20Abi}
 