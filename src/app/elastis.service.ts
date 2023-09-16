import { Injectable } from '@angular/core';
import { Client } from '@elastic/elasticsearch';

@Injectable({
  providedIn: 'root'
})
export class ElastisService {

 
private client:Client;
  constructor() { 
    this.client = new Client({
      node: 'http://localhost:9200', 
     // Replace with your Elasticsearch server URL
    });
  }
  searchPosts(query: string): Promise<any[]> {
    return this.client
      .search({
        index: 'your-blog-index', // Replace with your Elasticsearch index name
        body: {
          query: {
            match: {
              title: query,
            },
          },
        },
      })
      .then((response) => {
        return response.hits.hits;
      });
  }
}
