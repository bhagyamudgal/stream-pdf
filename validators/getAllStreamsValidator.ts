import { validateSolAddress } from "@/utils/solana";
import { z } from "zod";

export const getAllStreamsFormSchema = z.object({
    wallet: z
        .string()
        .min(1, { message: "Wallet address is required" })
        .refine(
            (value) => {
                return validateSolAddress(value as string);
            },
            { message: "Invalid wallet address" }
        ),
    network: z.enum(["mainnet-beta", "devnet"]),
    direction: z.enum(["all", "incoming", "outgoing"]),
    type: z.enum(["all", "stream", "vesting"]),
});

export type IGetAllStreamsFormInput = z.infer<typeof getAllStreamsFormSchema>;
