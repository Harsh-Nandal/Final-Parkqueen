import {
  FiWifi,
  FiWind,
  FiTv,
  FiDroplet,
  FiPhoneCall,
  FiCoffee,
  FiMapPin,
  FiCreditCard,
  FiZap,
  FiVolume2,
  FiHeart,
} from "react-icons/fi";
import { GiWashingMachine, GiElevator } from "react-icons/gi";
import { FaTaxi, FaParking } from "react-icons/fa";
import {
  FaUtensils,
  FaMartiniGlassCitrus,
  FaBed,
  FaChampagneGlasses,
  FaChalkboardUser,
  FaBuilding,
  FaSquareParking,
  FaChair,
} from "react-icons/fa6";
import { TbPresentation } from "react-icons/tb";

/** Single source of truth: icon key (stored in Mongo as a plain string) -> react-icons component. */
export const ICON_MAP = {
  wifi: FiWifi,
  ac: FiWind,
  tv: FiTv,
  fridge: GiWashingMachine,
  water: FiDroplet,
  intercom: FiPhoneCall,
  coffee: FiCoffee,
  travel: FiMapPin,
  parking: FaParking,
  cards: FiCreditCard,
  laundry: GiWashingMachine,
  power: FiZap,
  soundproof: FiVolume2,
  lift: GiElevator,
  taxi: FaTaxi,
  doctor: FiHeart,
  utensils: FaUtensils,
  martini: FaMartiniGlassCitrus,
  bed: FaBed,
  champagne: FaChampagneGlasses,
  presentation: TbPresentation,
  chalkboard: FaChalkboardUser,
  building: FaBuilding,
  squareParking: FaSquareParking,
  chair: FaChair,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP).map((key) => ({ value: key, label: key }));

export function getIcon(key) {
  return ICON_MAP[key] || FiWifi;
}
