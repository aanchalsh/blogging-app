import { Blog } from "./blog";
import { User } from "./user";

export interface UserProfile {
  id: string;
  user: User;
  blogs: Blog[]; 
}
  

  