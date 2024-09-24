import Bread from "@/pages/components/Breadcrumb";
import Navigation from "@/pages/components/Navigation";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";


export default function month() {
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(7);

    const addFunc = () => {
        const date = new Date(year, month - 1); // 月は0から始まるので-1します
        date.setMonth(date.getMonth() + 1);     // 月を1増やす
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);          // 表示用に+1します
    }

    const minusFunc = () => {
        const date = new Date(year, month - 1);
        date.setMonth(date.getMonth() - 1);     // 月を1減らす
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
    }

    return (
        <>
            <Navigation />
            <Box w="calc(100% - 220px)" margin="0 0 0 auto">
                <Bread second="勤怠情報" third="月次一覧" />
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
                        <Heading fontSize='md'>{ year }年 { month }月</Heading>
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
            </Box>
        </>
    );
}