import Bread from '@/pages/components/Breadcrumb'
import Navigation from '@/pages/components/Navigation'
import { Box, Button, Flex, Heading, Input, useColorMode } from '@chakra-ui/react'
import DropTest from '@/pages/components/DropTest';
import { useState } from 'react';


export default function Page() {
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
  
  const data = [
    {
      id: '1',
      project: {
        company: '〇〇会社',
        name: 'システム開発',
        managerName: 'ハリソン山中様',
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
        managerName: 'ハリソン山中様',
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
        managerName: 'ハリソン山中様',
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
  const daysInJuly = getDaysInMonth(7);
  const toggleActive = (id) => {
    setActiveId(id);
  };
  return (
    <>
      <Navigation />
      <Box w='calc(100% - 220px)' margin='0 0 0 auto'>
        <Bread second="シフト" third="シフト作成" />
        <Flex justifyContent="center" direction="column" gap="24px" p='20px 2% 0'>
          {daysInJuly.map((day) => {
            // その日付に該当するプロジェクトをフィルタリング
            const projectsForDay = data.filter(item => item.project.date === day);

            // 該当するプロジェクトがない場合はその日付をスキップ
            if (projectsForDay.length === 0) {
              return null;
            }

            return (
              <div key={day}>
                {/* 日付ごとのHeading */}
                <Heading fontSize='xl' mb="16px">{day}</Heading>

                {/* 日付に対応するプロジェクトリスト */}
                <Flex w='100%' direction="column" gap="24px">
                  {projectsForDay.map((item) => (
                    <Box key={item.id} w='100%' onClick={() => toggleActive(item.id)}>
                      <DropTest 
                        project={item.project} 
                        employeesList={item.employeesList} 
                        projectList={item.projectList} 
                        isActive={item.id === activeId} 
                      />
                    </Box>
                  ))}
                </Flex>
              </div>
            );
          })}
        </Flex>
      </Box>
    </>
  )
}