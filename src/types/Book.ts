import { Book } from "@/types/readingList";

export type BookProps = Pick<Book, 'title' | 'genre' | 'cover' | 'ISBN' | 'author'>