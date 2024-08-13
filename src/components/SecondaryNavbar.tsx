// "use client";
// import React from "react";

// import Link from "next/link";
// import { ChevronDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { fetcher } from "@/lib/fetcher";
// import useSWR from "swr";
// import { categoryProps } from "@/types/types";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import { Button } from "./ui/button";
// import { Skeleton } from "./ui/skeleton";

// const SecondaryNavbar = () => {
//   interface fetchingProps extends categoryProps {
//     _count: {
//       subCategories: number;
//     };
//   }
//   const {
//     data: categories,
//     error,
//     isLoading,
//     isValidating,
//   } = useSWR<fetchingProps[]>("/api/category", fetcher, {
//     revalidateOnFocus: false,
//   });
//   if (error) return <div>Failed to load</div>;
//   if (!categories || isLoading)
//     return (
//       <div className="flex gap-5 lg:justify-center overflow-x-auto">
//         {Array.from({ length: 5 }).map((_, index) => (
//           <Skeleton key={index} className="w-32 h-10" />
//         ))}
//       </div>
//     );
//   console.log(categories);
//   return (
//     <section className="flex lg:justify-center overflow-x-auto">
//       {/* <NavigationMenu> */}
//       {categories.map((category, index) => (
//         <HoverCard openDelay={150} closeDelay={50}>
//           <HoverCardTrigger asChild>
//             <Button variant="ghost" className="group" asChild>
//               <Link className="flex items-center gap-2" href={""}>
//                 <span>{category.name}</span>
//                 {category._count.subCategories > 1 ? (
//                   <ChevronDown className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform ease-linear" />
//                 ) : null}
//               </Link>
//             </Button>
//           </HoverCardTrigger>
//           {category._count.subCategories > 1 && category.subCategories ? (
//             <HoverCardContent className="w-auto">
//               <ul className="grid gap-3 p-4 w-[200px]  md:w-[300px] md:grid-cols-3 lg:max-w-[600px]">
//                 {category?.subCategories.map((subCategory, index) => (
//                   <ListItem key={index} title={subCategory.name} href={`/`} />
//                 ))}
//               </ul>
//             </HoverCardContent>
//           ) : null}
//         </HoverCard>
//       ))}
//     </section>
//   );
// };

// export default SecondaryNavbar;

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, href, children, ...props }, ref) => {
//   return (
//     <li>
//       <Link
//         href={""}
//         ref={ref}
//         className={cn(
//           "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//           className
//         )}
//         {...props}
//       >
//         <div className="text-sm font-medium leading-none">{title}</div>
//         <p className="line-clamp-2 text-sm leading-snug  text-muted-foreground">
//           {children}
//         </p>
//       </Link>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";
