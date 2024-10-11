import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios";
import Company from "../company";

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
  const [selectedQualificationId, setSelectedQualificationId] = useState("");
  const [qualifiedMembersNeeded, setQualifiedMembersNeeded] = useState(1);
  const [requiredMembers, setRequiredMembers] = useState(1);
  const [unitPriceType, setUnitPriceType] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [managerName, setManagerName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [memo, setMemo] = useState("");

  // 会社名と資格のリストをバックエンドから取得
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

    fetchCompanies();
    fetchQualifications();
  }, []);

  // フォームの送信ハンドラー
  const handleSubmit = async () => {
    try {
      const projectData = {
        projectName,
        companyId,
        phoneNumber,
        postcode,
        address,
        selectedQualificationId,
        qualifiedMembersNeeded,
        requiredMembers,
        unitPriceType,
        unitPrice,
        workDate,
        startTime,
        endTime,
        managerName,
        phonenumber: phonenumber,
        memo,
      };

      const response = await axios.post(
        "http://localhost:4000/registerProject",
        projectData
      );

      if (response.status === 201) {
        alert("プロジェクトが正常に登録されました");
      } else {
        alert(`エラー: ${response.data.message}`);
      }
    } catch (error) {
      console.error("登録中にエラーが発生しました:", error);
      alert("登録中にエラーが発生しました");
    }
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
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              プロジェクト名
            </FormLabel>
            <Input
              type="text"
              placeholder="プロジェクト名を入力"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </FormControl>
          {/* 会社名の選択 */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              会社名
            </FormLabel>
            <Select
              placeholder="会社を選択"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
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
            <FormLabel fontSize="sm" color="gray.800">
              電話番号
            </FormLabel>
            <Input
              type="tel"
              placeholder="09000000000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>

          {/* 現場郵便番号 */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              現場郵便番号
            </FormLabel>
            <Input
              type="text"
              placeholder="274-0000"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </FormControl>

          {/* 現場住所 */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              現場住所
            </FormLabel>
            <Input
              type="text"
              placeholder="千葉県習志野市津田沼11-11"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          {/* 必要資格と保持者数 */}
          <Flex flex="1" gap="40px">
            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                必要資格
              </FormLabel>
              <Select
                placeholder="資格を選択"
                value={selectedQualificationId}
                onChange={(e) => setSelectedQualificationId(e.target.value)}
              >
                {qualifications.map((qualification) => (
                  <option key={qualification.id} value={qualification.id}>
                    {qualification.qualificationName}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                必要資格保持者数
              </FormLabel>
              <NumberInput
                max={200}
                min={1}
                value={qualifiedMembersNeeded}
                onChange={(valueString) =>
                  setQualifiedMembersNeeded(parseInt(valueString))
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>

          {/* 必要隊員数 */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              必要隊員数
            </FormLabel>
            <NumberInput
              max={200}
              min={1}
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
            <FormLabel fontSize="sm" color="gray.800">
              単価
            </FormLabel>
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
            <FormLabel fontSize="sm" color="gray.800">
              金額
            </FormLabel>
            <Input
              type="number"
              placeholder="金額を入力(10000)"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </FormControl>

          {/* 日にち */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              日にち
            </FormLabel>
            <Input
              type="date"
              value={workDate}
              onChange={(e) => setWorkDate(e.target.value)}
            />
          </FormControl>

          {/* 開始時間と終了時間 */}
          <Flex flex="1" gap="40px">
            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                開始時間
              </FormLabel>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                終了時間
              </FormLabel>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
          </Flex>

          {/* 担当者 */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              担当者
            </FormLabel>
            <Input
              type="text"
              placeholder="山田 太郎 様"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
            />
          </FormControl>

          {/* 担当者の電話番号 */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              担当者の電話番号
            </FormLabel>
            <Input
              type="tel"
              placeholder="09000000000"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </FormControl>

          {/* 備考欄 */}
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              備考欄
            </FormLabel>
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
