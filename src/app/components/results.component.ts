import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  type
  q
  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.params.type;
    this.q = this.activatedRoute.snapshot.params.q;
  }

}
