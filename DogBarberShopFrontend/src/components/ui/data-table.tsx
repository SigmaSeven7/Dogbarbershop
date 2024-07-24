import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";


interface DataWithScheduledTime {
  scheduledTime: string; 
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends DataWithScheduledTime, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const filteredData = useMemo(() => {
    if (!startDate && !endDate) return data;
    const start = startDate ? new Date(startDate) : new Date(-8640000000000000);
    const end = endDate ? new Date(new Date(endDate).setHours(23, 59, 59, 999)) : new Date(8640000000000000);

    return data.filter((item) => {
      const scheduledDate = new Date(item.scheduledTime);
      return scheduledDate >= start && scheduledDate <= end;
    });
  }, [data, startDate, endDate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    pageCount: Math.ceil(filteredData.length / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const nextPaginationState = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
      setPageIndex(nextPaginationState.pageIndex);
      setPageSize(nextPaginationState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex justify-center items-center space-x-4 mb-4">
        <label>
          תאריך התחלה:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="ml-2 px-2 py-1 border rounded-md"
          />
        </label>
        <label>
          תאריך סיום:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="ml-2 px-2 py-1 border rounded-md"
          />
        </label>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize).map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  אין תוצאות.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          קודם
        </button>
        <span>
          עמוד{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} מתוך{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          הבא
        </button>
      </div>
      <div className="flex items-center mt-2">
        <span className="mr-2">מספר פריטים פר דף:</span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            table.setPageSize(Number(e.target.value));
          }}
          className="ml-4 px-2 py-1 border rounded-md"
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
