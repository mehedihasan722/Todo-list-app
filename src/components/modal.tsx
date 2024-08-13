"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TodoForm from "./form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDialog } from "@/lib/openModal";
export function Modal() {
  const { isOpen, onOpenChange } = useDialog();
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="m-10 ">
        <Button variant="outline" className="bg-emerald-500 text-white">
          Add Todo List
          <IoMdAddCircleOutline className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>Add todo in your list</DialogDescription>
        </DialogHeader>
        <TodoForm />
      </DialogContent>
    </Dialog>
  );
}
