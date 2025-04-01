import { useEffect } from 'react'
import { useReadingList } from '../store'
import { useLocalStorage } from './useLocalStorage'

export const useFetchBooks = () => {
  const setErrorOnFetchingBooks = useReadingList(state => state.setErrorOnFetchingBooks)
  const { getLocalState } = useLocalStorage()

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BOOKS || '')
      .then(response => response.json())
      .then(data => {
        const localState = getLocalState(data);
        useReadingList.setState(state => ({ ...state, ...localState }))
      })
      .catch(() => {
        setErrorOnFetchingBooks(`There was an error trying to fetch this API:${import.meta.env.VITE_API_BOOKS}`)
      })
  }, [setErrorOnFetchingBooks, getLocalState])
}
