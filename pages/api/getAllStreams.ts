import type { NextApiRequest, NextApiResponse } from "next";
import { PublicKey } from "@solana/web3.js";
import {
    ApiResponseType,
    handleApiClientError,
    handleApiRouteError,
    handleInvalidRoute,
    successHandler,
} from "@/utils/api";
import { getParsedStream, getStreamClient } from "@/utils/streamflow";
import { ParsedStream } from "@/types";
import { getAllStreamsFormSchema } from "@/validators/getAllStreamsValidator";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseType>
) {
    try {
        if (req.method !== "POST") {
            return handleInvalidRoute(res);
        }

        const bodyValidation = getAllStreamsFormSchema.safeParse(req.body);

        if (!bodyValidation.success) {
            return handleApiClientError(res);
        }

        const { wallet, network, direction, type } = bodyValidation.data;

        const streamClient = getStreamClient(network);

        const streams = await streamClient.get({
            wallet: new PublicKey(wallet),
            // @ts-ignore
            type,
            // @ts-ignore
            direction,
        });

        const parsedStreams: ParsedStream[] = [];

        for (const stream of streams) {
            const parsedStream = await getParsedStream({
                stream,
                wallet,
                network,
            });

            parsedStreams.push(parsedStream);
        }

        const result = {
            wallet,
            network,
            direction,
            type,
            streams,
            parsedStreams,
        };

        res.status(200).json(
            successHandler(result, "All streams fetched successfully!")
        );
    } catch (error) {
        console.error("getAllStreams =>", error);
        return handleApiRouteError(error, res);
    }
}
