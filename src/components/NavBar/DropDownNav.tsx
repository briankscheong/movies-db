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
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="rounded-sm bg-gradient-to-r from-indigo-800 to-blue-800 text-sm hover:bg-blue-800 p-2 px-4">
          {selected}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Navigation Tabs" className="text-sm text-white bg-blue-950/75 text-center rounded-sm p-2">
        {tabs.map((tab) => (
          <DropdownItem
            key={tab}
            onClick={() => handleSelect(tab)}
            className="text-center justify-center items-center text-white bg-transparent hover:bg-gradient-to-r from-indigo-800 to-blue-800 p-2 rounded-sm"
          >
            {tab}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownNav;
