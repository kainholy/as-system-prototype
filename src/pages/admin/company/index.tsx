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
import { useState, useEffect } from "react";
import axios from "axios";

type Company = {
  companyName: string;
  postcode: string;
  address: string;
  email: string;
  phonenumber: string;
};

export default function Company() {
  const [company, setCompany] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get("http://localhost:4000/companies");
        setCompany(response.data);
      } catch (error) {
        console.error("会社情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchCompany();
  }, []);

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
          {company.map((company) => (
            <Card
              key={company.companyName} // 一意のキーを設定
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
                <Heading fontSize="md">{company.companyName}</Heading>
              </Flex>
              <Flex gap="4px" direction="column" p="10px 0 0">
                <Text fontSize="xs">郵便番号: {company.postcode}</Text>
                <Text fontSize="xs">住所: {company.address}</Text>
                <Text fontSize="xs">メールアドレス: {company.email}</Text>
                <Text fontSize="xs">電話番号: {company.phonenumber}</Text>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Box>
    </>
  );
}
