import Bread from "@/pages/components/Breadcrumb";
import Navigation from "@/pages/components/Navigation";
import { Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";


export default function day() {
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(7);
    const [day, setDay] = useState(21);

    const addFunc = () => {
        const date = new Date(year, month - 1, day); // 月は0から始まるので-1します
        date.setDate(date.getDate() + 1);            // 日付を1増やす
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);               // 表示用に+1します
        setDay(date.getDate());
    }

    const minusFunc = () => {
        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() - 1);            // 日付を1減らす
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
    }

    return (
        <>
            <Navigation />
            <Box w="calc(100% - 220px)" margin="0 0 0 auto">
                <Bread second="勤怠情報" third="日次一覧" />
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
                        <Heading fontSize='md'>{ year }年 { month }月 { day }日</Heading>
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

                {/* <TableContainer m='0 40px' border='1px solid' borderColor='gray.200' borderRadius='12px' p='10px'> */}
                <TableContainer m='0 40px'>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>日付</Th>
                        <Th>名前</Th>
                        <Th>案件情報</Th>
                        <Th>出社時刻</Th>
                        <Th>退社時刻</Th>
                        <Th>勤務時間</Th>
                        <Th>勤務ステータス</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>2024/6/1</Td>
                        <Td>大倉 聖哉</Td>
                        <Td>〇〇イベント警備</Td>
                        <Td>9:30</Td>
                        <Td>18:00</Td>
                        <Td>8:30</Td>
                        <Td>遅刻</Td>
                      </Tr>
                      <Tr>
                        <Td>2024/6/1</Td>
                        <Td>和田 大輝</Td>
                        <Td>〇〇イベント警備</Td>
                        <Td>9:00</Td>
                        <Td>18:00</Td>
                        <Td>9:00</Td>
                        <Td>出勤</Td>
                      </Tr>
                      <Tr>
                        <Td>2024/6/2</Td>
                        <Td>和田 大輝</Td>
                        <Td>××イベント警備</Td>
                        <Td>14:00</Td>
                        <Td>20:00</Td>
                        <Td>6:00</Td>
                        <Td>出勤</Td>
                      </Tr>
                      <Tr>
                        <Td>2024/6/2</Td>
                        <Td>山田 太郎</Td>
                        <Td>××イベント警備</Td>
                        <Td>13:00</Td>
                        <Td>21:00</Td>
                        <Td>8:00</Td>
                        <Td>出勤</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

            </Box>
        </>
    );
}