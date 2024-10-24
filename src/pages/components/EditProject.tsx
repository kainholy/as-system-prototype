// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Input,
//   Heading,
//   IconButton,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,
//   Select,
//   Textarea,
// } from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
// import { useState } from "react";

// type Project = {
//   id: number;
//   projectName: string;
//   company: {
//     companyName: string;
//     phonenumber: string;
//   };
//   projectDescription: {
//     workDate: string;
//     startTime: string;
//     endTime: string;
//     address: string;
//     postcode: string;
//     managerName: string;
//     phonenumber: string;
//     requiredMembers: number;
//     unitPrice: number;
//     workTimeType: string;
//     memo: string;
//     projectQualification: {
//       qualification: {
//         qualificationName: string;
//       };
//       numberOfMembersNeeded: number;
//     }[];
//   };
// };

// interface EditProjectProps {
//   setEditOpen: (isOpen: boolean) => void;
//   project: Project | null;
//   onUpdateProject: (updatedProject: Project) => void;
// }

// export default function EditProject({
//   setEditOpen,
//   project,
//   onUpdateProject,
// }: EditProjectProps) {
//   const [editedProject, setEditedProject] = useState<Project | null>(project);

//   const editCloseFunc = () => {
//     setEditOpen(false); // モーダルを閉じる関数
//   };

//   const handleInputChange = (field: string, value: any) => {
//     if (editedProject) {
//       setEditedProject((prev: Project | null) => ({
//         ...prev!,
//         projectDescription: {
//           ...prev!.projectDescription,
//           [field]: value,
//         },
//       }));
//     }
//   };

//   const handleUpdate = () => {
//     if (editedProject) {
//       onUpdateProject(editedProject); // 更新処理を呼び出す
//       editCloseFunc();
//     }
//   };

//   if (!editedProject) {
//     return null;
//   }

//   return (
//     <Box
//       position="absolute"
//       top="52px"
//       left="0"
//       backgroundColor="blackAlpha.500"
//       w="100%"
//       zIndex="5"
//     >
//       <Flex
//         w="80%"
//         maxW="800px"
//         margin="80px auto"
//         direction="column"
//         gap="24px"
//         backgroundColor="white"
//         p="40px 32px"
//         borderRadius="12px"
//         position="relative"
//       >
//         {/* 閉じるアイコン */}
//         <IconButton
//           aria-label="Close modal"
//           icon={<CloseIcon />}
//           position="absolute"
//           top="24px"
//           right="24px"
//           onClick={editCloseFunc} // 閉じる関数をトリガー
//         />
//         <Heading fontSize="xl" mb="12px">
//           案件情報編集
//         </Heading>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             会社名
//           </FormLabel>
//           <Input
//             type="name"
//             value={editedProject.company?.companyName || ""}
//             onChange={(e) =>
//               setEditedProject((prev) => ({
//                 ...prev!,
//                 company: { ...prev!.company, companyName: e.target.value },
//               }))
//             }
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             電話番号
//           </FormLabel>
//           <Input
//             type="tel"
//             value={editedProject.company?.phonenumber || ""}
//             onChange={(e) =>
//               setEditedProject((prev) => ({
//                 ...prev!,
//                 company: { ...prev!.company, phonenumber: e.target.value },
//               }))
//             }
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             現場郵便番号
//           </FormLabel>
//           <Input
//             type="name"
//             value={editedProject.projectDescription?.postcode || ""}
//             onChange={(e) => handleInputChange("postcode", e.target.value)}
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             現場住所
//           </FormLabel>
//           <Input
//             type="name"
//             value={editedProject.projectDescription?.address || ""}
//             onChange={(e) => handleInputChange("address", e.target.value)}
//           />
//         </FormControl>

//         <Flex flex="1" gap="40px">
//           <FormControl>
//             <FormLabel fontSize="sm" color="gray.800">
//               必要資格
//             </FormLabel>
//             <Select
//               placeholder="資格を選択"
//               value={
//                 editedProject.projectDescription?.projectQualification?.[0]
//                   ?.qualification.qualificationName || ""
//               }
//               onChange={(e) =>
//                 handleInputChange("projectQualification", [
//                   { qualification: { qualificationName: e.target.value } },
//                 ])
//               }
//             >
//               <option>なし</option>
//               <option>1級</option>
//               <option>2級</option>
//               <option>3級</option>
//             </Select>
//           </FormControl>

