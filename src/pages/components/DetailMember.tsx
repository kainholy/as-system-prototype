import { Box, Flex, IconButton, Heading, Text, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function DetailMember({ setDetailOpen, setEditOpen }) {
    const editOpenFunc = () => {
      setEditOpen(true);
      setDetailOpen(false);
    }
    const detailCloseFunc = () => {
      setDetailOpen(false);  // モーダルを閉じる関数
    }
    return (
      <Box position='absolute' top='52px' left='0' backgroundColor='blackAlpha.500' w='100%' zIndex='5'>
        <Flex
          w="80%"
          maxW="800px"
          margin="80px auto"
          direction="column"
          gap="24px"
          backgroundColor='white'
          p='40px 32px'
          borderRadius='12px'
          position='relative'
        >
          {/* 閉じるアイコン */}
          <IconButton
            aria-label="Close modal"
            icon={<CloseIcon />}
            position="absolute"
            top="24px"
            right="24px"
            onClick={detailCloseFunc}
          />
          <Heading fontSize='xl' mb='12px'>隊員詳細情報</Heading>
  
          {/* 隊員番号 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">隊員番号</Text>
            <Heading size='sm'>1234</Heading>
          </Flex>
  
          {/* 名前 */}
          <Flex flex="1" gap="40px">
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">性</Text>
              <Heading size='sm'>山田</Heading>
            </Flex>
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">名</Text>
              <Heading size='sm'>太郎</Heading>
            </Flex>
          </Flex>
  
          {/* ローマ字 */}
          <Flex flex="1" gap="40px">
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">性(ローマ字)</Text>
              <Heading size='sm'>Yamada</Heading>
            </Flex>
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">名(ローマ字)</Text>
              <Heading size='sm'>Taro</Heading>
            </Flex>
          </Flex>
  
          {/* 生年月日 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">生年月日</Text>
            <Heading size='sm'>1990-01-01</Heading>
          </Flex>
  
          {/* 性別 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">性別</Text>
            <Heading size='sm'>男</Heading>
          </Flex>
  
          {/* 電話番号 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">電話番号</Text>
            <Heading size='sm'>090-1234-5678</Heading>
          </Flex>
  
          {/* メールアドレス */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">メールアドレス</Text>
            <Heading size='sm'>template@gmail.com</Heading>
          </Flex>
  
          {/* 雇用開始日 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">雇用開始日</Text>
            <Heading size='sm'>2020-01-01</Heading>
          </Flex>
  
          {/* 緊急連絡先・属柄 */}
          <Flex flex="1" gap="40px">
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">緊急連絡先</Text>
              <Heading size='sm'>090-8765-4321</Heading>
            </Flex>
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">属柄</Text>
              <Heading size='sm'>父</Heading>
            </Flex>
          </Flex>
  
          {/* 資格情報 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">資格情報</Text>
            <Heading size='sm'>2級</Heading>
          </Flex>
  
          {/* NG隊員リスト */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">NG隊員リスト</Text>
            <Heading size='sm'>なし</Heading>
          </Flex>
  
          {/* 出禁情報 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">出禁情報</Text>
            <Heading size='sm'>〇〇会社</Heading>
          </Flex>
  
          {/* 自主出禁 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">自主出禁</Text>
            <Heading size='sm'>なし</Heading>
          </Flex>
  
          <Flex gap="20px" justifyContent='right'>
            <Button onClick={editOpenFunc} mt={4} pl={12} pr={12} colorScheme="blue">
              編集する
            </Button>
          </Flex>
        </Flex>
      </Box>
    )
}