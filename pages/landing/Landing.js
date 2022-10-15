import React, { useState } from 'react'
import Link from 'next/link'

function Landing() {
    const [isConnected, setIsConnected] = useState(false);
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
            localStorage.setItem("walletAddress", accounts[0]);
            setIsConnected(true);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* Creating a hero component with black background and centering everything in the screen */}
            <section className="relative bg-black flex flex-col w-full h-screen justify-center items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="text-center pb-12 md:pb-16">
                            <h1
                                className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                                data-aos="zoom-y-out"
                            >
                                It is YouTube, but{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                                    Decentralized
                                </span>
                            </h1>
                            <div className="max-w-3xl mx-auto flex flex-col justify-center items-center space-y-4">
                                <p
                                    className="text-xl text-gray-400 mb-8"
                                    data-aos="zoom-y-out"
                                    data-aos-delay="150"
                                >
                                    A YouTube Clone built on top of Polygon network, allow users
                                    to create, share and watch videos, without worrying about
                                    their privacy.
                                </p>
                                <button
                                    className="items-center  bg-white rounded-full w-1/5 font-medium  p-4 shadow-lg"
                                    onClick={() => {
                                        // Calling the connectWallet function when user clicks on the button
                                        connectWallet();
                                    }}
                                >
                                    <span>{isConnected ? 'Disconnect' : 'Connect wallet'}</span>
                                </button>
                                <Link href='#upload'>
                                    <span className='bg-blue-400 text-white font-medium text-xl uppercase px-6 py-2 rounded-full cursor-pointer tracking-tighter'>Upload</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing