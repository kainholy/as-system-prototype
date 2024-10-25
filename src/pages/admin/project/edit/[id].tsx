import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Wrap,
  WrapItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Navigation from "../../../components/Navigation";
import Bread from "../../../components/Breadcrumb";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";

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
    qualifiedMembersNeeded: [],
    requiredMembers: 1,
    unitPrice: "",
    unitPriceType: "",
    workDate: "",
    startTime: "",
    endTime: "",
    managerName: "",
    phonenumber: "",
    memo: "",
  });

  const [companies, setCompanies] = useState<Company[]>([]); // 会社データ
  const [qualifications, setQualifications] = useState<Qualification[]>([]); // 資格データ
  const [selectedQualifications, setSelectedQualifications] = useState<
    number[]
  >([]);
  const [qualifiedMembersNeeded, setQualifiedMembersNeeded] = useState<
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

        // JSTに変換
        const formattedWorkDate = new Date(
          new Date(fetchedProject.projectDescription[0].workDate).getTime() +
            9 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0]; // YYYY-MM-DD 形式

        const formattedStartTime = fetchedProject.projectDescription[0]
          .startTime
          ? new Date(
              new Date(
                fetchedProject.projectDescription[0].startTime
              ).getTime() +
                9 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[1]
              .slice(0, 5)
          : "";

        const formattedEndTime = fetchedProject.projectDescription[0].endTime
          ? new Date(
              new Date(fetchedProject.projectDescription[0].endTime).getTime() +
                9 * 60 * 60 * 1000
            )
              .toISOString()
              .split("T")[1]
              .slice(0, 5)
          : "";

        // フォームに既存のプロジェクト詳細データをセット
        setProjectData({
          projectName: fetchedProject.projectName,
          companyId: fetchedProject.companyId,
          phoneNumber: fetchedProject.projectDescription[0].phonenumber || "",
          postcode: fetchedProject.projectDescription[0].postcode || "",
          address: fetchedProject.projectDescription[0].address || "",
          requiredMembers:
            fetchedProject.projectDescription[0].requiredMembers || 1,
          unitPrice: fetchedProject.projectDescription[0].unitPrice || "",
          unitPriceType:
            fetchedProject.projectDescription[0].workTimeType || "",
          workDate: formattedWorkDate || "",
          startTime: formattedStartTime || "",
          endTime: formattedEndTime || "",
          managerName: fetchedProject.projectDescription[0].managerName || "",
          memo: fetchedProject.projectDescription[0].memo || "",
        });

        const selectedQuals =
          fetchedProject.projectDescription[0].projectQualification.map(
            (qual: any) => qual.qualification.id
          );
        const neededMembers =
          fetchedProject.projectDescription[0].projectQualification.map(
            (qual: any) => qual.numberOfMembersNeeded
          );

        setSelectedQualifications(selectedQuals);
        setQualifiedMembersNeeded(neededMembers);
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
        {
          ...projectData,
          selectedQualifications,
          qualifiedMembersNeeded,
        }
      );
      if (response.status === 200) {
        alert("プロジェクト詳細が正常に更新されました。");
        router.push("/admin/project");
      } else {
        alert(`エラー: ${response.data.message}`);
      }
    } catch (error) {
      console.error("更新中にエラーが発生しました:", error);
      alert("更新中にエラーが発生しました。");
    }
  };

  const toggleQualification = (id: number) => {
    setSelectedQualifications((prev) =>
      prev.includes(id) ? prev.filter((qualId) => qualId !== id) : [...prev, id]
    );
  };

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null); // 変更点

  // 削除ボタン押下時の削除処理
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/project/${projectId}/description/${projectDescriptionId}`
      );
      if (response.status === 200) {
        alert("プロジェクト詳細が削除されました。");
        router.push("/admin/project");
      } else {
        alert(`エラー: ${response.data.message}`);
      }
    } catch (error) {
      console.error("削除中にエラーが発生しました:", error);
      alert("削除中にエラーが発生しました。");
    }
  };

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

          {/* 電話番号 */}
          <FormControl isRequired>
            <FormLabel>電話番号</FormLabel>
            <Input
              value={projectData.phoneNumber}
              onChange={(e) =>
                setProjectData({ ...projectData, phoneNumber: e.target.value })
              }
            />
          </FormControl>

          {/* 郵便番号 */}
          <FormControl isRequired>
            <FormLabel>郵便番号</FormLabel>
            <Input
              value={projectData.postcode}
              onChange={(e) =>
                setProjectData({ ...projectData, postcode: e.target.value })
              }
            />
          </FormControl>

          {/* 現場住所 */}
          <FormControl isRequired>
            <FormLabel>現場住所</FormLabel>
            <Input
              value={projectData.address}
              onChange={(e) =>
                setProjectData({ ...projectData, address: e.target.value })
              }
            />
          </FormControl>

          {/* 必要資格の選択 */}
          <Button onClick={onOpen}>資格を追加</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>資格を選択</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap spacing="12px">
                  {qualifications.map((qual) => {
                    const isSelected = selectedQualifications.includes(qual.id);
                    return (
                      <WrapItem key={qual.id}>
                        <Box
                          as="button"
                          px="4"
                          py="2"
                          borderWidth="1px"
                          borderRadius="md"
                          borderColor={isSelected ? "blue.500" : "gray.300"}
                          bg={isSelected ? "blue.500" : "white"}
                          color={isSelected ? "white" : "gray.800"}
                          onClick={() => toggleQualification(qual.id)}
                        >
                          {qual.qualificationName}
                        </Box>
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onClose}>
                  追加
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* 必要保有者数 */}
          {selectedQualifications.map((qualId, index) => (
            <FormControl key={qualId}>
              <FormLabel>
                {qualifications.find((q) => q.id === qualId)?.qualificationName}{" "}
                必要保有者数
              </FormLabel>
              <NumberInput
                max={200}
                min={0}
                value={qualifiedMembersNeeded[index] || 0}
                onChange={(valueString) => {
                  const newNeeded = [...qualifiedMembersNeeded];
                  newNeeded[index] = parseInt(valueString) || 0;
                  setQualifiedMembersNeeded(newNeeded);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          ))}

          {/* 必要隊員数 */}
          <FormControl isRequired>
            <FormLabel>必要隊員数</FormLabel>
            <NumberInput
              value={projectData.requiredMembers}
              onChange={(valueString) =>
                setProjectData({
                  ...projectData,
                  requiredMembers: parseInt(valueString),
                })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          {/* 単価 */}
          <FormControl>
            <FormLabel>単価</FormLabel>
            <Select
              value={projectData.unitPriceType}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  unitPriceType: e.target.value,
                })
              }
            >
              <option value="平日(日勤)">平日(日勤)</option>
              <option value="平日(夜勤)">平日(夜勤)</option>
              <option value="休日(日勤)">休日(日勤)</option>
              <option value="休日(夜勤)">休日(夜勤)</option>
            </Select>
          </FormControl>

          {/* 金額 */}
          <FormControl isRequired>
            <FormLabel>金額</FormLabel>
            <Input
              type="number"
              value={projectData.unitPrice}
              onChange={(e) =>
                setProjectData({ ...projectData, unitPrice: e.target.value })
              }
            />
          </FormControl>

          {/* 日にち */}
          <FormControl isRequired>
            <FormLabel>日にち</FormLabel>
            <Input
              type="date"
              value={projectData.workDate}
              onChange={(e) =>
                setProjectData({ ...projectData, workDate: e.target.value })
              }
            />
          </FormControl>

          {/* 開始時間と終了時間 */}
          <Flex flex="1" gap="40px">
            <FormControl>
              <FormLabel>開始時間</FormLabel>
              <Input
                type="time"
                value={projectData.startTime}
                onChange={(e) =>
                  setProjectData({ ...projectData, startTime: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>終了時間</FormLabel>
              <Input
                type="time"
                value={projectData.endTime}
                onChange={(e) =>
                  setProjectData({ ...projectData, endTime: e.target.value })
                }
              />
            </FormControl>
          </Flex>

          {/* 担当者 */}
          <FormControl isRequired>
            <FormLabel>担当者</FormLabel>
            <Input
              value={projectData.managerName}
              onChange={(e) =>
                setProjectData({ ...projectData, managerName: e.target.value })
              }
            />
          </FormControl>

          {/* 備考欄 */}
          <FormControl>
            <FormLabel>備考</FormLabel>
            <Textarea
              value={projectData.memo}
              onChange={(e) =>
                setProjectData({ ...projectData, memo: e.target.value })
              }
            />
          </FormControl>

          {/* 更新ボタン */}
          <Button colorScheme="blue" onClick={handleUpdate}>
            更新
          </Button>

          {/* 削除ボタン */}
          <Button colorScheme="red" onClick={onDeleteOpen}>
            削除
          </Button>

          {/* 削除確認モーダル */}
          <AlertDialog
            isOpen={isDeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  プロジェクト詳細の削除
                </AlertDialogHeader>

                <AlertDialogBody>
                  プロジェクト詳細を削除しますか？この操作は元に戻せません。
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onDeleteClose}>
                    キャンセル
                  </Button>
                  <Button colorScheme="red" onClick={handleDelete} ml={3}>
                    削除
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
      </Box>
    </>
  );
}

export default ProjectEdit;
