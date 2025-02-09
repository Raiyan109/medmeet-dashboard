import React from "react";
import { FaArrowLeftLong, FaChevronLeft } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

const PageHeading = ({ title, backPath, disbaledBackBtn, className }) => {
  const navigate = useNavigate();
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {!disbaledBackBtn && (
        <button
          className="outline-none px-2"
          onClick={() => navigate(backPath || "/settings")}
        >
          <GoArrowLeft size={30} />
        </button>
      )}
      {!!title && <h1 className="text-[24px] font-roboto text-[#333333] font-medium">{title}</h1>}
    </div>
  );
};

export default PageHeading;
