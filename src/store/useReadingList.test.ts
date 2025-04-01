import { describe, expect, it, beforeEach } from "vitest";
import { useReadingList } from "./useReadingList";
import { renderHook, waitFor, act } from "@testing-library/react";
import { MOCK_BOOKS } from "@/mocks";

const initialState = useReadingList.getState()
describe('useReadingList Store', () => {
  const state = useReadingList.getState();

  beforeEach( () => {
    useReadingList.setState(initialState);
  })

  it('should have initial state', async () => {
    const { result } = renderHook( () => useReadingList());

    await waitFor( () => {
      const {
        availableBooks,
        readingList, 
        genres,
        filters
      } = result.current;

      expect(availableBooks).toStrictEqual([]);
      expect(readingList).toStrictEqual([]);
      expect(genres).toStrictEqual([])
      expect(filters).toStrictEqual({ genre: null, pages: null })
    })
  })

  it('should set the state for availableBooks and genres', async () => {
    const { result } = renderHook(() => useReadingList())

    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual([])
    })

    act( () => {
      state.setAvailableBooks(MOCK_BOOKS);
    })
    
    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual(MOCK_BOOKS)
    })
  })

  it('should add a book', async () => {
    const { result } = renderHook(() => useReadingList())

    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual([])
      expect(result.current.readingList).toStrictEqual([])
    })

    act( () => {
      state.setAvailableBooks(MOCK_BOOKS);
      state.addBookToReadingList(MOCK_BOOKS[0].ISBN);
    })

    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual([MOCK_BOOKS[1]])
      expect(result.current.readingList).toStrictEqual([MOCK_BOOKS[0]])
    })

    act( () => {
      state.addBookToReadingList('fake-ISBN');
    })

    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual([MOCK_BOOKS[1]])
      expect(result.current.readingList).toStrictEqual([MOCK_BOOKS[0]])
    })
  })

  it('should remove a book', async () => {
    const { result } = renderHook(() => useReadingList())

    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual([])
      expect(result.current.readingList).toStrictEqual([])
    })

    act( () => {
      state.setAvailableBooks(MOCK_BOOKS);
      state.addBookToReadingList(MOCK_BOOKS[0].ISBN);
    })

    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual([MOCK_BOOKS[1]])
      expect(result.current.readingList).toStrictEqual([MOCK_BOOKS[0]])
    })

    act( () => {
      state.removeBookFromReadingList(MOCK_BOOKS[0].ISBN);
    })

    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual(MOCK_BOOKS)
      expect(result.current.readingList).toStrictEqual([])
    })

    act( () => {
      state.removeBookFromReadingList('fake-ISBN');
    })

    await waitFor( () => {
      expect(result.current.availableBooks).toStrictEqual(MOCK_BOOKS)
      expect(result.current.readingList).toStrictEqual([])
    })
  })

  it('should update filters', async () => {
    const { result } = renderHook(() => useReadingList())

    await waitFor( () => {
      expect(result.current.filters).toStrictEqual({ genre: null, pages: null })
    })

    act( () => {
      state.updateFilters('genre', MOCK_BOOKS[0].genre);
    })

    await waitFor( () => {
      expect(result.current.filters).toStrictEqual({ genre: MOCK_BOOKS[0].genre, pages: null })
    })

    act( () => {
      state.updateFilters('genre', '');
    })

    await waitFor( () => {
      expect(result.current.filters).toStrictEqual({ genre: null, pages: null })
    })
  })

  it('should set an error', async () => {
    const { result } = renderHook(() => useReadingList())

    await waitFor( () => {
      expect(result.current.errorOnFetchingBooks).toBeNull()
    })

    act( () => {
      state.setErrorOnFetchingBooks('Error: testing');
    })

    await waitFor( () => {
      expect(result.current.errorOnFetchingBooks).toBe('Error: testing')
    })

    act( () => {
      state.setErrorOnFetchingBooks(null);
    })

    await waitFor( () => {
      expect(result.current.errorOnFetchingBooks).toBeNull()
    })
  })
})