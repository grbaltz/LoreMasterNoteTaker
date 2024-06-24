import { PagesContext } from '../contexts/PagesContext';
import { useContext } from 'react';

export const usePagesContext = () => {
    const context = useContext(PagesContext)

    if (!context) {
        throw Error('usePagesContext must be used inside a usePagesContextProvider')
    }

    return context
}