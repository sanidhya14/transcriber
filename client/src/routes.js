import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdTranscribe,
  MdLock,
  MdHistory,
  MdSettings,
  MdOutlineHelp,
  MdInfoOutline,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";

// New imports
import Home from "views/home";
import Transcribe from "views/transcribe";
import History from "views/history";
import Settings from "views/settings";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Home",
    layout: "/admin",
    path: "/home",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Home,
  },
  {
    name: "Transcribe",
    layout: "/admin",
    path: "/transcribe",
    icon: <Icon as={MdTranscribe} width='20px' height='20px' color='inherit' />,
    component: Transcribe,
  },
  {
    name: "History",
    layout: "/admin",
    path: "/history",
    icon: <Icon as={MdHistory} width='20px' height='20px' color='inherit' />,
    component: History,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "/setting",
    icon: <Icon as={MdSettings} width='20px' height='20px' color='inherit' />,
    component: Settings,
  },
  {
    name: "Help Center",
    layout: "/admin",
    path: "/help",
    icon: <Icon as={MdOutlineHelp} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "About",
    layout: "/admin",
    path: "/about",
    icon: <Icon as={MdInfoOutline} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Main Dashboard [temp]",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace [temp]",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables [temp]",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile [temp]",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In [temp]",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  }
];

export default routes;
