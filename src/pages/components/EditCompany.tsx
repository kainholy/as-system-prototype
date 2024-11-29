import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

type EditCompanyProps = {
  setEditOpen: (isOpen: boolean) => void;
  companyId: number;
};

type Company = {
  id: number;
  companyName: string;
  postcode: string;
  address: string;
  email: string;
  phonenumber: string;
};

function EditCompany({ setEditOpen, companyId }: EditCompanyProps) {
  const [editedCompany, setEditedCompany] = useState<Company | null>(null);

  const editCloseFunc = () => {
    setEditOpen(false); // モーダルを閉じる関数
  };

  useEffect(() => {
    // 編集対象の会社情報を取得
    const fetchCompany = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/companies/${companyId}`
        );
        setEditedCompany(response.data);
      } catch (error) {
        console.error("会社情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchCompany();
  }, [companyId]);

  const handleInputChange = (field: string, value: any) => {
    setEditedCompany((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleUpdate = async () => {
    if (editedCompany) {
      try {
        await axios.put(
          `http://localhost:4000/companies/${editedCompany.id}`,
          editedCompany
        );
        alert("会社情報が更新されました。");
        editCloseFunc();
        window.location.reload(); // ページをリロード
      } catch (error) {
        console.error("更新中にエラーが発生しました:", error);
        alert("更新中にエラーが発生しました。");
      }
    }
  };

  const handleDelete = async () => {
    if (editedCompany) {
      try {
        await axios.delete(
          `http://localhost:4000/companies/${editedCompany.id}`
        );
        alert("会社情報が削除されました。");
        editCloseFunc();
        window.location.reload(); // ページをリロード
      } catch (error) {
        console.error("削除中にエラーが発生しました:", error);
      }
    }
  };

  if (!editedCompany) {
    return <div>Loading...</div>; // データ取得中に表示
  }

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
        p="40px 32px"
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
          onClick={editCloseFunc}
        />
        <Heading fontSize="xl" mb="12px">
          会社情報編集
        </Heading>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            会社名
          </FormLabel>
          <Input
            type="text"
            name="companyName"
            value={editedCompany.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            郵便番号
          </FormLabel>
          <Input
            type="text"
            name="postcode"
            value={editedCompany.postcode}
            onChange={(e) => handleInputChange("postcode", e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            住所
          </FormLabel>
          <Input
            type="text"
            name="address"
            value={editedCompany.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            メールアドレス
          </FormLabel>
          <Input
            type="email"
            name="email"
            value={editedCompany.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            電話番号
          </FormLabel>
          <Input
            type="tel"
            name="phonenumber"
            value={editedCompany.phonenumber}
            onChange={(e) => handleInputChange("phonenumber", e.target.value)}
          />
        </FormControl>

        <Flex gap="20px" justifyContent="right">
          <Button
            onClick={handleUpdate}
            mt={4}
            pl={12}
            pr={12}
            colorScheme="blue"
          >
            更新
          </Button>
          <Button
            onClick={handleDelete}
            mt={4}
            pl={12}
            pr={12}
            colorScheme="red"
          >
            削除
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default EditCompany;
