import { z } from "zod";

const RoleEnum = z.enum(["USER", "ADMIN"]);

const Status = z.enum(["PENDING", "WORKING", "COMPLETED"]);
export const TodoFormSchema = z.object({
  id: z.string().optional(),
  task: z
    .string({
      invalid_type_error: " Task is must Be String",
      required_error: "Task is required ",
    })
    .min(3)
    .max(255),
  status: Status.default("PENDING"),
  userId: z.string(),
});

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  role: RoleEnum.default("USER"),
});

export const signUpFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Full Name must be a string",
      required_error: "Full Name is required",
    })
    .min(3, { message: "Minimum 3 characters " })
    .max(50),
  email: z.string().email(),
  phoneNumber: z.number().min(9999999, {
    message: "Must contain at least 8 characters",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(32, {
      message: "Password must be at most 32 characters long",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .trim(),
  // role: RoleEnum.default("USER"),
});
