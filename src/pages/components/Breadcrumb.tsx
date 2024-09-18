import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export default function Bread({second, third}) {
    return (
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.300' />} p='16px 0 16px 24px' borderBottom="1px solid" borderColor="gray.200">
            <BreadcrumbItem>
                <BreadcrumbLink href='#' fontSize='sm'>ホーム</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href='#' fontSize='sm'>{second}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#' fontSize='sm'>{third}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

function ChevronRightIcon(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    );
}