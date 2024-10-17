import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

type EmergencyContact = {
  name: string;
  relationship: string;
  phoneNumber: string;
};

type Member = {
  id: number;
  staffId: string;
  name: string;
  romanname: string;
  address: string;
  postcode: string;
  phonenumber: string;
  email: string;
  birthday: Date;
  hiredate: string;
  role: string;
  emergencyContacts: EmergencyContact[];
};

type EditMemberProps = {
  setEditOpen: (isOpen: boolean) => void;
  memberId: number;
};

export default function EditMember({ setEditOpen, memberId }: EditMemberProps) {
  const [editedMember, setEditedMember] = useState<Member | null>(null);

  useEffect(() => {
    // 編集対象のメンバー情報を取得
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/members/${memberId}`
        );
        setEditedMember(response.data);
      } catch (error) {
        console.error("メンバー情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchMember();
  }, [memberId]);

  const editCloseFunc = () => {
    setEditOpen(false); // モーダルを閉じる関数
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedMember((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleUpdate = async () => {
    if (editedMember) {
      try {
        await axios.put(
          `http://localhost:4000/members/${editedMember.id}`,
          editedMember
        );
        alert("隊員情報が更新されました。");
        editCloseFunc();
        window.location.reload(); // ページをリロード
      } catch (error) {
        console.error("更新中にエラーが発生しました:", error);
        alert("更新中にエラーが発生しました。");
      }
    }
  };

  const handleDelete = async () => {
    if (editedMember) {
      try {
        await axios.delete(`http://localhost:4000/members/${editedMember.id}`);
        alert("隊員情報が削除されました。");
        editCloseFunc();
        window.location.reload(); // ページをリロード
      } catch (error) {
        console.error("削除中にエラーが発生しました:", error);
        alert("削除中にエラーが発生しました。");
      }
    }
  };

  if (!editedMember) {
    return <div>Loading...</div>; // メンバー情報を取得中に表示
  }

  return (
    <Box
      position="absolute"
      top="52px"
      left="0"
      backgroundColor="blackAlpha.500"
      w="100%"
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
          onClick={editCloseFunc} // 閉じる関数をトリガー
        />
        <Heading fontSize="xl" mb="12px">
          隊員情報編集
        </Heading>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            隊員番号
          </FormLabel>
          <Input
            type="text"
            value={editedMember.staffId}
            onChange={(e) => handleInputChange("staffId", e.target.value)}
          />
        </FormControl>

        <Flex flex="1" gap="40px">
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              性
            </FormLabel>
            <Input
              type="text"
              value={editedMember.name.split(" ")[0]}
              onChange={(e) =>
                handleInputChange(
                  "name",
                  `${e.target.value} ${editedMember.name.split(" ")[1] || ""}`
                )
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              名
            </FormLabel>
            <Input
              type="text"
              value={editedMember.name.split(" ")[1] || ""}
              onChange={(e) =>
                handleInputChange(
                  "name",
                  `${editedMember.name.split(" ")[0]} ${e.target.value}`
                )
              }
            />
          </FormControl>
        </Flex>

        <Flex flex="1" gap="40px">
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              セイ
            </FormLabel>
            <Input
              type="text"
              value={editedMember.romanname.split(" ")[0]}
              onChange={(e) =>
                handleInputChange(
                  "romanname",
                  `${e.target.value} ${editedMember.romanname.split(" ")[1] || ""}`
                )
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              メイ
            </FormLabel>
            <Input
              type="text"
              value={editedMember.romanname.split(" ")[1] || ""}
              onChange={(e) =>
                handleInputChange(
                  "romanname",
                  `${editedMember.romanname.split(" ")[0]} ${e.target.value}`
                )
              }
            />
          </FormControl>
        </Flex>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            生年月日
          </FormLabel>
          <Input
            type="date"
            value={
              editedMember.birthday instanceof Date
                ? editedMember.birthday.toISOString().split("T")[0]
                : editedMember.birthday
            }
            onChange={(e) => handleInputChange("birthday", e.target.value)}
          />
        </FormControl>

        <Flex flex="1" gap="40px">
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              郵便番号
            </FormLabel>
            <Input
              type="text"
              value={editedMember.postcode}
              onChange={(e) => handleInputChange("postcode", e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              住所
            </FormLabel>
            <Input
              type="text"
              value={editedMember.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </FormControl>
        </Flex>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            電話番号
          </FormLabel>
          <Input
            type="tel"
            value={editedMember.phonenumber}
            onChange={(e) => handleInputChange("phonenumber", e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            メールアドレス
          </FormLabel>
          <Input
            type="email"
            value={editedMember.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </FormControl>



        <Flex gap="20px" justifyContent="right">
          <Button
            mt={4}
            pl={12}
            pr={12}
            colorScheme="blue"
            onClick={handleUpdate}
          >
            更新
          </Button>
          <Button
            mt={4}
            pl={12}
            pr={12}
            colorScheme="red"
            onClick={handleDelete}
          >
            削除
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
