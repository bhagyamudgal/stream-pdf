import { GetAllStreamsData } from "@/types";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import DisplayStreams from "../DisplayStreams";
import GetAllStreamsForm from "../GetAllStreamsForm";

function GetAllStreamsSection() {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [data, setData] = useState<GetAllStreamsData | null>(null);

    return (
        <Box>
            <GetAllStreamsForm
                setData={setData}
                setLoading={setIsLoadingData}
            />

            <DisplayStreams data={data} isLoading={isLoadingData} />
        </Box>
    );
}

export default GetAllStreamsSection;
