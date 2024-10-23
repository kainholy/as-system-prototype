import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Card,
  Heading,
  Text,
  Badge,
  Grid,
  Button,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import EditProject from "@/pages/components/EditProject";
import DetailProject from "@/pages/components/DetailProject";
import axios from "axios"; // axiosをインポート

export default function Project() {
  const [projects, setProjects] = useState<any[]>([]); // プロジェクトデータの状態
  const [year, setYear] = useState(new Date().getFullYear()); // 現在の年を取得
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 現在の月を取得

  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const detailOpenFunc = () => {
    setDetailOpen(true);
  };

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

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto" position="relative">
        <Bread second="案件情報" third="案件一覧" />
        {editOpen && <EditProject setEditOpen={setEditOpen} />}
        {detailOpen && (
          <DetailProject
            setDetailOpen={setDetailOpen}
            setEditOpen={setEditOpen}
          />
        )}
        <Flex p="64px 40px" direction="column" gap="40px">
          <Flex
            alignItems="center"
            justifyContent="center"
            w="100%"
            gap="32px"
            position="relative"
          >
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
              <Flex key={formattedDay} direction="column" gap="8px">
                {/* 日付のヘッダー */}
                <Heading fontSize="md" mb="12px">
                  {formattedDay}
                </Heading>

                {/* プロジェクトカードリスト */}
                <Grid
                  gap="20px"
                  templateColumns="repeat(3, 1fr)"
                  backgroundColor="gray.50"
                  p="24px 16px"
                >
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
                      <Card
                        key={projectItem.id}
                        _hover={{
                          backgroundColor: "gray.100",
                          cursor: "pointer",
                          boxShadow: "lg",
                        }}
                        transition=".3s"
                        p="17px 18px"
                        onClick={detailOpenFunc}
                      >
                        {/* 会社名とプロジェクト名 */}
                        <Heading fontSize="md">
                          {projectItem.company.companyName} /{" "}
                          {projectItem.projectName}
                        </Heading>
                        <Text fontSize="xs">
                          会社電話番号: {projectItem.company.phonenumber}
                        </Text>

                        <Text fontSize="sm">
                          現場住所: {projectItem.projectDescription.address}
                        </Text>
                        <Text fontSize="sm">
                          郵便番号: {projectItem.projectDescription.postcode}
                        </Text>

                        {/* プロジェクトの詳細 */}
                        <Flex gap="4px" pt="6px" direction="column">
                          {/* 必要資格 */}
                          <Flex gap="4px" align="center">
                            <Text fontSize="sm">必要資格:</Text>
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
                          </Flex>

                          {/* 必要隊員数 */}
                          <Text fontSize="sm">
                            必要隊員数:{" "}
                            {projectItem.projectDescription.requiredMembers}
                          </Text>

                          {/* 単価 */}
                          <Flex gap="4px" align="center">
                            <Text fontSize="sm">単価:</Text>
                            <Badge
                              variant="outline"
                              colorScheme="orange"
                              p="0 5px"
                            >
                              <Text p="1px 7px">
                                {projectItem.projectDescription.workTimeType}
                              </Text>
                            </Badge>
                          </Flex>

                          {/* 時間 */}
                          <Text fontSize="sm">
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

                          {/* 担当者情報 */}
                          <Text fontSize="sm">
                            担当者名:{" "}
                            {projectItem.projectDescription.managerName}
                          </Text>
                          <Text fontSize="sm">
                            担当者電話番号:{" "}
                            {projectItem.projectDescription.phonenumber}
                          </Text>
                        </Flex>
                      </Card>
                    );
                  })}
                </Grid>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}
