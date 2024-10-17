import { Box, Flex, Grid, Card, Text, Heading, Badge } from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import EditMember from "@/pages/components/EditMember";
import DetailMember from "@/pages/components/DetailMember";
import { useState, useEffect } from "react";
import axios from "axios";

type EmergencyContact = {
  name: string;
  relationship: string;
  phoneNumber: string;
};

type Qualification = {
  id: number
  qualificationName: string;
};

type Member = {
  id: number;
  staffId: string;
  name: string;
  romanname: string;
  address: string;
  postcode: string;
  phonenumber: string;
  email: string;
  birthday: string;
  hiredate: string;
  role: string;
  emergencyContacts: EmergencyContact[];
  qualifications: Qualification[];
  ngStaffList: string;

  bannedInfo: string;
  selfBanned: string;
};

export default function MemberPage() {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/members");
        setMembers(response.data);
      } catch (error) {
        console.error("メンバー情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchMembers();
  }, []);

  const detailOpenFunc = (member: Member) => {
    setSelectedMember(member);
    setDetailOpen(true);
  };

  const editOpenFunc = (member: Member) => {
    setSelectedMember(member);
    setEditOpen(true);
  };

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto" position="relative">
        <Bread second="隊員情報" third="隊員一覧" />
        {editOpen && selectedMember && (
          <EditMember setEditOpen={setEditOpen} memberId={selectedMember.id} />
        )}
        {detailOpen && selectedMember && (
          <DetailMember
            setDetailOpen={setDetailOpen}
            setEditOpen={setEditOpen}
            member={selectedMember}
          />
        )}
        <Box p="64px 40px">
          <Grid gap="20px" templateColumns="repeat(3, 1fr)">
            {members.map((member) => (
              <Card
                key={member.id}
                _hover={{
                  backgroundColor: "gray.100",
                  cursor: "pointer",
                  boxShadow: "lg",
                }}
                transition=".3s"
                p="17px 18px"
                onClick={() => detailOpenFunc(member)}
              >
                <Text fontSize="sm">No. {member.staffId}</Text>
                <Flex gap="16px" align="flex-end" pt="4px">
                  <Heading fontSize="md">{member.name}</Heading>
                  <Text fontSize="sm">{member.romanname}</Text>
                </Flex>
                <Flex gap="4px" pt="6px" direction="column">
                  <Flex gap="4px" align="center">
                    <Text fontSize="sm">資格:</Text>
                    {member.qualifications.length > 0
                      ? member.qualifications.map((qualification) => (
                          <Badge
                            variant="outline"
                            colorScheme="blue"
                            p="0 5px"
                            key={qualification.id}
                          >
                            {qualification.qualificationName}
                          </Badge>
                        ))
                      : <Badge
                          variant="outline"
                          colorScheme="gray"
                          p="0 5px"
                        >
                          なし
                        </Badge>
                    }
                  </Flex>
                  <Text fontSize="sm">住所: {member.address}</Text>
                  <Text fontSize="sm">Tel: {member.phonenumber}</Text>
                  <Text fontSize="sm">Email: {member.email}</Text>
                  <Text fontSize="sm">雇用形態: {member.role}</Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
