import { BookProps } from '@/types/Book';
import { Book } from '../Book';
import { useReadingList } from '@/store';

export const BookContainer = ({ book }: { book: BookProps }) => {
  const removeBook = useReadingList(state => state.removeBookFromReadingList);
  const handleClickRemoveButton = () => removeBook(book.ISBN);

  return (
    <div className=''>
      <Book {...book} />
      <button
        onClick={handleClickRemoveButton}
        className='bg-red-600 text-stone-100 rounded-lg py-2 px-4 mt-2 hover:bg-red-500 cursor-pointer'
      >
        Remove 🗑️
      </button>
    </div>
  );
};
