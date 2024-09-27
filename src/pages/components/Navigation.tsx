import {
  Flex,
  Link,
  AccordionButton,
  Accordion,
  AccordionItem,
  Heading,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
// import Link from 'next/link';
import Image from "next/image";

export default function Navigation() {
  return (
    <>
      <Box w="220px" h="100vh" position="fixed">
        <Box p="20px 16px" backgroundColor="gray.50" h="100%">
          <Box p="0">
            <Link href="/admin/">
              <Image src="/logo.png" alt="logo" width={54} height={59} />
            </Link>
          </Box>
          <Box p={0}>
            <Flex
              justify="center"
              align="left"
              direction="column"
              mt="80px"
              gap="26px"
            >
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton p={0}>
                      <Flex
                        as="span"
                        flex="1"
                        _hover={{ bg: "gray.200" }}
                        p="12px"
                        borderRadius="4px"
                      >
                        <Flex gap="10px" w="100%">
                          <CalendarIcon width="18.41px" height="19px" />
                          <Heading size="sm">シフト</Heading>
                        </Flex>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel mt="8px" p={0}>
                    <Flex gap="8px" direction="column">
                      <Link
                        href="/admin/shift"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">シフト一覧</Heading>
                      </Link>
                      <Link
                        href="/admin/shift/create"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">シフト作成</Heading>
                      </Link>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion allowToggle>
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton p={0}>
                      <Flex
                        as="span"
                        flex="1"
                        _hover={{ bg: "gray.200" }}
                        p="12px"
                        borderRadius="4px"
                      >
                        <Flex gap="10px" w="100%">
                          <UsersIcon width="18.41px" height="19px" />
                          <Heading size="sm">隊員情報</Heading>
                        </Flex>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel mt="8px" p={0}>
                    <Flex gap="8px" direction="column">
                      <Link
                        href="/admin/member"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">隊員一覧</Heading>
                      </Link>
                      <Link
                        href="/admin/member/create"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">隊員登録</Heading>
                      </Link>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion allowToggle>
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton p={0}>
                      <Flex
                        as="span"
                        flex="1"
                        _hover={{ bg: "gray.200" }}
                        p="12px"
                        borderRadius="4px"
                      >
                        <Flex gap="10px" w="100%">
                          <Package2Icon width="18.41px" height="19px" />
                          <Heading size="sm">案件情報</Heading>
                        </Flex>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel mt="8px" p={0}>
                    <Flex gap="8px" direction="column">
                      <Link
                        href="/admin/project"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">案件一覧</Heading>
                      </Link>
                      <Link
                        href="/admin/project/create"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">案件追加</Heading>
                      </Link>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion allowToggle>
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton p={0}>
                      <Flex
                        as="span"
                        flex="1"
                        _hover={{ bg: "gray.200" }}
                        p="12px"
                        borderRadius="4px"
                      >
                        <Flex gap="10px" w="100%">
                          <CompanyIcon width="18.41px" height="19px" />
                          <Heading size="sm">会社情報</Heading>
                        </Flex>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel mt="8px" p={0}>
                    <Flex gap="8px" direction="column">
                      <Link
                        href="/admin/company/"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">会社一覧</Heading>
                      </Link>
                      <Link
                        href="/admin/company/create"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">会社追加</Heading>
                      </Link>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion allowToggle>
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton p={0}>
                      <Flex
                        as="span"
                        flex="1"
                        _hover={{ bg: "gray.200" }}
                        p="12px"
                        borderRadius="4px"
                      >
                        <Flex gap="10px" w="100%">
                          <ClockIcon width="18.41px" height="19px" />
                          <Heading size="sm">勤怠情報</Heading>
                        </Flex>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel mt="8px" p={0}>
                    <Flex gap="8px" direction="column">
                      <Link
                        href="/admin/attendance/day"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">日次一覧</Heading>
                      </Link>
                      <Link
                        href="/admin/attendance/week"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">週次一覧</Heading>
                      </Link>
                      <Link
                        href="/admin/attendance/month"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">月次一覧</Heading>
                      </Link>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion allowToggle>
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton p={0}>
                      <Flex
                        as="span"
                        flex="1"
                        _hover={{ bg: "gray.200" }}
                        p="12px"
                        borderRadius="4px"
                      >
                        <Flex gap="10px" w="100%">
                          <SettingsIcon width="18.41px" height="19px" />
                          <Heading size="sm">設定</Heading>
                        </Flex>
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel mt="8px" p={0}>
                    <Flex gap="8px" direction="column">
                      <Link
                        href="/admin/settings/qualification"
                        _hover={{ bg: "gray.200" }}
                        p="8px 6px 8px 40px"
                        borderRadius="4px"
                      >
                        <Heading size="xs">資格情報</Heading>
                      </Link>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2h-1.2a2 2 0 0 1-2-2v-.11a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2v-1.2a2 2 0 0 1 2-2h.11a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2h1.2a2 2 0 0 1 2 2v.11a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2v1.2a2 2 0 0 1-2 2h-.11a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function CompanyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ビルの外枠 */}
      <rect x="3" y="2" width="18" height="30" rx="2" ry="2" />

      {/* ビルの窓 左列 */}
      <rect x="6.5" y="6" width="11" height="4" />
      <rect x="6.5" y="13" width="11" height="4" />

    </svg>
  );
}