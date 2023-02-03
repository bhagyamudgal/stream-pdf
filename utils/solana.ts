import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { SOLANA_DEVNET_RPC_URL, SOLANA_MAINNET_RPC_URL } from "./env";
import { SolanaNetwork } from "@/types";

export const getConnectionUrl = (network: SolanaNetwork) => {
    if (network === "mainnet-beta") {
        return SOLANA_MAINNET_RPC_URL || clusterApiUrl("mainnet-beta");
    } else {
        return SOLANA_DEVNET_RPC_URL || clusterApiUrl("devnet");
    }
};

export const shortenWalletAddress = (address: string) => {
    if (address) {
        return address.slice(0, 4) + "..." + address.slice(-4);
    } else {
        return "---";
    }
};

export const validateSolAddress = (address: string) => {
    try {
        let pubkey = new PublicKey(address);
        let isSolana = PublicKey.isOnCurve(pubkey.toBuffer());
        return isSolana;
    } catch (error) {
        return false;
    }
};

export const confirmTransaction = async (
    txSignature: string,
    connection: Connection
) => {
    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txSignature,
    });
};
