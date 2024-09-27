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
  Textarea,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";
import Bread from "../../components/Breadcrumb";

function MemberCreate() {
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

          {/* <FormControl isRequired>
                        <FormLabel fontSize='sm' color='gray.800'>必要隊員数</FormLabel>
                        <NumberInput max={200} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl> */}

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              会社名
            </FormLabel>
            <Input type="name" placeholder="〇〇会社" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              電話番号
            </FormLabel>
            <Input type="tel" placeholder="09000000000" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              現場郵便番号
            </FormLabel>
            <Input type="name" placeholder="274-0000" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              現場住所
            </FormLabel>
            <Input type="name" placeholder="千葉県習志野市津田沼11-11" />
          </FormControl>

          <Flex flex="1" gap="40px">
            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                必要資格
              </FormLabel>
              <Select placeholder="資格を選択">
                <option>なし</option>
                <option>1級</option>
                <option>2級</option>
                <option>3級</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                必要資格保持者数
              </FormLabel>
              <NumberInput max={200} min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              必要隊員数
            </FormLabel>
            <NumberInput max={200} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" color="gray.800">
              単価
            </FormLabel>
            <Select placeholder="単価を選択">
              <option>平日(日勤)</option>
              <option>平日(夜勤)</option>
              <option>休日(日勤)</option>
              <option>休日(夜勤)</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              金額
            </FormLabel>
            <Input type="text" name="price" placeholder="金額を入力(10000)" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              日にち
            </FormLabel>
            <Input type="date" />
          </FormControl>

          <Flex flex="1" gap="40px">
            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                開始時間
              </FormLabel>
              <Input type="time" />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.800">
                終了時間
              </FormLabel>
              <Input type="time" />
            </FormControl>
          </Flex>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              担当者
            </FormLabel>
            <Input type="name" placeholder="山田 太郎 様" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              担当者の電話番号
            </FormLabel>
            <Input type="tel" placeholder="09000000000" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="sm" color="gray.800">
              備考欄
            </FormLabel>
            <Textarea />
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
