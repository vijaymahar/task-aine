import {
  faUserAlt,
  faBookMedical,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export const SidebarData = [
  {
    id: 1,
    icon: faUserAlt,
    link: "/userPage",
    name: "students",
  },
  {
    id: 2,
    icon: faBookMedical,
    link: "/planningPage",
    name: "lession plan",
  },
  {
    id: 3,
    icon: faCog,
    link: "/settingsPage",
    name: "settings",
  },
];
