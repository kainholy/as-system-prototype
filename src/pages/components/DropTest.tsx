import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { Box, Flex } from '@chakra-ui/react';
import DroppableAreaEmployee from './DroppableAreaEmployee';
import DroppableAreaProject from './DropAreaProject';

const DropTest = ({ project, projectList, isActive, members }) => {
  // 初期化
  const [employeesItems, setEmployeesItems] = useState(members);
  const [projectItems, setProjectItems] = useState(projectList);

  // membersの変更を監視してemployeesItemsを更新
  useEffect(() => {
    setEmployeesItems(members);
  }, [members]);

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
        <Box w='calc(100% - 75% - 20px)'>
          {/* isActiveがtrueの時のみ表示 */}
          {isActive && <DroppableAreaEmployee id="employees" items={employeesItems} />}
        </Box>
      </Flex>
    </DndContext>
  );
};

export default DropTest;
