import AddQualification from "@/pages/components/AddQualification";
import Bread from "@/pages/components/Breadcrumb";
import EditQualification from "@/pages/components/EditQualification";
import Navigation from "@/pages/components/Navigation";
import { Badge, Box, Button, Card, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Qualification() {

    const [editOpen, setEditOpen] = useState(false);
    const editQualification = () => {
        setEditOpen(true);
    }

    const [addOpen, setAddOpen] = useState(false);
    const addQualification = () => {
        setAddOpen(true);
    }
    return (
        <>
            <Navigation />
            <Box w="calc(100% - 220px)" margin="0 0 0 auto" position='relative'>
                { editOpen && <EditQualification setEditOpen={setEditOpen} /> }
                { addOpen && <AddQualification setAddOpen={setAddOpen} /> }
                <Bread second="設定" third="資格情報" />
                <Flex
                    w="60%"
                    maxW="600px"
                    margin="80px auto"
                    direction="column"
                    gap="24px"
                >
                    <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={editQualification}>
                        <Flex gap="16px" align='center' pt='4px'>
                            <Heading fontSize='md' color='blue.300'>⚫︎</Heading>
                            <Heading fontSize='md'>ITパスポート</Heading>
                        </Flex>
                    </Card>
                    <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={editQualification}>
                        <Flex gap="16px" align='center' pt='4px'>
                            <Heading fontSize='md' color='blue.300'>⚫︎</Heading>
                            <Heading fontSize='md'>基本情報</Heading>
                        </Flex>
                    </Card>
                    <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={editQualification}>
                        <Flex gap="16px" align='center' pt='4px'>
                            <Heading fontSize='md' color='blue.300'>⚫︎</Heading>
                            <Heading fontSize='md'>応用情報</Heading>
                        </Flex>
                    </Card>
                    <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={editQualification}>
                        <Flex gap="16px" align='center' pt='4px'>
                            <Heading fontSize='md' color='blue.300'>⚫︎</Heading>
                            <Heading fontSize='md'>2級</Heading>
                        </Flex>
                    </Card>
                    <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'lg' }} transition='.3s' p='17px 18px' onClick={editQualification}>
                        <Flex gap="16px" align='center' pt='4px'>
                            <Heading fontSize='md' color='blue.300'>⚫︎</Heading>
                            <Heading fontSize='md'>3級</Heading>
                        </Flex>
                    </Card>

                    <Button mt={4} colorScheme="blue" onClick={addQualification}>
                        追加する
                    </Button>
                </Flex>
            </Box>
        </>
    )
}