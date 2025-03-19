import { useEffect } from "react"
import { useReadingList } from "../store";

export const useFetchBooks = () => {
  const setAvailableBooks = useReadingList( state => state.setAvailableBooks);

  useEffect( () => {
    fetch('https://ruiz94.github.io/json-data/books.json')
    .then(response => response.json())
    .then( data => {
      setAvailableBooks(data);
    })
    .catch( (error: Error) => {
      console.error(error.message)
    })
  }, [setAvailableBooks])
}