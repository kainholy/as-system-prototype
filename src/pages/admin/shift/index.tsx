'use client'
import Bread from '@/pages/components/Breadcrumb'
import Navigation from '@/pages/components/Navigation'
import { Box, Button, Flex, Heading, Input, useColorMode, Text, Card, Badge } from '@chakra-ui/react'
import DropTest from '@/pages/components/DropTest';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Project = {
  id: number;
  projectName: string;
  company: {
    companyName: string;
    phonenumber: string;
  };
  projectDescription: {
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
  };
};

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]); // プロジェクトデータの状態
  const [year, setYear] = useState(new Date().getFullYear()); // 現在の年を取得
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 現在の月を取得

  // 年と月が変更されるたびにプロジェクトデータを取得
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/projects", {
          params: {
            year,
            month,
          },
        });
        console.log(response.data); // デバッグ用にプロジェクトデータを表示
        setProjects(response.data);
      } catch (error) {
        console.error("プロジェクト情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchProjects();
  }, [year, month]);

  // 指定した月の日付を生成する関数
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

  const workers = [
    { id: '1', name: '大倉 聖哉', qualification: '2級' },
    { id: '2', name: '和田 大輝', qualification: 'なし' },
    { id: '3', name: '山田 太郎', qualification: '3級' },
    { id: '6', name: '山田 太郎', qualification: '3級' },
  ]

  return (
    <>
      <Navigation />
      <Box w='calc(100% - 220px)' margin='0 0 0 auto'>
        <Bread second="シフト" third="シフト一覧" />
        <Flex alignItems="center" justifyContent="center" direction="column" gap="24px" p='20px 40px 0'>
          <Flex alignItems="center" justifyContent='center' w='100%' gap="32px" position="relative">
            <Link href='/admin/shift/create'>
              <Button
                colorScheme='blue'
                type='submit'
                size='sm'
                position='absolute'
                right='0'
                top='0'
              >
                シフトを作成する
              </Button>
            </Link>
            <Button
              colorScheme="gray"
              type="submit"
              size="sm"
              onClick={minusFunc}
            >
              ←
            </Button>
            <Heading fontSize="md">
              {year}年 {month}月
            </Heading>
            <Button
              colorScheme="gray"
              type="submit"
              size="sm"
              onClick={addFunc}
            >
              →
            </Button>
          </Flex>
          {daysInMonth.map((day) => {
            const formattedDay = `${day.getFullYear()}年${
              day.getMonth() + 1
            }月${day.getDate()}日`;

            // 当日のプロジェクトをフィルタリング
            const projectsForDay = projects.flatMap((project) => {
              return project.projectDescription
                .filter((description: any) => {
                  const projectDate = new Date(description.workDate);
                  // タイムゾーンや時刻を除外して日付だけで比較
                  return projectDate.toDateString() === day.toDateString();
                })
                .map((description: any) => ({
                  ...project,
                  projectDescription: description,
                }));
            });

            // 該当するプロジェクトがない場合は表示しない
            if (projectsForDay.length === 0) {
              return null;
            }

            return (
              <Flex key={formattedDay} width="100%" direction="column" gap="8px">
                {/* 日付のヘッダー */}
                <Heading fontSize="md" mb="12px">
                  {formattedDay}
                </Heading>

                {projectsForDay.map((projectItem) => {
                  const startTime = new Date(
                    projectItem.projectDescription.startTime
                  );
                  const endTime = new Date(
                    projectItem.projectDescription.endTime
                  );

                  // 日付の妥当性チェック
                  const isValidStartTime = !isNaN(startTime.getTime());
                  const isValidEndTime = !isNaN(endTime.getTime());

                  return (
                    <Box
                      key={projectItem.id}
                      backgroundColor="gray.100"
                      p="20px"
                    >
                      <Flex gap="8px" align="flex-end">
                        <Heading fontSize="md">
                          {projectItem.company.companyName}
                        </Heading>
                        <Heading fontSize="md">/</Heading>
                        <Heading fontSize="md">
                          {projectItem.projectName}
                        </Heading>
                      </Flex>
                      <Flex gap="8px" align="flex-end">
                        <Text fontSize="sm">
                          {projectItem.projectDescription.managerName} 様
                        </Text>
                        <Text fontSize="sm">
                          {projectItem.projectDescription.phonenumber}
                        </Text>
                      </Flex>
                      <Text fontSize="sm" pt="4px">
                        時間:{" "}
                        {isValidStartTime
                          ? startTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Invalid Date"}{" "}
                        ~{" "}
                        {isValidEndTime
                          ? endTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Invalid Date"}
                      </Text>
                      <Flex gap="8px" align="center">
                        <Text fontSize="sm">現場住所:</Text>
                        <Text fontSize="sm">
                          {projectItem.projectDescription.postcode}
                        </Text>
                        <Text fontSize="sm">
                          {projectItem.projectDescription.address}
                        </Text>
                      </Flex>
                      <Flex gap="8px" align="center">
                        <Text fontSize="sm">必要人数:</Text>
                        <Text fontSize="sm">
                          {projectItem.projectDescription.requiredMembers}人
                        </Text>
                        {projectItem.projectDescription.projectQualification.length === 0 ? null : (
                          <>
                            <Text fontSize="sm">(</Text>
                              {projectItem.projectDescription.projectQualification.map(
                                  (qual: any, index: any) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      colorScheme="blue"
                                      p="0 5px"
                                    >
                                      <Text p="1px 7px">
                                        {qual.qualification.qualificationName}{" "}
                                        {
                                          projectItem.projectDescription
                                            .qualifiedMembersNeeded
                                        }
                                        名
                                      </Text>
                                    </Badge>
                                  )
                                )}
                            <Text fontSize="sm">)</Text>
                          </>
                        )}
                      </Flex>
                      <Flex gap="12px" mt="24px" wrap="wrap">
                        {/* {projectItem.projectDescription.projectMember.map((member: )
                        )} */}
                        {workers.map((worker) => (
                          <Box
                            key={worker.id}
                            p="8px 10px"
                            backgroundColor="white"
                          >
                            <Flex gap="8px" align="left">
                              {worker.qualification === "なし" ? null : (
                                <Badge
                                  variant="outline"
                                  colorScheme="blue"
                                  p="2px 5px"
                                  w="fit-content"
                                >
                                  <Text fontSize="9px">{worker.qualification}</Text>
                                </Badge>
                              )}
                              <Heading fontSize="sm">{worker.name}</Heading>
                            </Flex>
                          </Box>
                        ))}
                      </Flex>
                    </Box>
                  );
                }
              )}
            </Flex>
          );
        })}
          {/* <Flex gap='20px' direction='column' w='100%'>
            {data.map((item) => (
                month !== item.month ? null : (
                <Box key={item.id} backgroundColor='gray.100' p='20px'>
                  <Flex gap='8px' align='flex-end'>
                    <Heading fontSize='md'>{item.project.company}</Heading>
                    <Heading fontSize='md'>/</Heading>
                    <Heading fontSize='md'>{item.project.name}</Heading>
                  </Flex>
                  <Text fontSize='sm'>Tel: {item.project.tel}</Text>
                  <Flex gap="12px" mt='24px' wrap='wrap'>
                    {item.workers.map((worker) => (
                      <Box key={worker.id} p='8px 10px' backgroundColor='white'>
                        <Flex gap='8px' align='left'>
                          {
                            worker.qualification === 'なし' ? null : (
                              <Badge variant='outline' colorScheme='blue' p='2px 5px' w='fit-content'>
                                <Text fontSize='9px'>{ worker.qualification }</Text>
                              </Badge>
                            )
                          }
                          <Heading fontSize='sm'>{ worker.name }</Heading>
                        </Flex>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              )
            ))}
          </Flex> */}
        </Flex>
      </Box>
    </>
  )
}