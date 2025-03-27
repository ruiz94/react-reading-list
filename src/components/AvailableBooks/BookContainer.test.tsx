import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BookContainer } from './BookContainer';
import { MOCK_BOOKS } from '@/mocks';
import { useReadingList } from '@/store';

describe('ReadingList: BookContainer ', () => {
  const state = useReadingList.getState();
  state.setAvailableBooks(MOCK_BOOKS);

  it('should show an add button', () => {
    render(<BookContainer book={MOCK_BOOKS[0]} />);

    expect(
      screen.getByRole('button', { name: /Add to reading list/i }),
    ).toBeInTheDocument();
  });

  it('should call addBookToReadingList', async () => {
    render(<BookContainer book={MOCK_BOOKS[0]} />);
    const { result: readingList } = renderHook(() =>
      useReadingList(state => state.readingList),
    );

    await waitFor(() => {
      expect(readingList.current).toStrictEqual([]);
    });

    await act(() => {
      fireEvent.click(
        screen.getByRole('button', { name: /Add to reading list/i }),
      );
    });

    await waitFor(() => {
      expect(readingList.current).toStrictEqual([MOCK_BOOKS[0]]);
    });
  });
});
