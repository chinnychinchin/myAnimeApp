import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private webshare: NgNavigatorShareService) { }

  type
  q: string
  results //[ {}, {}, {}]
  canShare = false

  ngOnInit(): void {
    this.canShare = this.webshare.canShare()
    this.type = this.activatedRoute.snapshot.params.type;
    this.q = this.activatedRoute.snapshot.params.q;
    this.apiRequest().then(result => this.results = result['results'])
  }


  private apiRequest() {

    const params = new HttpParams().set('q', this.q.replace(' ', '%'))
    return this.http.get(`https://api.jikan.moe/v3/search/${this.type}`, {params: params}).toPromise()
  }

  shareThis(id) {

    console.log(id) //21
    const r = this.results.find(v =>  v.mal_id == id) //r = { }
    console.log('>>> r =', r)
    this.webshare.share({
      title: r['title']
    }).catch(e => {console.log(e)} )
  }

}


