export interface IBook {
  _id: string;
  title: string;
  author: string;
  img: string;
  genre: string;
  publicationDate: string;
  reviews?: Array<string>;
}
