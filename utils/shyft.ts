import axios from "axios";
import { SHYFT_API_KEY } from "./env";
import { SolanaNetwork } from "@/types";

export const getTokenInfo = async (
    tokenAddress: string,
    network: SolanaNetwork
) => {
    const options = {
        headers: {
            "x-api-key": SHYFT_API_KEY,
        },
    };

    const response = await axios.get(
        `https://api.shyft.to/sol/v1/token/get_info?network=${network}&token_address=${tokenAddress}`,
        options
    );

    const result = await response.data;

    return result;
};
