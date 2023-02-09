import { apiInstance, ApiResponseType } from ".";
import { IGetAllStreamsFormInput } from "@/validators/getAllStreamsValidator";
import { APP_SECRET } from "../env";

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

export const generatePdf = async ({
    data,
    generateSingle,
}: {
    data: any;
    generateSingle: boolean;
}) => {
    const response = await apiInstance.post(
        "https://custom-puppeteer-server.onrender.com/generatePdf",
        {
            data,
            generateSingle,
        },
        { headers: { Authorization: `${APP_SECRET}` } }
    );

    const result: ApiResponseType = response.data;

    return result;
};
