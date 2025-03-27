import { render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ReadingList } from './ReadingList';
import { useReadingList } from '@/store';
import { MOCK_BOOKS } from '@/mocks';

describe('ReadingList component', () => {
  it('should not be render when readingList is empty', () => {
    render(<ReadingList />);
    expect(screen.queryByText(/Reading List ( 0 )/i)).not.toBeInTheDocument();
  });

  it('should be render when readingList have values', async () => {
    const { result } = renderHook(() => {
      const setAvailableBooks = useReadingList(
        state => state.setAvailableBooks,
      );
      setAvailableBooks(MOCK_BOOKS);
      const addBookToReadingList = useReadingList(
        state => state.addBookToReadingList,
      );
      addBookToReadingList(MOCK_BOOKS[0].ISBN);
      const readingList = useReadingList(state => state.readingList);
      return readingList;
    });

    render(<ReadingList />);

    expect(
      screen.getByText(`Reading List ( ${result.current.length} )`),
    ).toBeInTheDocument();
  });
});
