import { Book, Filters } from "@/types/readingList"
import { getGenres } from "@/utilities"

const LOCAL_STORAGE_ITEM = 'zustand-storage'

type State = {
  availableBooks: Book[],
  readingList: Book[],
  filters: Filters,
  genres: string[]
}

type LocalStorage = {
  readingListISBNs: string[],
  filters: Filters
}

export const useLocalStorage = () => {

  const getLocalStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_ITEM)
    if(typeof data !== 'string') return null;
    return JSON.parse(data)
  }

  const getLocalState = (books: Book[]) => {
    const parsedLocalStorageData = getLocalStorage()
    
    const state: State = {
      availableBooks: [],
      readingList: [],
      filters: {
        genre: null,
        pages: null
      },
      genres: getGenres(books)
    }

    const readingListISBNs: string[] = parsedLocalStorageData?.readingListISBNs;
    if(readingListISBNs && readingListISBNs.length && books.length){

      books.map( book => {
        if(readingListISBNs.includes(book.ISBN)){
          state.readingList.push(book);
        }else{
          state.availableBooks.push(book);
        }
      })
    } else {
      state.availableBooks = books;
    }
    
    if(parsedLocalStorageData?.filters){
      state.filters = parsedLocalStorageData.filters;
    }

    return state;
  }

  const updateLocalStorage = <K extends keyof LocalStorage>(key: K, data: LocalStorage[K]) => {
    const parsedLocalStorageData = getLocalStorage()
    const initialLocalStorageState: LocalStorage = {
      readingListISBNs: parsedLocalStorageData?.readingListISBNs ? parsedLocalStorageData.readingListISBNs : [],
      filters: parsedLocalStorageData?.filters ? parsedLocalStorageData.filters : {
        genre: null,
        pages: null
      }
    }
    initialLocalStorageState[key] = data;

    localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(initialLocalStorageState))
  }

  return {
    getLocalStorage,
    getLocalState,
    updateLocalStorage
  }
}