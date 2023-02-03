import { Center, Spinner, Text } from "@chakra-ui/react";

interface Props {
    loadingText?: string;
    color?: string;
}

function LoadingSpinner({ loadingText = "", color = "blue.500" }: Props) {
    return (
        <Center color={color} my={16} flexDirection="column">
            <Spinner size="lg" mb={3} />
            {loadingText && <Text fontWeight="medium">{loadingText}</Text>}
        </Center>
    );
}

export default LoadingSpinner;
