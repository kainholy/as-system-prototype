'use client'
import { Box, Card, Button, Flex, Heading, Input, useColorMode, Text, FormControl, FormLabel } from '@chakra-ui/react'
import Image from 'next/image';

export default function Page() {
  const { toggleColorMode } = useColorMode()
  return (
    <>
      <Flex w='100%' h='100vh' align='center' justify='center' backgroundColor='gray.50'>
        <Card w='70%' p='80px 0'>
            <Flex margin='0 auto' w='400px' direction='column' gap="40px" align='center'>
                <Flex justify='center' align='center' direction='column' gap="24px">
                    <Image src='/logo.png' alt='logo' width={54} height={59} />
                    <Flex justify='center' align='center' direction='column' gap="8px">
                        <Heading size='md' color='gray.800'>管理者画面ログイン</Heading>
                        <Text fontSize='sm' color='gray.600'>アカウントにアクセスするための認証情報を入力します。</Text>
                    </Flex>
                </Flex>

                <Flex w='100%' justify='center' align='center' direction='column' gap="24px">
                    <FormControl>
                        <FormLabel fontWeight='bold' fontSize='sm' color='gray.800'>隊員番号</FormLabel>
                        <Input type='name' placeholder='1000' />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight='bold' fontSize='sm' color='gray.800'>パスワード</FormLabel>
                        <Input type='name' placeholder='パスワードを入力' />
                    </FormControl>
                </Flex>

                <Button w='250px' backgroundColor='gray.800' color='white' _hover={{ opacity: .8 }}>ログイン</Button>
            </Flex>
        </Card>
      </Flex>
    </>
  )
}
