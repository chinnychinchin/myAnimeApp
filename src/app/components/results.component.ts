import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import { NgNavigatorShareService } from 'ng-navigator-share';
import { Searchsvc } from '../searchHistory';
import { AnimeInfo, Search } from '../models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private webshare: NgNavigatorShareService, private searchSvc: Searchsvc) { }

  results //[ {}, {}, {}]
  canShare = false
  search: Search
  daysAgo: number 

  ngOnInit(): void {

    this.canShare = this.webshare.canShare();
    this.search = { q: this.activatedRoute.snapshot.params.q, type: this.activatedRoute.snapshot.params.type }
    this.searchSvc.retrieveResults({q: this.search.q, type: this.search.type}).then(result => {
      //console.log(result)
      //if search without saving, result = [], if clicked save, result = [{id: 1, q: 'One', type: 'manga}], 
      if(result.length == 0){
        this.apiRequest().then(result => {this.results = result['results']})
      }

      else if(result[0].results == undefined){
        this.apiRequest().then(a => {
          this.results = a['results']
          this.search = result[0]
          this.search.results = this.results.map(i => { return { image_url: i.image_url, title: i.title, synopsis: i.synopsis, url: i.url }})
          //console.log(this.search)
          this.searchSvc.storeAnimeResults(this.search)
          this.daysAgo = this.getDaysElapsed(result[0].date)
        })
        
      }

      else{
        console.log("retrieving from db...")
        this.searchSvc.retrieveResults(this.search).then(a => {
          this.results = a[0].results;
          this.daysAgo = this.getDaysElapsed(result[0].date)
        })
      }
      
    })
    
  }


  private apiRequest() {

    const params = new HttpParams().set('q', this.search.q)
    return this.http.get(`https://api.jikan.moe/v3/search/${this.search.type}`, {params: params}).toPromise()
  }

  shareThis(idx) {
    const r = this.results[idx]//r = { }
    this.webshare.share({
      title: r['title'],
      text: r['synopsis'],
      url: r['url']
    }).catch(e => {console.log(e)} )
  }

  getDaysElapsed(date: Date) {
    const now = new Date ();
    const millisecondsElapsed = now.getTime() - date.getTime();
    const daysElapsed = Math.floor(millisecondsElapsed/(1000*60*60*24))
    return daysElapsed
  }

}


