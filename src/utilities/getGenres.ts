import { Book } from "@/types/readingList";

export const getGenres = (books: Book[]): string[] => books.reduce( (list: string[], book) => list.includes(book.genre) ? list : [...list, book.genre], [])