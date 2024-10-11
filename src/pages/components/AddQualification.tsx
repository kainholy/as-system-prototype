import React from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";

function AddQualification({
  setAddOpen,
}: {
  setAddOpen: (open: boolean) => void;
}) {
  const addCloseFunc = () => {
    setAddOpen(false); // モーダルを閉じる関数
  };

  const [qualificationName, setQualification] = useState("");

  const handleSubmit = async () => {
    try {
      // axiosを使用してバックエンドへのPOSTリクエスト
      const response = await axios.post(
        "http://localhost:4000/registerQualification",
        {
          qualificationName,
        }
      );
      if (response.status === 201) {
        alert("資格を追加しました");
        setAddOpen(false);
        // ページをリロード
        window.location.reload();
      } else {
        alert("資格の追加に失敗しました");
      }
    } catch (error) {
      console.error("資格の追加中にエラーが発生しました:", error);
    }
  };
  return (
    <Box
      position="absolute"
      top="52px"
      left="0"
      backgroundColor="blackAlpha.500"
      w="100%"
      h="100vh"
      zIndex="5"
    >
      <Flex
        w="80%"
        maxW="800px"
        margin="80px auto"
        direction="column"
        gap="24px"
        backgroundColor="white"
        p="100px 32px 40px"
        borderRadius="12px"
        position="relative"
      >
        {/* 閉じるアイコン */}
        <IconButton
          aria-label="Close modal"
          icon={<CloseIcon />}
          position="absolute"
          top="24px"
          right="24px"
          onClick={addCloseFunc} // 閉じる関数をトリガー
        />
        <FormControl isRequired>
          <Input
            type="name"
            placeholder="山田"
            value={qualificationName}
            onChange={(e) => setQualification(e.target.value)}
          />
        </FormControl>

        <Flex gap="20px" justifyContent="right">
          <Button
            mt={4}
            pl={12}
            pr={12}
            colorScheme="blue"
            type="submit"
            onClick={handleSubmit}
          >
            追加
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AddQualification;
