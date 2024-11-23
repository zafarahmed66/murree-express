import { Outlet } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import theme from "../flowbite-theme";

const MainLayout = () => {
  return (
    <>
      <Flowbite theme={{ theme }}>
          <Outlet />
      </Flowbite>
    </>
  );
};
export default MainLayout;
