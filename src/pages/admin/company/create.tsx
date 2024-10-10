import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";

function CompanyCreate() {
  const [companyName, setCompanyName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const handleSubmit = async () => {
    try {
      // バックエンドへのPOSTリクエスト
      const response = await fetch("http://localhost:4000/registerCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          postcode,
          address,
          email,
          phonenumber,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("会社が正常に登録されました");
      } else {
        alert(`エラー: ${result.message}`);
        console.log(result.message);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      console.log(error);
    }
  };

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="会社情報" third="会社追加" />
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          {/* 会社情報 */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              会社名
            </FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="〇〇会社"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              郵便番号
            </FormLabel>
            <Input
              type="text"
              name="postcode"
              placeholder="123-0123"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              住所
            </FormLabel>
            <Input
              type="text"
              name="address"
              placeholder="東京都足立区綾瀬1-1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              メールアドレス
            </FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="template@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              電話番号
            </FormLabel>
            <Input
              type="tel"
              name="phone"
              placeholder="09000000000"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </FormControl>

          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            onClick={handleSubmit}
          >
            追加
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default CompanyCreate;
