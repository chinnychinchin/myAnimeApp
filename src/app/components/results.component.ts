import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  type
  q: string
  results

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.params.type;
    this.q = this.activatedRoute.snapshot.params.q;
    this.apiRequest().then(result => { this.results = result['results']})
  }


  private apiRequest() {

    const params = new HttpParams().set('q', this.q.replace(' ', '%'))
    return this.http.get(`https://api.jikan.moe/v3/search/${this.type}`, {params: params}).toPromise()
  }

}
