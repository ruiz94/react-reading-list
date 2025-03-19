import './App.css';
import { useReadingList } from './store';
import type { Book } from './types/readingList';
import { useFetchBooks } from './hooks';

function App() {
  const availableBooks = useReadingList(state => state.availableBooks);
  const errorOnFetchingBooks = useReadingList( state => state.errorOnFetchingBooks);
  useFetchBooks();

  return (
    <>
      <h1>Available Books</h1>
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
    </>
  );
}

export default App;
