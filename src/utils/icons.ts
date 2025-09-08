// iconMap.ts
import {
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaAndroid,
  FaAws,
  FaDocker,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNestjs } from "react-icons/si";
import { DiMongodb } from "react-icons/di";

export const iconOptions = {
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  FaLaravel: FaLaravel,
  FaAndroid: FaAndroid,
  FaAws: FaAws,
  FaDocker: FaDocker,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  SiNestjs: SiNestjs,
  DiMongodb: DiMongodb,
};

export const iconSelectOptions = Object.keys(iconOptions).map((key) => ({
  label: key,
  value: key,
}));
