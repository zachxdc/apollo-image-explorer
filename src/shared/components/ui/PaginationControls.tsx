"use client";

import {
  HStack,
  ButtonGroup,
  IconButton,
  Pagination,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
};

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
}) => {
  const router = useRouter();
  const siblingCount = useBreakpointValue({ base: 0, md: 1, lg: 2 });

  const handlePageChange = useCallback(
    ({ page }: { page: number }) => {
      if (page !== currentPage) {
        router.push(`/information?page=${page}`, { scroll: false });
      }
    },
    [currentPage, router]
  );

  return (
    <HStack justify="center" gap={2} mt={8}>
      <Pagination.Root
        count={totalPages}
        page={currentPage}
        pageSize={1}
        onPageChange={handlePageChange}
        siblingCount={siblingCount}
      >
        <ButtonGroup variant="outline" size="md">
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label="Previous page">Prev</IconButton>
          </Pagination.PrevTrigger>
          <Pagination.Context>
            {({ pages }) =>
              pages.map((page, index) =>
                page.type === "page" ? (
                  <Pagination.Item key={page.value} {...page} asChild>
                    <IconButton
                      aria-label={`Go to page ${page.value}`}
                      variant={page.value === currentPage ? "solid" : "outline"}
                    >
                      {page.value}
                    </IconButton>
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={`ellipsis-${index}`} index={index}>
                    &#8230;
                  </Pagination.Ellipsis>
                )
              )
            }
          </Pagination.Context>
          <Pagination.NextTrigger asChild>
            <IconButton aria-label="Next page">Next</IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </HStack>
  );
};

