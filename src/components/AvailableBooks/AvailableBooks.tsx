import { useReadingList } from '@/store';
import { Book } from '@/types/readingList';

export const AvailableBooks = () => {
  const availableBooks = useReadingList(state => state.availableBooks);
  const errorOnFetchingBooks = useReadingList(
    state => state.errorOnFetchingBooks,
  );

  return (
    <div>
      {availableBooks.map((book: Book) => (
        <div key={book.ISBN}>
          <span>Title: {book.title}</span>
        </div>
      ))}
      {errorOnFetchingBooks && (
        <div>
          <strong>Error!</strong>
          <p>{errorOnFetchingBooks}</p>
        </div>
      )}
    </div>
  );
};
