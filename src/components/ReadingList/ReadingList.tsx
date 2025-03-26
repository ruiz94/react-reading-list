import { useReadingList } from '@/store';
import { BookContainer } from './BookContainer';

export const ReadingList = () => {
  const readingList = useReadingList(state => state.readingList);

  if (readingList.length === 0) return null;

  const countReadingList = readingList.length;

  return (
    <section className='w-2xl bg-gray-500 m-10 p-4 rounded-lg'>
      <h2 className='text-3xl'>Reading List ( {countReadingList} )</h2>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4'>
        {readingList.map(book => (
          <BookContainer book={book} />
        ))}
      </div>
    </section>
  );
};
