<h1 align="center" style="font-size: 10rem;">
Goodreads Bookshelf API 📔📕
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/goodreads-bookshelf-api">
     <img src="https://img.shields.io/npm/v/goodreads-bookshelf-api" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/package/goodreads-bookshelf-api">
     <img src="https://img.shields.io/npm/dt/goodreads-bookshelf-api" alt="NPM Downloads" />
  </a>
</p>

Unofficial Node Goodreads API for getting any user's bookshelf details.
<br/>

<a href="https://codesandbox.io/p/sandbox/goodreads-bookshelf-api-demo-4hboo4" target="_blank">
Live demo
</a>

## Installation

Using npm:

```bash
  npm i goodreads-bookshelf-api
```

Using yarn:

```bash
  yarn add goodreads-bookshelf-api
```

Using pnpm:

```bash
  pnpm i goodreads-bookshelf-api
```

## Usage/Examples

```js
import GoodreadsShelf from "goodreads-bookshelf-api";

const myReadShelf = new GoodreadsShelf({
  username: "50993735-emma-watson",
  shelf: "read",
});

try {
  const data = await myReadShelf.fetch();
  // handle data...
} catch (e) {
  // handle error...
}
```

## Example response data

```json
[
  {
    "title": "Pachinko",
    "link": "https://www.goodreads.com/review/show/2857752906?utm_medium=api&utm_source=rss",
    "pubDate": "Mon, 01 Jul 2019 07:04:28 -0700",
    "contentSnippet": null,
    "guid": "https://www.goodreads.com/review/show/2857752906?utm_medium=api&utm_source=rss",
    "isoDate": "2019-07-01T14:04:28.000Z",
    "author": "Min Jin Lee",
    "name": "Emma",
    "averageRating": 4.33,
    "bookPublished": "2017",
    "rating": null,
    "readAt": "2019/07/01",
    "dateAdded": "2019/07/01",
    "shelves": ["read"],
    "review": null,
    "imageLink": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1529845599l/34051011.jpg",
    "bookLink": "https://www.goodreads.com/book/show/34051011-pachinko"
  },
  {
    "title": "Fierce Femmes and Notorious Liars",
    "link": "https://www.goodreads.com/review/show/2773875452?utm_medium=api&utm_source=rss",
    "pubDate": "Fri, 14 Jun 2019 05:01:35 -0700",
    "contentSnippet": null,
    "guid": "https://www.goodreads.com/review/show/2773875452?utm_medium=api&utm_source=rss",
    "isoDate": "2019-06-14T12:01:35.000Z",
    "author": "Kai Cheng Thom",
    "name": "Emma",
    "averageRating": 4.29,
    "bookPublished": "2016",
    "rating": null,
    "readAt": "2019/06/14",
    "dateAdded": "2019/06/14",
    "shelves": ["read"],
    "review": null,
    "imageLink": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1480517872l/32279708.jpg",
    "bookLink": "https://www.goodreads.com/book/show/32279708-fierce-femmes-and-notorious-liars"
  }
  // ...
]
```

## Contributing

Contributions are always welcome!
