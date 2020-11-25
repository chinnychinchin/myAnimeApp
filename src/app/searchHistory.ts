import { Injectable } from '@angular/core';
import { Search } from './models';
import Dexie from 'dexie';

export function normaliseSearch (s: string) {
    return s.trim().toLowerCase();
}

@Injectable()  //This Injectable thing has to be directly on top of the class I want to export as a service!
export class Searchsvc extends Dexie {

    private search: Dexie.Table<Search, number>

    constructor() {
        super('MySearches')
        this.version(1).stores({
            search: '++id'
        })

        this.search = this.table('search')
    }

    //Methods

    //save
    async addSearch(s: Search) : Promise<any> {
        s.q = normaliseSearch(s.q)
        return await this.search.add(s);
    }

    //retrieve all history
    async getSearchHistory() : Promise<any> {
        return await this.search.toArray();
    }
    
    //find documents
    // searchDb(s :Search): Promise<Search> {

    //     const searchFunc = 
    //     return this.search.where("q").equals(s.q).and(doc => doc.type == s.type)
    // }

} 
