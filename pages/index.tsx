import Head from "next/head";
import GetAllStreamsSection from "@/components/GetAllStreamsSection";

export default function Home() {
    return (
        <div>
            <Head>
                <title>
                    Stream PDF | Get Streams Data From streamflow.finance
                </title>
            </Head>
            <GetAllStreamsSection />
        </div>
    );
}
