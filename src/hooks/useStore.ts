// create the inicial state - 1
import { useReducer } from 'react'
import { type Language, type Action, type State, type FromLanguage } from '../types'
import { AUTO_LANGUAGE } from '../constans'

const initialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// create a reducer - 2
function reducer (state: State, action: Action) {
  const { type } = action

  switch (type) {
    case 'INTERCHANGE_LANGUAGES' : {
      if (state.fromLanguage === AUTO_LANGUAGE) return state

      const loading = state.fromText !== ''

      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        loading,
        result: ''
      }
    }

    case 'SET_FROM_LANGUAGE' : {
      if (state.fromLanguage === action.payload) return state
      const loading = state.fromText !== ''
      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading
      }
    }

    case 'SET_TO_LANGUAGE' : {
      if (state.toLanguage === action.payload) return state
      const loading = state.fromText !== ''
      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading
      }
    }

    case 'SET_FROM_TEXT' : {
      const loading = action.payload !== ''
      return {
        ...state,
        loading,
        fromText: action.payload,
        result: ''
      }
    }

    case 'SET_RESULT' : {
      return {
        ...state,
        loading: false,
        result: action.payload
      }
    }

    default : {
      return state
    }
  }
}

export function useStore () {
  // hook use reducer - 3
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interChangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
