import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Search } from '../models';
import { normaliseSearch, Searchsvc } from '../searchHistory';

@Component({
  selector: 'app-searchparams',
  templateUrl: './searchparams.component.html',
  styleUrls: ['./searchparams.component.css']
})
export class SearchparamsComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private searchSvc: Searchsvc) { }

  ngOnInit(): void {
  }

  type: string = 'anime'

  setType (t) {
    this.type = t;
  }

  searchForm: FormGroup = this.fb.group({
    title: this.fb.control('', [Validators.required]),
  })

  goToResults() {
    this.router.navigate(['/search', this.type, normaliseSearch(this.searchForm.value['title'])])
  }


  async onSave(){
    const search: Search = {type:this.type, q: normaliseSearch(this.searchForm.value['title']), date: new Date()}
    const isThere = await this.searchSvc.searchDb(search);
    if (!isThere) {
      await this.searchSvc.addSearch(search);
    }
    this.goToResults()
  }
  
}
