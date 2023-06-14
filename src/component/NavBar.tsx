import { useProfileContext } from "../context/ProfileContext";
import { usePageMode } from "../context/PageModeContext";
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Text,
  Stack,
  Switch,
} from "@chakra-ui/react";

export function Navbar() {
  const { name } = useProfileContext();
  const { darkMode, setDarkMode } = usePageMode();
  const padding = 3;
  return (
    <>
      <Flex borderBottom={"2px"}>
        <Box p={padding}>
          <Heading size="md">POS App</Heading>
        </Box>
        <Spacer />
        <Box p={padding}>
          <Text as="b" fontSize={"xl"}>
            {name === "" ? `` : `Welcome ${name}`}
          </Text>
        </Box>
        <Spacer />
        <Box p={padding}>
          <Stack align="center" direction="row">
            <Switch size="md" onChange={() => setDarkMode(!darkMode)} />
            <span> {darkMode === false ? "Dark" : "White"}</span>
          </Stack>
          {/* <Button
            variant="link"
            color={"inherit"}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode === false ? "Dark Mode" : "White Mode"}
          </Button> */}
        </Box>
      </Flex>
    </>
  );
}
