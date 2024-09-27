import { Box, Flex, Card, CardHeader, CardBody, CardFooter, Text, Heading, Badge, Grid  } from '@chakra-ui/react'
import Navigation from '../../components/Navigation'
import Bread from '../../components/Breadcrumb'
import EditMember from '@/pages/components/EditMember';
import { useState } from 'react';
import DetailMember from '@/pages/components/DetailMember';

export default function Member() {

    const [editOpen, setEditOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);

    const detailOpenFunc = () => {
        setDetailOpen(true);
    }

  return (
    <>
      <Navigation />
      <Box w='calc(100% - 220px)' margin='0 0 0 auto' position='relative'>
        <Bread second="隊員情報" third="隊員一覧" />
        {editOpen && <EditMember setEditOpen={setEditOpen} />}
        {detailOpen && <DetailMember setDetailOpen={setDetailOpen} setEditOpen={setEditOpen} />}
        <Box p='64px 40px'>
            <Grid gap='20px' templateColumns='repeat(3, 1fr)' >
                
                {/* コンポーネント */}
                <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={detailOpenFunc}>
                    <Text fontSize='sm'>No. 1001</Text>
                    <Flex gap="16px" align='flex-end' pt='4px'>
                        <Heading fontSize='md'>大倉聖哉</Heading>
                        <Text fontSize='sm'>Okura Seiya</Text>
                    </Flex>
                    <Flex gap="4px" pt='6px' direction='column'>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>資格:</Text>
                            <Badge variant='outline' colorScheme='blue' p='0 5px'>
                                <Text p='1px 7px'>2級</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>Tel: 090-6703-6735</Text>
                        <Text fontSize='sm'>Email: ookuraseiya0506@gmail.com</Text>
                        <Text fontSize='sm'>雇用形態: 正社員</Text>
                    </Flex>
                </Card>
                {/* ここまで */}

                <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={detailOpenFunc}>
                    <Text fontSize='sm'>No. 1001</Text>
                    <Flex gap="16px" align='flex-end' pt='4px'>
                        <Heading fontSize='md'>大倉聖哉</Heading>
                        <Text fontSize='sm'>Okura Seiya</Text>
                    </Flex>
                    <Flex gap="4px" pt='6px' direction='column'>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>資格:</Text>
                            <Badge variant='outline' colorScheme='gray' p='0 5px'>
                                <Text p='1px 7px'>なし</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>Tel: 090-6703-6735</Text>
                        <Text fontSize='sm'>Email: ookuraseiya0506@gmail.com</Text>
                        <Text fontSize='sm'>雇用形態: 正社員</Text>
                    </Flex>
                </Card>
                <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={detailOpenFunc}>
                    <Text fontSize='sm'>No. 1001</Text>
                    <Flex gap="16px" align='flex-end' pt='4px'>
                        <Heading fontSize='md'>大倉聖哉</Heading>
                        <Text fontSize='sm'>Okura Seiya</Text>
                    </Flex>
                    <Flex gap="4px" pt='6px' direction='column'>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>資格:</Text>
                            <Badge variant='outline' colorScheme='blue' p='0 5px'>
                                <Text p='1px 7px'>2級</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>Tel: 090-6703-6735</Text>
                        <Text fontSize='sm'>Email: ookuraseiya0506@gmail.com</Text>
                        <Text fontSize='sm'>雇用形態: 正社員</Text>
                    </Flex>
                </Card>
                <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={detailOpenFunc}>
                    <Text fontSize='sm'>No. 1001</Text>
                    <Flex gap="16px" align='flex-end' pt='4px'>
                        <Heading fontSize='md'>大倉聖哉</Heading>
                        <Text fontSize='sm'>Okura Seiya</Text>
                    </Flex>
                    <Flex gap="4px" pt='6px' direction='column'>
                        <Flex gap="4px" align='center'>
                            <Text fontSize='sm'>資格:</Text>
                            <Badge variant='outline' colorScheme='blue' p='0 5px'>
                                <Text p='1px 7px'>2級</Text>
                            </Badge>
                        </Flex>
                        <Text fontSize='sm'>Tel: 090-6703-6735</Text>
                        <Text fontSize='sm'>Email: ookuraseiya0506@gmail.com</Text>
                        <Text fontSize='sm'>雇用形態: 正社員</Text>
                    </Flex>
                </Card>
            </Grid>
        </Box>
      </Box>
    </>
  )
}
