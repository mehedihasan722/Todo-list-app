import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Search() {
  return (
    <div className="relative flex ">
      <Input placeholder="Search for products" className="" size={70} />
      {/* <Button
        variant={"ghost"}
        size={"sm"}
        className="absolute right-0 top-0.5"
      >
        <MagnifyingGlassIcon className="h-5 w-5 " />
      </Button> */}
    </div>
  );
}
