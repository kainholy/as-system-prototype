import React from 'react'
import { Box, Flex, Heading, IconButton, Button, FormControl, Input } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Qualification = {
  id: number;
  qualificationName: string;
};

type EditQualificationProps = {
  setEditOpen: (isOpen: boolean) => void;
  qualificationId: number;
};

function EditQualification({ setEditOpen, qualificationId }: EditQualificationProps) {
    const [editedQualification, setEditedQualification] = useState<Qualification | null>(null);

    useEffect(() => {
      // 編集対象の資格情報を取得
      const fetchQualification = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/qualifications/${qualificationId}`
          );
          setEditedQualification(response.data);
        } catch (error) {
          console.error("資格情報の取得中にエラーが発生しました:", error);
        }
      };

      fetchQualification();
    }, [qualificationId]);

    const editCloseFunc = () => {
      setEditOpen(false);  // モーダルを閉じる関数
    }

    const handleInputChange = (field: string, value: any) => {
      setEditedQualification((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

    const handleUpdate = async () => {
      if (editedQualification) {
        try {
          await axios.put(
            `http://localhost:4000/qualifications/${editedQualification.id}`,
            editedQualification
          );
          alert("資格情報が更新されました。");
          editCloseFunc();
          window.location.reload(); // ページをリロード
        } catch (error) {
          console.error("更新中にエラーが発生しました:", error);
          alert("更新中にエラーが発生しました。");
        }
      }
    };
  
    const handleDelete = async () => {
      if (editedQualification) {
        try {
          await axios.delete(`http://localhost:4000/qualifications/${editedQualification.id}`);
          alert("資格情報が削除されました。");
          editCloseFunc();
          window.location.reload(); // ページをリロード
        } catch (error) {
          console.error("削除中にエラーが発生しました:", error);
          alert("削除中にエラーが発生しました。");
        }
      }
    };

    if (!editedQualification) {
      return <div>Loading...</div>; // メンバー情報を取得中に表示
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
                <Input
                  type="name" 
                  value={editedQualification.qualificationName}
                  onChange={(e) => handleInputChange('qualificationName', e.target.value)}
                />
            </FormControl>

            <Flex gap="20px" justifyContent='right'>
              <Button
                mt={4}
                pl={12}
                pr={12}
                colorScheme="blue"
                onClick={handleUpdate}
              >
                更新
              </Button>
              <Button
                mt={4}
                pl={12}
                pr={12}
                colorScheme="red"
                onClick={handleDelete}
              >
                削除
              </Button>
            </Flex>
          </Flex>
        </Box>
  )
}

export default EditQualification
