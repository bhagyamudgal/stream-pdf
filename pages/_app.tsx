import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Flex direction="column" minH="100vh" w="full">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                </Head>

                <Header />

                <Container flexGrow={1} p={4} maxW="6xl">
                    <Component {...pageProps} />
                </Container>
            </Flex>
        </ChakraProvider>
    );
}
