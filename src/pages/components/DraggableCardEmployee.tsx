import React, { useEffect } from 'react';
import { Badge, Box, Card, Flex, Heading, Text } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

type QualificationMember = {
  id: number;
  qualificationName: string;
};

type DraggableCardEmployeeProps = {
  id: number | string;
  name: string;
  qualifications: QualificationMember[];
};

const DraggableCardEmployee: React.FC<DraggableCardEmployeeProps> = ({
  id,
  name,
  qualifications,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: 'grab',
  };

  return (
    <Card
      _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'md' }}
      p="8px 10px"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Flex gap="8px" align="left" direction={'column'}>
        <Flex gap="4px" wrap={'wrap'}>
          {qualifications.length !== 0 ? 
            qualifications.map((qualification) => (
              <Badge
                key={`${qualification.id}-${qualification.qualificationName}`}
                variant="outline"
                colorScheme="blue"
                p="2px 5px"
                w="fit-content"
              >
                <Text fontSize="9px">{qualification.qualificationName}</Text>
              </Badge>
          )) :
          (
            <Badge
              variant="outline"
              colorScheme="gray"
              p="2px 5px"
              w="fit-content"
            >
              <Text fontSize="9px">なし</Text>
            </Badge>
          )}
        </Flex>
        <Heading fontSize="sm">{name}</Heading>
      </Flex>
    </Card>
  );
};

export default DraggableCardEmployee;
