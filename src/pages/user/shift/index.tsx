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
} from "@chakra-ui/react";

import UserNavigation from "../../components/userNavigation";
import Bread from "../../components/Breadcrumb";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [event, setEvent] = useState("");
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
    // ここで予定を保存する処理を実装
    console.log(
      `予定 "${event}" を ${selectedDate?.toLocaleDateString()} に追加しました`
    );
    setEvent("");
    onClose();
  };

  return (
    <>
      <UserNavigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="隊員情報" third="隊員追加" />
        <VStack spacing={4} padding="40px 20px">
          <HStack>
            <Button onClick={prevMonth}>前月</Button>
            <Text fontSize="xl" fontWeight="bold">
              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
            </Text>
            <Button onClick={nextMonth}>翌月</Button>
          </HStack>
          <Grid templateColumns="repeat(7, 1fr)" gap={2}>
            {weekdays.map((day) => (
              <Box key={day} textAlign="center" fontWeight="bold">
                {day}
              </Box>
            ))}
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, index) => (
                <Box key={`empty-${index}`} />
              ))}
            {days.map((day) => (
              <Box
                key={day}
                textAlign="center"
                p={2}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                cursor="pointer"
                onClick={() => handleDateClick(day)}
              >
                {day}
              </Box>
            ))}
          </Grid>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedDate?.toLocaleDateString()}の予定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="予定を入力してください"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
              追加
            </Button>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Calendar;
