// クリックした案件情報を取得して編集させる予定
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
  Textarea,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function EditProject({ setEditOpen }) {
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
          案件情報編集
        </Heading>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            会社名
          </FormLabel>
          <Input type="name" placeholder="〇〇会社" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            電話番号
          </FormLabel>
          <Input type="tel" placeholder="09000000000" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            現場郵便番号
          </FormLabel>
          <Input type="name" placeholder="274-0000" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            現場住所
          </FormLabel>
          <Input type="name" placeholder="千葉県習志野市津田沼11-11" />
        </FormControl>

        <Flex flex="1" gap="40px">
          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              必要資格
            </FormLabel>
            <Select placeholder="資格を選択">
              <option>なし</option>
              <option>1級</option>
              <option>2級</option>
              <option>3級</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              必要資格保持者数
            </FormLabel>
            <NumberInput max={200} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Flex>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            必要隊員数
          </FormLabel>
          <NumberInput max={200} min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" color="gray.800">
            単価
          </FormLabel>
          <Select placeholder="単価を選択">
            <option>平日(日勤)</option>
            <option>平日(夜勤)</option>
            <option>休日(日勤)</option>
            <option>休日(夜勤)</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            金額
          </FormLabel>
          <Input type="text" name="price" placeholder="金額を入力(10000)" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            日にち
          </FormLabel>
          <Input type="date" />
        </FormControl>

        <Flex flex="1" gap="40px">
          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              開始時間
            </FormLabel>
            <Input type="time" />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              終了時間
            </FormLabel>
            <Input type="time" />
          </FormControl>
        </Flex>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            担当者
          </FormLabel>
          <Input type="name" placeholder="山田 太郎 様" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            担当者の電話番号
          </FormLabel>
          <Input type="tel" placeholder="09000000000" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" color="gray.800">
            備考欄
          </FormLabel>
          <Textarea />
        </FormControl>

        <Flex gap="20px" justifyContent="right">
          <Button mt={4} pl={12} pr={12} colorScheme="blue" type="submit">
            更新
          </Button>
          <Button mt={4} pl={12} pr={12} colorScheme="red" type="submit">
            削除
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
