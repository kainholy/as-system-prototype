import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";

function MemberCreate() {
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
          {/* <Flex flex='1' gap='40px'>
                        <FormControl isRequired>
                            <FormLabel>名字</FormLabel>
                            <Input type='名前' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>名前</FormLabel>
                            <Input type='email' />
                        </FormControl>
                    </Flex> */}

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              隊員番号
            </FormLabel>
            <NumberInput max={9999} min={1000}>
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
            <Input type="text" placeholder="パスワードを設定してください" />
          </FormControl>

          <Flex flex="1" gap="40px">
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                性
              </FormLabel>
              <Input type="name" placeholder="山田" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                名
              </FormLabel>
              <Input type="name" placeholder="太郎" />
            </FormControl>
          </Flex>

          <Flex flex="1" gap="40px">
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                性(ローマ字)
              </FormLabel>
              <Input type="name" placeholder="Yamada" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                名(ローマ字)
              </FormLabel>
              <Input type="name" placeholder="Taro" />
            </FormControl>
          </Flex>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              生年月日
            </FormLabel>
            <Input type="date" />
          </FormControl>

          <FormControl isRequired as="fieldset">
            <FormLabel as="legend" fontSize="sm" color="gray.800">
              性別
            </FormLabel>
            <RadioGroup defaultValue="男">
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
              <Input type="name" placeholder="273-0000" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                住所
              </FormLabel>
              <Input type="name" placeholder="千葉県千葉市千葉区1111-1111" />
            </FormControl>
          </Flex>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              電話番号
            </FormLabel>
            <Input type="tel" placeholder="09000000000" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              メールアドレス
            </FormLabel>
            <Input type="email" placeholder="template@gmail.com" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              雇用開始日
            </FormLabel>
            <Input type="date" />
          </FormControl>

          <Flex flex="1" gap="40px">
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                緊急連絡先
              </FormLabel>
              <Input type="tel" placeholder="09000000000" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                氏名
              </FormLabel>
              <Input type="name" placeholder="父" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.800">
                属柄
              </FormLabel>
              <Input type="name" placeholder="父" />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              資格情報
            </FormLabel>
            <Select placeholder="なし">
              <option>なし</option>
              <option>1級</option>
              <option>2級</option>
              <option>3級</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              NG隊員リスト
            </FormLabel>
            <Select placeholder="なし">
              <option>なし</option>
              <option>山田 太郎</option>
              <option>大倉 聖哉</option>
              <option>山田 花子</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              出禁情報
            </FormLabel>
            <Select placeholder="なし">
              <option>なし</option>
              <option>〇〇会社</option>
              <option>××会社</option>
              <option>△△会社</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              自主出禁
            </FormLabel>
            <Select placeholder="なし">
              <option>なし</option>
              <option>〇〇会社</option>
              <option>××会社</option>
              <option>△△会社</option>
            </Select>
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit">
            追加
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default MemberCreate;
