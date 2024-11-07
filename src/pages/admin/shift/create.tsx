import Bread from '@/pages/components/Breadcrumb'
import Navigation from '@/pages/components/Navigation'
import { Box, Flex, Heading } from '@chakra-ui/react'
import DropTest from '@/pages/components/DropTest';
import { useEffect, useState } from 'react';
import axios from 'axios';

type EmergencyContact = {
  name: string;
  relationship: string;
  phoneNumber: string;
};

type Qualification = {
  id: number
  qualificationName: string;
};

type Member = {
  id: number;
  staffId: string;
  name: string;
  romanname: string;
  address: string;
  postcode: string;
  phonenumber: string;
  email: string;
  birthday: string;
  hiredate: string;
  role: string;
  emergencyContacts: EmergencyContact[];
  qualifications: Qualification[];
  ngStaffList: string;

  bannedInfo: string;
  selfBanned: string;
};

export default function ShiftPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/members");
        setMembers(response.data);
      } catch (error) {
        console.error("メンバー情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchMembers();
  }, []);

  console.log(members);

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
  const [activeId, setActiveId] = useState('1');
  const daysInJuly = getDaysInMonth(7);
  const toggleActive = (id) => {
    setActiveId(id);
  };
  
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
      projectList: [
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
      projectList: [
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
      projectList: [
      ]
    }
  ]

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
                        members={members}
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