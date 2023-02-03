import { apiInstance, ApiResponseType } from ".";
import { IGetAllStreamsFormInput } from "@/validators/getAllStreamsValidator";

export const getAllStreams = async ({
    wallet,
    network,
    direction = "all",
    type = "all",
}: IGetAllStreamsFormInput) => {
    const response = await apiInstance.post("/getAllStreams", {
        wallet,
        network,
        direction,
        type,
    });

    const result: ApiResponseType = response.data;

    return result;
};
