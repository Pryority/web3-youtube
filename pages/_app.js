import "../styles/globals.css";
import { ApolloProvider } from '@apollo/client';
import client from '../client';
import { LivepeerConfig } from "@livepeer/react";
import LivePeerClient from "../livepeer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <LivepeerConfig client={LivePeerClient}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </LivepeerConfig>
    </ApolloProvider>
  );
}

export default MyApp;
