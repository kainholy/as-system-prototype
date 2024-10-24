import { Box, Flex, IconButton, Heading, Text, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router"; // useRouterをインポート

type Project = {
  id: number;
  projectName: string;
  company: {
    companyName: string;
    phonenumber: string;
  };
  projectDescription: {
    id: number; // projectDescriptionId を追加
    workDate: string;
    startTime: string;
    endTime: string;
    address: string;
    postcode: string;
    managerName: string;
    phonenumber: string;
    requiredMembers: number;
    unitPrice: number;
    workTimeType: string;
    memo: string;
    projectQualification: {
      qualification: {
        qualificationName: string;
      };
      numberOfMembersNeeded: number;
    }[];
  };
};

interface DetailProjectProps {
  setDetailOpen: (isOpen: boolean) => void;
  setEditOpen: (isOpen: boolean) => void;
  project?: Project; // プロジェクトデータは任意
}

export default function DetailProject({
  setDetailOpen,
  setEditOpen,
  project,
}: DetailProjectProps) {
  const router = useRouter(); // useRouterのインスタンスを作成

  const editOpenFunc = () => {
    setEditOpen(true);
    setDetailOpen(false);
    // 編集ページに遷移
    if (project && project.projectDescription?.id) {
      router.push(
        `/admin/project/edit/${project.id}-${project.projectDescription.id}`
      );
    }
  };

  const detailCloseFunc = () => {
    setDetailOpen(false); // モーダルを閉じる関数
  };

  // プロジェクトデータがない場合は何も表示しない
  if (!project) {
    return null;
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
          案件詳細情報
        </Heading>

        {/* 会社名 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            会社名
          </Text>
          <Heading size="sm">
            {project.company?.companyName || "未設定"}
          </Heading>
        </Flex>

        {/* 会社の電話番号 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            会社電話番号
          </Text>
          <Heading size="sm">
            {project.company?.phonenumber || "未設定"}
          </Heading>
        </Flex>

        {/* 必要資格・保持者数 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            必要資格
          </Text>
          {project.projectDescription?.projectQualification?.length > 0 ? (
            <Heading size="sm">
              {project.projectDescription.projectQualification.map(
                (qual, index) => (
                  <span key={index}>
                    {qual.qualification.qualificationName}（
                    {qual.numberOfMembersNeeded}名）
                  </span>
                )
              )}
            </Heading>
          ) : (
            <Heading size="sm">なし</Heading>
          )}
        </Flex>

        {/* 必要隊員数 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            必要隊員数
          </Text>
          <Heading size="sm">
            {project.projectDescription?.requiredMembers || "未設定"}
          </Heading>
        </Flex>

        {/* 単価 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            単価
          </Text>
          <Heading size="sm">
            {project.projectDescription?.workTimeType || "未設定"}
          </Heading>
        </Flex>

        {/* 金額 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            金額
          </Text>
          <Heading size="sm">
            {project.projectDescription?.unitPrice || "未設定"}円
          </Heading>
        </Flex>

        {/* 日にち */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            日にち
          </Text>
          <Heading size="sm">
            {project.projectDescription?.workDate
              ? new Date(
                  project.projectDescription.workDate
                ).toLocaleDateString()
              : "未設定"}
          </Heading>
        </Flex>

        {/* 開始時間・終了時間 */}
        <Flex flex="1" gap="40px">
          <Flex direction="column" gap="8px" flex="1">
            <Text fontSize="sm" color="gray.800">
              開始時間
            </Text>
            <Heading size="sm">
              {project.projectDescription?.startTime
                ? new Date(
                    project.projectDescription.startTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "未設定"}
            </Heading>
          </Flex>
          <Flex direction="column" gap="8px" flex="1">
            <Text fontSize="sm" color="gray.800">
              終了時間
            </Text>
            <Heading size="sm">
              {project.projectDescription?.endTime
                ? new Date(
                    project.projectDescription.endTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "未設定"}
            </Heading>
          </Flex>
        </Flex>

        {/* 担当者 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            担当者
          </Text>
          <Heading size="sm">
            {project.projectDescription?.managerName || "未設定"}
          </Heading>
        </Flex>

        {/* 担当者の電話番号 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            担当者の電話番号
          </Text>
          <Heading size="sm">
            {project.projectDescription?.phonenumber || "未設定"}
          </Heading>
        </Flex>

        {/* 備考欄 */}
        <Flex direction="column" gap="8px">
          <Text fontSize="sm" color="gray.800">
            備考欄
          </Text>
          <Heading size="sm">
            {project.projectDescription?.memo || "特になし"}
          </Heading>
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
