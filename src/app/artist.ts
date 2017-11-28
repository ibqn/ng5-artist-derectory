export class Artist {
  constructor(
    public id: string,
    public name: string,
    public shortname: string,
    public reknown: string,
    public bio: string,
  ) { }
}

export interface ArtistItem {
  artist: Artist;
  prevId: string;
  nextId: string;
}
