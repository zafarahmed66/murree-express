import { Flowbite, ThemeMode, useThemeMode } from "flowbite-react";
import type { FC } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router";
import theme from "../flowbite-theme";

const FlowbiteWrapper: FC = function () {
  const dark = localStorage.getItem("theme") as ThemeMode || "dark";

  return (
    <Flowbite theme={{ mode: dark, theme }}>
      <PersistFlowbiteThemeToLocalStorage />
      <Outlet />
    </Flowbite>
  );
};

const PersistFlowbiteThemeToLocalStorage: FC = function () {
  const { mode } = useThemeMode();

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return <></>;
};

export default FlowbiteWrapper;
