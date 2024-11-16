import Bread from '@/pages/components/Breadcrumb';
import Navigation from '@/pages/components/Navigation';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import DropTest from '@/pages/components/DropTest';
import { useEffect, useState } from 'react';
import axios from 'axios';

type EmergencyContact = {
  name: string;
  relationship: string;
  phoneNumber: string;
};

type Qualification = {
  id: number;
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

type ProjectMember = {
  id: number;
  staffProfileId: number;
  projectDescriptionId: number;
};

type ProjectDescription = {
  id: number;
  workDate: string;
  startTime: string;
  endTime: string;
  address: string;
  postcode: string;
  managerName: string;
  phonenumber: string;
  requiredMembers: number;
  unitPrice: number;
  workTimeType: string;
  memo: string;
  projectQualification: {
    qualification: {
      qualificationName: string;
    };
    numberOfMembersNeeded: number;
  }[];
  projectMember: ProjectMember[];
};

type Project = {
  id: number;
  projectName: string;
  company: {
    companyName: string;
    phonenumber: string;
  };
  projectDescription: ProjectDescription[];
};

export default function ShiftCreate() {
  const [members, setMembers] = useState<Member[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const [updateProjectMembers, setUpdateProjectMembers] = useState<{ [key: number]: ProjectMember[] }>({});
  const [allProjectMembers, setAllProjectMembers] = useState<ProjectMember[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [activeId, setActiveId] = useState<number | null>(null);
  const toggleActive = (id: number) => {
    setActiveId(id);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/members');
        setMembers(response.data);
      } catch (error) {
        console.error('メンバー情報の取得中にエラーが発生しました:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4000/projects', {
          params: {
            year,
            month,
          },
        });
        const fetchedProjects: Project[] = response.data;
        setProjects(fetchedProjects);

        const allProjectMembers: ProjectMember[] = [];

        fetchedProjects.forEach((project) => {
          project.projectDescription.forEach((description) => {
            if (description.projectMember && Array.isArray(description.projectMember)) {
              allProjectMembers.push(...description.projectMember);
            }
          });
        });

        setProjectMembers(allProjectMembers);
      } catch (error) {
        console.error('プロジェクト情報の取得中にエラーが発生しました:', error);
      }
    };

    fetchMembers();
    fetchProjects();
  }, [year, month]);

  function getDaysInMonth(year: number, month: number) {
    const daysInMonth = [];
    const date = new Date(year, month - 1, 1);
    while (date.getMonth() === month - 1) {
      daysInMonth.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return daysInMonth;
  }

  const daysInMonth = getDaysInMonth(year, month);

  const addFunc = () => {
    const date = new Date(year, month - 1);
    date.setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  };

  const minusFunc = () => {
    const date = new Date(year, month - 1);
    date.setMonth(date.getMonth() - 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  };

  useEffect(() => {
    console.log('updateProjectMembers:', updateProjectMembers);
    // updateProjectMembersオブジェクトから全ての隊員情報を抽出
    const newAllProjectMembers = Object.values(updateProjectMembers).flat();
    setAllProjectMembers(newAllProjectMembers);
    console.log('allProjectMembers:', newAllProjectMembers);
  }, [updateProjectMembers]);

  const saveDataToBackend = async () => {
    try {
      await axios.post('http://localhost:4000/projectMembers/update', {
        updateProjectMembers,
      });
      console.log('データをバックエンドに正常に送信しました');
    } catch (error) {
      console.error('データ送信中にエラーが発生しました:', error);
    }
  };

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="シフト" third="シフト作成" />
        <Flex justifyContent="center" direction="column" gap="24px" p="20px 2% 0">
          <Flex
            alignItems="center"
            justifyContent="center"
            w="100%"
            gap="32px"
            position="relative"
          >
            <Button colorScheme="gray" type="submit" size="sm" onClick={minusFunc}>
              ←
            </Button>
            <Heading fontSize="md">
              {year}年 {month}月
            </Heading>
            <Button colorScheme="gray" type="submit" size="sm" onClick={addFunc}>
              →
            </Button>
          </Flex>
          {daysInMonth.map((day) => {
            const formattedDay = `${day.getFullYear()}年${
              day.getMonth() + 1
            }月${day.getDate()}日`;

            const projectsForDay = projects.flatMap((project) => {
              return project.projectDescription
                .filter((description) => {
                  const projectDate = new Date(description.workDate);
                  return (
                    projectDate.getFullYear() === day.getFullYear() &&
                    projectDate.getMonth() === day.getMonth() &&
                    projectDate.getDate() === day.getDate()
                  );
                })
                .map((description) => ({
                  ...project,
                  projectDescription: description,
                }));
            });

            if (projectsForDay.length === 0) {
              return null;
            }

            return (
              <div key={formattedDay}>
                <Heading fontSize="xl" mb="16px">
                  {formattedDay}
                </Heading>

                <Flex w="100%" direction="column" gap="24px">
                  {projectsForDay.map((project) => (
                    <Box
                      key={project.projectDescription.id}
                      w="100%"
                      onClick={() => toggleActive(project.projectDescription.id)}
                    >
                      <DropTest
                        project={project}
                        members={members}
                        projectMembers={projectMembers}
                        setUpdateProjectMembers={setUpdateProjectMembers}
                        isActive={project.projectDescription.id === activeId}
                      />
                    </Box>
                  ))}
                </Flex>
              </div>
            );
          })}
        </Flex>
        <Flex justifyContent="center" mt="24px">
          <Button colorScheme="blue" onClick={saveDataToBackend}>
            変更を保存
          </Button>
        </Flex>
      </Box>
    </>
  );
}
