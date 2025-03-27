import { create } from "zustand";
import { getGenres } from "@/utilities";
import type { Book, FilterNames, ReadingListHookProps } from "../types/readingList";

export const useReadingList = create<ReadingListHookProps>((set) => ({
  availableBooks: [],
  readingList: [],
  genres: [],
  filters: {
    genre: null,
    pages: null
  },
  setAvailableBooks: (books: Book[]) => set( () => { 
    const genres = getGenres(books)
    return { availableBooks: books, genres }
  }),
  addBookToReadingList: (ISBN: Book["ISBN"]) => set( (state) => {
    const book = state.availableBooks.find( book => book.ISBN === ISBN);
    if(!book){
      return state;
    }

    const updatedAvailableBooks = state.availableBooks.filter( book => book.ISBN !== ISBN);
    const updatedReadingList = [book, ...state.readingList];

    return { availableBooks: updatedAvailableBooks, readingList: updatedReadingList};
  }),
  removeBookFromReadingList: (ISBN: Book["ISBN"]) => set( (state) => {
    const book = state.readingList.find( book => book.ISBN === ISBN);
    if(!book){
      return state;
    }

    const updatedReadingList = state.readingList.filter( book => book.ISBN !== ISBN);
    const updatedAvailableBooks = [book, ...state.availableBooks];

    return { availableBooks: updatedAvailableBooks, readingList: updatedReadingList};
  }),
  updateFilters: (filterName: FilterNames, filterValue: string | null) => set( (state) => {
    let value: string | null = filterValue;
    if(filterName === 'genre'){
      value = filterValue === '' ? null : filterValue
    }

    return { filters: { ...state.filters, [filterName]: value}}
  }),
  errorOnFetchingBooks: null,
  setErrorOnFetchingBooks: (error: string | null) => set( () => ({ errorOnFetchingBooks: error}))
}))