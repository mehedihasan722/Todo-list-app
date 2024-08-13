"use client";
import { Button } from "@/components/ui/button";
import {
  Home,
  LogOut,
  Settings,
  ShoppingBag,
  SquareChevronRight,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const SideBarItems = [
    {
      title: "Profile",
      href: "/user/profile",
      icon: <User className="lg:w-6 lg:h-6 w-4 h-4" />,
    },
    {
      title: "Address",
      href: "/user/profile/address",
      icon: <Home className="lg:w-6 lg:h-6 w-4 h-4" />,
    },
    {
      title: "Orders",
      href: "/user/profile/orders",
      icon: <ShoppingBag className="lg:w-6 lg:h-6 w-4 h-4" />,
    },
    {
      title: "Settings",
      href: "/user/profile/settings",
      icon: <Settings className="lg:w-6 lg:h-6 w-4 h-4" />,
    },
    {
      title: "Logout",
      href: "/user/logout",
      icon: <LogOut className="lg:w-6 lg:h-6 w-4 h-4" />,
    },
  ];
  return (
    <>
      <div className="hidden lg:flex flex-col gap-5 xl:pr-10 border-r-2  border-red-500 ">
        {SideBarItems.map((item, index) => (
          <>
            {" "}
            {index !== 4 ? (
              <Button
                variant={`${item.href === pathname ? "default" : "ghost"}`}
                asChild
                key={index}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className={"flex  gap-3 items-center w-[120px]"}
                >
                  <span>{item.icon}</span>

                  <span>{item.title}</span>
                </Link>
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex gap-3 items-center w-[120px]"
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    Are you sure you want to logout?
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => signOut()}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        ))}
      </div>
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <span className="sr-only">Open Sidebar</span>
              <SquareChevronRight className="h-4 w-4 lg:h-6 lg:w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="lg:max-w-xs">
            <SheetHeader>
              <SheetClose asChild>
                <Button variant="ghost">
                  <span className="sr-only">Close Menu</span>
                </Button>
              </SheetClose>
            </SheetHeader>

            <nav className="grid gap-6 text-lg font-medium lg:hidden">
              {SideBarItems.map((item, index) => (
                <>
                  {index !== 4 ? (
                    <Button
                      variant={"ghost"}
                      asChild
                      key={index}
                      onClick={() => setOpen(false)}
                      className="flex gap-3 justify-start items-center w-[120px]"
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.title}
                      </Link>
                    </Button>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex gap-3 items-center justify-start w-[120px]"
                        >
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Logout</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                          Are you sure you want to logout?
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => signOut()}>
                            Logout
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
