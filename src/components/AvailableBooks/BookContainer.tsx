import { useReadingList } from '@/store';
import { Book } from '../Book';
import { BookProps } from '@/types/Book';

export const BookContainer = ({ book }: { book: BookProps }) => {
  const addBookToReadingList = useReadingList(
    event => event.addBookToReadingList,
  );

  const handleClickAddButton = () => {
    addBookToReadingList(book.ISBN);
  };

  return (
    <div className='flex flex-col justify-end items-center'>
      <Book {...book} />
      <button
        onClick={handleClickAddButton}
        className='bg-green-700 text-stone-100 rounded-lg py-2 px-4 mt-2 hover:bg-green-600 cursor-pointer'
      >
        Add to reading list 📚
      </button>
    </div>
  );
};
