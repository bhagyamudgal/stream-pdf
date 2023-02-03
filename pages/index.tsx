import Head from "next/head";
import GetAllStreamsSection from "@/components/GetAllStreamsSection";
import { Heading, Link } from "@chakra-ui/react";

export default function Home() {
    return (
        <div>
            <Head>
                <title>
                    Stream PDF | Get Streams Data From streamflow.finance
                </title>
                <meta
                    name="description"
                    content="Download streams data in PDF format using Stream PDF. You can get streams data from streamflow.finance by using this tool and download it as PDF file. "
                />
            </Head>

            <Heading as="h1" size="xl" textAlign="center" my={4}>
                Download streams data in PDF format using Stream PDF.
            </Heading>

            <Heading as="h2" size="lg" textAlign="center" pb={8}>
                You can get streams data from{" "}
                <Link
                    href="http://streamflow.finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    _hover={{ color: "blue.500" }}
                >
                    streamflow.finance
                </Link>{" "}
                by using this tool and download it as PDF file.
            </Heading>

            <GetAllStreamsSection />
        </div>
    );
}
