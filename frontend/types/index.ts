import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Post = {
  author: User;
  source: string;
  destination: string;
  service: string;
  costInPoints: number;
}

export type User = {
  name: string;
  email: string;
  phoneNumber: string;
  karmaPoints: number;
}