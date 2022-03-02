import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { FaHome } from 'react-icons/fa'
import useFetch from '../hooks/useFetch'

const ItemListings = ({ baseUrl }) => {
    const { pathname } = useLocation()
    const itemType = pathname.search('/chapters') >= 0 ? 'chapter' : 'volume'
    const itemTitle = itemType.charAt(0).toUpperCase() + itemType.slice(1)
    const { series } = useParams()
    const { data, isPending, error } = useFetch(
        `${baseUrl}/api/series/${series}/${itemType}s/`
    )

    useEffect(() => {
        if (data) document.title = `${data.name} | ${itemTitle}s`
    }, [data, itemTitle])

    return (
        <>
            {error && (
                <div className="msg-div">
                    <div>{error}</div>
                </div>
            )}
            {isPending && (
                <div className="msg-div">
                    <div className="loader-inner ball-pulse-sync">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
            {data && (
                <>
                    <Link to="/" className="item-btn">
                        <FaHome /> Home
                    </Link>
                    <h1 className="heading">
                        {`${itemTitle}s`} - {data.name}
                    </h1>
                    <div className="items-container">
                        {data[`${itemType}s`].map((itemNum) => (
                            <Link
                                key={itemNum}
                                className="item-btn"
                                to={`${itemNum}/`}
                            >
                                {itemNum}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default ItemListings
