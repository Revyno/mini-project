import { OrderSelect } from "../orderSelect/orderSelect.jsx";
import { TaskPagination } from "../taskPagination/taskPagination.jsx";

export function FilterBar() {
  return (
    <>
      <nav className="flex flex-row justify-between mb-8">
        <TaskPagination />
        <OrderSelect />
      </nav>
    </>
  );
}
