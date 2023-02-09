import type { NextApiRequest, NextApiResponse } from "next";
import {
    ApiResponseType,
    handleApiClientError,
    handleApiRouteError,
    handleInvalidRoute,
    successHandler,
} from "@/utils/api";
import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";
import { APP_SECRET } from "@/utils/env";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseType>
) {
    try {
        if (req.method !== "POST") {
            return handleInvalidRoute(res);
        }

        const { data, generateSingle } = req.body;

        if (!data) {
            return handleApiClientError(res);
        }

        const browser = await puppeteer.launch(
            process.env.NODE_ENV === "production"
                ? {
                      defaultViewport: { width: 1280, height: 720 },
                      args: chrome.args,
                      executablePath: await chrome.executablePath,
                      headless: chrome.headless,
                  }
                : { defaultViewport: { width: 1280, height: 720 } }
        );

        const page = await browser.newPage();

        const domain = req.headers.host;

        const url = `http://${domain}/pdf-generator?data=${encodeURIComponent(
            JSON.stringify(data)
        )}&generateSingle=${encodeURIComponent(
            generateSingle
        )}&secret=${APP_SECRET}`;

        console.log(url);

        await page.goto(url);

        let element;

        if (generateSingle) {
            element = await page.waitForSelector("#single-stream");
        } else {
            element = await page.waitForSelector("#stream-details");
        }

        const pdf = await page.pdf({
            format: "a4",
            scale: 0.8,
        });

        await browser.close();

        const base64 = pdf.toString("base64");
        const result = `data:application/pdf;base64,${base64}`;

        res.status(200).json(
            successHandler(result, "Pdf generated successfully!")
        );
    } catch (error) {
        console.error("generatePdf =>", error);
        return handleApiRouteError(error, res);
    }
}
