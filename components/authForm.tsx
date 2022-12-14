import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";

import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: string }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  return (
    <Box height="100vh" width="100vw" bg="black">
      <Flex justify="center" align="center" height="100px" color="white">
        Hello
      </Flex>
      <Flex
        justify="center"
        align="center"
        height="calc(100vh - 100px)"
        color="white"
      >
        Form
      </Flex>
    </Box>
  );
};

export default AuthForm;
