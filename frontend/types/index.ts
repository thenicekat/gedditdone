import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Post = {
  authorName: string;
  source: string;
  destination: string;
  service: string;
  costInPoints: number;
}

export type User = {
  name: string;
  email: string;
  phoneNumber: string;
}