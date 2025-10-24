import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useContext, useEffect, useState } from "react";

import { TasksContext } from "@/context/tasks.context.jsx";
import { extractQueryString } from "@/lib/extractQueryString.js";

export function TaskPagination() {
  const [links, setLinks] = useState();
  const [meta, setMeta] = useState();
  const { tasks, setTasks } = useContext(TasksContext);

  const previousPage = links
    ? extractQueryString(links.previous).toString()
    : "#";
  const nextPage = links ? extractQueryString(links.next).toString() : "#";
  const order = links ? extractQueryString(links.next).get("order") : "#";

  useEffect(() => {
    if (tasks) {
      setLinks(tasks.pagination.links);
      setMeta(tasks.pagination.meta);
    }
  }, [tasks]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`/tasks?${previousPage}`} />
        </PaginationItem>
        {meta
          ? [...Array(meta.totalPages)].map((item, index) => (
              <PaginationItem key={`pag${index}`}>
                <PaginationLink
                  href={`/tasks?limit=${meta.itemsPerPage}&page=${
                    index + 1
                  }&order=${order}`}
                  isActive={index + 1 == meta.currentPage ? true : false}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          : null}
        <PaginationItem>
          <PaginationNext href={`/tasks?${nextPage}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
