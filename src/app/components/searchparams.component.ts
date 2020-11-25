import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Search } from '../models';
import { Searchsvc } from '../searchHistory';

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

  onSubmit() {
    this.navigate();
  }

  private navigate() {
    return this.router.navigate(['/search', this.type, this.searchForm.value['title']])
  }

  async onSave(){
    const search: Search = {type:this.type, q: this.searchForm.value['title']}
    //
    await this.searchSvc.addSearch(search);
    this.navigate()
  }
}
