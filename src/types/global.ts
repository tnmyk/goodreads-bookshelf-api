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

export interface Item {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string | null;
  guid: string;
  isoDate: string;
}

export interface OutputItem extends Item {
  bookLink: string;
  imageLink: string;
  author: string;
  averageRating: string;
  bookPublished: string;
  rating: number;
  readAt: string;
  dateAdded: string;
  shelves: string[];
  review: string;
}
