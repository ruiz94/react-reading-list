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

export type FilterNames = 'genre'
export interface ReadingListHookProps {
  availableBooks: Book[],
  readingList: Book[],
  genres: string[],
  filters: {
    genre: string | null,
    pages: number | null
  }
  setAvailableBooks: (books: Book[]) => void,
  addBookToReadingList: (ISBN: Book["ISBN"]) => void,
  removeBookFromReadingList: (ISBN: Book["ISBN"]) => void,
  updateFilters: (filterName: FilterNames, filterValue: string) => void,
  errorOnFetchingBooks: null | string,
  setErrorOnFetchingBooks: (error: string) => void
}