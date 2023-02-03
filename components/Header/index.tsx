import { Container, HStack, Link, Stack, Text } from "@chakra-ui/react";

function Header() {
    return (
        <Container p={4} maxW="6xl" borderBottom="1px" borderColor="gray.300">
            <Stack
                flexDirection={{ base: "column", sm: "row" }}
                spacing={{ base: "3", sm: "0" }}
                alignItems="center"
                justifyContent="space-between"
            >
                <Text fontSize="2xl" fontWeight="medium">
                    Stream PDF
                </Text>
                <Text fontSize="xl" fontWeight="medium">
                    Developed By{" "}
                    <Link
                        href="http://www.bhagyamudgal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        _hover={{ color: "blue.500" }}
                    >
                        Bhagya Mudgal
                    </Link>
                </Text>
            </Stack>
        </Container>
    );
}

export default Header;
