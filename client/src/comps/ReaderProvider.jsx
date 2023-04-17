import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router'

import ItemReader from './ItemReader'

const ReaderProvider = ({ baseUrl }) => {
    const { pathname, search } = useLocation()
    let { series, item: identifier } = useParams()

    let itemType, fetchUrl, docTitle

    if (!pathname.includes('cbz') && series && identifier) {
        itemType = pathname.includes('chapter') ? 'chapter' : 'volume'
        const nameParts = series
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        const itemTitle = itemType.charAt(0).toUpperCase() + itemType.slice(1)
        docTitle = `${nameParts.join(' ')} | ${itemTitle} ${identifier}`
        fetchUrl = `${baseUrl}/api/series/${series}/${itemType}s/${identifier}/`
    } else {
        itemType = 'CBZ'
        docTitle = 'CBZ Viewer'
        const searchParams = new URLSearchParams(search)
        const archiveName = searchParams.get('name')
        identifier = archiveName
        fetchUrl = `${baseUrl}/api/cbz/?name=${archiveName}`
    }

    document.title = docTitle

    return (
        <>
            {itemType === 'CBZ' && !identifier && (
                <div className="msg-div">
                    <div>
                        Query Parameter of name is required for this URL (i.e.
                        /cbz?name=something)
                    </div>
                </div>
            )}
            {identifier && (
                <ItemReader
                    itemType={itemType}
                    identifier={identifier}
                    fetchUrl={fetchUrl}
                    baseUrl={baseUrl}
                />
            )}
        </>
    )
}

export default ReaderProvider
