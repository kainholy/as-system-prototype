import {
  Card,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Page() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        staffId,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      router.push("/user/dashboard");
    } catch (error) {
      setError(
        "ログインに失敗しました。隊員番号とパスワードを確認してください。"
      );
      localStorage.removeItem("token");
    }
  };

  return (
    <>
      <Flex
        w="100%"
        h="100vh"
        align="center"
        justify="center"
        backgroundColor="gray.50"
      >
        <Card w="70%" p="80px 0">
          <Flex
            as="form"
            onSubmit={handleSubmit}
            margin="0 auto"
            w="400px"
            direction="column"
            gap="40px"
            align="center"
          >
            <Flex justify="center" align="center" direction="column" gap="24px">
              <Image src="/logo.png" alt="logo" width={54} height={59} />
              <Flex
                justify="center"
                align="center"
                direction="column"
                gap="8px"
              >
                <Heading size="md" color="gray.800">
                  従業員画面ログイン
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  アカウントにアクセスするための認証情報を入力します。
                </Text>
              </Flex>
            </Flex>

            <Flex
              w="100%"
              justify="center"
              align="center"
              direction="column"
              gap="24px"
            >
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="sm" color="gray.800">
                  隊員番号
                </FormLabel>
                <Input
                  type="text"
                  placeholder="1000"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="sm" color="gray.800">
                  パスワード
                </FormLabel>
                <Input
                  type="password"
                  placeholder="パスワードを入力"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
            </Flex>

            {error && <Text color="red.500">{error}</Text>}

            <Button
              type="submit"
              w="250px"
              backgroundColor="gray.800"
              color="white"
              _hover={{ opacity: 0.8 }}
            >
              ログイン
            </Button>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
