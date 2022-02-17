import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import useFetch from './useFetch'

const Listings = (props) => {
    const { baseUrl } = props
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
                    <div>Loading ...</div>
                </div>
            )}
            {data && (
                <table className="list-table">
                    <thead>
                        <tr>
                            <th>Series</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map(
                            (series) =>
                                data[series].has_chapters && (
                                    <tr key={`${series}-chapters`}>
                                        <td>
                                            <Link to={`${series}/chapters/`}>
                                                {data[series].name}
                                            </Link>
                                        </td>
                                    </tr>
                                )
                        )}
                        {Object.keys(data).map(
                            (series) =>
                                data[series].has_volumes && (
                                    <tr key={`${series}-volumes`}>
                                        <td>
                                            <Link to={`${series}/volumes/`}>
                                                {data[series].name} (Volumes)
                                            </Link>
                                        </td>
                                    </tr>
                                )
                        )}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Listings
