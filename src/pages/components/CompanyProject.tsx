import { Box, Flex, Heading, Grid, Text, Badge, Button, IconButton, Card } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function CompanyProject({ setProjectOpen, setEditOpen }) {
    const editOpenFunc = () => {
      setEditOpen(true);
      setProjectOpen(false);
    }
    const projectCloseFunc = () => {
      setProjectOpen(false);  // モーダルを閉じる関数
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
            onClick={projectCloseFunc}
          />
          <Heading fontSize='xl' mb='12px'>案件情報</Heading>
  
          <Grid gap='20px' templateColumns='repeat(2, 1fr)' >
                
                {/* コンポーネント */}
                <Card transition='.3s' p='17px 18px'>
                    <Heading fontSize='md'>〇〇警備</Heading>
                    <Text fontSize='xs'>会社電話番号: 090-6703-6735</Text>
                    <Flex gap="4px" pt='6px' direction='column'>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>必要資格:</Text>
                            <Badge variant='outline' colorScheme='blue' p='0 5px'>
                                <Text p='1px 7px'>2級 1名</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>必要隊員数: 5人</Text>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>単価:</Text>
                            <Badge variant='outline' colorScheme='orange' p='0 5px'>
                                <Text p='1px 7px'>日勤(平日)</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>日にち: 2024年7月15日</Text>
                        <Text fontSize='sm'>時間: 10:00 ~ 17:00</Text>
                        <Text fontSize='sm'>担当者名: 山田 太郎様</Text>
                        <Text fontSize='sm'>担当者電話番号: 090-0000-0000</Text>
                    </Flex>
                </Card>
                {/* ここまで */}

                <Card transition='.3s' p='17px 18px'>
                    <Heading fontSize='md'>××イベント警備</Heading>
                    <Text fontSize='xs'>会社電話番号: 090-6703-6735</Text>
                    <Flex gap="4px" pt='6px' direction='column'>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>必要資格:</Text>
                            <Badge variant='outline' colorScheme='blue' p='0 5px'>
                                <Text p='1px 7px'>2級 1名</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>必要隊員数: 5人</Text>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>単価:</Text>
                            <Badge variant='outline' colorScheme='orange' p='0 5px'>
                                <Text p='1px 7px'>日勤(平日)</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>日にち: 2024年7月15日</Text>
                        <Text fontSize='sm'>時間: 10:00 ~ 17:00</Text>
                        <Text fontSize='sm'>担当者名: 山田 太郎様</Text>
                        <Text fontSize='sm'>担当者電話番号: 090-0000-0000</Text>
                    </Flex>
                </Card>

                <Card transition='.3s' p='17px 18px'>
                    <Heading fontSize='md'>〇〇イベント警備</Heading>
                    <Text fontSize='xs'>会社電話番号: 090-6703-6735</Text>
                    <Flex gap="4px" pt='6px' direction='column'>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>必要資格:</Text>
                            <Badge variant='outline' colorScheme='gray' p='0 5px'>
                                <Text p='1px 7px'>なし</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>必要隊員数: 4人</Text>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>単価:</Text>
                            <Badge variant='outline' colorScheme='blue' p='0 5px'>
                                <Text p='1px 7px'>夜勤(平日)</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>日にち: 2024年7月15日</Text>
                        <Text fontSize='sm'>時間: 10:00 ~ 17:00</Text>
                        <Text fontSize='sm'>担当者名: 山田 太郎様</Text>
                        <Text fontSize='sm'>担当者電話番号: 090-0000-0000</Text>
                    </Flex>
                </Card>

                <Card transition='.3s' p='17px 18px'>
                    <Heading fontSize='md'>△△イベント警備</Heading>
                    <Text fontSize='xs'>会社電話番号: 090-6703-6735</Text>
                    <Flex gap="4px" pt='6px' direction='column'>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>必要資格:</Text>
                            <Badge variant='outline' colorScheme='orange' p='0 5px'>
                                <Text p='1px 7px'>3級 1名</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>必要隊員数: 5人</Text>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>単価:</Text>
                            <Badge variant='outline' colorScheme='green' p='0 5px'>
                                <Text p='1px 7px'>日勤(休日)</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>日にち: 2024年7月15日</Text>
                        <Text fontSize='sm'>時間: 10:00 ~ 17:00</Text>
                        <Text fontSize='sm'>担当者名: 山田 太郎様</Text>
                        <Text fontSize='sm'>担当者電話番号: 090-0000-0000</Text>
                    </Flex>
                </Card>
            </Grid>

          <Flex gap="20px" justifyContent='right'>
            <Button onClick={editOpenFunc} mt={4} pl={12} pr={12} colorScheme="blue" size='md'>
              会社情報を編集する
            </Button>
          </Flex>
        </Flex>
      </Box>
    )
}