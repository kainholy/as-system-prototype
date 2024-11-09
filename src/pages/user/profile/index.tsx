import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import UserNavigation from "../../components/userNavigation";
import Bread from "../../components/Breadcrumb";
import UserEdit from "@/pages/components/UserEdit";
import axios from "axios";

type EmergencyContact = {
  id: number;
  nameOfEmergency: string;
  relationship: string;
  phoneNumber: string;
  staffProfileId: number;
};

type Qualification = {
  id: number;
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
  gender: string;
  role: string;
  emergencyContact: EmergencyContact[];
  qualifications: {
    qualification: Qualification;
  }[];
  ngStaffList: string;
  bannedInfo: string;
  selfBanned: string;
};

function CheckProfile() {
  const [editOpen, setEditOpen] = useState(false);
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const token = localStorage.getItem("token"); // トークンを取得

        const response = await axios.get("http://localhost:4000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("取得したメンバーデータ:", response.data);

        setMember(response.data);
      } catch (error) {
        console.error("メンバー情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchMember();
  }, []);

  const editOpenFunc = () => {
    setEditOpen(true);
  };

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserNavigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="隊員情報" third="隊員個人情報" />
        {editOpen && <UserEdit setEditOpen={setEditOpen} />}
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          <Heading fontSize="xl" mb="12px">
            隊員詳細情報
          </Heading>

          {/* 隊員番号 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              隊員番号
            </Text>
            <Heading size="sm">{member.staffId}</Heading>
          </Flex>

          {/* 名前 */}
          <Flex flex="1" gap="40px">
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                名前
              </Text>
              <Heading size="sm">{member.name}</Heading>
            </Flex>
          </Flex>

          {/* ローマ字 */}
          <Flex flex="1" gap="40px">
            <Flex direction="column" gap="8px" flex="1">
              <Text fontSize="sm" color="gray.800">
                名前（ローマ字）
              </Text>
              <Heading size="sm">{member.romanname}</Heading>
            </Flex>
          </Flex>

          {/* 生年月日 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              生年月日
            </Text>
            <Heading size="sm">{member.birthday}</Heading>
          </Flex>

          {/* 性別 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              性別
            </Text>
            <Heading size="sm">{member.gender}</Heading>
          </Flex>

          {/* 住所 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              郵便番号
            </Text>
            <Heading size="sm">{member.postcode}</Heading>
            <Text fontSize="sm" color="gray.800">
              住所
            </Text>
            <Heading size="sm">{member.address}</Heading>
          </Flex>

          {/* 電話番号 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              電話番号
            </Text>
            <Heading size="sm">{member.phonenumber}</Heading>
          </Flex>

          {/* メールアドレス */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              メールアドレス
            </Text>
            <Heading size="sm">{member.email}</Heading>
          </Flex>

          {/* 雇用開始日 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              雇用開始日
            </Text>
            <Heading size="sm">{member.hiredate}</Heading>
          </Flex>

          {/* 緊急連絡先・続柄 */}
          {member.emergencyContact && member.emergencyContact.length > 0 ? (
            member.emergencyContact.map((contact) => (
              <Flex flex="1" gap="40px" key={contact.id}>
                <Flex direction="column" gap="8px" flex="1">
                  <Text fontSize="sm" color="gray.800">
                    緊急連絡先
                  </Text>
                  <Heading size="sm">{contact.phoneNumber}</Heading>
                </Flex>
                <Flex direction="column" gap="8px" flex="1">
                  <Text fontSize="sm" color="gray.800">
                    名前
                  </Text>
                  <Heading size="sm">{contact.nameOfEmergency}</Heading>
                </Flex>
                <Flex direction="column" gap="8px" flex="1">
                  <Text fontSize="sm" color="gray.800">
                    続柄
                  </Text>
                  <Heading size="sm">{contact.relationship}</Heading>
                </Flex>
              </Flex>
            ))
          ) : (
            <Text>緊急連絡先情報が登録されていません。</Text>
          )}

          {/* 資格情報 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              資格情報
            </Text>
            {member.qualifications && member.qualifications.length > 0 ? (
              member.qualifications.map((q) => (
                <Heading size="sm" key={q.qualification.id}>
                  {q.qualification.qualificationName}
                </Heading>
              ))
            ) : (
              <Heading size="sm">なし</Heading>
            )}
          </Flex>

          {/* NG隊員リスト */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              NG隊員リスト
            </Text>
            <Heading size="sm">{member.ngStaffList || "なし"}</Heading>
          </Flex>

          {/* 自主出禁 */}
          <Flex direction="column" gap="8px">
            <Text fontSize="sm" color="gray.800">
              自主出禁
            </Text>
            <Heading size="sm">{member.selfBanned || "なし"}</Heading>
          </Flex>

          <Flex gap="20px" justifyContent="center">
            <Button
              onClick={editOpenFunc}
              mt={4}
              pl={12}
              pr={12}
              colorScheme="blue"
            >
              編集する
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default CheckProfile;
