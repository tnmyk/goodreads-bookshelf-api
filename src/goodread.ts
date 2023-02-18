import Parser from "rss-parser";
import {
  BaseItem,
  ContentData,
  GoodreadOptions,
  Item,
  ResponseItem,
  GoodreadsRSSResponse,
} from "./types";

import { camelCase, extractLinks } from "./utils";

export default class GoodreadsShelve {
  constructor(private options: GoodreadOptions) {
    this.options = options;
  }

  fetch = async () => {
    try {
      const { username, shelf } = this.options;

      if (!username) {
        throw new Error("Username is required");
      } else if (!shelf) {
        throw new Error("Shelf is required");
      }
      const parser = new Parser();

      try {
        const feed = (await parser.parseURL(
          `https://www.goodreads.com/review/list_rss/${username}?shelf=${shelf}`
        )) as GoodreadsRSSResponse;

        return this.booksParse(feed.items);
      } catch (err: any) {
        throw new Error("Unable to fetch the shelve " + err.message);
      }
    } catch (err) {
      throw err;
    }
  };

  private booksParse = (items: Item[]) => {
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
      if (object.shelves.length === 1 && object.shelves[0] === "") {
        object.shelves = [this.options.shelf];
      }
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
}
