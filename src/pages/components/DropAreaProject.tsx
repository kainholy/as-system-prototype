import { useDroppable } from "@dnd-kit/core";
import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import DraggableCardProject from "./DraggableCardProject";

const DroppableAreaProject = ({ id, items, project, isActive }) => {
    const { setNodeRef } = useDroppable({
      id,
    });
  
    return (
      <Box _hover={{ opacity: '1', cursor: 'pointer' }} position='relative' zIndex='1' opacity={isActive ? '1' : '.5'} transition='.1s' backgroundColor='gray.200' p='20px'>
        <Flex gap='8px' align='flex-end'>
          <Heading fontSize='md'>{project.company.companyName}</Heading>
          <Heading fontSize='md'>/</Heading>
          <Heading fontSize='md'>{project.projectName}</Heading>
        </Flex>
        <Flex gap='8px' align='flex-end'>
          <Text fontSize='sm'>{project.projectDescription.managerName}</Text>
          <Text fontSize='sm'>{project.projectDescription.phonenumber}</Text>
        </Flex>
        <Flex mt='8px' gap='20px' align='center'>
          <Text fontSize='sm'>🕰️</Text>
          <Flex gap='8px' align='center'>
            <Text fontSize='sm'>{project.projectDescription.startTime} ~ {project.projectDescription.endTime}</Text>
            （
            <Badge variant='outline' colorScheme='orange' p='0 5px'>
              <Text p='1px 7px'>日勤(平日)</Text>
            </Badge>
            ）
          </Flex>
        </Flex>
        <Flex gap='20px' align='center'>
          <Text fontSize='sm'>👮‍♀️</Text>
          <Flex gap='8px' align='center'>
            <Text fontSize='sm'>{project.projectDescription.requiredMembers}</Text>
            （
            <Flex gap='4px' align='center'>
              {project.projectDescription.projectQualification.map((qualification) => (
                <Badge key={qualification.numberOfMembersNeeded} variant='outline' colorScheme='blue' p='0 5px'>
                  <Text p='1px 7px'>{qualification.qualification.qualificationName} {qualification.numberOfMembersNeeded}</Text>
                </Badge>
              ))}
            </Flex>
            ）
          </Flex>
        </Flex>
        <Flex ref={setNodeRef} gap="12px" mt='24px' wrap='wrap'>
          {items.map((item) => (
            <DraggableCardProject key={item.id} id={item.id} name={item.name} qualifications={item.qualifications} />
          ))}
        </Flex>
      </Box>
    );
};

export default DroppableAreaProject;