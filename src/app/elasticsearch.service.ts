import { Injectable } from '@angular/core';
import { Client } from '@elastic/elasticsearch';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
private client:Client;
  constructor() { 
    this.client = new Client({
      node: 'http://your-elasticsearch-server-url', // Replace with your Elasticsearch server URL
    });
  }
  getClient(): Client {
    return this.client;
  }
}
