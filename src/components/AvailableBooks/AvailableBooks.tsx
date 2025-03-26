import { useReadingList } from '@/store';
import type { Book as BookType } from '@/types/readingList';
import { BookContainer } from './BookContainer';
import { Filters } from '../Filters';

type BookKye = keyof BookType;

export const AvailableBooks = () => {
  const availableBooks = useReadingList(state => state.availableBooks);
  const filters = useReadingList(state => state.filters);
  const errorOnFetchingBooks = useReadingList(
    state => state.errorOnFetchingBooks,
  );

  const arrFilters = Object.entries(filters);

  const filteredBooks = availableBooks.filter(book => {
    for (const [name, value] of arrFilters) {
      const keyBook = name as BookKye;
      if (value && book[keyBook] !== value) {
        return false;
      }
    }
    return true;
  });

  const countAvailableBooks = filteredBooks.length;

  return (
    <section className='w-full'>
      <h1 className='text-3xl'>Available Books ( {countAvailableBooks} )</h1>
      <Filters />
      <div className='grid gap-2 grid-cols-2 md:grid-cols-3 md:gap-y-10 2xl:grid-cols-4'>
        {filteredBooks.map((book: BookType) => (
          <BookContainer key={book.ISBN} book={book} />
        ))}
        {errorOnFetchingBooks && (
          <div>
            <strong>Error!</strong>
            <p>{errorOnFetchingBooks}</p>
          </div>
        )}
      </div>
    </section>
  );
};
