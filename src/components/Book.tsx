import { BookProps } from '@/types/Book';
export const Book = ({ title, genre, cover, ISBN }: BookProps) => {
  return (
    <div>
      <p>{title}</p>
      <img width={100} height={150} src={cover} alt={title} />
      <div>
        <p>Genre: {genre}</p>
        <p>ISBN: {ISBN}</p>
      </div>
    </div>
  );
};
