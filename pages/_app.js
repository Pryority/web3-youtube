import "../styles/globals.css";
import { LivepeerConfig } from "@livepeer/react";
import LivePeerClient from "../livepeer";

function MyApp({ Component, pageProps }) {
  return (
    <LivepeerConfig client={LivePeerClient}>
      <Component {...pageProps} />
    </LivepeerConfig>
  );
}

export default MyApp;
