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
        this.version(2).stores({
            search: '++id,q'
        })

        this.search = this.table('search')
    }

    //Methods

    //save
    addSearch(s: Search) : Promise<any> {
        s.q = normaliseSearch(s.q)
        return this.search.add(s);
    }

    //delete 
    deleteSearch(id: string) : Promise<any> {
        return this.search.where('id').equals(id).delete()
    }



    //retrieve all history
    getSearchHistory() : Promise<Search[]> {
        return this.search.toArray();
    }
    
    //find documents
    searchDb(s :Search): Promise<any> {

        return this.search.where('q').equals(s.q).and(doc => doc.type == s.type).count()
        
    }

    retrieveResults(s: Search): Promise<Search[]> {
        return this.search.where('q').equals(s.q).and(doc => doc.type == s.type).toArray()
    }

    storeAnimeResults(s: Search) : Promise<any> {
        return this.search.where('id').equals(s.id).modify(s)
         
    }

} 
