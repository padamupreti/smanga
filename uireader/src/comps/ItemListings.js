import { useLocation, Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import '../styles/itemlistings.scss'
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
                    <Link to="/" className="home-button">
                        Home
                    </Link>
                    <table className="list-table">
                        <thead>
                            <tr>
                                <th>
                                    {`${itemTitle}s`} - {data.name}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[`${itemType}s`].map((itemNum) => (
                                <tr key={itemNum}>
                                    <td>
                                        <Link to={`${itemNum}/`}>
                                            {`${itemTitle}`} {'#' + itemNum}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default ItemListings
