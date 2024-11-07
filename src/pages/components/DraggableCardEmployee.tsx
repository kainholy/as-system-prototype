import { Badge, Card, Flex, Heading, Text } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

const DraggableCardEmployee = ({ id, name, qualifications }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
    });
  
    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      cursor: 'grab',
    };
  
    return (
      <Card _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'md' }} p='8px 10px' ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <Flex gap='8px' align='left'>
          {qualifications.map((qualification) => (
            qualification !== 'なし' && (
              <Badge key={qualification.id} variant='outline' colorScheme='blue' p='2px 5px' w='fit-content'>
                <Text fontSize='9px'>{qualification.qualificationName}</Text>
              </Badge>
            )
          ))}
          <Heading fontSize='sm'>{ name }</Heading>
        </Flex>
      </Card>
    );
};

export default DraggableCardEmployee;