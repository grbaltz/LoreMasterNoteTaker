const PageDetails = ({ page }) => {

    return (
        <div className="page-details">
            <h4>{page.title}</h4>
            <p><strong>Tags: </strong>{page.tags}</p>
            <p>{page.createdAt}</p>
        </div>
    )
}

export default PageDetails;