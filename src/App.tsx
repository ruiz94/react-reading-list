import './App.css';
import { useFetchBooks } from '@/hooks'
import { AvailableBooks } from '@/components'

function App() {
  
  useFetchBooks();

  return (
    <>
      <h1>Available Books</h1>
      <AvailableBooks/>
      
      
    </>
  );
}

export default App;
