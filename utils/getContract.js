import ContractAbi from "../artifacts/contracts/YouTube.sol/YouTube.json";
import { ethers } from 'ethers';

export default function getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
        '0x1dDEbf364fadcf3e4fEf6DE8a7946f6D977028f3',
        ContractAbi.abi,
        signer
    )
    return contract;
}
