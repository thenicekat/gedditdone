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
  request: Request[] | null;
}

export type User = {
  userId: string;
  name: string;
  email: string;
  password: string;
  karmapoints: number;
  phoneNumber: string;
  karmaPoints: number;
}

export type Request = {
  id: string;
  status: string
  post: Post;
  postId: string;
  sender: User;
  senderEmail: string;
}