import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Searchsvc } from '../searchHistory';
import { Search } from '../models';

@Component({
  selector: 'app-searchhistory',
  templateUrl: './searchhistory.component.html',
  styleUrls: ['./searchhistory.component.css']
})
export class SearchhistoryComponent implements OnInit {

  constructor(private router: Router, private searchSvc: Searchsvc) { }

  searches: Search[]

  ngOnInit(): void {
    this.searchSvc.getSearchHistory().then(result => { this.searches = result })
  }

  goToSearchParams() {
    this.router.navigate(['/searchparams'])
  }

  onDelete(id) {
    this.searchSvc.deleteSearch(id);
    this.searchSvc.getSearchHistory().then(result => { this.searches = result })
  }
}
