import { Blog } from "./blog";

export interface UserProfile {
  email: string;
  username: string;
  userblogs: Blog[]; // Assuming you have a BlogPost interface
}

  

  