import { useState, useEffect } from 'react'

const ImageContainer = ({
    itemType,
    baseUrl,
    dataSrc,
    imgAlt,
    viewContainerIndex,
    visibilityIndex,
    isMagEnabled,
}) => {
    const isCBZ = itemType === 'CBZ'
    const [src, setSrc] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [clist, setClist] = useState('image')

    useEffect(() => {
        if (Math.abs(viewContainerIndex - visibilityIndex) <= 2) {
            if (!isCBZ) setSrc(dataSrc)
            else {
                fetch(
                    `${baseUrl}/api/cbz/data/?name=${dataSrc}&image=${imgAlt}`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        const imageExt = imgAlt.split('.')[1]
                        const imageSource = `data:image/${imageExt};base64, ${data.encoding}`
                        setSrc(imageSource)
                    })
                    .catch((error) => console.error(error))
            }
        }
    }, [isCBZ, baseUrl, dataSrc, imgAlt, viewContainerIndex, visibilityIndex])

    useEffect(() => {
        isMagEnabled ? setClist('image image-enlarged') : setClist('image')
    }, [isMagEnabled])

    return (
        <div className="img-container">
            {!loaded && (
                <div className="img-overlay">
                    <div className="loader-inner ball-scale">
                        <div></div>
                    </div>
                </div>
            )}
            <img
                src={src}
                alt={imgAlt}
                className={clist}
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}

export default ImageContainer
