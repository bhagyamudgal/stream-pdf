import {
    Cluster,
    getNumberFromBN,
    Stream,
    StreamClient,
    StreamDirection,
} from "@streamflow/stream";
import { secondsToHms } from "./general";
import { getTokenInfo } from "./shyft";
import { getConnectionUrl } from "./solana";
import { ParsedStream, SolanaNetwork, StreamStatus, StreamType } from "@/types";

const getStreamCluster = (network: SolanaNetwork) => {
    if (network === "mainnet-beta") {
        return Cluster.Mainnet;
    } else {
        return Cluster.Devnet;
    }
};

export const getStreamClient = (network: SolanaNetwork) => {
    const streamClient = new StreamClient(
        getConnectionUrl(network),
        getStreamCluster(network),
        "confirmed"
    );

    return streamClient;
};

export const getParsedStream = async ({
    stream,
    wallet,
    network,
}: {
    stream: [string, Stream];
    wallet: string;
    network: SolanaNetwork;
}) => {
    const id = stream[0];
    const data = stream[1];

    const response = await getTokenInfo(data.mint, network);

    if (!response?.success) {
        throw new Error("Token info not found!");
    }

    const tokenInfo = response.result;

    const releaseAmount = getNumberFromBN(
        data?.amountPerPeriod,
        tokenInfo?.decimals
    );

    const releaseFrequency = secondsToHms(data.period);
    const totalAmount = getNumberFromBN(
        data.depositedAmount,
        tokenInfo?.decimals
    );

    const startTimestamp = data.start * 1000;
    const endTimestamp = data.end * 1000;

    const senderWallet = data.sender;
    const recipientWallet = data.recipient;

    let whoCanTransfer = null;

    if (data.transferableBySender && data.transferableByRecipient) {
        whoCanTransfer = `Both Sender & Recipient`;
    } else if (data.transferableBySender) {
        whoCanTransfer = `Sender`;
    } else if (data.transferableByRecipient) {
        whoCanTransfer = `Recipient`;
    } else {
        whoCanTransfer = "No one";
    }

    let whoCanCancel = null;

    if (data.cancelableBySender && data.cancelableByRecipient) {
        whoCanCancel = `Both Sender & Recipient`;
    } else if (data.cancelableBySender) {
        whoCanCancel = `Sender`;
    } else if (data.cancelableByRecipient) {
        whoCanCancel = `Recipient`;
    } else {
        whoCanCancel = "No one";
    }

    const automaticWithdrawal = data?.automaticWithdrawal ? "Yes" : "No";

    let status: StreamStatus = "Cancelled";

    if (data?.canceledAt) {
        status = "Cancelled";
    } else if (Date.now() > endTimestamp) {
        status = "Completed";
    } else {
        status = "Scheduled";
    }

    let direction: StreamDirection = StreamDirection.Incoming;

    if (data.recipient === wallet) {
        direction = StreamDirection.Incoming;
    } else {
        direction = StreamDirection.Outgoing;
    }

    let type: StreamType = "stream";

    if (!data.canTopup) {
        type = "vesting";
    }

    const parsedStream: ParsedStream = {
        id,
        releaseAmount,
        releaseFrequency,
        totalAmount,
        startTimestamp,
        endTimestamp,
        senderWallet,
        recipientWallet,
        whoCanTransfer,
        whoCanCancel,
        automaticWithdrawal,
        status,
        direction,
        type,
        tokenInfo,
    };

    return parsedStream;
};
