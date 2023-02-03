import Head from "next/head";
import GetAllStreamsForm from "@/components/GetAllStreamsForm";

import { useEffect } from "react";

export default function Home() {
    return (
        <div>
            <Head>
                <title>
                    Stream PDF | Get Streams Data From streamflow.finance
                </title>
            </Head>
            <GetAllStreamsForm />
        </div>
    );
}
