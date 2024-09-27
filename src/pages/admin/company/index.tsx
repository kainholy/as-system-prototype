import Bread from "@/pages/components/Breadcrumb";
import CompanyProject from "@/pages/components/CompanyProject";
import EditCompany from "@/pages/components/EditCompany";
import Navigation from "@/pages/components/Navigation";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Company() {
  const [editOpen, setEditOpen] = useState(false);
  const editCompany = () => {
    setEditOpen(true);
  };

  const [projectOpen, setProjectOpen] = useState(false);
  const projectOpenFunc = () => {
    setProjectOpen(true);
  };

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto" position="relative">
        {editOpen && <EditCompany setEditOpen={setEditOpen} />}
        {projectOpen && (
          <CompanyProject
            setProjectOpen={setProjectOpen}
            setEditOpen={setEditOpen}
          />
        )}
        <Bread second="会社情報" third="会社一覧" />
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          <Card
            _hover={{
              backgroundColor: "gray.100",
              cursor: "pointer",
              boxShadow: "lg",
            }}
            transition=".3s"
            p="17px 18px"
            onClick={projectOpenFunc}
          >
            <Flex gap="16px" align="center" pt="4px">
              <Heading fontSize="md">〇〇会社</Heading>
            </Flex>
            <Flex gap="4px" direction="column" p="10px 0 0">
              <Text fontSize="xs">郵便番号: 274-0000</Text>
              <Text fontSize="xs">住所: 千葉県習志野市津田沼1-5-1111</Text>
              <Text fontSize="xs">
                メールアドレス: ookuraseiya0506@gmail.com
              </Text>
              <Text fontSize="xs">電話番号: 090-6703-6735</Text>
            </Flex>
          </Card>
          <Card
            _hover={{
              backgroundColor: "gray.100",
              cursor: "pointer",
              boxShadow: "lg",
            }}
            transition=".3s"
            p="17px 18px"
            onClick={projectOpenFunc}
          >
            <Flex gap="16px" align="center" pt="4px">
              <Heading fontSize="md">△△会社</Heading>
            </Flex>
            <Flex gap="4px" direction="column" p="10px 0 0">
              <Text fontSize="xs">郵便番号: 274-0000</Text>
              <Text fontSize="xs">住所: 千葉県習志野市津田沼1-5-1111</Text>
              <Text fontSize="xs">
                メールアドレス: ookuraseiya0506@gmail.com
              </Text>
              <Text fontSize="xs">電話番号: 090-6703-6735</Text>
            </Flex>
          </Card>
          <Card
            _hover={{
              backgroundColor: "gray.100",
              cursor: "pointer",
              boxShadow: "lg",
            }}
            transition=".3s"
            p="17px 18px"
            onClick={projectOpenFunc}
          >
            <Flex gap="16px" align="center" pt="4px">
              <Heading fontSize="md">積洋ハウス</Heading>
            </Flex>
            <Flex gap="4px" direction="column" p="10px 0 0">
              <Text fontSize="xs">郵便番号: 274-0000</Text>
              <Text fontSize="xs">住所: 千葉県習志野市津田沼1-5-1111</Text>
              <Text fontSize="xs">
                メールアドレス: ookuraseiya0506@gmail.com
              </Text>
              <Text fontSize="xs">電話番号: 090-6703-6735</Text>
            </Flex>
          </Card>
          <Card
            _hover={{
              backgroundColor: "gray.100",
              cursor: "pointer",
              boxShadow: "lg",
            }}
            transition=".3s"
            p="17px 18px"
            onClick={projectOpenFunc}
          >
            <Flex gap="16px" align="center" pt="4px">
              <Heading fontSize="md">Sea.inc</Heading>
            </Flex>
            <Flex gap="4px" direction="column" p="10px 0 0">
              <Text fontSize="xs">郵便番号: 274-0000</Text>
              <Text fontSize="xs">住所: 千葉県習志野市津田沼1-5-1111</Text>
              <Text fontSize="xs">
                メールアドレス: ookuraseiya0506@gmail.com
              </Text>
              <Text fontSize="xs">電話番号: 090-6703-6735</Text>
            </Flex>
          </Card>
          <Card
            _hover={{
              backgroundColor: "gray.100",
              cursor: "pointer",
              boxShadow: "lg",
            }}
            transition=".3s"
            p="17px 18px"
            onClick={projectOpenFunc}
          >
            <Flex gap="16px" align="center" pt="4px">
              <Heading fontSize="md">LINE・Yahoo株式会社</Heading>
            </Flex>
            <Flex gap="4px" direction="column" p="10px 0 0">
              <Text fontSize="xs">郵便番号: 274-0000</Text>
              <Text fontSize="xs">住所: 千葉県習志野市津田沼1-5-1111</Text>
              <Text fontSize="xs">
                メールアドレス: ookuraseiya0506@gmail.com
              </Text>
              <Text fontSize="xs">電話番号: 090-6703-6735</Text>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </>
  );
}
