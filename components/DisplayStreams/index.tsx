import { GetAllStreamsData, ParsedStream } from "@/types";
import { generatePdf } from "@/utils/api/streams";
import { capitalizeFirstLetter } from "@/utils/general";
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { saveAs } from "file-saver";

interface Props {
    data: GetAllStreamsData | null;
    isLoading: boolean;
    pdfMode?: boolean;
}

function InfoField({
    name,
    value,
    makeFirstLetterCapital = false,
    pdfMode = false,
}: {
    name: string;
    value: any;
    makeFirstLetterCapital?: boolean;
    pdfMode?: boolean;
}) {
    if (value) {
        value = makeFirstLetterCapital ? capitalizeFirstLetter(value) : value;

        if (pdfMode) {
            return (
                <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    border="1px"
                    borderColor="blue.400"
                    p={4}
                    my={4}
                    spacing={{ base: "2", md: "0" }}
                >
                    <Text fontWeight="medium" maxW={{ base: "95%", md: "45%" }}>
                        {name}
                    </Text>
                    <Text maxW={{ base: "95%", md: "45%" }}>{value}</Text>
                </Stack>
            );
        } else {
            return (
                <Stack
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={{ md: "space-between" }}
                    alignItems="center"
                    border="1px"
                    borderColor="blue.400"
                    p={4}
                    my={4}
                    spacing={{ base: "2", md: "0" }}
                >
                    <Text fontWeight="medium" maxW={{ base: "95%", md: "45%" }}>
                        {name}
                    </Text>
                    <Text maxW={{ base: "95%", md: "45%" }}>{value}</Text>
                </Stack>
            );
        }
    } else {
        return null;
    }
}

function StreamField({
    name,
    value,
    makeFirstLetterCapital = false,
    pdfMode = false,
}: {
    name: string;
    value: any;
    makeFirstLetterCapital?: boolean;
    pdfMode?: boolean;
}) {
    if (value) {
        value = makeFirstLetterCapital ? capitalizeFirstLetter(value) : value;

        if (pdfMode) {
            return (
                <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    my={2}
                    spacing={{ base: "2", md: "0" }}
                >
                    <Text fontWeight="medium" maxW={{ base: "95%", md: "45%" }}>
                        {name}
                    </Text>
                    <Text align="right" maxW={{ base: "95%", md: "45%" }}>
                        {value}
                    </Text>
                </Stack>
            );
        } else {
            return (
                <Stack
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={{ md: "space-between" }}
                    alignItems="center"
                    my={2}
                    spacing={{ base: "2", md: "0" }}
                >
                    <Text fontWeight="medium" maxW={{ base: "95%", md: "45%" }}>
                        {name}
                    </Text>
                    <Text align="right" maxW={{ base: "95%", md: "45%" }}>
                        {value}
                    </Text>
                </Stack>
            );
        }
    } else {
        return null;
    }
}

