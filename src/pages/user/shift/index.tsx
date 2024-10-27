import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Text,
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import UserNavigation from "../../components/userNavigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios";
import withAuth from "../../../hoc/withAuth";
import { useRouter } from "next/router";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [shifts, setShifts] = useState<{ [date: string]: boolean }>({});
  const [leaveRequests, setLeaveRequests] = useState<{
    [date: string]: boolean;
  }>({});
  const [projectNames, setProjectNames] = useState<{
    [date: string]: string[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [memo, setMemo] = useState("");
  const [today] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  // 日付フォーマット関数を追加
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // 月は0始まりなので+1
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchProjectNamesForMonth();
    fetchExistingRequests();
  }, [currentDate]);

  const fetchProjectNamesForMonth = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 月の最初の日と最後の日を取得
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const dateArray = [];
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      dateArray.push(new Date(d));
    }

    const promises = dateArray.map(async (date) => {
      const dateString = formatDate(date); // 修正
      try {
        const response = await axios.get(
          `http://localhost:4000/projects/${dateString}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return { date: dateString, projectNames: response.data.projectNames };
      } catch (error) {
        console.error(
          `プロジェクト取得中にエラーが発生しました (${dateString}):`,
          error
        );
        return { date: dateString, projectNames: [] };
      }
    });

    const results = await Promise.all(promises);

    const projectNamesMap: { [date: string]: string[] } = {};
    results.forEach((result) => {
      projectNamesMap[result.date] = result.projectNames;
    });

    setProjectNames(projectNamesMap);
    setLoading(false);
  };

  const fetchExistingRequests = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:4000/getShiftRequests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const shiftData = response.data;
      const newShifts: { [date: string]: boolean } = {};
      const newLeaveRequests: { [date: string]: boolean } = {};

      shiftData.forEach((req: any) => {
        const dateString = req.workDate
          ? formatDate(new Date(req.workDate)) // 修正
          : req.reqOffDate
          ? formatDate(new Date(req.reqOffDate)) // 修正
          : null;

        if (dateString) {
          if (req.workDate) {
            newShifts[dateString] = true;
          } else if (req.reqOffDate) {
            newLeaveRequests[dateString] = true;
          }
        }
      });

      setShifts(newShifts);
      setLeaveRequests(newLeaveRequests);
    } catch (error) {
      console.error("シフトリクエストの取得中にエラーが発生しました:", error);
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(clickedDate);
    onOpen();
  };

  // シフト提出処理
  const handleShiftRegistration = async () => {
    if (selectedDate) {
      const dateString = formatDate(selectedDate); // 修正
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        await axios.post(
          "http://localhost:4000/submitShift",
          {
            selectedDate: dateString,
            memo,
            type: "shift",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setShifts((prevShifts) => ({
          ...prevShifts,
          [dateString]: true,
        }));
        setMemo("");
        onClose();
      } catch (error) {
        console.error("シフト提出中にエラーが発生しました:", error);
      }
    }
  };

  // シフト削除処理
  const handleDeleteShift = async (dateString: string) => {
    // サーバー側で削除処理を行う場合はここに実装
    setShifts((prevShifts) => {
      const newShifts = { ...prevShifts };
      delete newShifts[dateString];
      return newShifts;
    });
    // TODO: サーバー側での削除処理を実装
  };

  // 休暇申請処理
  const handleLeaveRequest = async () => {
    if (selectedDate) {
      const dateString = formatDate(selectedDate); // 修正
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        await axios.post(
          "http://localhost:4000/submitShift",
          {
            selectedDate: dateString,
            memo,
            type: "leave",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLeaveRequests((prevLeaveRequests) => ({
          ...prevLeaveRequests,
          [dateString]: true,
        }));
        setMemo("");
        onClose();
      } catch (error) {
        console.error("休暇申請中にエラーが発生しました:", error);
      }
    }
  };

  // 休暇申請削除処理
  const handleDeleteLeaveRequest = async (dateString: string) => {
    // サーバー側で削除処理を行う場合はここに実装
    setLeaveRequests((prevLeaveRequests) => {
      const newLeaveRequests = { ...prevLeaveRequests };
      delete newLeaveRequests[dateString];
      return newLeaveRequests;
    });
    // TODO: サーバー側での削除処理を実装
  };

  return (
    <>
      <UserNavigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="シフト" third="シフト提出" />
        <VStack spacing={6} padding="40px 20px">
          <HStack spacing={4}>
            <Button onClick={prevMonth} size="lg">
              前月
            </Button>
            <Text fontSize="2xl" fontWeight="bold">
              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
            </Text>
            <Button onClick={nextMonth} size="lg">
              翌月
            </Button>
          </HStack>
          {loading ? (
            <Spinner />
          ) : (
            <Grid
              templateColumns="repeat(7, 1fr)"
              gap={4}
              width="100%"
              maxWidth="1000px"
            >
              {weekdays.map((day) => (
                <Box
                  key={day}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="lg"
                >
                  {day}
                </Box>
              ))}
              {Array(firstDayOfMonth)
                .fill(null)
                .map((_, index) => (
                  <Box key={`empty-${index}`} />
                ))}
              {days.map((day) => {
                const dateObj = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                );
                const dateString = formatDate(dateObj); // 修正
                const hasShift = shifts[dateString];
                const hasLeaveRequest = leaveRequests[dateString];
                const isToday =
                  day === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear();

                return (
                  <Box
                    key={day}
                    textAlign="center"
                    p={2}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => handleDateClick(day)}
                    fontSize="lg"
                    height="100px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    bg={isToday ? "red.100" : "white"}
                  >
                    <Text
                      color={isToday ? "red.500" : "inherit"}
                      fontWeight={isToday ? "bold" : "normal"}
                    >
                      {day}
                    </Text>
                    <Flex direction="column" alignItems="center">
                      {projectNames[dateString] &&
                        projectNames[dateString].map((name, idx) => (
                          <Text key={idx} fontSize="xs">
                            {name}
                          </Text>
                        ))}
                    </Flex>
                    <Flex mt="auto">
                      {hasShift && (
                        <Box
                          w="8px"
                          h="8px"
                          borderRadius="50%"
                          bg="green.500"
                          mr="2px"
                        />
                      )}
                      {hasLeaveRequest && (
                        <Box
                          w="8px"
                          h="8px"
                          borderRadius="50%"
                          bg="orange.500"
                          mr="2px"
                        />
                      )}
                    </Flex>
                  </Box>
                );
              })}
            </Grid>
          )}
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedDate?.toLocaleDateString()}の詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold">プロジェクト名：</Text>
              {selectedDate &&
              projectNames[formatDate(selectedDate)] &&
              projectNames[formatDate(selectedDate)].length > 0 ? (
                projectNames[formatDate(selectedDate)].map((name, idx) => (
                  <Text key={idx}>{name}</Text>
                ))
              ) : (
                <Text>プロジェクトはありません</Text>
              )}
              <Input
                placeholder="メモを入力してください"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
              <HStack spacing={4} justifyContent="center">
                {selectedDate && shifts[formatDate(selectedDate)] ? (
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteShift(formatDate(selectedDate))}
                  >
                    シフト削除
                  </Button>
                ) : (
                  <Button colorScheme="green" onClick={handleShiftRegistration}>
                    シフト提出
                  </Button>
                )}
                {selectedDate && leaveRequests[formatDate(selectedDate)] ? (
                  <Button
                    colorScheme="red"
                    onClick={() =>
                      handleDeleteLeaveRequest(formatDate(selectedDate))
                    }
                  >
                    休暇申請削除
                  </Button>
                ) : (
                  <Button colorScheme="orange" onClick={handleLeaveRequest}>
                    休暇申請
                  </Button>
                )}
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withAuth(Calendar);
