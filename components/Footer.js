import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, CloudArrowUpIcon } from '@heroicons/react/24/solid'
import MenuItems from './MenuItems'

export default function Footer() {
    const [active, setActive] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState([]);

    const showMenu = () => {
        setActive(!active);
    };

    const disconnect = () => {
        setAddress('');
        setIsConnected(false);
    };

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            // Checking if user have Metamask installed
            if (!ethereum) {
                // If user doesn't have Metamask installed, throw an error
                alert("Please install MetaMask");
                return;
            }

            // If user has Metamask installed, connect to the user's wallet
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            // At last save the user's wallet address in browser's local storage
            setAddress(localStorage.getItem('walletAddress', accounts[0]));
            setIsConnected(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        connectWallet();
    }, [])
    return (
        <nav>
            <div className="bottom-0 right-0 z-50 p-1 bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg border-b border-white/80 dark:border-stone-900/80 fixed flex justify-between items-center w-full pl-4">
                <h3 className='font-extralight text-sm text-stone-500'>{address.toString().substring(0, 5) + '...' + address.toString().substring(address.length, address.length - 5)}</h3>
                <button
                    className={`text-xs bg-stone-900 text-stone-500 px-2 py-1 rounded ${isConnected ? 'hover:bg-red-500' : 'hover:bg-green-600'} hover:text-[#fcffff]`}
                    onClick={() => {
                        // Calling the connectWallet function when user clicks on the button
                        !address ? connectWallet() : disconnect()
                    }}
                >
                    <span>{isConnected ? 'Disconnect' : 'Connect wallet'}</span>
                </button>
            </div>
        </nav >
    )
}