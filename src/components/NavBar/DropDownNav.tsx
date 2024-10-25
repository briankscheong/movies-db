"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface DropdownNavProps {
  tabs: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownNav: React.FC<DropdownNavProps> = ({ tabs, selected, setSelected }) => {
  const router = useRouter();

  const handleSelect = (tab: string) => {
    setSelected(tab);
    router.push("/movies/" + tab.replace(" ", "-").toLowerCase());
  };

  return (
    <Dropdown showArrow
      classNames={{
        content: "py-1 my-1 bg-transparent dark:bg-slate-950/80 rounded-md",
      }}>
      <DropdownTrigger>
        <Button className="rounded-sm bg-gradient-to-r from-indigo-800 to-blue-800 text-sm hover:bg-blue-800 py-2">
          {selected}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Navigation Tabs" className="border-transparent text-sm text-white bg-transparent text-center rounded-sm">
        {tabs.map((tab) => (
          <DropdownItem
            key={tab}
            onClick={() => handleSelect(tab)}
            className="border-transparent text-center justify-center items-center text-white bg-transparent hover:bg-gradient-to-r from-indigo-800 to-blue-800 p-2 rounded-sm"
          >
            {tab}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownNav;
