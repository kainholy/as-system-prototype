import { Box, Flex, Card, CardHeader, CardBody, CardFooter, Text, Heading, Badge, Grid  } from '@chakra-ui/react'
import Navigation from '../../components/Navigation'
import Bread from '../../components/Breadcrumb'
import EditProject from '@/pages/components/EditProject';
import DetailProject from '@/pages/components/DetailProject';
import { useState } from 'react';

export default function Project() {
    const [editOpen, setEditOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);

    const detailOpenFunc = () => {
        setDetailOpen(true);
    }
  return (
    <>
      <Navigation />
      <Box w='calc(100% - 220px)' margin='0 0 0 auto' position='relative'>
        <Bread second="案件情報" third="案件一覧" />
        {editOpen && <EditProject setEditOpen={setEditOpen} />}
        {detailOpen && <DetailProject setDetailOpen={setDetailOpen} setEditOpen={setEditOpen} />}
        <Box p='64px 40px'>
            <Grid gap='20px' templateColumns='repeat(3, 1fr)' >
                
                {/* コンポーネント */}
                <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={detailOpenFunc}>
                    <Heading fontSize='md'>〇〇会社</Heading>
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

                <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={detailOpenFunc}>
                    <Heading fontSize='md'>〇〇会社</Heading>
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

                <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={detailOpenFunc}>
                    <Heading fontSize='md'>〇〇会社</Heading>
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

                <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={detailOpenFunc}>
                    <Heading fontSize='md'>〇〇会社</Heading>
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
        </Box>
      </Box>
    </>
  )
}
