import { StreamDirection } from "@streamflow/stream";

export type SolanaNetwork = "devnet" | "mainnet-beta";

export type TokenInfo = {
    name: string;
    symbol: string;
    image: string;
    address: string;
    mint_authority: string;
    freeze_authority: string;
    current_supply: number;
    decimals: number;
};

export type StreamStatus = "Scheduled" | "Cancelled" | "Completed";

export type ParsedStream = {
    id: string;
    releaseAmount: number;
    releaseFrequency: string;
    startTimestamp: number;
    endTimestamp: number;
    senderWallet: string;
    recipientWallet: string;
    whoCanTransfer: string;
    whoCanCancel: string;
    automaticWithdrawal: string;
    status: StreamStatus;
    direction: StreamDirection;
    tokenInfo: TokenInfo;
};
