import { Todo } from "@/lib/type";
import { TodoFormSchema } from "@/lib/validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { useDialog, updateDialog } from "@/lib/openModal";

export const useTodo = () => {
  const queryClient = useQueryClient();
  const { onOpenChange } = useDialog();
  const { onOpenChange: updateDialogChange } = updateDialog();

  const {
    data: todos,
    isLoading,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("/api/todos");
      const result = await res.json();
      return result.data as Todo[] | undefined;
    },
  });

  //! Add Hooks Site ///
  const addTodo = async (
    values: z.infer<typeof TodoFormSchema>
  ): Promise<AddTodoResponse> => {
    const res = await fetch("api/todos", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to add new todo");
    }
    return await res.json();
  };

  const { mutate: addMutate, isPending: addPending } = useMutation<
    AddTodoResponse,
    { message: string },
    z.infer<typeof TodoFormSchema>,
    { previousTodos: Todo[] | undefined }
  >({
    mutationFn: (values: z.infer<typeof TodoFormSchema>) => addTodo(values),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      return { previousTodos };
    },

    onError: (err, variables, ctx) => {
      if (ctx?.previousTodos) {
        queryClient.setQueryData(["todos"], ctx.previousTodos);
      }
      toast.error(err?.message || "An error occurred");
    },
    onSuccess: (result) => {
      const parsedResponse = result.data;
      queryClient.setQueryData(["todos"], (old: Todo[] = []) => {
        const updatedTodos = [...old, parsedResponse];
        updatedTodos.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return updatedTodos;
      });
      toast.success(result?.message);
      onOpenChange();
    },
  });

  //? UpDate Hooks Site

  const updateTodo = async (
    values: z.infer<typeof TodoFormSchema>
  ): Promise<UpdateTodoResponse> => {
    const res = await fetch("api/todos", {
      method: "PUT",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    if (!res.ok) {
      const error: ErrorResponse = await res.json();
      throw new Error(error.error || "Failed to update todo");
    }

    return await res.json();
  };

  const { mutate: updateMutate, isPending: updatePending } = useMutation<
    UpdateTodoResponse,
    { message: string },
    z.infer<typeof TodoFormSchema>,
    { previousTodos: Todo[] | undefined }
  >({
    mutationFn: (values: z.infer<typeof TodoFormSchema>) => updateTodo(values),
    onMutate: async () => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      return { previousTodos };
    },
    onError: (err, variables, ctx) => {
      queryClient.setQueryData(["todos"], ctx?.previousTodos);

      toast.error(err?.message || "An error occurred");
    },

    onSuccess: (result, variables) => {
      const updatedTodo = result.data;
      queryClient.setQueryData(["todos"], (old: Todo[]) => {
        if (old) {
          const updatedTodos = old.map((todo) =>
            todo.id === updatedTodo.id
              ? {
                  ...todo,
                  task: updatedTodo.task,
                  status: updatedTodo.status,
                }
              : todo
          );
          return updatedTodos;
        }
        return old;
      });

      toast.success(result.message);
      updateDialogChange();
    },
  });

  //! This is Delete Method hooks

  const handleDeleteTodo = async (id: string) => {
    const res = await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      cache: "no-cache",
    });
    return await res.json();
  };
  const { mutate: removeMutate, isPending: isRemoving } = useMutation({
    mutationFn: handleDeleteTodo,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });
      const previousTodo: Todo[] | undefined = queryClient.getQueryData([
        "todos",
      ]);
      return { previousTodo };
    },

    onError: (err, variable, ctx) => {
      queryClient.setQueryData(["todos"], ctx?.previousTodo);
    },
    onSuccess: (result, variables, ctx) => {
      queryClient.setQueryData(
        ["todos"],
        ctx.previousTodo?.filter((item) => item.id !== variables)
      );
      toast.success(result?.message);
    },
  });

  return {
    isLoading,
    isError,
    todos,
    removeMutate,
    updatePending,
    updateMutate,
    addMutate,
    addPending,
  };
};

interface AddTodoResponse {
  message: string;
  data: Todo;
}
interface ErrorResponse {
  error: string;
  status: number;
}
interface UpdateTodoResponse {
  message: string;
  data: Todo;
}
