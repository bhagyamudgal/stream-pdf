import { Container, HStack, Text } from "@chakra-ui/react";

function Header() {
    return (
        <Container p={4} maxW="6xl" borderBottom="1px" borderColor="gray.300">
            <HStack justifyContent="space-between">
                <Text fontSize="2xl" fontWeight="medium">
                    Stream PDF
                </Text>
            </HStack>
        </Container>
    );
}

export default Header;
