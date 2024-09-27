import React from 'react'
import { Box, Flex, Heading, IconButton, Button, FormControl, Input, FormLabel } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function EditCompany({ setEditOpen }) {
    const editCloseFunc = () => {
        setEditOpen(false);  // モーダルを閉じる関数
    }
  return (
    <Box position='absolute' top='52px' left='0' backgroundColor='blackAlpha.500' w='100%' h='100vh' zIndex='5'>

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
              onClick={editCloseFunc}  // 閉じる関数をトリガー
            />
            <Heading fontSize='xl' mb='12px'>会社情報編集</Heading>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                会社名
              </FormLabel>
              <Input type="text" name="name" placeholder="〇〇会社" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                住所
              </FormLabel>
              <Input
                type="text"
                name="address"
                placeholder="000-0000 東京都足立区綾瀬"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                メールアドレス
              </FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="template@gmail.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                電話番号
              </FormLabel>
              <Input type="tel" name="phone" placeholder="09000000000" />
            </FormControl>

            <Flex gap="20px" justifyContent='right'>
              <Button onClick={editCloseFunc} mt={4} pl={12} pr={12} colorScheme="blue" type="submit">
                更新
              </Button>
              <Button onClick={editCloseFunc} mt={4} pl={12} pr={12} colorScheme="red" type="submit">
                削除
              </Button>
            </Flex>
          </Flex>
        </Box>
  )
}

export default EditCompany
