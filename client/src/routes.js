import React from "react";
import {
  MdHome,
  MdTranscribe,
  MdHistory,
  MdSettings,
} from "react-icons/md";

import Home from "views/home";
import Transcribe from "views/transcribe";
import History from "views/history";
import Settings from "views/settings";

const routes = [
  {
    name: "Home",
    layout: "/admin",
    path: "/home",
    icon: <MdHome className="route-icon " />,
    component: Home,
  },
  {
    name: "Transcribe",
    layout: "/admin",
    path: "/transcribe",
    icon: <MdTranscribe className="route-icon " />,
    component: Transcribe,
  },
  {
    name: "History",
    layout: "/admin",
    path: "/history",
    icon: <MdHistory className="route-icon " />,
    component: History,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "/setting",
    icon: <MdSettings className="route-icon " />,
    component: Settings,
  },
];

export default routes;
