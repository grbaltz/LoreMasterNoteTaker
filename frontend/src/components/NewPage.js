import { usePagesContext } from '../hooks/usePagesContext';

// components
import CreatePageForm from './CreatePageForm';
import PageDetails from './PageDetails';
import DeletePageButton from './DeletePageButton';

const NewPage = () => {
    const {pages} = usePagesContext();
    
    return (
      <div className="main-content">
        <CreatePageForm />
      </div>
    )
}

export default NewPage;