//           <FormControl>
//             <FormLabel fontSize="sm" color="gray.800">
//               必要資格保持者数
//             </FormLabel>
//             <NumberInput
//               max={200}
//               min={1}
//               value={
//                 editedProject.projectDescription?.projectQualification?.[0]
//                   ?.numberOfMembersNeeded || 1
//               }
//               onChange={(valueString) =>
//                 handleInputChange(
//                   "numberOfMembersNeeded",
//                   parseInt(valueString)
//                 )
//               }
//             >
//               <NumberInputField />
//               <NumberInputStepper>
//                 <NumberIncrementStepper />
//                 <NumberDecrementStepper />
//               </NumberInputStepper>
//             </NumberInput>
//           </FormControl>
//         </Flex>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             必要隊員数
//           </FormLabel>
//           <NumberInput
//             max={200}
//             min={1}
//             value={editedProject.projectDescription?.requiredMembers || 1}
//             onChange={(valueString) =>
//               handleInputChange("requiredMembers", parseInt(valueString))
//             }
//           >
//             <NumberInputField />
//             <NumberInputStepper>
//               <NumberIncrementStepper />
//               <NumberDecrementStepper />
//             </NumberInputStepper>
//           </NumberInput>
//         </FormControl>

//         <FormControl>
//           <FormLabel fontSize="sm" color="gray.800">
//             単価
//           </FormLabel>
//           <Select
//             placeholder="単価を選択"
//             value={editedProject.projectDescription?.workTimeType || ""}
//             onChange={(e) => handleInputChange("workTimeType", e.target.value)}
//           >
//             <option>平日(日勤)</option>
//             <option>平日(夜勤)</option>
//             <option>休日(日勤)</option>
//             <option>休日(夜勤)</option>
//           </Select>
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             金額
//           </FormLabel>
//           <Input
//             type="text"
//             value={editedProject.projectDescription?.unitPrice || ""}
//             onChange={(e) => handleInputChange("unitPrice", e.target.value)}
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             日にち
//           </FormLabel>
//           <Input
//             type="date"
//             value={
//               editedProject.projectDescription?.workDate
//                 ? new Date(editedProject.projectDescription.workDate)
//                     .toISOString()
//                     .split("T")[0]
//                 : ""
//             }
//             onChange={(e) => handleInputChange("workDate", e.target.value)}
//           />
//         </FormControl>

//         <Flex flex="1" gap="40px">
//           <FormControl>
//             <FormLabel fontSize="sm" color="gray.800">
//               開始時間
//             </FormLabel>
//             <Input
//               type="time"
//               value={editedProject.projectDescription?.startTime || ""}
//               onChange={(e) => handleInputChange("startTime", e.target.value)}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel fontSize="sm" color="gray.800">
//               終了時間
//             </FormLabel>
//             <Input
//               type="time"
//               value={editedProject.projectDescription?.endTime || ""}
//               onChange={(e) => handleInputChange("endTime", e.target.value)}
//             />
//           </FormControl>
//         </Flex>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             担当者
//           </FormLabel>
//           <Input
//             type="name"
//             value={editedProject.projectDescription?.managerName || ""}
//             onChange={(e) => handleInputChange("managerName", e.target.value)}
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             担当者の電話番号
//           </FormLabel>
//           <Input
//             type="tel"
//             value={editedProject.projectDescription?.phonenumber || ""}
//             onChange={(e) => handleInputChange("phonenumber", e.target.value)}
//           />
//         </FormControl>

//         <FormControl isRequired>
//           <FormLabel fontSize="sm" color="gray.800">
//             備考欄
//           </FormLabel>
//           <Textarea
//             value={editedProject.projectDescription?.memo || ""}
//             onChange={(e) => handleInputChange("memo", e.target.value)}
//           />
//         </FormControl>

//         <Flex gap="20px" justifyContent="right">
//           <Button
//             mt={4}
//             pl={12}
//             pr={12}
//             colorScheme="blue"
//             onClick={handleUpdate}
//           >
//             更新
//           </Button>
//           <Button
//             mt={4}
//             pl={12}
//             pr={12}
//             colorScheme="red"
//             onClick={editCloseFunc}
//           >
//             キャンセル
//           </Button>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// }
