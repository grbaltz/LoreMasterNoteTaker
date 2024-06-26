import React, { createContext, useReducer, useEffect } from "react";
import axios from 'axios';

// Create the PagesContext
export const PagesContext = createContext();

// Define the reducer to handle different actions
export const pagesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGES':
            return {
                ...state,
                pages: action.payload
            };
        case 'CREATE_PAGE':
            return {
                ...state,
                pages: [action.payload, ...state.pages]
            };
        case 'DELETE_PAGE':
            return {
                ...state,
                pages: state.pages.filter(page => page._id !== action.payload)
            };
        case 'UPDATE_PAGE':
            return {
                ...state,
                pages: state.pages.map(page =>
                    page._id === action.payload._id ? action.payload : page
                )
            };
        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return state;
    }
};

// PagesContextProvider component to provide context to its children
export const PagesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pagesReducer, {
        pages: []
    });

    useEffect(() => {
        // Fetch all pages from the server when the provider mounts
        const fetchPages = async () => {
            try {
                const response = await axios.get('/pages/');
                dispatch({ type: 'SET_PAGES', payload: response.data });
            } catch (error) {
                console.error('Failed to fetch pages', error);
            }
        };

        fetchPages();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <PagesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PagesContext.Provider>
    );
};
