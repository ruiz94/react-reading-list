import { useReadingList } from '@/store';
import type { Book as BookType } from '@/types/readingList';
import { Book } from '../Book';

export const AvailableBooks = () => {
  const availableBooks = useReadingList(state => state.availableBooks);
  const errorOnFetchingBooks = useReadingList(
    state => state.errorOnFetchingBooks,
  );

  return (
    <div>
      {availableBooks.map((book: BookType) => (
        <Book key={book.ISBN} {...book} />
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
