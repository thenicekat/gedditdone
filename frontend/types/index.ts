import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Post = {
  id: string
  author: User;
  authorId: string | undefined;
  source: string;
  destination: string;
  service: string;
  costInPoints: number;
  status: string;
  request: Request[] | null;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  karmaPoints: number;
  isPublic: boolean;
}

export type Request = {
  id: string;
  status: string
  post: Post;
  postId: string;
  sender: User;
  senderEmail: string;
}

export type Report = {
  id: string;
  reason: string;
  status: string;
  reporter: User;
  reporterEmail: string;
  post: Post;
  postId: string;
}