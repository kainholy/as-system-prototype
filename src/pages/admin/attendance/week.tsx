import Bread from "@/pages/components/Breadcrumb";
import Navigation from "@/pages/components/Navigation";
import { Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";


export default function week() {
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(7);
    const [day, setDay] = useState(21);

    const addFunc = () => {
        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + 7);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
    }

    const minusFunc = () => {
        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() - 7);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
    }

    const startDate = new Date(year, month - 1, day);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    return (
        <>
            <Navigation />
            <Box w="calc(100% - 220px)" margin="0 0 0 auto">
                <Bread second="勤怠情報" third="週次一覧" />
                <Flex alignItems="center" gap="20px" direction="column" p='64px 40px'>
                    <Flex alignItems="center" justifyContent='center' w='100%' gap="32px" position="relative">
                        <Button
                            colorScheme='gray'
                            type='submit'
                            size='sm'
                            onClick={minusFunc}
                        >
                        ←
                        </Button>
                        <Heading fontSize='md'>
                        { startDate.getFullYear() }年 { startDate.getMonth() + 1 }月 { startDate.getDate() }日 ~ { endDate.getFullYear() }年 { endDate.getMonth() + 1 }月 { endDate.getDate() }日
                        </Heading>
                        <Button
                            colorScheme='gray'
                            type='submit'
                            size='sm'
                            onClick={addFunc}
                            >
                            →
                        </Button>
                    </Flex>
                    <Flex gap="15px">
                        <Link href='/admin/attendance/day'>
                            <Button colorScheme="gray" size="xs">日次</Button>
                        </Link>
                        <Link href='/admin/attendance/week'>
                            <Button colorScheme="gray" size="xs">週次</Button>
                        </Link>
                        <Link href='/admin/attendance/month'>
                            <Button colorScheme="gray" size="xs">月次</Button>
                        </Link>
                    </Flex>
                </Flex>
                <TableContainer m='0 40px'>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>名前</Th>
                        <Th>合計勤務時間</Th>
                        <Th>月曜日</Th>
                        <Th>火曜日</Th>
                        <Th>水曜日</Th>
                        <Th>木曜日</Th>
                        <Th>金曜日</Th>
                        <Th>土曜日</Th>
                        <Th>日曜日</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>大倉 聖哉</Td>
                        <Td>44時間30分</Td>
                        <Td>9:30 - 18:00 遅刻</Td>
                        <Td>—</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>—</Td>
                      </Tr>
                      <Tr>
                        <Td>和田 大輝</Td>
                        <Td>51時間00分</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>14:00 - 20:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>—</Td>
                      </Tr>
                      <Tr>
                        <Td>山田 太郎</Td>
                        <Td>44時間00分</Td>
                        <Td>—</Td>
                        <Td>13:00 - 21:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>9:00 - 18:00 出勤</Td>
                        <Td>—</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
            </Box>
        </>
    );
}