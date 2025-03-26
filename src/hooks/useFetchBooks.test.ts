import { vi, it, describe, beforeEach, afterEach, expect } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useFetchBooks } from './useFetchBooks'
import { MOCK_BOOKS } from '@/mocks'
import { useReadingList } from '@/store/useReadingList.ts'

const originalState = useReadingList.getState()

describe('useFetchBooks with Zustand store', () => {

  beforeEach( () => {
    useReadingList.setState(originalState);
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_BOOKS
    } as Response);
  })

  afterEach( () => {
    vi.restoreAllMocks();
  })

  it('should render', () => {
    act(() => {
      renderHook(() => useFetchBooks())
    })
  })

  it('should update availableBooks with fetched data', async () => {

    const { result: initialAvailableBooks } = renderHook(() => useReadingList(state => state.availableBooks));
    await waitFor(() => {
      expect(initialAvailableBooks.current).toStrictEqual([]);
    });

    act(() => {
      renderHook(() => useFetchBooks())
    })

    const { result } = renderHook(() => useReadingList(state => state.availableBooks));
    await waitFor(() => {
      expect(result.current).toBe(MOCK_BOOKS);
    });
  })

  it('should set an error to the Zustand store when there is no VITE_API_BOOKS', async () => {
    const mockApi = 'http://test-api.com'
    vi.stubEnv('VITE_API_BOOKS', mockApi)
    const errorMessage = `There was an error trying to fetch this API:${mockApi}`
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    const { result: initialErrorOnFetchingBooks } = renderHook(() => useReadingList(state => state.errorOnFetchingBooks));
    await waitFor(() => {
      expect(initialErrorOnFetchingBooks.current).toBeNull();
    });

    await act(() => {
      renderHook(() => useFetchBooks())
    })

    const { result: errorOnFetchingBooksAfterFetch } = renderHook(() => useReadingList(state => state.errorOnFetchingBooks));
    await waitFor(() => {
      expect(errorOnFetchingBooksAfterFetch.current).toEqual(errorMessage);
    });
  })
})