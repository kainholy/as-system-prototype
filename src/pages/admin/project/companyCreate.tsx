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

function MemberCreate() {
  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread />
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          {/* 会社情報 */}
          <form>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                会社名
              </FormLabel>
              <Input type="text" name="name" placeholder="〇〇会社" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                住所
              </FormLabel>
              <Input
                type="text"
                name="address"
                placeholder="000-0000 東京都足立区綾瀬"
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
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                電話番号
              </FormLabel>
              <Input type="tel" name="phone" placeholder="09000000000" />
            </FormControl>

            <Button mt={4} colorScheme="blue" type="submit">
              追加
            </Button>
          </form>
        </Flex>
      </Box>
    </>
  );
}

export default MemberCreate;
