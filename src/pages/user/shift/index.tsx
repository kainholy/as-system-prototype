import React, { useState } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import UserNavigation from "../../components/userNavigation";
import Bread from "../../components/Breadcrumb";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState<{ [date: string]: string[] }>({});
  const [shifts, setShifts] = useState<{ [date: string]: boolean }>({});
  const [leaveRequests, setLeaveRequests] = useState<{
    [date: string]: boolean;
  }>({});
  const [today] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleAddEvent = () => {
    if (selectedDate && event) {
      const dateString = selectedDate.toISOString().split("T")[0];
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateString]: [...(prevEvents[dateString] || []), event],
      }));
      setEvent("");
    }
    onClose();
  };

  const handleShiftRegistration = () => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0];
      setShifts((prevShifts) => ({
        ...prevShifts,
        [dateString]: true,
      }));
    }
    onClose();
  };

  const handleLeaveRequest = () => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0];
      setLeaveRequests((prevLeaveRequests) => ({
        ...prevLeaveRequests,
        [dateString]: true,
      }));
    }
    onClose();
  };

  const handleDeleteEvent = (dateString: string, index: number) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateString]: prevEvents[dateString].filter((_, i) => i !== index),
    }));
  };

  const handleDeleteShift = (dateString: string) => {
    setShifts((prevShifts) => {
      const newShifts = { ...prevShifts };
      delete newShifts[dateString];
      return newShifts;
    });
  };

  const handleDeleteLeaveRequest = (dateString: string) => {
    setLeaveRequests((prevLeaveRequests) => {
      const newLeaveRequests = { ...prevLeaveRequests };
      delete newLeaveRequests[dateString];
      return newLeaveRequests;
    });
  };

  return (
    <>
      <UserNavigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="隊員情報" third="隊員追加" />
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
          <Grid
            templateColumns="repeat(7, 1fr)"
            gap={4}
            width="100%"
            maxWidth="1000px"
          >
            {weekdays.map((day) => (
              <Box key={day} textAlign="center" fontWeight="bold" fontSize="lg">
                {day}
              </Box>
            ))}
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, index) => (
                <Box key={`empty-${index}`} />
              ))}
            {days.map((day) => {
              const dateString = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              )
                .toISOString()
                .split("T")[0];
              const hasEvent = events[dateString]?.length > 0;
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
                  p={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleDateClick(day)}
                  fontSize="lg"
                  height="80px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                  bg={isToday ? "red.100" : "white"}
                >
                  <Text
                    color={isToday ? "red.500" : "inherit"}
                    fontWeight={isToday ? "bold" : "normal"}
                  >
                    {day}
                  </Text>
                  <Flex>
                    {hasEvent && (
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="50%"
                        bg="blue.500"
                        mr="2px"
                      />
                    )}
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
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedDate?.toLocaleDateString()}の予定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold">予定一覧：</Text>
              {selectedDate &&
                events[selectedDate.toISOString().split("T")[0]]?.map(
                  (event, index) => (
                    <Flex
                      key={index}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text>{event}</Text>
                      <IconButton
                        aria-label="Delete event"
                        icon={<DeleteIcon />}
                        size="sm"
                        onClick={() =>
                          handleDeleteEvent(
                            selectedDate.toISOString().split("T")[0],
                            index
                          )
                        }
                      />
                    </Flex>
                  )
                )}
              {(!selectedDate ||
                !events[selectedDate.toISOString().split("T")[0]] ||
                events[selectedDate.toISOString().split("T")[0]]?.length ===
                  0) && <Text>予定はありません</Text>}
              <Input
                placeholder="新しい予定を入力してください"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
              />
              <Button colorScheme="blue" onClick={handleAddEvent}>
                予定を追加
              </Button>
              <HStack spacing={4} justifyContent="center">
                {selectedDate &&
                shifts[selectedDate.toISOString().split("T")[0]] ? (
                  <Button
                    colorScheme="red"
                    onClick={() =>
                      handleDeleteShift(
                        selectedDate.toISOString().split("T")[0]
                      )
                    }
                  >
                    シフト削除
                  </Button>
                ) : (
                  <Button colorScheme="green" onClick={handleShiftRegistration}>
                    シフト登録
                  </Button>
                )}
                {selectedDate &&
                leaveRequests[selectedDate.toISOString().split("T")[0]] ? (
                  <Button
                    colorScheme="red"
                    onClick={() =>
                      handleDeleteLeaveRequest(
                        selectedDate.toISOString().split("T")[0]
                      )
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

export default Calendar;
