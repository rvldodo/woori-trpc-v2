"use client";

import {
  type ColumnDef,
  flexRender,
  type SortingState,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type VisibilityState,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "./html/text";

interface PaginationProps {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationProps; // External pagination props
  pageSize?: number; // For internal pagination (fallback)
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Use external pagination if provided, otherwise use internal pagination
  const useExternalPagination = !!pagination;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // Only use internal pagination if external pagination is not provided
    ...(useExternalPagination
      ? {
          manualPagination: true,
          pageCount: pagination.totalPages,
        }
      : {
          getPaginationRowModel: getPaginationRowModel(),
          initialState: {
            pagination: {
              pageSize: pageSize,
            },
          },
        }),
    state: {
      sorting,
      columnVisibility,
      ...(useExternalPagination && {
        pagination: {
          pageIndex: pagination.page - 1, // Convert to 0-based indexing
          pageSize: pagination.limit,
        },
      }),
    },
  });

  const handlePageSizeChange = (newPageSize: string) => {
    const size = Number(newPageSize);
    if (useExternalPagination && pagination) {
      pagination.onLimitChange(size);
    } else {
      table.setPageSize(size);
    }
  };

  const handleFirstPage = () => {
    if (useExternalPagination && pagination) {
      pagination.onPageChange(1);
    } else {
      table.setPageIndex(0);
    }
  };

  const handlePreviousPage = () => {
    if (useExternalPagination && pagination) {
      pagination.onPageChange(Math.max(1, pagination.page - 1));
    } else {
      table.previousPage();
    }
  };

  const handleNextPage = () => {
    if (useExternalPagination && pagination) {
      pagination.onPageChange(
        Math.min(pagination.totalPages, pagination.page + 1),
      );
    } else {
      table.nextPage();
    }
  };

  const handleLastPage = () => {
    if (useExternalPagination && pagination) {
      pagination.onPageChange(pagination.totalPages);
    } else {
      table.setPageIndex(table.getPageCount() - 1);
    }
  };

  // Get pagination info based on pagination type
  const currentPage = useExternalPagination
    ? pagination.page
    : table.getState().pagination.pageIndex + 1;
  const totalPages = useExternalPagination
    ? pagination.totalPages
    : table.getPageCount();
  const currentPageSize = useExternalPagination
    ? pagination.limit
    : table.getState().pagination.pageSize;
  const totalItems = useExternalPagination
    ? pagination.totalItems
    : table.getFilteredRowModel().rows.length;
  const canPreviousPage = useExternalPagination
    ? pagination.page > 1
    : table.getCanPreviousPage();
  const canNextPage = useExternalPagination
    ? pagination.page < pagination.totalPages
    : table.getCanNextPage();

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      <Text variant="body-md-semi">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </Text>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination */}
      <div className="flex md:flex-row flex-col items-center justify-between px-2">
        <div className="flex md:flex-row flex-col md:gap-0 gap-4 items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${currentPageSize}`}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="h-8 w-17.5">
                <SelectValue placeholder={currentPageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-25 items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <div className="text-sm text-muted-foreground">
            {totalItems} total results
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleFirstPage}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            {"<<"}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePreviousPage}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            {"<"}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to next page</span>
            {">"}
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleLastPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to last page</span>
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  );
}
