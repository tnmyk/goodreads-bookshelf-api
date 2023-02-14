import Parser from "rss-parser";
import { GoodreadOptions, Item, RSSResponse } from "./types/global";

const camelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

const booksFormat = (items: Item[]) => {
  const books = items.map((item) => {
    const content = item.content.split("<br/>\n").map((contentLine) => {
      return contentLine.trim();
    });

    const f = content[0];
    const bookLinkRegex = /href="([^"]*)"/;
    const bookLinkMatch = f.match(bookLinkRegex);
    const bookLink = bookLinkMatch ? bookLinkMatch[1] : "";

    const imageLinkRegex = /src="([^"]*)"/;
    const imageLinkMatch = f.match(imageLinkRegex);
    const imageLink = (imageLinkMatch ? imageLinkMatch[1] : "").replace(
      /\._.*?_/,
      ""
    );

    let object: any = {};

    content.splice(1).forEach((detail, i) => {
      if (detail == "") return;
      const [k, v] = detail.split(":").map((s) => s.trim());
      object[camelCase(k)] = v;
    });

    // Remove the first 5 characters ('<br/>') of the review
    object.review = object.review.slice(5).replace(/<br\s*\/?>/gi, "\n");
    object.rating = object.rating === "0" ? null : parseInt(object.rating);
    object.dateAdded = object.dateAdded === "" ? null : object.dateAdded;
    object.readAt = object.readAt === "" ? null : object.readAt;
    object.review = object.review === "" ? null : object.review;
    item.contentSnippet =
      item.contentSnippet === "" ? null : item.contentSnippet;
    // Split the shelves into an array
    object.shelves = object.shelves.split(",").map((s: string) => s.trim());

    object = { ...object, bookLink, imageLink, ...item };
    delete object.content;
    return object;
  });

  return books;
};

export const getData = async (options: GoodreadOptions) => {
  const { username, shelf } = options;
  const parser = new Parser();

  const feed = (await parser.parseURL(
    `https://www.goodreads.com/review/list_rss/${username}?shelf=${shelf}`
  )) as RSSResponse;

  // console.log(feed);
  console.log(booksFormat(feed.items)[0]);
};
