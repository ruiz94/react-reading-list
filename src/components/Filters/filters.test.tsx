import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { useReadingList } from '@/store';
import { Filters } from './index';
import { describe, expect, it } from 'vitest';
import { MOCK_BOOKS } from '@/mocks';

describe('Filter component', () => {
  const state = useReadingList.getState();
  state.setAvailableBooks(MOCK_BOOKS);

  it('should have Filter as a name of the section', () => {
    render(<Filters />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title.innerHTML).toBe('Filters');
  });

  it('should show the genres list, 3 genres', () => {
    render(<Filters />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[1].innerHTML).toBe(MOCK_BOOKS[0].genre);
  });

  it('should have selected --Choose an option-- by default', () => {
    render(<Filters />);

    const options = screen.getAllByRole('option');

    expect(options[0].innerHTML).toBe('--Choose an option--');
  });

  it('should update filters', async () => {
    const { result } = renderHook(() => useReadingList(state => state.filters));
    await waitFor(() => {
      expect(result.current.genre).toBeNull();
    });

    render(<Filters />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: MOCK_BOOKS[1].genre } });

    const { result: res } = renderHook(() =>
      useReadingList(state => state.filters),
    );

    await waitFor(() => {
      expect(res.current.genre).toBe(MOCK_BOOKS[1].genre);
    });
  });
});
