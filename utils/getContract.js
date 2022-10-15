import ContractAbi from "../artifacts/contracts/YouTube.sol/YouTube.json";
import { ethers } from 'ethers';

export default function getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
        '0xA3CeDb57CaB24FCCe267f7612F8d625F856bF8F7',
        ContractAbi.abi,
        signer
    )
    return contract;
}
