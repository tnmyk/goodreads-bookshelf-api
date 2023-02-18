export const camelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const extractLinks = (str: string) => {
  const bookLinkRegex = /href="([^"]*)"/;
  const bookLinkMatch = str.match(bookLinkRegex);
  const bookLink = bookLinkMatch ? bookLinkMatch[1] : "";

  const shortenedBookLink = bookLink.split("?")[0];

  const imageLinkRegex = /src="([^"]*)"/;
  const imageLinkMatch = str.match(imageLinkRegex);
  const imageLink = (imageLinkMatch ? imageLinkMatch[1] : "").replace(
    /\._.*?_/,
    ""
  );

  return { bookLink: shortenedBookLink, imageLink };
};
