import React from 'react'
import { Box, Flex, Heading, IconButton, Button, FormControl, Input } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function EditQualification({ setEditOpen }) {
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
            <Heading fontSize='xl' mb='12px'>資格情報編集</Heading>

            <FormControl isRequired>
                <Input type="name" placeholder="山田" />
            </FormControl>

            <Flex gap="20px" justifyContent='right'>
              <Button mt={4} pl={12} pr={12} colorScheme="blue" type="submit">
                更新
              </Button>
              <Button mt={4} pl={12} pr={12} colorScheme="red" type="submit">
                削除
              </Button>
            </Flex>
          </Flex>
        </Box>
  )
}

export default EditQualification
