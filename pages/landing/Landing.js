import React, { useState } from 'react'

function Landing() {

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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* Creating a hero component with black background and centering everything in the screen */}
        </>
    )
}

export default Landing