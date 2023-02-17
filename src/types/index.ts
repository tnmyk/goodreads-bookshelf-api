export type GoodreadOptions = {
  username: string;
  shelf: string;
};

export interface RSSResponse {
  items: Item[];
  feedUrl: string;
  image: Image;
  paginationLinks: PaginationLinks;
  title: string;
  description: string;
  link: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
  ttl: string;
}

interface PaginationLinks {
  self: string;
}

interface Image {
  link: string;
  url: string;
  title: string;
  width: string;
  height: string;
}

export interface BaseItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string | null;
  guid: string;
  isoDate: string;
}
export interface Item extends BaseItem {
  content: string;
}

export interface ContentData {
  // extends Record<string, string | number | string[]> {
  bookLink: string;
  imageLink: string;
  author: string;
  name: string;
  averageRating: number;
  bookPublished: string;
  rating: number | null;
  readAt: string | null;
  dateAdded: string;
  shelves: string[];
  review: string;
  [key: string]: any;
}

export interface ResponseItem extends ContentData, BaseItem {}
