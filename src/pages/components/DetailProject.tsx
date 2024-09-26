import { Box, Flex, IconButton, Heading, Text, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function DetailProject({ setDetailOpen, setEditOpen }) {
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
          <Heading fontSize='xl' mb='12px'>案件詳細情報</Heading>
  
          <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">会社名</Text>
              <Heading size='sm'>〇〇会社</Heading>
            </Flex>

            {/* 電話番号 */}
            <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">電話番号</Text>
              <Heading size='sm'>090-0000-0000</Heading>
            </Flex>

            {/* 必要資格・保持者数 */}
            <Flex flex="1" gap="40px">
              <Flex direction="column" gap="8px" flex="1">
                <Text fontSize="sm" color="gray.800">必要資格</Text>
                <Heading size='sm'>2級</Heading>
              </Flex>
              <Flex direction="column" gap="8px" flex="1">
                <Text fontSize="sm" color="gray.800">必要資格保持者数</Text>
                <Heading size='sm'>5人</Heading>
              </Flex>
            </Flex>

            {/* 必要隊員数 */}
            <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">必要隊員数</Text>
              <Heading size='sm'>10人</Heading>
            </Flex>

            {/* 単価 */}
            <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">単価</Text>
              <Heading size='sm'>平日(日勤)</Heading>
            </Flex>

            {/* 金額 */}
            <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">金額</Text>
              <Heading size='sm'>10000円</Heading>
            </Flex>

            {/* 日にち */}
            <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">日にち</Text>
              <Heading size='sm'>2024-01-01</Heading>
            </Flex>

            {/* 開始時間・終了時間 */}
            <Flex flex="1" gap="40px">
              <Flex direction="column" gap="8px" flex="1">
                <Text fontSize="sm" color="gray.800">開始時間</Text>
                <Heading size='sm'>09:00</Heading>
              </Flex>
              <Flex direction="column" gap="8px" flex="1">
                <Text fontSize="sm" color="gray.800">終了時間</Text>
                <Heading size='sm'>18:00</Heading>
              </Flex>
            </Flex>

            {/* 担当者 */}
            <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">担当者</Text>
              <Heading size='sm'>山田 太郎 様</Heading>
            </Flex>

            {/* 担当者の電話番号 */}
            <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">担当者の電話番号</Text>
              <Heading size='sm'>090-1234-5678</Heading>
            </Flex>

            {/* 備考欄 */}
            <Flex direction="column" gap="8px">
              <Text fontSize="sm" color="gray.800">備考欄</Text>
              <Heading size='sm'>特にありません</Heading>
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