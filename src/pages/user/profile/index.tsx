import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import UserNavigation from "../../components/userNavigation";
import Bread from "../../components/Breadcrumb";
import UserEdit from "@/pages/components/UserEdit";

function checkProfile() {
  const [editOpen, setEditOpen] = useState(false);

  const editOpenFunc = () => {
    setEditOpen(true);
  };

  return (
    <>
      <UserNavigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="隊員情報" third="隊員個人情報" />
        {editOpen && <UserEdit setEditOpen={setEditOpen} />}
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          <Heading fontSize="xl" mb="12px">
            隊員詳細情報
          </Heading>

          {/* 隊員番号 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              隊員番号
            </Text>
            <Heading size="sm">1234</Heading>
          </Flex>

          {/* 名前 */}
          <Flex flex="1" gap="40px">
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                性
              </Text>
              <Heading size="sm">山田</Heading>
            </Flex>
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                名
              </Text>
              <Heading size="sm">太郎</Heading>
            </Flex>
          </Flex>

          {/* ローマ字 */}
          <Flex flex="1" gap="40px">
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                性(ローマ字)
              </Text>
              <Heading size="sm">Yamada</Heading>
            </Flex>
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                名(ローマ字)
              </Text>
              <Heading size="sm">Taro</Heading>
            </Flex>
          </Flex>

          {/* 生年月日 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              生年月日
            </Text>
            <Heading size="sm">1990-01-01</Heading>
          </Flex>

          {/* 性別 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              性別
            </Text>
            <Heading size="sm">男</Heading>
          </Flex>

          {/* 住所 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              郵便番号
            </Text>
            <Heading size="sm">274-0987</Heading>
            <Text fontSize="sm" color="gray.800">
              住所
            </Text>
            <Heading size="sm">東京都港区高輪1-2-3</Heading>
          </Flex>

          {/* 電話番号 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              電話番号
            </Text>
            <Heading size="sm">090-1234-5678</Heading>
          </Flex>

          {/* メールアドレス */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              メールアドレス
            </Text>
            <Heading size="sm">template@gmail.com</Heading>
          </Flex>

          {/* 雇用開始日 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              雇用開始日
            </Text>
            <Heading size="sm">2020-01-01</Heading>
          </Flex>

          {/* 緊急連絡先・属柄 */}
          <Flex flex="1" gap="40px">
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                緊急連絡先
              </Text>
              <Heading size="sm">090-8765-4321</Heading>
            </Flex>
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                名前
              </Text>
              <Heading size="sm">辻本拓海</Heading>
            </Flex>
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                属柄
              </Text>
              <Heading size="sm">父</Heading>
            </Flex>
          </Flex>

          {/* 資格情報 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              資格情報
            </Text>
            <Heading size="sm">2級</Heading>
          </Flex>

          {/* NG隊員リスト */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              NG隊員リスト
            </Text>
            <Heading size="sm">なし</Heading>
          </Flex>

          {/* 自主出禁 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              自主出禁
            </Text>
            <Heading size="sm">なし</Heading>
          </Flex>

          <Flex gap="20px" justifyContent="center">
            <Button
              onClick={editOpenFunc}
              mt={4}
              pl={12}
              pr={12}
              colorScheme="blue"
            >
              編集する
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default checkProfile;
