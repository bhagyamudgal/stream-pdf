interface Props {
    data: Partial<GetAllStreamsData>;
    generateSingle: boolean;
}

function PdfGenerator({ data, generateSingle }: Props) {
    console.log({ data });
    if (generateSingle) {
        return (
            <DisplayStream
                // @ts-ignore
                stream={data?.parsedStream}
                index={0}
                hideDownloadButton={true}
                pdfMode={true}
            />
        );
    } else {
        // @ts-ignore
        return <DisplayStreams data={data} isLoading={false} pdfMode={true} />;
    }
}

export default PdfGenerator;

import DisplayStreams, { DisplayStream } from "@/components/DisplayStreams";
import { GetAllStreamsData } from "@/types";
import { APP_SECRET } from "@/utils/env";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data, generateSingle, secret } = ctx.query;

    if (secret !== APP_SECRET) {
        return { props: {}, redirect: { destination: "/" } };
    }

    const parsedData = JSON.parse(data as string);
    const parsedGenerateSingle = generateSingle === "true" ? true : false;

    return {
        props: { data: parsedData, generateSingle: parsedGenerateSingle },
    };
};
