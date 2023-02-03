import { isInvalidField } from "@/utils/reactHookForm";
import {
    getAllStreamsFormSchema,
    IGetAllStreamsFormInput,
} from "@/validators/getAllStreamsValidator";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getAllStreams } from "@/utils/api/streams";
import { GetAllStreamsData } from "@/types";

interface Props {
    setData: (data: GetAllStreamsData) => void;
    setLoading: (data: boolean) => void;
}

function GetAllStreamsForm({ setData, setLoading }: Props) {
    const {
        handleSubmit,

        register,

        formState: { errors, isSubmitting },
    } = useForm<IGetAllStreamsFormInput>({
        resolver: zodResolver(getAllStreamsFormSchema),
    });

    const getAllStreamsHandler = async (values: IGetAllStreamsFormInput) => {
        setLoading(true);
        try {
            const response = await getAllStreams(values);

            if (!response.success) {
                throw new Error("Something went wrong while getting streams!");
            }

            const result: GetAllStreamsData = await response.result;

            setData(result);
        } catch (error) {
            console.error("getAllStreamsHandler =>", error);
        }
        setLoading(false);
    };

    return (
        <VStack
            as="form"
            maxW="xs"
            spacing={4}
            mx="auto"
            my={8}
            onSubmit={handleSubmit(getAllStreamsHandler)}
        >
            <FormControl isInvalid={isInvalidField(errors?.wallet)}>
                <FormLabel htmlFor="wallet-address">
                    Enter Wallet Address
                </FormLabel>

                <Input
                    id="wallet-address"
                    placeholder="Please enter your wallet address"
                    {...register("wallet")}
                />

                <FormErrorMessage>
                    {errors?.wallet && errors?.wallet?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isInvalidField(errors?.network)}>
                <FormLabel htmlFor="network">Choose Solana Network</FormLabel>

                <Select
                    id="network"
                    placeholder="Select Solana Network"
                    {...register("network")}
                >
                    <option value="mainnet-beta">Mainnet Beta</option>
                    <option value="devnet">Devnet</option>
                </Select>

                <FormErrorMessage>
                    {errors?.network && "Please select a network"}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isInvalidField(errors?.direction)}>
                <FormLabel htmlFor="direction">
                    Choose Stream Direction
                </FormLabel>

                <Select
                    id="direction"
                    {...register("direction")}
                    defaultValue="all"
                >
                    <option value="all">All</option>
                    <option value="incoming">Incoming</option>
                    <option value="outgoing">Outgoing</option>
                </Select>

                <FormErrorMessage>
                    {errors?.direction && "Please select a stream direction"}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isInvalidField(errors?.type)}>
                <FormLabel htmlFor="type">Choose Stream Type</FormLabel>

                <Select id="type" defaultValue="all" {...register("type")}>
                    <option value="all">All</option>
                    <option value="stream">Stream</option>
                    <option value="vesting">Vesting</option>
                </Select>

                <FormErrorMessage>
                    {errors?.type && "Please select a stream type"}
                </FormErrorMessage>
            </FormControl>

            <Button
                colorScheme="blue"
                w="full"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Getting All Streams"
            >
                Get All Streams
            </Button>
        </VStack>
    );
}

export default GetAllStreamsForm;
