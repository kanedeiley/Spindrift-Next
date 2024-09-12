import { IconType } from 'react-icons';

export type Category= {
  name: string;
  icon: IconType;
  selected: boolean;
};

import {
  FiAnchor,
  FiDroplet,
  FiFeather,
  FiAirplay,
  FiSun,
  FiMapPin,
  FiWind,
  FiSunrise,
  FiSunset,
  FiZap,
  FiBox,
  FiThermometer,
  FiShield,
} from 'react-icons/fi';
import { FaVest  } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { GiShorts, GiWinterGloves, GiHoodie, GiSteeltoeBoots } from "react-icons/gi";
import { IoAirplane } from "react-icons/io5";
import { MdSevereCold,  MdOutlineTimer } from "react-icons/md";

export const highlights: Category[] = [
  { name: 'Easy Paddle Out', icon: FiFeather, selected: false },
  { name: 'Little Time Inside', icon: FiDroplet, selected: false },
  { name: 'Long Rides', icon: MdOutlineTimer, selected: false },
  { name: 'Airs', icon: IoAirplane, selected: false },
  { name: 'Walking the Board', icon: FaPersonWalking, selected: false },
  { name: 'Great Weather', icon: FiSun, selected: false },
  { name: 'Timed the Tide', icon: FiSunrise, selected: false },
  { name: 'Perfect Wind Conditions', icon: FiWind, selected: false },
  { name: 'Sunrise Session', icon: FiSunrise, selected: false },
  { name: 'Sunset Session', icon: FiSunset, selected: false },
];

export const swimwear: Category[] = [
  { name: '2/3mm Wetsuit', icon: FiShield, selected: false },
  { name: 'Booties', icon: GiSteeltoeBoots, selected: false },
  { name: '4/3mm Wetsuit', icon: MdSevereCold, selected: false },
  { name: 'Full Hood', icon: GiHoodie, selected: false },
  { name: 'Gloves', icon: GiWinterGloves, selected: false },
  { name: 'Shortie', icon: FiWind, selected: false },
  { name: 'Vest', icon: FaVest, selected: false },
  {name: 'Trunks', icon: GiShorts, selected: false },
];
