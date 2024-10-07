import React, { useState } from "react";
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
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";

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
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phoneNumber: "",
    relationship: "",
  });

  // フォームの送信ハンドラー
  const handleSubmit = async () => {
    const fullName = `${surname} ${givenName}`;
    const fullNameRoman = `${romanSurname} ${romanGivenName}`;

    try {
      // バックエンドへのPOSTリクエスト
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
          emergencyContacts: [emergencyContact],
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("ユーザーが正常に登録されました");
      } else {
        alert(`エラー: ${result.message}`);
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

          <Flex flex="1" gap="40px">
            <FormControl isRequired>
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

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                氏名
              </FormLabel>
              <Input
                type="text"
                placeholder="父"
                value={emergencyContact.name}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    name: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl isRequired>
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

          <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
            追加
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default MemberCreate;