export function DisplayStream({
    stream,
    index,
    hideDownloadButton = false,
    pdfMode = false,
}: {
    stream: ParsedStream;
    index: number;
    hideDownloadButton?: boolean;
    pdfMode?: boolean;
}) {
    if (pdfMode) {
        hideDownloadButton = true;
    }

    const startDateObj = new Date(stream.startTimestamp);

    const endDateObj = new Date(stream.endTimestamp);

    const startDate = format(startDateObj, "do MMMM yyyy");

    const startTime = format(startDateObj, "pppp");

    const endDate = format(endDateObj, "do MMMM yyyy");

    const endTime = format(endDateObj, "pppp");

    const [downloadingPdf, setDownloadingPdf] = useState(false);

    const downloadPdfHandler = async () => {
        setDownloadingPdf(true);
        try {
            const response = await generatePdf({
                data: { parsedStream: stream },
                generateSingle: true,
            });
            if (!response.success) {
                throw new Error("Something went wrong while downloading pdf!");
            }
            const result = response.result;

            saveAs(result, "stream-pdf.pdf");
        } catch (error) {
            console.error("downloadPdfHandler =>", error);
        }
        setDownloadingPdf(false);
    };

    return (
        <Box
            border="1px"
            borderColor="gray.400"
            p={4}
            my={4}
            id="single-stream"
        >
            <Stack
                w="full"
                flexDirection={{
                    base: "column",
                    md: "row",
                }}
                justifyContent={{
                    md: "space-between",
                }}
                alignItems="center"
                spacing={{ base: "2", md: "0" }}
                mb={4}
            >
                <Text
                    fontSize="xl"
                    decoration="underline"
                    textUnderlineOffset={3}
                >
                    Stream {index + 1}
                </Text>

                {!hideDownloadButton && (
                    <Button
                        colorScheme="purple"
                        size="sm"
                        onClick={downloadPdfHandler}
                        isLoading={downloadingPdf}
                        loadingText="Downloading PDF"
                    >
                        Download PDF
                    </Button>
                )}
            </Stack>
            <StreamField name="Stream Id" value={stream.id} pdfMode={pdfMode} />

            <StreamField
                name="Release Amount"
                value={`${stream.releaseAmount} ${stream.tokenInfo.symbol}`}
                pdfMode={pdfMode}
            />
            <StreamField
                name="Release Frequency"
                value={stream.releaseFrequency}
                pdfMode={pdfMode}
            />
            <StreamField
                name="Total Amount"
                value={`${stream.totalAmount} ${stream.tokenInfo.symbol}`}
                pdfMode={pdfMode}
            />

            <StreamField
                name="Start Date"
                value={startDate}
                pdfMode={pdfMode}
            />
            <StreamField
                name="Start Time"
                value={startTime}
                pdfMode={pdfMode}
            />

            <StreamField name="End Date" value={endDate} pdfMode={pdfMode} />

            <StreamField name="End Time" value={endTime} pdfMode={pdfMode} />

            <StreamField
                name="Sender Wallet"
                value={stream.senderWallet}
                pdfMode={pdfMode}
            />
            <StreamField
                name="Recipient Wallet"
                value={stream.recipientWallet}
                pdfMode={pdfMode}
            />

            <StreamField
                name="Who can transfer contract?"
                value={stream.whoCanTransfer}
                pdfMode={pdfMode}
            />
            <StreamField
                name="Who can cancel stream?"
                value={stream.whoCanCancel}
                pdfMode={pdfMode}
            />

            <StreamField
                name="Automatic withdrawal enabled?"
                value={stream.automaticWithdrawal}
                pdfMode={pdfMode}
            />

            <StreamField
                name="Stream status"
                value={stream.status}
                pdfMode={pdfMode}
            />

            <StreamField
                name="Stream direction"
                value={stream.direction}
                makeFirstLetterCapital={true}
                pdfMode={pdfMode}
            />

            <StreamField
                name="Stream type"
                value={stream.type}
                makeFirstLetterCapital={true}
                pdfMode={pdfMode}
            />
        </Box>
    );
}

function DisplayStreams({ data, isLoading, pdfMode = false }: Props) {
    const [downloadingAllPdf, setDownloadingAllPdf] = useState(false);

    const downloadAllStreamPdfHandler = async () => {
        setDownloadingAllPdf(true);
        try {
            const response = await generatePdf({
                data,
                generateSingle: false,
            });

            if (!response.success) {
                throw new Error(
                    "Something went wrong while downloading all pdf!"
                );
            }

            const result = response.result;

            saveAs(result, "stream-pdf.pdf");
        } catch (error) {
            console.error("downloadAllStreamPdfHandler =>", error);
        }
        setDownloadingAllPdf(false);
    };

    if (isLoading) {
        return <LoadingSpinner loadingText="Loading Streams" />;
    } else {
        if (data) {
            if (data.parsedStreams?.length === 0) {
                return (
                    <Center my={16}>
                        <Text fontSize="xl" color="red.500">
                            No streams found!
                        </Text>
                    </Center>
                );
            } else {
                return (
                    <Center my={16}>
                        <Box w="full" id="stream-details">
                            {!pdfMode && (
                                <Center mb={8} flexDirection="column">
                                    <Heading textAlign="center" mb={3}>
                                        Stream Details
                                    </Heading>

                                    <Button
                                        colorScheme="purple"
                                        onClick={downloadAllStreamPdfHandler}
                                        isLoading={downloadingAllPdf}
                                        loadingText="Downloading PDF containing all streams"
                                    >
                                        Download PDF containing all streams
                                    </Button>
                                </Center>
                            )}

                            <InfoField
                                name="Wallet"
                                value={data?.wallet}
                                pdfMode={pdfMode}
                            />

                            <InfoField
                                name="Network"
                                value={data?.network}
                                makeFirstLetterCapital={true}
                                pdfMode={pdfMode}
                            />

                            <InfoField
                                name="Direction"
                                value={data?.direction}
                                makeFirstLetterCapital={true}
                                pdfMode={pdfMode}
                            />

                            <InfoField
                                name="Type"
                                value={data?.type}
                                makeFirstLetterCapital={true}
                                pdfMode={pdfMode}
                            />

                            {data?.parsedStreams?.map((stream, index) => {
                                return (
                                    <DisplayStream
                                        key={stream.id}
                                        stream={stream}
                                        index={index}
                                        pdfMode={pdfMode}
                                    />
                                );
                            })}
                        </Box>
                    </Center>
                );
            }
        } else {
            return (
                <Center my={16}>
                    <Text fontSize="xl" color="blue.500">
                        Fill in the form to get streams!
                    </Text>
                </Center>
            );
        }
    }
}

export default DisplayStreams;
