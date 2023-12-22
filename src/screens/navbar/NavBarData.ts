import {
  BeakerIcon,
  CircleStackIcon,
  HomeIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const NavBarData= [
  {
    title: "Home",
    path: "/",
    icon: HomeIcon, 
  },
  {
    title: "Explorer",
    path: "explorer",
    icon: UserGroupIcon,
  },
  {
    title: "My Datasets",
    path: "/dataset",
    icon: CircleStackIcon
  },
  {
    title: "My Models",
    path: "/models",
    icon: PuzzlePieceIcon,
  },
  {
    title: "My Tests",
    path: "/tests",
    icon: BeakerIcon,
  },
];