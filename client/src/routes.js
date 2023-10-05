import React from "react";

import { Icon } from "@chakra-ui/react";
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
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Home,
  },
  {
    name: "Transcribe",
    layout: "/admin",
    path: "/transcribe",
    icon: <Icon as={MdTranscribe} width="20px" height="20px" color="inherit" />,
    component: Transcribe,
  },
  {
    name: "History",
    layout: "/admin",
    path: "/history",
    icon: <Icon as={MdHistory} width="20px" height="20px" color="inherit" />,
    component: History,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "/setting",
    icon: <Icon as={MdSettings} width="20px" height="20px" color="inherit" />,
    component: Settings,
  },
];

export default routes;
