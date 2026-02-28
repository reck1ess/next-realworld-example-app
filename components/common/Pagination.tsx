import styled from "@emotion/styled";
import React from "react";
import { trigger } from "swr";

import Maybe from "./Maybe";
import { getRange, getPageInfo } from "lib/utils/calculatePagination";
import { usePageDispatch, usePageState } from "lib/context/PageContext";

interface PaginationProps {
  total: number;
  limit: number;
  pageCount: number;
  currentPage: number;
  lastIndex: number;
  fetchURL: string;
}

const PaginationContainer = styled("nav")``;

const PaginationPresenter = styled("ul")`
  display: inline-block;
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
`;

const PaginationItem = styled("li")`
  position: relative;
  display: inline;
  padding: 0.5rem 0.75rem;
  margin-left: 0;

  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;

  &:first-child {
    border-bottom-left-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }

  &:last-child {
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  &:hover {
    color: #3d8b3d;
    background-color: #eceeef;
    border-color: #ddd;
  }

  &.is-active {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #5cb85c;
    border-color: #5cb85c;
  }
`;

const Pagination = ({
  total,
  limit,
  pageCount,
  currentPage,
  lastIndex,
  fetchURL,
}: PaginationProps) => {
  const page = usePageState();
  const setPage = usePageDispatch();

  const { firstPage, lastPage, hasPreviousPage, hasNextPage } = getPageInfo({
    limit,
    pageCount,
    total,
    page: currentPage,
  });
  const pages = total > 0 ? getRange(firstPage, lastPage) : [];

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
      e.preventDefault();
      setPage(index);
      trigger(fetchURL);
    },
    []
  );

  const handleFirstClick = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      setPage(0);
      trigger(fetchURL);
    },
    []
  );

  const handlePrevClick = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      setPage(page - 1);
      trigger(fetchURL);
    },
    []
  );

  const handleNextClick = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      setPage(page + 1);
      trigger(fetchURL);
    },
    []
  );

  const handleLastClick = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      setPage(lastIndex);
      trigger(fetchURL);
    },
    []
  );

  return (
    <PaginationContainer>
      <PaginationPresenter>
        <PaginationItem onClick={handleFirstClick}>{`<<`}</PaginationItem>
        <Maybe test={hasPreviousPage}>
          <PaginationItem onClick={handlePrevClick}>{`<`}</PaginationItem>
        </Maybe>
        {pages.map((page) => {
          const isCurrent = !currentPage ? page === 0 : page === currentPage;
          return (
            <PaginationItem
              key={page.toString()}
              className={isCurrent && "is-active"}
              onClick={(e) => handleClick(e, page)}
            >
              {page + 1}
            </PaginationItem>
          );
        })}
        <Maybe test={hasNextPage}>
          <PaginationItem onClick={handleNextClick}>{`>`}</PaginationItem>
        </Maybe>
        <PaginationItem onClick={handleLastClick}>{`>>`}</PaginationItem>
      </PaginationPresenter>
    </PaginationContainer>
  );
};

export default Pagination;
