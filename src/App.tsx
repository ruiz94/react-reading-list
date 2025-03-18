import './App.css';
import { useReadingList } from './store';
import type { Book } from './types/readingList';

function App() {
  const availableBooks = useReadingList(state => state.availableBooks);

  return (
    <>
      <h1>Available Books</h1>
      {availableBooks.map((book: Book) => (
        <div key={book.ISBN}>
          <span>Title: {book.title}</span>
        </div>
      ))}
    </>
  );
}

export default App;
