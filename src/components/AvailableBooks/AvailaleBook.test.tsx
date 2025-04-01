import { render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { AvailableBooks } from './AvailableBooks';
import { useReadingList } from '@/store';
import { MOCK_BOOKS } from '@/mocks';

const initialState = useReadingList.getState();
describe('AvailableBook Component', () => {
  beforeEach(async () => {
    useReadingList.setState(initialState);
  });

  it('should redner', () => {
    render(<AvailableBooks />);
  });

  it('should show no books', () => {
    render(<AvailableBooks />);

    expect(screen.getByText(/Available Books \( 0 \)/i)).toBeInTheDocument();

    expect(
      screen.getByText(/There is no available books/i),
    ).toBeInTheDocument();
  });

  it('should show a books', async () => {
    await renderHook(() => {
      const setAvailableBooks = useReadingList(
        state => state.setAvailableBooks,
      );
      setAvailableBooks([MOCK_BOOKS[0]]);
    });
    render(<AvailableBooks />);

    expect(screen.getByText(/Available Books \( 1 \)/i)).toBeInTheDocument();

    const books = screen.getAllByText(/Add to reading list/i);
    expect(books).toHaveLength(1);
  });

  it('should show an error', async () => {
    await renderHook(() => {
      const setErrorOnFetchingBooks = useReadingList(
        state => state.setErrorOnFetchingBooks,
      );
      setErrorOnFetchingBooks('Mock error');
    });

    render(<AvailableBooks />);

    expect(screen.getByText(/Available Books \( 0 \)/i)).toBeInTheDocument();

    const books = screen.queryAllByText(/Add to reading list/i);
    expect(books).toHaveLength(0);

    expect(screen.getByText(/Error!/i)).toBeInTheDocument();
    expect(screen.getByText(/Error!/i).tagName).toBe('STRONG');
    expect(screen.getByText(/Mock error/i)).toBeInTheDocument();
  });
});
