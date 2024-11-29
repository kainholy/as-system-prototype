import React from 'react';
import { Flex, Heading, Badge, Text, Card } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';

type QualificationMember = {
  id: number;
  qualificationName: string;
};

type DraggableCardProjectProps = {
  id: number | string;
  name: string;
  qualifications: QualificationMember[];
};

const DraggableCardProject: React.FC<DraggableCardProjectProps> = ({
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

  // 'なし' ではない資格のみをフィルタリング
  const filteredQualifications = qualifications.filter(
    (qualification) => qualification.qualificationName !== 'なし'
  );

  return (
    <Card
      _hover={{ backgroundColor: 'gray.100', cursor: 'pointer', boxShadow: 'md' }}
      p="8px 10px"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      minW={'100px'}
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

export default DraggableCardProject;
