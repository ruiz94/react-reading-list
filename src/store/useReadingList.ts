import { create } from "zustand";
import type { Book, ReadingListHookProps } from "../types/readingList";

export const useReadingList = create<ReadingListHookProps>((set) => ({
  availableBooks: [],
  setAvailableBooks: (books: Book[]) => set( () => ({ availableBooks: books })),
  errorOnFetchingBooks: null,
  setErrorOnFetchingBooks: (error) => set( () => ({ errorOnFetchingBooks: error}))
}))