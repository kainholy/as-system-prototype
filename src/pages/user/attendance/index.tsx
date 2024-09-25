"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  Grid,
  Badge,
  Text,
  Card,
  Accordion,
  AccordionItem,
} from "@chakra-ui/react";
import UserNavigation from "../../components/userNavigation";
import Bread from "../../components/Breadcrumb";
import Link from "next/link";

export default function Attendance() {
  return (
    <>
      <UserNavigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="上下番報告" third="" />
        <Flex
          //   alignItems="center"
          justifyContent="flex-start"
        >
          <Flex w="200px" direction="column" gap="24px">
            <Heading size="md" padding="40px">
              本日の現場
            </Heading>
          </Flex>
        </Flex>

        <Box p="64px 40px">
          <Grid gap="20px" templateColumns="repeat(1, 1fr)">
            {/* コンポーネント */}
            <Card p="17px 18px">
              <Text fontSize="sm">7月21日</Text>
              <Flex gap="16px" align="flex-end" pt="4px">
                <Heading fontSize="md">〇〇警備</Heading>
              </Flex>
              <Flex gap="4px" pt="6px" direction="column">
                <Flex gap="4px" align="center">
                  <Text fontSize="sm">ステータス:</Text>
                  <Badge variant="outline" colorScheme="blue" p="0 5px">
                    <Text p="1px 7px">上番報告済み</Text>
                  </Badge>
                </Flex>
                <Text fontSize="sm">担当者電話番号: 090-6703-6735</Text>
                <Text fontSize="sm">
                  担当者Email: ookuraseiya0506@gmail.com
                </Text>
                <Text fontSize="sm">住所: 千葉県習志野市津田沼1-5-1111</Text>
              </Flex>
            </Card>
            {/* ここまで */}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
