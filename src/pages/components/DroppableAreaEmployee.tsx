import { Box, Flex, Heading } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import DraggableCardEmployee from './DraggableCardEmployee';

const DroppableAreaEmployee = ({ id, items }) => {
    const { setNodeRef } = useDroppable({
      id,
    });
  
    return (
      <Box backgroundColor='gray.200' p='20px' position='fixed' top='74px' w='18vw' zIndex='1'>
        <Heading fontSize='lg'>隊員</Heading>
        <Flex ref={setNodeRef} direction='column' gap="12px" mt='24px'>
          {items.map((item) => (
            <DraggableCardEmployee key={item.id} id={item.id} name={item.name} qualifications={item.qualifications} />
          ))}
        </Flex>
      </Box>
    );
};

export default DroppableAreaEmployee;