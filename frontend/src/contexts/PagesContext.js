import { createContext, useReducer } from "react";

export const PagesContext = createContext()

export const pagesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGES':
            // set all pages
            return {
                pages: action.payload
            }
        case 'CREATE_PAGE':
            // create page
            return {
                pages: [action.payload, ...state.pages]
            }
        case 'DELETE_PAGE':
            // delete page
            return {
                pages: state.pages.filter(page => page._id !== action.payload)
            }
        case 'UPDATE_PAGE':
            // update page
            return {
                // nothing yet
            }
        default:
            return state
    }
}

export const PagesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pagesReducer, {
        pages: null
    })

    return (
        <PagesContext.Provider value={{...state, dispatch}}>
            { children }
        </PagesContext.Provider>
    )
}