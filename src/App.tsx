import './App.css';
import { useReadingList } from './store';
import type { Book } from './types/readingList';
import { useFetchBooks } from './hooks';

function App() {
  const availableBooks = useReadingList(state => state.availableBooks);
  const setAvailableBooks = useReadingList( state => state.setAvailableBooks);
  useFetchBooks();

  return (
    <>
      <h1>Available Books</h1>
      {availableBooks.map((book: Book) => (
        <div key={book.ISBN}>
          <span>Title: {book.title}</span>

        </div>
      ))}
      <button onClick={ () => setAvailableBooks([])}>load</button>
    </>
  );
}

export default App;
