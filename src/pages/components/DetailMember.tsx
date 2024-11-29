import { Box, Flex, IconButton, Heading, Text, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type EmergencyContact = {
  name: string;
  relationship: string;
  phoneNumber: string;
};

type Qualification = {
  qualificationName: string;
};

type Member = {
  id: number;
  staffId: string;
  name: string;
  romanname: string;
  address: string;
  postcode?: string;
  phonenumber: string;
  email: string;
  birthday: string;
  hiredate: string;
  role: string;
  emergencyContacts?: EmergencyContact[];
  qualifications?: Qualification[];
  ngStaffList?: string;
  bannedInfo?: string;
  selfBanned?: string;
};

export default function DetailMember({
  setDetailOpen,
  setEditOpen,
  member,
}: {
  setDetailOpen: (isOpen: boolean) => void;
  setEditOpen: (isOpen: boolean) => void;
  member: Member;
}) {
  const editOpenFunc = () => {
    setEditOpen(true);
    setDetailOpen(false);
  };
  const detailCloseFunc = () => {
    setDetailOpen(false); // モーダルを閉じる関数
  };

  function formatDateToJapanese(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear(); // 年
    const month = date.getMonth() + 1; // 月 (0から始まるので +1)
    const day = date.getDate(); // 日
    return `${year}年${month}月${day}日`;
  }

  return (
    <Box
      position="absolute"
      top="52px"
      left="0"
      backgroundColor="blackAlpha.500"
      w="100%"
      zIndex="5"
    >
      <Flex
        w="80%"
        maxW="800px"
        margin="80px auto"
        direction="column"
        gap="24px"
        backgroundColor="white"
        p="40px 32px"
        borderRadius="12px"
        position="relative"
      >
        {/* 閉じるアイコン */}
        <IconButton
          aria-label="Close modal"
          icon={<CloseIcon />}
          position="absolute"
          top="24px"
          right="24px"
          onClick={detailCloseFunc}
        />
        <Heading fontSize="xl" mb="12px">
          隊員詳細情報
        </Heading>

        {/* 隊員番号 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            隊員番号
          </Text>
          <Heading size="sm">{member.staffId || "N/A"}</Heading>
        </Flex>

        {/* 名前 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            名前
          </Text>
          <Heading size="sm">{member.name || "N/A"}</Heading>
        </Flex>

        {/* ローマ字 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            名前（ローマ字）
          </Text>
          <Heading size="sm">{member.romanname || "N/A"}</Heading>
        </Flex>

        {/* 生年月日 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            生年月日
          </Text>
          <Heading size="sm">{formatDateToJapanese(member.birthday) || "N/A"}</Heading>
        </Flex>

        {/* 電話番号 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            電話番号
          </Text>
          <Heading size="sm">{member.phonenumber || "N/A"}</Heading>
        </Flex>

        {/* メールアドレス */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            メールアドレス
          </Text>
          <Heading size="sm">{member.email || "N/A"}</Heading>
        </Flex>

        {/* 雇用開始日 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            雇用開始日
          </Text>
          <Heading size="sm">{formatDateToJapanese(member.hiredate) || "N/A"}</Heading>
        </Flex>

        {/* 緊急連絡先 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            緊急連絡先
          </Text>
          {member.emergencyContacts && member.emergencyContacts.length > 0 ? (
            member.emergencyContacts.map((contact, index) => (
              <Flex key={index} direction="column" gap="4px">
                <Heading size="sm">名前: {contact.name}</Heading>
                <Text fontSize="sm">属柄: {contact.relationship}</Text>
                <Text fontSize="sm">電話番号: {contact.phoneNumber}</Text>
              </Flex>
            ))
          ) : (
            <Heading size="sm">N/A</Heading>
          )}
        </Flex>

        {/* 資格情報 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            資格情報
          </Text>
          {member.qualifications && member.qualifications.length > 0 ? (
            member.qualifications.map((qualification, index) => (
              <Heading key={index} size="sm">
                {qualification.qualificationName}
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

        {/* 出禁情報 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            出禁情報
          </Text>
          <Heading size="sm">{member.bannedInfo || "なし"}</Heading>
        </Flex>

        {/* 自主出禁 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            自主出禁
          </Text>
          <Heading size="sm">{member.selfBanned || "なし"}</Heading>
        </Flex>

        <Flex gap="20px" justifyContent="right">
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
  );
}
