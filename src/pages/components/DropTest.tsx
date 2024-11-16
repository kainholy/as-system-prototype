import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { Box, Flex } from '@chakra-ui/react';
import DroppableAreaEmployee from './DroppableAreaEmployee';
import DroppableAreaProject from './DropAreaProject';

type EmergencyContact = {
  name: string;
  relationship: string;
  phoneNumber: string;
};

type Qualification = {
  id: number;
  qualificationName: string;
};

type Member = {
  id: number;
  staffId: string;
  name: string;
  romanname: string;
  address: string;
  postcode: string;
  phonenumber: string;
  email: string;
  birthday: string;
  hiredate: string;
  role: string;
  emergencyContacts: EmergencyContact[];
  qualifications: Qualification[];
  ngStaffList: string;
  bannedInfo: string;
  selfBanned: string;
};

type ProjectMember = {
  id: number;
  staffProfileId: number;
  projectDescriptionId: number;
};

type ProjectQualification = {
  qualification: {
    qualificationName: string;
  };
  numberOfMembersNeeded: number;
};

type ProjectDescription = {
  id: number;
  workDate: string;
  startTime: string;
  endTime: string;
  address: string;
  postcode: string;
  managerName: string;
  phonenumber: string;
  requiredMembers: number;
  unitPrice: number;
  workTimeType: string;
  memo: string;
  projectQualification: ProjectQualification[];
  ProjectMember: ProjectMember[];
};

type Project = {
  id: number;
  projectName: string;
  company: {
    companyName: string;
    phonenumber: string;
  };
  projectDescription: ProjectDescription;
};

type DropTestProps = {
  project: Project;
  updateProjectMembers: { [key: number]: ProjectMember[] };
  setUpdateProjectMembers: React.Dispatch<React.SetStateAction<{ [key: number]: ProjectMember[] }>>;
  isActive: boolean;
  members: Member[];
};

const DropTest: React.FC<DropTestProps> = ({
  project,
  updateProjectMembers,
  setUpdateProjectMembers,
  isActive,
  members,
}) => {
  const [employeesItems, setEmployeesItems] = useState<Member[]>([]);
  const [projectItems, setProjectItems] = useState<Member[]>([]);

  const projectDescriptionId = project.projectDescription.id;

  useEffect(() => {
    // 初期状態を設定
    const projectMemberIds = updateProjectMembers[projectDescriptionId]
      ? updateProjectMembers[projectDescriptionId].map((pm) => pm.staffProfileId)
      : [];

    const projectMembersData = members.filter((member) =>
      projectMemberIds.includes(member.id)
    );

    setProjectItems(projectMembersData);

    const remainingEmployees = members.filter(
      (member) => !projectMemberIds.includes(member.id)
    );
    setEmployeesItems(remainingEmployees);
  }, [members, projectDescriptionId, updateProjectMembers]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = Number(active.id);
    const overId = over.id as string;

    const sourceId = employeesItems.some((item) => item.id === activeId)
      ? 'employees'
      : 'project';

    const destinationId = overId;

    if (sourceId === destinationId) return;

    let sourceItems = sourceId === 'employees' ? [...employeesItems] : [...projectItems];
    let destinationItems =
      destinationId === 'employees' ? [...employeesItems] : [...projectItems];

    const itemIndex = sourceItems.findIndex((item) => item.id === activeId);
    if (itemIndex === -1) return;

    const [movedItem] = sourceItems.splice(itemIndex, 1);
    destinationItems.push(movedItem);

    if (sourceId === 'employees' && destinationId === 'project') {
      setEmployeesItems(sourceItems);
      setProjectItems(destinationItems);
    } else if (sourceId === 'project' && destinationId === 'employees') {
      setProjectItems(sourceItems);
      setEmployeesItems(destinationItems);
    }

    // 変更があったときのみ updateProjectMembers を更新
    const newProjectMembers = (destinationId === 'project' ? destinationItems : sourceItems).map((item) => ({
      id: item.id,
      staffProfileId: item.id,
      projectDescriptionId: projectDescriptionId,
    }));

    setUpdateProjectMembers((prev) => ({
      ...prev,
      [projectDescriptionId]: newProjectMembers,
    }));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Flex width="100%" justify="space-between" position="relative">
        <Flex gap="20px" direction="column" w="75%">
          <DroppableAreaProject
            id="project"
            items={projectItems}
            project={project}
            isActive={isActive}
          />
        </Flex>
        <Box w="calc(100% - 75% - 20px)">
          {isActive && <DroppableAreaEmployee id="employees" items={employeesItems} />}
        </Box>
      </Flex>
    </DndContext>
  );
};

export default DropTest;