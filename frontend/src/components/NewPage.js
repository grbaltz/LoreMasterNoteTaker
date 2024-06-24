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
        {/* <div className="pages">
          {pages && pages.map((page) => (
            <div className="newPage" key={page._id}>
              <PageDetails page={page} />
              <DeletePageButton page={page} />
            </div>
          ))}
        </div> */}
      </div>
    )
}

export default NewPage;