
import { useReadingList } from '@/store';
import { Book } from '@/types/readingList';

export const AvailableBooks = () => {
  const availableBooks = useReadingList(state => state.availableBooks);

  return <div>
    {availableBooks.map((book: Book) => (
        <div key={book.ISBN}>
          <span>Title: {book.title}</span>

        </div>
      ))}
  </div>
}