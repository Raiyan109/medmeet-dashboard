import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import profileImage from "../../assets/images/dash-profile.png";
import { TbBellRinging } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { Select } from "antd";
import useAuth from "../../hooks/useAuth";
import { getAssetUrl } from "../../utils";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);

  return (
    <div className="w-full h-[78px] flex justify-between items-start rounded-sm  py-[16px]">
      <div className="text-start space-y-[4px] bg-[#DDE3E6] rounded-[16px] w-4/5 py-[16px] px-[32px]">
        <p className="text-sm md:text-[24px] font-roboto">
          Welcome, {auth?.name}
        </p>
        <p className="text-sm md:text-[14px] font-roboto">
          {"Have a nice day!"}
        </p>
      </div>

      {/* Avatar & Notification */}
      <div className="flex gap-x-[25px]">
        <div
          onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge
            style={{
              backgroundColor: "red",
              objectFit: "contain",
              fontSize: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            count={2}
          >
            <div className="bg-[#DDE3E6] p-2 rounded-full">
              <IoNotificationsOutline
                style={{ cursor: "pointer" }}
                className={` w-6 h-6 rounded-full shadow-sm  font-bold transition-all`}
              />
            </div>
          </Badge>
        </div>
        <div className="flex items-center">
          <div>
            <img
              src={
                `${getAssetUrl(auth?.image)}?t=${new Date().getTime()}` ||
                profileImage
              }
              alt=""
              className="rounded-full h-[42px] w-[42px]"
            />
          </div>
          <p className="ml-4">{auth?.name}</p>
          {/* <Select
            defaultValue="Dr. Paul"
            style={{
              width: 80,
            }}
            bordered={false}
            // suffixIcon={<MdOutlineKeyboardArrowDown color="black" fontSize={20} />}
            suffixIcon={null}
            onChange={handleChange}
            options={[
              {
                value: "Dr. Paul",
                label: "Dr. Paul",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
            ]}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
