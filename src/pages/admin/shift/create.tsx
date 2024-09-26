import Bread from '@/pages/components/Breadcrumb'
import Navigation from '@/pages/components/Navigation'
import { Box, Button, Flex, Heading, Input, useColorMode } from '@chakra-ui/react'
import DropTest from '@/pages/components/DropTest';
import { useState } from 'react';


export default function Page() {
  const data = [
    {
      id: '1',
      project: {
        company: '〇〇会社',
        name: 'システム開発',
        tel: '090-6703-6735',
      },
      employeesList: [
        { id: '1', name: '大倉 聖哉', qualification: '2級' },
        { id: '2', name: '和田 大輝', qualification: 'なし' },
        { id: '3', name: '山田 太郎', qualification: '3級' },
        { id: '6', name: '山田 太郎', qualification: '3級' },
      ],
      projectList: [
        { id: '4', name: '大倉 聖哉yyy', qualification: '2級' },
        { id: '5', name: '和田 大輝yyy', qualification: 'なし' },
      ]
    },
    {
      id: '2',
      project: {
        company: '△△会社',
        name: 'システム開発',
        tel: '090-6703-6735',
      },
      employeesList: [
        { id: '1', name: '大倉 聖哉2', qualification: '2級' },
        { id: '2', name: '和田 大輝2', qualification: 'なし' },
        { id: '3', name: '山田 太郎2', qualification: '3級' },
      ],
      projectList: [
        { id: '4', name: '大倉 聖哉2yyy', qualification: '2級' },
        { id: '5', name: '和田 大輝2yyy', qualification: 'なし' },
      ]
    },
    {
      id: '3',
      project: {
        company: '□□会社',
        name: 'システム開発',
        tel: '090-6703-6735',
      },
      employeesList: [
        { id: '1', name: '大倉 聖哉3', qualification: '2級' },
        { id: '2', name: '和田 大輝3', qualification: 'なし' },
        { id: '3', name: '山田 太郎3', qualification: '3級' },
      ],
      projectList: [
      ]
    }
  ]
  const [activeId, setActiveId] = useState('1');
  const toggleActive = (id) => {
    setActiveId(id);
  };
  return (
    <>
      <Navigation />
      <Box w='calc(100% - 220px)' margin='0 0 0 auto'>
        <Bread second="シフト" third="シフト作成" />
        <Flex alignItems="center" justifyContent="center" direction="column" gap="24px" p='20px 2% 0'>
          {data.map((item) => (
            <Box key={item.id} w='100%' onClick={() => toggleActive(item.id)}>
              <DropTest project={item.project} employeesList={item.employeesList} projectList={item.projectList} isActive={item.id === activeId} />
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  )
}