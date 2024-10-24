import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  useDisclosure,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Navigation from "../../../components/Navigation";
import Bread from "../../../components/Breadcrumb";
import { useRouter } from "next/router";
import axios from "axios";

type Company = {
  id: number;
  companyName: string;
};

type Qualification = {
  id: number;
  qualificationName: string;
};

function ProjectEdit() {
  const router = useRouter();
  const { id } = router.query; // URLからidを取得

  // idが "projectId-projectDescriptionId" 形式であるため、分割する
  const [projectId, projectDescriptionId] = id
    ? (id as string).split("-")
    : [null, null];

  const [projectData, setProjectData] = useState<any>({
    projectName: "",
    companyId: "",
    phoneNumber: "",
    postcode: "",
    address: "",
    selectedQualifications: [],
    requiredMembers: 1,
    unitPrice: "",
    workDate: "",
    startTime: "",
    endTime: "",
    managerName: "",
    memo: "",
  });

  const [companies, setCompanies] = useState<Company[]>([]); // 会社データ
  const [qualifications, setQualifications] = useState<Qualification[]>([]); // 資格データ
  const [selectedQualifications, setSelectedQualifications] = useState<
    number[]
  >([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // プロジェクト情報、会社情報、資格情報を取得
  useEffect(() => {
    if (!projectId || !projectDescriptionId) return;

    const fetchProjectData = async () => {
      try {
        const projectResponse = await axios.get(
          `http://localhost:4000/project/${projectId}/description/${projectDescriptionId}`
        );
        const fetchedProject = projectResponse.data;

        // プロジェクト詳細が配列なので、最初の要素を取得
        const projectDescription = fetchedProject.projectDescription[0];

        // フォームに既存のプロジェクト詳細データをセット
        setProjectData({
          projectName: fetchedProject.projectName,
          companyId: fetchedProject.companyId,
          phoneNumber: projectDescription.phonenumber || "",
          postcode: projectDescription.postcode || "",
          address: projectDescription.address || "",
          requiredMembers: projectDescription.requiredMembers || 1,
          unitPrice: projectDescription.unitPrice || "",
          workDate: projectDescription.workDate || "",
          startTime: projectDescription.startTime || "",
          endTime: projectDescription.endTime || "",
          managerName: projectDescription.managerName || "",
          memo: projectDescription.memo || "",
        });

        // 資格情報を設定
        const selectedQuals = projectDescription.projectQualification.map(
          (qual) => qual.qualification.id
        );
        setSelectedQualifications(selectedQuals);
      } catch (error) {
        console.error("プロジェクト詳細の取得中にエラーが発生しました:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/companies");
        setCompanies(response.data); // 会社データをセット
      } catch (error) {
        console.error("会社情報の取得中にエラーが発生しました:", error);
      }
    };

    const fetchQualifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/qualifications"
        );
        setQualifications(response.data); // 資格データをセット
      } catch (error) {
        console.error("資格情報の取得中にエラーが発生しました:", error);
      }
    };

    fetchProjectData();
    fetchCompanies();
    fetchQualifications();
  }, [projectId, projectDescriptionId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/projects/${projectId}/description/${projectDescriptionId}`,
        projectData
      );
      if (response.status === 200) {
        alert("プロジェクト詳細が正常に更新されました。");
        router.push("/admin/project"); // 更新後にプロジェクト一覧へリダイレクト
      } else {
        alert(`エラー: ${response.data.message}`);
      }
    } catch (error) {
      console.error("更新中にエラーが発生しました:", error);
      alert("更新中にエラーが発生しました。");
    }
  };

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="案件情報" third="案件詳細編集" />
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          {/* プロジェクト名 */}
          <FormControl isRequired>
            <FormLabel>プロジェクト名</FormLabel>
            <Input
              value={projectData.projectName}
              onChange={(e) =>
                setProjectData({ ...projectData, projectName: e.target.value })
              }
            />
          </FormControl>

          {/* 会社名 */}
          <FormControl isRequired>
            <FormLabel>会社名</FormLabel>
            <Select
              value={projectData.companyId}
              onChange={(e) =>
                setProjectData({ ...projectData, companyId: e.target.value })
              }
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.companyName}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* その他のフィールド */}
          {/* 電話番号、郵便番号、住所、必要隊員数、単価、日付、時間など */}
          <FormControl>
            <FormLabel>電話番号</FormLabel>
            <Input
              value={projectData.phoneNumber}
              onChange={(e) =>
                setProjectData({ ...projectData, phoneNumber: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>郵便番号</FormLabel>
            <Input
              value={projectData.postcode}
              onChange={(e) =>
                setProjectData({ ...projectData, postcode: e.target.value })
              }
            />
          </FormControl>

          {/* 更新ボタン */}
          <Button colorScheme="blue" onClick={handleUpdate}>
            更新
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default ProjectEdit;
