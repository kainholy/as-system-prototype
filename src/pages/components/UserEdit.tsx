import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Select,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function UserEdit({
  setEditOpen,
}: {
  setEditOpen: (isOpen: boolean) => void;
}) {
  const editCloseFunc = () => {
    setEditOpen(false); // モーダルを閉じる関数
  };
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

        <Flex flex="1" gap="40px">
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              郵便番号
            </FormLabel>
            <Input type="name" placeholder="273-0000" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              住所
            </FormLabel>
            <Input type="name" placeholder="千葉県千葉市千葉区1111-1111" />
          </FormControl>
        </Flex>

        <FormControl>
          <FormLabel fontSize="sm" color="gray.800">
            資格情報
          </FormLabel>
          <Select placeholder="なし">
            <option>なし</option>
            <option>1級</option>
            <option>2級</option>
            <option>3級</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" color="gray.800">
            NG隊員リスト
          </FormLabel>
          <Select placeholder="なし">
            <option>なし</option>
            <option>山田 太郎</option>
            <option>大倉 聖哉</option>
            <option>山田 花子</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" color="gray.800">
            自主出禁
          </FormLabel>
          <Select placeholder="なし">
            <option>なし</option>
            <option>〇〇会社</option>
            <option>××会社</option>
            <option>△△会社</option>
          </Select>
        </FormControl>

        <Flex gap="20px" justifyContent="right">
          <Button mt={4} pl={12} pr={12} colorScheme="blue" type="submit">
            更新
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
