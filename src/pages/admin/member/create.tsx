import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  HStack,
  Select,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";
import axios from "axios"; // Import axios

type Qualification = {
  id: number;
  qualificationName: string;
};

type Member = {
  id: number;
  staffId: string;
  name: string;
};

function MemberCreate() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [romanSurname, setRomanSurname] = useState("");
  const [romanGivenName, setRomanGivenName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("男");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [role, setRole] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phoneNumber: "",
    relationship: "",
  });
  const [selectedQualifications, setSelectedQualifications] = useState<number[]>([]);
  const [selectedNgStaffs, setSelectedNgStaffs] = useState<number[]>([]);

  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  

  // 資格情報をget
  useEffect(() => {
    const fetchQualification = async () => {
      try {
        const response = await axios.get("http://localhost:4000/qualifications");
        setQualifications(response.data);
      } catch (error) {
        console.error("資格情報の取得中にエラーが発生しました:", error);
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/members");
        setMembers(response.data);
      } catch (error) {
        console.error("メンバー情報の取得中にエラーが発生しました:", error);
      }
    }

    fetchQualification();
    fetchMembers();
  }, []);

  // フォームの送信ハンドラー
  const handleSubmit = async () => {
    const fullName = `${surname} ${givenName}`;
    const fullNameRoman = `${romanSurname} ${romanGivenName}`;

    try {
      // axiosを使用してバックエンドへのPOSTリクエスト
      const response = await axios.post("http://localhost:4000/register", {
        staffId,
        password,
        fullName,
        fullNameRoman,
        address,
        postcode,
        phoneNumber,
        email,
        birthday,
        hireDate,
        role,
        emergencyContacts: [emergencyContact],
        ngStaff: selectedNgStaffs,
        staffQualifications: selectedQualifications,
      });

      if (response.status === 201) {
        alert("ユーザーが正常に登録されました");
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
        <Bread second="隊員情報" third="隊員追加" />
        <Flex
          w="60%"
          maxW="600px"
          margin="80px auto"
          direction="column"
          gap="24px"
        >
          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              隊員番号
            </FormLabel>
            <NumberInput
              max={9999}
              min={1000}
              value={staffId}
              onChange={(valueString) => setStaffId(valueString)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              パスワード
            </FormLabel>
            <Input
              type="password"
              placeholder="パスワードを設定してください"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Flex flex="1" gap="40px">
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                性
              </FormLabel>
              <Input
                type="text"
                placeholder="山田"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                名
              </FormLabel>
              <Input
                type="text"
                placeholder="太郎"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
              />
            </FormControl>
          </Flex>

          <Flex flex="1" gap="40px">
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                性(ローマ字)
              </FormLabel>
              <Input
                type="text"
                placeholder="Yamada"
                value={romanSurname}
                onChange={(e) => setRomanSurname(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                名(ローマ字)
              </FormLabel>
              <Input
                type="text"
                placeholder="Taro"
                value={romanGivenName}
                onChange={(e) => setRomanGivenName(e.target.value)}
              />
            </FormControl>
          </Flex>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              生年月日
            </FormLabel>
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired as="fieldset">
            <FormLabel as="legend" fontSize="sm" color="gray.800">
              性別
            </FormLabel>
            <RadioGroup value={gender} onChange={(value) => setGender(value)}>
              <HStack spacing="24px">
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
                <Radio value="その他">その他</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Flex flex="1" gap="40px">
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                郵便番号
              </FormLabel>
              <Input
                type="text"
                placeholder="273-0000"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                住所
              </FormLabel>
              <Input
                type="text"
                placeholder="千葉県千葉市千葉区1111-1111"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </Flex>

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

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              メールアドレス
            </FormLabel>
            <Input
              type="email"
              placeholder="template@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              雇用開始日
            </FormLabel>
            <Input
              type="date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              雇用形態
            </FormLabel>
            <RadioGroup value={role} onChange={(value) => setRole(value)}>
              <HStack spacing="24px">
                <Radio value="正社員">正社員</Radio>
                <Radio value="アルバイト">アルバイト</Radio>
                <Radio value="その他">その他</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Flex flex="1" gap="40px">
            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                緊急連絡先
              </FormLabel>
              <Input
                type="tel"
                placeholder="09000000000"
                value={emergencyContact.phoneNumber}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                氏名
              </FormLabel>
              <Input
                type="text"
                placeholder="山田一郎"
                value={emergencyContact.name}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    name: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                属柄
              </FormLabel>
              <Input
                type="text"
                placeholder="父"
                value={emergencyContact.relationship}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    relationship: e.target.value,
                  })
                }
              />
            </FormControl>
          </Flex>

         {/* 資格 */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              資格
            </FormLabel>
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
                      onClick={() => {
                        const value = qual.id;
                        if (isSelected) {
                          setSelectedQualifications(
                            selectedQualifications.filter((id) => id !== value)
                          );
                        } else {
                          setSelectedQualifications([...selectedQualifications, value]);
                        }
                      }}
                    >
                      {qual.qualificationName}
                    </Box>
                  </WrapItem>
                );
              })}
            </Wrap>
          </FormControl>

          {/* NG隊員 */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              NG隊員
            </FormLabel>
            <Wrap spacing="12px">
              {members.map((member) => {
                const isSelected = selectedNgStaffs.includes(member.id);
                return (
                  <WrapItem key={member.id}>
                    <Box
                      as="button"
                      px="4"
                      py="2"
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={isSelected ? "blue.500" : "gray.300"}
                      bg={isSelected ? "blue.500" : "white"}
                      color={isSelected ? "white" : "gray.800"}
                      onClick={() => {
                        const value = member.id;
                        if (isSelected) {
                          setSelectedNgStaffs(
                            selectedNgStaffs.filter((id) => id !== value)
                          );
                        } else {
                          setSelectedNgStaffs([...selectedNgStaffs, value]);
                        }
                      }}
                    >
                      {member.name}
                    </Box>
                  </WrapItem>
                );
              })}
            </Wrap>
          </FormControl>
          




          <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
            追加
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default MemberCreate;
