"use client";
import { TodoFormSchema } from "@/lib/validation";
import React, { startTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/type";
import { useQueryClient } from "@tanstack/react-query";
import { useTodo } from "@/hooks/useTodo";
import { DialogClose } from "./ui/dialog";
const TodoForm = ({ todo }: { todo?: Todo | null }) => {
  const form = useForm<z.infer<typeof TodoFormSchema>>({
    resolver: zodResolver(TodoFormSchema),
    defaultValues: todo
      ? {
          id: todo.id,
          task: todo.task,
          status: todo.status,
          userId: "ff4fdc3d-aba3-4e6b-891c-de87964f66d8",
        }
      : {
          id: "",
          task: "",
          status: "PENDING",
          userId: "ff4fdc3d-aba3-4e6b-891c-de87964f66d8",
        },
  });
  const { addMutate, addPending, updateMutate, updatePending } = useTodo();
  const onSubmit = async (value: z.infer<typeof TodoFormSchema>) => {
    {
      todo ? updateMutate(value) : addMutate(value);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter your task" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your task status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending </SelectItem>
                  <SelectItem value="WORKING">Working </SelectItem>
                  <SelectItem value="COMPLETED">Completed </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3 items-center">
          <DialogClose asChild>
            <Button type="button" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          {todo ? (
            <DialogClose asChild>
              <Button
                disabled={!form.formState.isDirty || !form.formState.isValid}
                type="submit"
                className="bg-green-500 text-black dark:text-white dark:bg-green-700 space-x-2"
              >
                Update
              </Button>
            </DialogClose>
          ) : (
            <Button
              disabled={!form.formState.isDirty || !form.formState.isValid}
              type="submit"
              className="bg-green-500 text-black dark:text-white dark:bg-green-700 space-x-2"
            >
              Add
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default TodoForm;
