'use client'
import Bread from '@/pages/components/Breadcrumb'
import Navigation from '@/pages/components/Navigation'
import { Box, Button, Flex, Heading, Input, useColorMode, Text, Card, Badge } from '@chakra-ui/react'
import DropTest from '@/pages/components/DropTest';
import Link from 'next/link';


export default function Page() {
  const data = [
    {
      id: '1',
      project: {
        company: '〇〇会社',
        name: 'システム開発',
        tel: '090-6703-6735',
      },
      workers: [
        { id: '4', name: '大倉 聖哉yyy', qualification: '2級' },
        { id: '5', name: '和田 大輝yyy', qualification: 'なし' },
      ],
    },
    {
      id: '2',
      project: {
        company: '△△会社',
        name: 'システム開発',
        tel: '090-6703-6735',
      },
      workers: [
        { id: '4', name: '大倉 聖哉2yyy', qualification: '2級' },
        { id: '5', name: '和田 大輝2yyy', qualification: 'なし' },
      ],
    },
    {
      id: '3',
      project: {
        company: '□□会社',
        name: 'システム開発',
        tel: '090-6703-6735',
      },
      workers: [
      ],
    }
  ]
  return (
    <>
      <Navigation />
      <Box w='calc(100% - 220px)' margin='0 0 0 auto'>
        <Bread second="シフト" third="シフト一覧" />
        <Flex alignItems="center" justifyContent="center" direction="column" gap="24px" p='20px 40px 0'>
          <Flex alignItems="center" justifyContent='center' w='100%' gap="32px" position="relative">
            <Link href='/admin/shift/create'>
              <Button
                colorScheme='blue'
                type='submit'
                size='sm'
                position='absolute'
                right='0'
                top='0'
              >
                シフトを作成する
              </Button>
            </Link>
            <Button
              colorScheme='gray'
              type='submit'
              size='sm'
            >
              ←
            </Button>
            <Heading fontSize='md'>2024年 7月</Heading>
            <Button
              colorScheme='gray'
              type='submit'
              size='sm'
            >
              →
            </Button>
          </Flex>
          {data.map((item) => (
            <Flex key={item.id} gap='20px' direction='column' w='100%'>
              <Box backgroundColor='gray.100' p='20px'>
                <Flex gap='8px' align='flex-end'>
                  <Heading fontSize='md'>{item.project.company}</Heading>
                  <Heading fontSize='md'>/</Heading>
                  <Heading fontSize='md'>{item.project.name}</Heading>
                </Flex>
                <Text fontSize='sm'>Tel: {item.project.tel}</Text>
                <Flex gap="12px" mt='24px' wrap='wrap'>
                  {item.workers.map((worker) => (
                    <Box key={worker.id} p='8px 10px' backgroundColor='white'>
                      <Flex gap='8px' align='left'>
                        {
                          worker.qualification === 'なし' ? null : (
                            <Badge variant='outline' colorScheme='blue' p='2px 5px' w='fit-content'>
                              <Text fontSize='9px'>{ worker.qualification }</Text>
                            </Badge>
                          )
                        }
                        <Heading fontSize='sm'>{ worker.name }</Heading>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  )
}