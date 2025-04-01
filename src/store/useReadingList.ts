import { create } from "zustand";
// import { getGenres } from "@/utilities";
import type { Book, FilterNames, ReadingListHookProps } from "../types/readingList";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const useReadingList = create<ReadingListHookProps>((set) => ({
  availableBooks: [],
  readingList: [],
  genres: [],
  filters: {
    genre: null,
    pages: null
  },
  setAvailableBooks: (books: Book[]) => set( () => { 
    // const genres = getGenres(books)
    return { availableBooks: books }
  }),
  addBookToReadingList: (ISBN: Book["ISBN"]) => set( (state) => {
    const book = state.availableBooks.find( book => book.ISBN === ISBN);
    const { updateLocalStorage } = useLocalStorage();
    if(!book){
      return state;
    }

    const updatedAvailableBooks = state.availableBooks.filter( book => book.ISBN !== ISBN);
    const updatedReadingList = [book, ...state.readingList];

    const ISBNs: string[] = updatedReadingList.reduce(
      (cc: string[], book) => [...cc, book.ISBN],
      [],
    );
    updateLocalStorage('readingListISBNs', ISBNs);

    return { availableBooks: updatedAvailableBooks, readingList: updatedReadingList};
  }),
  removeBookFromReadingList: (ISBN: Book["ISBN"]) => set( (state) => {
    const book = state.readingList.find( book => book.ISBN === ISBN);
    const { updateLocalStorage } = useLocalStorage();
    if(!book){
      return state;
    }

    const updatedReadingList = state.readingList.filter( book => book.ISBN !== ISBN);
    const updatedAvailableBooks = [book, ...state.availableBooks];

    const ISBNs: string[] = updatedReadingList.reduce(
      (cc: string[], book) => [...cc, book.ISBN],
      [],
    );
    updateLocalStorage('readingListISBNs', ISBNs);

    return { availableBooks: updatedAvailableBooks, readingList: updatedReadingList};
  }),
  updateFilters: (filterName: FilterNames, filterValue: string | null) => set( (state) => {
    const { updateLocalStorage } = useLocalStorage();
    let value: string | null = filterValue;
    if(filterName === 'genre'){
      value = filterValue === '' ? null : filterValue
    }
    const newFilters = { ...state.filters, [filterName]: value}
    updateLocalStorage('filters', newFilters);
    return { filters: newFilters}
  }),
  errorOnFetchingBooks: null,
  setErrorOnFetchingBooks: (error: string | null) => set( () => ({ errorOnFetchingBooks: error}))
}))