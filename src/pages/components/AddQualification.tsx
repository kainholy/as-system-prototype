import React from 'react'
import { Box, Flex, Heading, IconButton, Button, FormControl, Input } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function AddQualification({ setAddOpen }) {
    const addCloseFunc = () => {
        setAddOpen(false);  // モーダルを閉じる関数
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
            p='100px 32px 40px'
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
              onClick={addCloseFunc}  // 閉じる関数をトリガー
            />
            <FormControl isRequired>
                <Input type="name" placeholder="山田" />
            </FormControl>

            <Flex gap="20px" justifyContent='right'>
              <Button mt={4} pl={12} pr={12} colorScheme="blue" type="submit">
                追加
              </Button>
            </Flex>
          </Flex>
        </Box>
  )
}

export default AddQualification
