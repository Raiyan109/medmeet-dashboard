import { FaAngleRight } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { routeLinkGenerators } from "../../../utils/routeLinkGenerators";
import { dashboardItems } from "../../../constants/router.constants";


const Setting = () => {

  return (
    <div className="">

      <div>
        {routeLinkGenerators(dashboardItems)
          .filter(({ children }) => children && children.length > 0) // Ensure only items with children are processed
          .map(({ name, icon, path, children, rootPath }, indx) => (
            <div key={indx} className="space-y-4 container mx-auto max-w-7xl pt-4 pb-32">
              {children.map(({ subName, subPath, subIcon }, inx) => (
                <NavLink
                  key={inx}
                  to={`/${subPath}`}
                  className="flex justify-between items-center p-4 bg-[#DDE3E6] rounded-lg"
                >
                  <span className="text-gray-500 text-xl"> {subName}</span>
                  <div className="text-lg font-medium text-gray-800">
                    <FaAngleRight color="black" />
                  </div>
                </NavLink>
              ))}
            </div>
          ))}
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}

export default Setting
