import { Box, Flex, Card, CardHeader, CardBody, CardFooter, Text, Heading, Badge, Grid, Button  } from '@chakra-ui/react'
import Navigation from '../../components/Navigation'
import Bread from '../../components/Breadcrumb'
import EditProject from '@/pages/components/EditProject';
import DetailProject from '@/pages/components/DetailProject';
import { useState } from 'react';

const data = [
    {
        id: '1',
        company: {
            name: '〇〇会社',
            tel: '090-6703-6735',
        },
        project: {
            name: '〇〇警備',
            managerName: '山田 太郎様',
            managerTel: '090-6703-6735',
            date: '2024年7月15日',
            startTime: '10:00',
            endTime: '17:00',
            numberOfStaff: '5人',
            requiredQualifications: [
                { name: '2級', number: '1名' },
                { name: '3級', number: '2名' }
            ]
        },
    },
    {
        id: '2',
        company: {
            name: 'Sea.inc',
            tel: '090-6703-6735',
        },
        project: {
            name: '××イベント警備',
            managerName: '山田 太郎様',
            managerTel: '090-6703-6735',
            date: '2024年7月15日',
            startTime: '10:00',
            endTime: '17:00',
            numberOfStaff: '5人',
            requiredQualifications: [
                { name: '2級', number: '1名' },
                { name: '3級', number: '2名' }
            ]
        },
    },
    {
        id: '3',
        company: {
            name: '積洋ハウス',
            tel: '090-6703-6735',
        },
        project: {
            name: '△△イベント警備',
            managerName: '山田 太郎様',
            managerTel: '090-6703-6735',
            date: '2024年7月15日',
            startTime: '10:00',
            endTime: '17:00',
            numberOfStaff: '5人',
            requiredQualifications: [
                { name: '2級', number: '1名' },
                { name: '3級', number: '2名' }
            ]
        },
    },
    {
        id: '4',
        company: {
            name: '株式会社〇〇',
            tel: '090-6703-6735',
        },
        project: {
            name: '〇〇イベント警備',
            managerName: '山田 太郎様',
            managerTel: '090-6703-6735',
            date: '2024年7月31日',
            startTime: '10:00',
            endTime: '17:00',
            numberOfStaff: '5人',
            requiredQualifications: [
                { name: '2級', number: '1名' },
                { name: '3級', number: '2名' }
            ]
        },
    },
    {
        id: '5',
        company: {
            name: '株式会社××',
            tel: '090-6703-6735',
        },
        project: {
            name: '××イベント警備',
            managerName: '山田 太郎様',
            managerTel: '090-6703-6735',
            date: '2024年7月20日',
            startTime: '10:00',
            endTime: '17:00',
            numberOfStaff: '5人',
            requiredQualifications: [
                { name: '2級', number: '1名' },
                { name: '3級', number: '2名' }
            ]
        },
    },
    {
        id: '6',
        company: {
            name: '株式会社△△',
            tel: '090-6703-6735',
        },
        project: {
            name: '△△イベント警備',
            managerName: '山田 太郎様',
            managerTel: '090-6703-6735',
            date: '2024年7月19日',
            startTime: '10:00',
            endTime: '17:00',
            numberOfStaff: '5人',
            requiredQualifications: [
                { name: '2級', number: '1名' },
                { name: '3級', number: '2名' }
            ]
        },
    },
]

