import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import useFetch from '../hooks/useFetch'

const Listings = ({ baseUrl }) => {
    const { data, isPending, error } = useFetch(`${baseUrl}/api/series/`)

    useEffect(() => (document.title = 'MangaViewer'), [])

    return (
        <>
            {error && (
                <div className="msg-div">
                    <div>{error}</div>
                </div>
            )}
            {isPending && (
                <div className="msg-div">
                    <div>
                        <div className="loader-inner ball-pulse-sync">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            )}
            {data && (
                <>
                    <h1 className="heading">Series</h1>
                    <div className="items-container">
                        {Object.keys(data).map(
                            (series) =>
                                data[series].has_chapters && (
                                    <Link
                                        key={`${series}-chapters`}
                                        className="item-btn"
                                        to={`${series}/chapters/`}
                                    >
                                        {data[series].name}
                                    </Link>
                                )
                        )}
                        {Object.keys(data).map(
                            (series) =>
                                data[series].has_volumes && (
                                    <Link
                                        key={`${series}-volumes`}
                                        className="item-btn"
                                        to={`${series}/volumes/`}
                                    >
                                        {data[series].name} (Volumes)
                                    </Link>
                                )
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Listings
