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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Wrap,
  WrapItem,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios";

type Company = {
  id: number;
  companyName: string;
};

type Qualification = {
  id: number;
  qualificationName: string;
};

function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [selectedQualifications, setSelectedQualifications] = useState<
    number[]
  >([]);
  const [qualifiedMembersNeeded, setQualifiedMembersNeeded] = useState<
    number[]
  >([]);
  const [requiredMembers, setRequiredMembers] = useState(1);
  const [unitPriceType, setUnitPriceType] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [managerName, setManagerName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [memo, setMemo] = useState("");

  const [projectType, setProjectType] = useState("new"); // 新規か既存かの選択
  const [existingProjectId, setExistingProjectId] = useState(""); // 既存プロジェクトのIDを保存
  const [existingProjects, setExistingProjects] = useState([]); // 既存プロジェクトのリスト

  const { isOpen, onOpen, onClose } = useDisclosure();

  // 会社と資格情報を取得
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("会社情報の取得中にエラーが発生しました:", error);
      }
    };

    const fetchQualifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/qualifications"
        );
        setQualifications(response.data);
      } catch (error) {
        console.error("資格情報の取得中にエラーが発生しました:", error);
      }
    };
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/reprojects");
        setExistingProjects(response.data);
      } catch (error) {
        console.error("既存プロジェクトの取得中にエラーが発生しました:", error);
      }
    };

    fetchCompanies();
    fetchQualifications();
    fetchProjects(); // 既存プロジェクトを取得
  }, []);

  // フォーム送信
  const handleSubmit = async () => {
    const projectData = {
      projectType,
      ...(projectType === "new" && {
        projectName,
        companyId,
      }),
      ...(projectType === "existing" && {
        existingProjectId, // 既存プロジェクトIDを追加
      }),
      phoneNumber,
      postcode,
      address,
      selectedQualifications,
      qualifiedMembersNeeded,
      requiredMembers,
      unitPriceType,
      unitPrice,
      workDate,
      startTime,
      endTime,
      managerName,
      phonenumber,
      memo,
    };

    if (projectType === "existing" && !existingProjectId) {
      alert("既存プロジェクトを選択してください。");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/registerProject",
        projectData
      );
      if (response.status === 201) {
        alert("プロジェクトが正常に登録されました。");
      } else {
        alert(`エラー: ${response.data.message}`);
      }
    } catch (error) {
      console.error("登録中にエラーが発生しました:", error);
      alert("登録中にエラーが発生しました。");
    }
  };

  // 資格の選択処理
  const toggleQualification = (id: number) => {
    setSelectedQualifications((prev) =>
      prev.includes(id) ? prev.filter((qualId) => qualId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Navigation />
      <Box w="calc(100% - 220px)" margin="0 0 0 auto">
        <Bread second="案件情報" third="案件追加" />
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          <FormControl as="fieldset" isRequired>
            <FormLabel as="legend">プロジェクト作成方法</FormLabel>
            <RadioGroup onChange={setProjectType} value={projectType}>
              <HStack spacing="24px">
                <Radio value="new">新規プロジェクトを作成する</Radio>
                <Radio value="existing">既存プロジェクトを使用する</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          {projectType === "new" && (
            <>
              <FormControl isRequired>
                <FormLabel>プロジェクト名</FormLabel>
                <Input
                  value={projectName}
                  placeholder="〇〇警備"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>会社名</FormLabel>
                <Select
                  value={companyId}
                  placeholder="会社を選択してください"
                  onChange={(e) => setCompanyId(e.target.value)}
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.companyName}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {projectType === "existing" && (
            <FormControl isRequired>
              <FormLabel>既存プロジェクトを選択</FormLabel>
              <Select
                value={existingProjectId}
                placeholder="プロジェクトを選択してください"
                onChange={(e) => setExistingProjectId(e.target.value)}
              >
                {existingProjects.map(
                  (project: { id: number; projectName: string }) => (
                    <option key={project.id} value={project.id}>
                      {project.projectName}
                    </option>
                  )
                )}
              </Select>
            </FormControl>
          )}

          {/* 電話番号 */}
          <FormControl isRequired>
            <FormLabel>電話番号</FormLabel>
            <Input
              type="tel"
              placeholder="09000000000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>

          {/* 郵便番号 */}
          <FormControl isRequired>
            <FormLabel>現場郵便番号</FormLabel>
            <Input
              type="text"
              placeholder="274-0000"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </FormControl>

          {/* 現場住所 */}
          <FormControl isRequired>
            <FormLabel>現場住所</FormLabel>
            <Input
              type="text"
              placeholder="千葉県習志野市津田沼11-11"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          {/* 資格選択 */}
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

          {/* 保有者数 */}
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
              value={requiredMembers}
              onChange={(valueString) =>
                setRequiredMembers(parseInt(valueString))
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
              placeholder="単価を選択"
              value={unitPriceType}
              onChange={(e) => setUnitPriceType(e.target.value)}
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
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </FormControl>

          {/* 日にち */}
          <FormControl isRequired>
            <FormLabel>日にち</FormLabel>
            <Input
              type="date"
              value={workDate}
              onChange={(e) => setWorkDate(e.target.value)}
            />
          </FormControl>

          {/* 開始時間と終了時間 */}
          <Flex flex="1" gap="40px">
            <FormControl>
              <FormLabel>開始時間</FormLabel>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>終了時間</FormLabel>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
          </Flex>

          {/* 担当者 */}
          <FormControl isRequired>
            <FormLabel>担当者</FormLabel>
            <Input
              type="text"
              placeholder="山田 太郎 様"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
            />
          </FormControl>

          {/* 担当者電話番号 */}
          <FormControl isRequired>
            <FormLabel>担当者電話番号</FormLabel>
            <Input
              type="tel"
              placeholder="09000000000"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </FormControl>

          {/* 備考欄 */}
          <FormControl isRequired>
            <FormLabel>備考欄</FormLabel>
            <Textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
          </FormControl>

          {/* 送信ボタン */}
          <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
            追加
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default ProjectCreate;
