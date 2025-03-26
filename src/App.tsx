import './App.css';
import { useFetchBooks } from '@/hooks';
import { AvailableBooks } from '@/components';
import { ReadingList } from './components/ReadingList/ReadingList';

function App() {
  useFetchBooks();

  return (
    <section className='flex'>
      <AvailableBooks />
      <ReadingList />
    </section>
  );
}

export default App;