export default function Project() {
    function getDaysInMonth(month: number) {
        const daysInMonth = [];
        const year = 2024;
      
        // 指定した月の日数を取得する（次の月の0日目＝その月の最終日）
        const lastDay = new Date(year, month, 0).getDate();
    
        for (let day = 1; day <= lastDay; day++) {
          const formattedDay = String(day); // 日付をフォーマット
          daysInMonth.push(`${year}年${String(month)}月${formattedDay}日`);
        }
        return daysInMonth;
    }
    const daysInJuly = getDaysInMonth(7);
    const [editOpen, setEditOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);

    const detailOpenFunc = () => {
        setDetailOpen(true);
    }

    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(7);

    const addFunc = () => {
        const date = new Date(year, month - 1); // 月は0から始まるので-1します
        date.setMonth(date.getMonth() + 1);     // 月を1増やす
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);          // 表示用に+1します
    }

    const minusFunc = () => {
        const date = new Date(year, month - 1);
        date.setMonth(date.getMonth() - 1);     // 月を1減らす
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
    }
  return (
    <>
      <Navigation />
      <Box w='calc(100% - 220px)' margin='0 0 0 auto' position='relative'>
        <Bread second="案件情報" third="案件一覧" />
        {editOpen && <EditProject setEditOpen={setEditOpen} />}
        {detailOpen && <DetailProject setDetailOpen={setDetailOpen} setEditOpen={setEditOpen} />}
        <Flex p='64px 40px' direction='column' gap='40px'>
            <Flex alignItems="center" justifyContent='center' w='100%' gap="32px" position="relative">
              <Button
                  colorScheme='gray'
                  type='submit'
                  size='sm'
                  onClick={minusFunc}
              >
              ←
              </Button>
              <Heading fontSize='md'>{ year }年 { month }月</Heading>
              <Button
                  colorScheme='gray'
                  type='submit'
                  size='sm'
                  onClick={addFunc}
                  >
                  →
              </Button>
            </Flex>
            {daysInJuly.map((day) => {
                const projectsForDay = data.filter(item => item.project.date === day);

                // 該当するプロジェクトがない場合はその日付をスキップ
                if (projectsForDay.length === 0) {
                  return null;
                }

                return (
                    <Flex key={day} direction="column" gap="8px">
                      {/* 日付ごとのHeading */}
                      <Heading fontSize="md" mb="12px">{day}</Heading>
            
                      {/* プロジェクトカードリスト */}
                      <Grid gap="20px" templateColumns="repeat(3, 1fr)" backgroundColor='gray.50' p='24px 16px'>
                        {projectsForDay.map((projectItem) => (
                          <Card
                            key={projectItem.id}
                            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }}
                            transition=".3s"
                            p="17px 18px"
                            onClick={detailOpenFunc}
                          >
                            {/* 会社名とプロジェクト名 */}
                            <Heading fontSize="md">{projectItem.company.name} / {projectItem.project.name}</Heading>
                            <Text fontSize="xs">会社電話番号: {projectItem.company.tel}</Text>
            
                            {/* プロジェクトの詳細 */}
                            <Flex gap="4px" pt="6px" direction="column">
                              {/* 必要資格 */}
                              <Flex gap="4px" align="center">
                                <Text fontSize="sm">必要資格:</Text>
                                {projectItem.project.requiredQualifications.map((qual, index) => (
                                  <Badge key={index} variant="outline" colorScheme="blue" p="0 5px">
                                    <Text p="1px 7px">{qual.name} {qual.number}</Text>
                                  </Badge>
                                ))}
                              </Flex>
            
                              {/* 必要隊員数 */}
                              <Text fontSize="sm">必要隊員数: {projectItem.project.numberOfStaff}</Text>
            
                              {/* 単価（仮データ） */}
                              <Flex gap="4px" align="center">
                                <Text fontSize="sm">単価:</Text>
                                <Badge variant="outline" colorScheme="orange" p="0 5px">
                                  <Text p="1px 7px">日勤(平日)</Text>
                                </Badge>
                              </Flex>
            
                              {/* 時間 */}
                              <Text fontSize="sm">時間: {projectItem.project.startTime} ~ {projectItem.project.endTime}</Text>
            
                              {/* 担当者情報 */}
                              <Text fontSize="sm">担当者名: {projectItem.project.managerName}</Text>
                              <Text fontSize="sm">担当者電話番号: {projectItem.project.managerTel}</Text>
                            </Flex>
                          </Card>
                        ))}
                      </Grid>
                    </Flex>
                );
            })}
        </Flex>
      </Box>
    </>
  )
}
