import { Stream } from "@streamflow/stream";

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
export type StreamDirection = "all" | "incoming" | "outgoing";
export type StreamType = "all" | "stream" | "vesting";

export type ParsedStream = {
    id: string;
    releaseAmount: number;
    releaseFrequency: string;
    totalAmount: number;
    startTimestamp: number;
    endTimestamp: number;
    senderWallet: string;
    recipientWallet: string;
    whoCanTransfer: string;
    whoCanCancel: string;
    automaticWithdrawal: string;
    status: StreamStatus;
    direction: StreamDirection;
    type: StreamType;
    tokenInfo: TokenInfo;
};

export type GetAllStreamsData = {
    parsedStreams: ParsedStream[];
    streams: [string, Stream][];
    wallet?: string;
    network: SolanaNetwork;
    direction?: StreamDirection;
    type?: StreamType;
};
