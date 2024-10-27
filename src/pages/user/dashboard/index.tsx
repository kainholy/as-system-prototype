import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
} from "@chakra-ui/react";
import Navigation from "../../components/userNavigation";
import Bread from "../../components/Breadcrumb";
import Link from "next/link";
import { useEffect, useState } from "react";
import withAuth from "../../../hoc/withAuth";
import { useRouter } from "next/router";

function UserDashboard() {
  const router = useRouter();

  // ログアウト関数の定義
  const handleLogout = () => {
    localStorage.removeItem("token"); // トークンを削除
    router.push("/user/login"); // ログインページへリダイレクト
  };

  // これらの値は実際のデータに基づいて動的に設定する必要があります
  const totalWorkDays = 120;
  const daysSinceJoining = 180;

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second={""} third={""} />
        <Box p={5}>
          <Flex justify="space-between" align="center" mb={5}>
            <Heading as="h1" size="xl">
              ダッシュボード
            </Heading>
            {/* ログアウトボタンを追加 */}
            <Button onClick={handleLogout} colorScheme="red">
              ログアウト
            </Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <Card>
              <CardHeader>
                <Heading size="md">本日の出勤情報</Heading>
              </CardHeader>
              <CardBody>
                <Text>出勤時間: 9:00</Text>
                <Text>退勤時間: 18:00</Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">シフト提出</Heading>
              </CardHeader>
              <CardBody>
                <Button colorScheme="blue">シフトを提出する</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">次のシフト</Heading>
              </CardHeader>
              <CardBody>
                <Text>日付: 2023年5月1日</Text>
                <Text>時間: 10:00 - 19:00</Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">勤務統計</Heading>
              </CardHeader>
              <CardBody>
                <Text>今までの出勤回数: {totalWorkDays}回</Text>
                <Text>入社してからの日数: {daysSinceJoining}日</Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}

// `withAuth` HOCで認証保護を追加
export default withAuth(UserDashboard);
