import { useEffect } from 'react'
import { useReadingList } from '../store'

export const useFetchBooks = () => {
  const setAvailableBooks = useReadingList(state => state.setAvailableBooks)
  const setErrorOnFetchingBooks = useReadingList(state => state.setErrorOnFetchingBooks)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BOOKS || '')
      .then(response => response.json())
      .then(data => {
        setAvailableBooks(data)
      })
      .catch(() => {
        setErrorOnFetchingBooks(`There was an error trying to fetch this API:${import.meta.env.VITE_API_BOOKS}`)
      })
  }, [setAvailableBooks, setErrorOnFetchingBooks])
}
