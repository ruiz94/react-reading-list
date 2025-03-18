import { create } from "zustand";
import type { Book, ReadingListHookProps } from "../types/readingList";
import { MOCK_BOOKS } from "../mocks";

export const useReadingList = create<ReadingListHookProps>((set) => ({
  availableBooks: MOCK_BOOKS,
  setAvailableBooks: (books: Book[]) => set( () => ({ availableBooks: books }))
}))