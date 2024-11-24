import classNames from "classnames";
import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { IoBagHandleSharp } from "react-icons/io5";
import { RiFileDownloadFill } from "react-icons/ri";
import { FaGlobe } from "react-icons/fa";

import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
import { useAuth } from "../context/auth-context";
import { Link, useLocation } from "react-router-dom";

const CustomSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();

  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const newPage = location.pathname;

    setCurrentPage(newPage);
  }, [location.pathname]);

  return (
    <div
      className={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}
      >
        <div className="flex flex-col justify-between h-full py-2">
          
            <Sidebar.Items>
              <Sidebar.ItemGroup className="">
                <Link to="/">
                  <Sidebar.Item
                    icon={HiChartPie}
                    className={
                      "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                    }
                  >
                    Home
                  </Sidebar.Item>
                </Link>
                <Link to={"/classroom"}>
                  <Sidebar.Item
                    icon={SiGoogleclassroom}
                    className={
                      "/classroom" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Classroom
                  </Sidebar.Item>
                </Link>
                <Link to={"/activities"}>
                  <Sidebar.Item
                    icon={IoBagHandleSharp}
                    className={
                      "/activities" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Activities
                  </Sidebar.Item>
                </Link>
                <Link to={"/learning"}>
                  <Sidebar.Item
                    icon={RiFileDownloadFill}
                    className={
                      "/learning" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Learning
                  </Sidebar.Item>
                </Link>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          <BottomMenu />
        </div>
      </Sidebar>
    </div>
  );
};

const BottomMenu: FC = function () {
  const { user } = useAuth();
  return (
    <div className="">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={FaGlobe}>Help</Sidebar.Item>
          <Link to={"/profile"}>
            <Sidebar.Item icon={Avatar}>{user?.name}</Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </div>
  );
};

const Avatar = () => {
  return <div className="bg-black rounded-full size-7"></div>;
};

export default CustomSidebar;
