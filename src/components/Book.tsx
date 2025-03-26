import { BookProps } from '@/types/Book';
export const Book = ({ title, genre, cover, ISBN }: BookProps) => {
  return (
    <div className='flex flex-col items-center w-[180px] text-wrap'>
      <p className='text-lg'>{title}</p>
      <img
        className='rounded-sm'
        width={100}
        height={150}
        src={cover}
        alt={title}
      />
      <div className='flex flex-col items-start text-left'>
        <p>
          <strong>Genre:</strong> {genre}
        </p>
        <p>
          <strong>ISBN:</strong> {ISBN}
        </p>
      </div>
    </div>
  );
};
