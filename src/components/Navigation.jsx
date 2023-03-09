import { Icon } from "@iconify/react";
import DropdownMenu from "./DropdownMenu";
import CartModal from "./modal/CartModal";
import SearchModal from "./modal/SearchModal";

function Navigation() {
  return (
    <div className="absolute right-0 top-0 flex z-10 flex-col-reverse xsm:relative xsm:flex-row items-center gap-5 md:gap-8 p-2 w-fit xsm:w-full bg-dim-blue bg-opacity-20">
      <div className="text-[24px] sm:text-[32px]  text-aqua-marine hover:text-aqua-marine hover:cursor-pointer flex-grow-1">
        <Icon icon="material-symbols:home" />
      </div>

      <SearchModal />

      <div className="text-[24px] sm:text-[32px]  hover:text-aqua-marine hover:cursor-pointer">
        <CartModal />
      </div>
      <div className="text-[24px] sm:text-[32px]  hover:text-aqua-marine hover:cursor-pointer">
        <Icon icon="bxs:purchase-tag" />
      </div>
      <div className="flex  gap-2 justify-center items-center flex-col xsm:flex-row ">
        <div className="sm:h-[32px] sm:w-[32px] h-[24px] w-[24px] rounded-full bg-teal"></div>
        <div className="">
          <DropdownMenu />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
