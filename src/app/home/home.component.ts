import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showLoginPopup: boolean = true; 
  blogs: any[] = [];
 // blogPosts: any[] = [];
  selectedTags: string[] = [];
  searchQuery: string = '';
  filteredBlogPosts: any[] = [];
  blog: Blog | null = null;

  constructor(private authService: AuthService,private router:Router) {
   
    const allBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    this.blogs = allBlogs.reverse(); 
   
    
    const dummyBlogs: any[] = [ 
    {
      "title": "Favourite Coffee Place in London",
      "author": "Aanchal Shah",
      "date": "2023-08-23",
      "content": "Another favourite London cafe of ours. Australian owned and inspired cafe in Notting Hill. It’s a hidden gem tucked away in a fantastic building with a court yard taking you through to the entrance. Incredibly healthy food options, and a great brunch spot. If you are looking for the best coffee in Notting Hill this may not be the best spot but if you are meeting friends for a casual Saturday morning brunch this is for you! .",
      "tags": ["coffee", "london", "cafe"],
      "imageUrl": "https://club.atlascoffeeclub.com/wp-content/uploads/2017/08/kris-atomic-39750-750x400.jpg"
    },
    {
      "title": "Spooky Hallooween",
      "author": "Aanchal Shah",
      "date": "2023-08-24",
      "content": "I’m just barely hanging on as we prepare for back to school, but I have to admit that I’ve already got Halloween brewing in my mind (PUN INTENDED). My ideas are always too ambitious for the amount of time so I like the share ideas with you a bit early in case you’re in the same boat. The season of tricks and treats, costumes and candies, is also the perfect time to transform your home into a haunted haven with spine-chilling decorations. Whether you’re hosting a ghoulish gathering or simply want to spookify your space, we’re rounded up 10 eerie and imaginative Halloween decor ideas to bewitch your guests and send shivers down their spines.",
      "tags": ["holidays", "creativity", "festivals"],
      "imageUrl": "https://mcdn.wallpapersafari.com/medium/48/3/dxbych.jpg"
    },
    {
      "title": "Pride and Prejudice",
      "author": "Aanchal Shah",
      "date": "2023-08-24",
      "content": "We’re excited to share this female author booklist with you! There are some amazing classics in here. While I haven’t read all the books on this list, I have read a few. The ones I haven’t read are highly recommended from multiple sources, which tells me they deserve to be named. We tried to pick a variety of books, ranging from older classics to more contemporary reads, and from a variety of genres. Hopefully there’s something for everyone here!This book is the ultimate classic that every woman (and man!) should read. We need more books with strong, female protagonists. This is definitely a frontrunner in that category. Jane Austen is such a legend, we couldn’t leave her off this booklist.",
      "tags": ["literature"],
      "imageUrl": "https://th.bing.com/th/id/R.57deea91db4aef5b18be24278741da71?rik=58dpmOqGLLoZTg&riu=http%3a%2f%2f1.bp.blogspot.com%2f-DlV4BFd3fIs%2fUho-mgx_3hI%2fAAAAAAAAL3E%2f4sSmxi1WdIQ%2fs1600%2fPride%2band%2bPrejudice.jpg&ehk=doZ6%2fEZXRHajyxp6AzT417pBx%2bb3S6atOP6jb4Fbk0U%3d&risl=&pid=ImgRaw&r=0"
    }
    ];

    const savedFeaturedBlogs: any[] = JSON.parse(localStorage.getItem('featuredBlogs') || '[]'); 
    const newFeaturedBlogs = dummyBlogs.filter(dummy => !savedFeaturedBlogs.some(saved => saved.title === dummy.title));
    localStorage.setItem('featuredBlogs', JSON.stringify([...savedFeaturedBlogs, ...newFeaturedBlogs]));
    this.showLoginPopup = !this.authService.isAuthenticated();
    this.blogs = [...this.blogs, ...savedFeaturedBlogs];
  }
  navigateToBlogDetail(blogTitle: string) {
    this.router.navigate(['/blog', blogTitle]);
  }
  isSelectedTag(tag: string): boolean {
    return this.selectedTags.some(selectedTag => selectedTag === tag);
  }
 
  filterByTag(tag: string): void {
    this.router.navigate(['/tag', tag]);
  }


}
