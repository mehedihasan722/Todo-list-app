import { Modal } from "@/components/modal";
import TableColumnHeader from "@/components/table/tableColumnHeader";
import Image from "next/image";
import TodoList from "./TodoList";
import NavBar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar />
      <div className="text-teal-700 text-3xl font-bold">
        TO DO App Demo
        <hr />
      </div>
      <Modal />
      <TodoList />
    </main>
  );
}
