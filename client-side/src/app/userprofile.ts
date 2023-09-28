import { Blog } from "./blog";
import { User } from "./user";

export interface UserProfile {
  id: any;
  user: User;
  blogs: Blog[]; 
}
  

  