'use client'
import { Box, Button, Flex, Heading, Input, useColorMode } from '@chakra-ui/react'
import Navigation from './components/Navigation'
import Bread from './components/Breadcrumb'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Navigation />
      <Box w='calc(100% - 220px)' margin='0 0 0 auto'>
        <Bread />
        <Flex height="calc(100vh - 80px)" alignItems="center" justifyContent="center">
          <Flex w='200px' direction='column' gap='24px'>
            <Link href='/admin/login'>
              <Heading size='md'>管理者画面</Heading>
            </Link>
            <Link href='/user/login'>
              <Heading size='md'>隊員画面</Heading>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
