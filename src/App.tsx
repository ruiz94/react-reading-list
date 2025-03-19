import './App.css';
import { useReadingList } from '@/store';
import { useFetchBooks } from '@/hooks';
import { AvailableBooks } from '@/components';

function App() {
  const errorOnFetchingBooks = useReadingList( state => state.errorOnFetchingBooks);
  useFetchBooks();

  return (
    <>
      <h1>Available Books</h1>
      <AvailableBooks/>
      
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
