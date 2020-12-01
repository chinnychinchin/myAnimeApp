export interface Search {

    id?: number,
    q: string,
    type: string,
    date?: Date
    results?: AnimeInfo[]
}

export interface AnimeInfo {

    image_url: string,
    title: string,
    synopsis: string
    url: string

}