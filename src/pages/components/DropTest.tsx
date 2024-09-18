// import React, {useState} from 'react';
// import {DndContext} from '@dnd-kit/core';

// import { Droppable } from './Droppable';
// import { Draggable } from './Draggable';

// export default function DropTest() {
//   const containers = ['A', 'B', 'C'];
//   const [parent, setParent] = useState(null);
//   const draggableMarkup = (
//     <Draggable id="draggable">Drag me</Draggable>
//   );

//   function handleDragEnd(event: any) {
//     const {over} = event;

//     // ドロップできる領域にドロップした時、親としてidをセット
//     // それ以外はnullにする
//     setParent(over ? over.id : null);
//   }

//   return (
//     <DndContext onDragEnd={handleDragEnd}>
//       {parent === null ? draggableMarkup : null}

//       {containers.map((id) => (
//         // idを受け取ったらDroppableコンポーネントを更新
//         // useDroppable にpropsを渡す
//         <Droppable key={id} id={id}>
//           {parent === id ? draggableMarkup : 'Drop here'}
//         </Droppable>
//       ))}
//     </DndContext>
//   );
// };
import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, closestCenter } from '@dnd-kit/core';
import { Badge, Box, Card, Flex, Heading, Text } from '@chakra-ui/react';

const DraggableCardEmployee = ({ id, name, qualification }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    cursor: 'grab',
  };

  return (
    <Card p='8px 10px' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Flex gap='8px' align='left'>
        {
          qualification === 'なし' ? null : (
            <Badge variant='outline' colorScheme='blue' p='2px 5px' w='fit-content'>
              <Text fontSize='9px'>{ qualification }</Text>
            </Badge>
          )
        }
        <Heading fontSize='sm'>{ name }</Heading>
      </Flex>
    </Card>
  );
};

const DraggableCardProject = ({ id, name, qualification }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    cursor: 'grab',
  };

  return (
    <Card p='8px 10px' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Flex gap='8px' align='left'>
        {
          qualification === 'なし' ? null : (
            <Badge variant='outline' colorScheme='blue' p='2px 5px' w='fit-content'>
              <Text fontSize='9px'>{ qualification }</Text>
            </Badge>
          )
        }
        <Heading fontSize='sm'>{ name }</Heading>
      </Flex>
    </Card>
  );
};

const DroppableAreaEmployee = ({ id, items }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box backgroundColor='gray.100' p='20px' position='fixed' top='74px' w='18vw'>
      <Heading fontSize='lg'>隊員</Heading>
      <Flex ref={setNodeRef} direction='column' gap="12px" mt='24px'>
        {items.map((item) => (
          <DraggableCardEmployee key={item.id} id={item.id} name={item.name} qualification={item.qualification} />
        ))}
      </Flex>
    </Box>
  );
};

const DroppableAreaProject = ({ id, items, project, isActive }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box backgroundColor={isActive ? 'blue.100' : 'gray.100'} p='20px'>
      <Flex gap='8px' align='flex-end'>
        <Heading fontSize='md'>{project.company}</Heading>
        <Heading fontSize='md'>/</Heading>
        <Heading fontSize='md'>{project.name}</Heading>
      </Flex>
      <Text fontSize='sm'>Tel: {project.tel}</Text>
      <Flex ref={setNodeRef} gap="12px" mt='24px' wrap='wrap'>
        {items.map((item) => (
          <DraggableCardProject key={item.id} id={item.id} name={item.name} qualification={item.qualification} />
        ))}
      </Flex>
    </Box>
  );
};

const DropTest = ({ project, employeesList, projectList, isActive }) => {
  // DropTestの親コンポーネントでデータを渡す
  const [employeesItems, setEmployeesItems] = useState(employeesList);
  const [projectItems, setProjectItems] = useState(projectList);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const sourceId = employeesItems.some(item => item.id === active.id) ? 'employees' : 'project';
    const destinationId = over.id;

    if (sourceId === destinationId) return;

    let sourceItems = sourceId === 'employees' ? [...employeesItems] : [...projectItems];
    let destinationItems = destinationId === 'employees' ? [...employeesItems] : [...projectItems];
    const item = sourceItems.find((item) => item.id === active.id);

    sourceItems = sourceItems.filter((item) => item.id !== active.id);
    destinationItems = [...destinationItems, item];

    if (sourceId === 'employees' && destinationId === 'project') {
      setEmployeesItems(sourceItems);
      setProjectItems(destinationItems);
    } else if (sourceId === 'project' && destinationId === 'employees') {
      setProjectItems(sourceItems);
      setEmployeesItems(destinationItems);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Flex width='100%' justify='space-between' position='relative'>
        <Flex gap='20px' direction='column' w='75%'>
          <DroppableAreaProject id="project" items={projectItems} project={project} isActive={isActive} />
        </Flex>
        {/* stickyにしたいけどoverflowXをつけるとドラッグの移動が表示されなくなる */}
        {/* <Box height='calc(100vh - 20px - 20px)' w='calc(100% - 75% - 20px)' overflow='visible' overflowY='scroll' position='sticky' top='20px'> */}
        <Box w='calc(100% - 75% - 20px)'>
          {/* isActiveがtrueの時のみ表示 */
            isActive && <DroppableAreaEmployee id="employees" items={employeesItems} />
          }
        </Box>
      </Flex>
    </DndContext>
  );
};

export default DropTest;

