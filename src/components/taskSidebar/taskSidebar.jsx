import { Card } from "@/components/ui/card";
import { CreateTaskForm } from "../createTaskForm/createTaskForm.jsx";
import { Logout } from "../logout/logout.jsx";
import { UserProfile } from "../userProfile/userProfile.jsx";
import styles from "./style.module.css";

export function TaskSidebar() {
  return (
    <section className={`fixed right-4 top-4 ${styles.sidebarHeight}`}>
      <Card className="flex flex-col w-full h-full p-6 justify-between">
        <UserProfile />
        <CreateTaskForm />
        <Logout />
      </Card>
    </section>
  );
}
