import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import BarChartComponent from "./BarChart";


const DashboardHome = () => {

  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-[24px]  gap-y-10 ">
        {/* Total Earnings */}
        <div className=" flex items-center  gap-6  px-[24px] py-[20px] rounded-[16px] space-y-3 bg-[#DDE3E6] w-[326px] h-[131px] md:w-full">

          <div className="">
            <h3 className="font-roboto text-[18px] text-[#545454]">{"Total Earnings"}</h3>
            <h3 className="font-roboto text-[32px] text-[#333333]">
              {`$8920 `}
            </h3>
          </div>
        </div>

        <div className=" flex items-center  gap-6  px-[24px] py-[20px] rounded-[16px] space-y-3 bg-[#DDE3E6] w-[326px] h-[131px] md:w-full">

          <div className="">
            <h3 className="font-roboto text-[18px] text-[#545454]">{"Total Users"}</h3>
            <h3 className="font-roboto text-[32px] text-[#333333]">6500</h3>
          </div>
        </div>

        <div className=" flex items-center  gap-6  px-[24px] py-[20px] rounded-[16px] space-y-3 bg-[#DDE3E6] w-[326px] h-[131px] md:w-full">

          <div className="">
            <h3 className="font-roboto text-[18px] text-[#545454]">{"Total Doctors"}</h3>
            <h3 className="font-roboto text-[32px] text-[#333333]">740</h3>
          </div>
        </div>


      </div>
      <BarChartComponent />
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
