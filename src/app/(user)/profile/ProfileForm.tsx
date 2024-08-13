// "use client";

// import { updateUser } from "@/actions/user";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { userProps } from "@/types/types";
// import { userSchema } from "@/types/ZodValidation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Cross1Icon } from "@radix-ui/react-icons";
// import { Upload } from "lucide-react";
// import React, { startTransition, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// const ProfileForm = ({ user }: { user: userProps | null }) => {
//   console.log("🚀 ~ ProfileForm ~ user:", user);
//   const [loading, setLoading] = React.useState(false);
//   const form = useForm<z.infer<typeof userSchema>>({
//     resolver: zodResolver(userSchema),
//     defaultValues: user
//       ? {
//           id: user?.id,
//           name: user?.name || "",
//           email: user?.email || "",
//           number: user?.number || "",
//           image: user?.image || "",
//         }
//       : undefined,
//   });

//   const uploadImage = async (e: any) => {
//     if (e.target.files.length) {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("file", e.target.files[0]);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Failed to upload image");
//       }

//       const result = await res.json();
//       setLoading(false);
//       form.setValue("image", result.data.url, { shouldDirty: true });
//     }
//   };
//   const deleteImage = async (url: string) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("url", url);
//       const res = await fetch("/api/upload", {
//         method: "DELETE",
//         body: formData,
//       });
//       setLoading(false);
//       const result = await res.json();
//       toast.success("Image Deleted Successfully");
//       form.setValue("image", "", { shouldDirty: true });
//       return result;
//     } catch (error) {
//       console.log("ERROR DELETING IMAGE", error);
//     }
//   };
//   const onSubmit = async (values: z.infer<typeof userSchema>) => {
//     startTransition(async () => {
//       await updateUser(values, "/user/profile").then((data) => {
//         if (data?.success) {
//           toast.success(data.success);
//         } else {
//           toast.error(data.error);
//         }
//       });
//     });
//   };
//   return (
//     <Form {...form}>
//       <form className="space-y-6">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>User Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="User Name"
//                   {...field}
//                   autoComplete="off"
//                 />
//               </FormControl>
//               <FormDescription>
//                 This is your name that will be displayed on the site.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Email"
//                   {...field}
//                   autoComplete="off"
//                 />
//               </FormControl>
//               <FormDescription>
//                 This is your email address that you use to login and receive
//                 notifications.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="number"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Number</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Type Number"
//                   {...field}
//                   autoComplete="off"
//                   type="number"
//                 />
//               </FormControl>
//               <FormDescription>
//                 This is your number where you can receive notifications.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Card className="max-w-[300px] p-4">
//           <CardHeader>
//             <CardTitle>Profile Image</CardTitle>
//           </CardHeader>
//           <CardContent className="max-w-[200px]">
//             {form.watch("image") === "" ? (
//               <div>
//                 {loading === true ? (
//                   <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
//                     <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></span>
//                   </div>
//                 ) : (
//                   <Label
//                     htmlFor={`image`}
//                     className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
//                   >
//                     <Upload className="h-4 w-4 text-muted-foreground" />
//                     <span className="sr-only">Upload</span>
//                   </Label>
//                 )}
//               </div>
//             ) : (
//               <div className="relative">
//                 <img
//                   src={form.getValues(`image`)}
//                   alt="image"
//                   className="rounded-md aspect-square w-full"
//                 />
//                 <Button
//                   asChild
//                   type="button"
//                   size={"icon"}
//                   variant={"destructive"}
//                   className={
//                     "absolute top-0.5 right-0.5 h-6 w-6 hover:cursor-pointer"
//                   }
//                   onClick={() => deleteImage(form.getValues(`image`) as string)}
//                 >
//                   <Cross1Icon className=" h-6 w-6 " />
//                 </Button>
//               </div>
//             )}
//             <Input
//               id={`image`}
//               type="file"
//               className="hidden"
//               {...form.register(`image`)}
//               onChange={(e) => uploadImage(e)}
//             />
//           </CardContent>
//           <CardDescription>
//             Upload a profile image to make your profile stand out.
//           </CardDescription>
//         </Card>

//         <Button
//           type="submit"
//           disabled={
//             !form.formState.isDirty || loading || !form.formState.isValid
//           }
//           size={"default"}
//           onClick={form.handleSubmit(onSubmit)}
//         >
//           Update Profile
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default ProfileForm;
