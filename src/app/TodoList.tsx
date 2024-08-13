"use client";
import React from "react";
import { MdDeleteOutline, MdUpdate } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import TodoForm from "@/components/form";
import { useTodo } from "@/hooks/useTodo";
import { updateDialog } from "@/lib/openModal";

const TodoList = () => {
  const { isError, isLoading, removeMutate, todos } = useTodo();
  const { isOpen, onOpenChange } = updateDialog();
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (isError) {
    return <div>opps something Error...</div>;
  }

  if (!todos || !todos.length) {
    return <div>No Data Found.....</div>;
  }

  return (
    <div className="flex gap-5 flex-wrap">
      {Array.isArray(todos) &&
        todos?.map((todo) => (
          <Card className="w-[350px]" key={todo.id}>
            <CardHeader>
              <CardTitle>My Todo List</CardTitle>
              <CardDescription className="text-purple-800">
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Task: {todo.task}</Label>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Status: {todo.status}</Label>
                  </div>
                  {/* <p>time : - {todo.createdAt} </p>
                  <p>{todo.updatedAt}</p> */}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild className="m-10 ">
                  <Button variant="outline" className="bg-cyan-500">
                    <MdUpdate className="mr-2" /> Update
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update Todo </DialogTitle>
                    <DialogDescription>
                      Make changes to your Todo
                    </DialogDescription>
                  </DialogHeader>
                  <TodoForm todo={todo} />
                </DialogContent>
              </Dialog>
              <Button
                className="bg-red-400"
                onClick={() => removeMutate(todo.id)}
              >
                <MdDeleteOutline className="mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default TodoList;
