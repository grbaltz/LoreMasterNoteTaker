import React, { createContext, useReducer, useEffect } from "react";
import axios from 'axios';

// Create the PagesContext
export const PagesContext = createContext();

const structurePages = (pages) => {
    const pageMap = new Map();

    // Create a mpa of page ids to objects
    pages.forEach(page => pageMap.set(page._id, { ...page, children: [] }));

    const structuredPages = [];

    pageMap.forEach((page, id) => {
        if (page.parent) {
            if (pageMap.has(page.parent)) {
                pageMap.get(page.parent).children.push(page); // adds the current page to the list of children for the parent page
            }
        } else {
            structuredPages.push(page); // top level page, hence saved in top level list
        }
    });

    return structuredPages;
}

// Define the reducer to handle different actions
export const pagesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGES':
            return {
                ...state,
                // pages: action.payload
                pages: structurePages(action.payload)
            };
            case 'CREATE_PAGE':
                // Add the new page to the state
                const newPage = action.payload;

                const addChild = (pages, newPage) => {
                    return pages.map(page => {
                    if (page._id === newPage.parent) {
                        // Add the new page to its parent's children array
                        return {
                        ...page,
                        children: [...(page.children || []), newPage],
                        };
                    }
                    if (page.children && page.children.length > 0) {
                        return {
                        ...page,
                        children: addChild(page.children, newPage),
                        };
                    }
                    return page;
                    });
                };

                let updatedPages = addChild(state.pages, newPage);

                // If newPage has no parent, it's a top-level page
                if (!newPage.parent) {
                    updatedPages = [...state.pages, newPage];
                }

                return {
                    ...state,
                    pages: updatedPages,
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
