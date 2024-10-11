import AddQualification from "@/pages/components/AddQualification";
import Bread from "@/pages/components/Breadcrumb";
import EditQualification from "@/pages/components/EditQualification";
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

type Qualification = {
  qualificationName: string;
};

export default function Qualification() {
  const [editOpen, setEditOpen] = useState(false);
  const editQualification = () => {
    setEditOpen(true);
  };

  const [addOpen, setAddOpen] = useState(false);
  const addQualification = () => {
    setAddOpen(true);
  };

  const [qualification, setQualification] = useState<Qualification[]>([]);

  useEffect(() => {
    const fetchQualification = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/qualifications"
        );
        setQualification(response.data);
      } catch (error) {
        console.error("資格情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchQualification();
  }, []);

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto" position="relative">
        {editOpen && <EditQualification setEditOpen={setEditOpen} />}
        {addOpen && <AddQualification setAddOpen={setAddOpen} />}
        <Bread second="設定" third="資格情報" />
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          {qualification.map((qual) => (
            <Card
              key={qual.qualificationName} // ここは適切な一意のIDに変更することを推奨
              _hover={{
                backgroundColor: "gray.100",
                cursor: "pointer",
                boxShadow: "lg",
              }}
              transition=".3s"
              p="17px 18px"
              onClick={editQualification}
            >
              <Flex gap="16px" align="center" pt="4px">
                <Heading fontSize="md" color="blue.300">
                  ⚫︎
                </Heading>
                <Heading fontSize="md">{qual.qualificationName}</Heading>
              </Flex>
            </Card>
          ))}
          <Button mt={4} colorScheme="blue" onClick={addQualification}>
            追加する
          </Button>
        </Flex>
      </Box>
    </>
  );
}
