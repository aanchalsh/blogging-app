export interface Blog {
    title: string;
    author: string;
    date: string;
    content: string;
    tags: string[];
    imageUrl?: string;
    comments?: Comment[]; 
    

  }
  export interface Comment {
    author: string;
    content: string;
    date: string;
  }
  
  