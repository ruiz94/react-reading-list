type author = {
  "name": string,
  "otherBooks": string[]
}

export type Book =  {
  "title": string,
  "pages": number,
  "genre": string,
  "cover": string,
  "synopsis": string,
  "year": number,
  "ISBN": string,
  "author": author
}

export interface ReadingListHookProps {
  availableBooks: Book[],
  setAvailableBooks: (books: Book[]) => void
}