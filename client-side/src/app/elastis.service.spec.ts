import { TestBed } from '@angular/core/testing'
import { ElasticsearchService } from './elasticsearch.service';

describe('ElastisService', () => {
  let service: ElasticsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElasticsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
