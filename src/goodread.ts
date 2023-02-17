import Parser from "rss-parser";
import {
  BaseItem,
  ContentData,
  GoodreadOptions,
  Item,
  ResponseItem,
  RSSResponse,
} from "./types";

import { camelCase, extractLinks } from "./utils";

const booksParse = (items: Item[]) => {
  const books = items.map((item) => {
    const content = item.content.split("<br/>\n").map((contentLine) => {
      return contentLine.trim();
    });

    const { bookLink, imageLink } = extractLinks(content[0]);

    const object: { [key: string]: any } = {};

    content.splice(1).forEach((detail, i) => {
      if (detail == "") return;
      const [k, v] = detail.split(":").map((s) => s.trim());
      object[camelCase(k)] = v;
    });

    // Remove the first 5 characters ('<br/>') of the review
    object.review = object.review.slice(5).replace(/<br\s*\/?>/gi, "\n");

    object.rating = object.rating === "0" ? null : parseFloat(object.rating);
    object.averageRating = parseFloat(object.averageRating);
    object.dateAdded = object.dateAdded === "" ? null : object.dateAdded;
    object.readAt = object.readAt === "" ? null : object.readAt;
    object.review = object.review === "" ? null : object.review;

    item.contentSnippet =
      item.contentSnippet === "" ? null : item.contentSnippet;
    // Split the shelves into an array
    object.shelves = object.shelves.split(",").map((s: string) => s.trim());

    const temp: any = { ...item };
    delete temp.content;

    const result: ResponseItem = {
      ...(temp as BaseItem),
      ...(object as ContentData),
      imageLink,
      bookLink,
    };
    return result;
  });

  return books;
};

export const fetchShelve = async (options: GoodreadOptions) => {
  const { username, shelf } = options;
  const parser = new Parser();

  const feed = (await parser.parseURL(
    `https://www.goodreads.com/review/list_rss/${username}?shelf=${shelf}`
  )) as RSSResponse;

  return booksParse(feed.items);
};
