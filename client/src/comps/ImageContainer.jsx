import { useState, useEffect } from 'react'

const ImageContainer = ({
    itemType,
    baseUrl,
    identifier,
    imgIndex,
    imgAlt,
    viewContainerIndex,
    visibilityIndex,
    isMagEnabled,
}) => {
    const [src, setSrc] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [prevId, setPrevId] = useState(identifier)
    const isCBZ = itemType === 'CBZ'
    const imgClassName = isMagEnabled ? 'image image-enlarged' : 'image'

    useEffect(() => {
        // The below conditional optimizes image fetching from backend and rendering on browser
        // based on various pieces of state and values; It works in following way:
        //
        // The first requirement is for the view container containing this image container to come
        // very close to being visible (i.e. with little navigation it becomes visible), given by the
        // difference between the currently visible view container's index and this image container's
        // view container's index
        //
        // For the second requirement, it is made sure that
        // either no src has been set for the image yet
        // or src had been set but the identifier for the image has changed
        // Here, identifier denotes the image url or the name of the CBZ
        //
        // When both requirements are met, the image is sourced with respective methods
        // for image url as well as image read from CBZ
        if (
            Math.abs(viewContainerIndex - visibilityIndex) <= 2 &&
            (src === '' || prevId !== identifier)
        ) {
            setPrevId(identifier)
            if (!isCBZ) setSrc(identifier)
            else
                fetch(
                    `${baseUrl}/api/cbz/data/?name=${identifier}&index=${imgIndex}`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        const imageExt = imgAlt.split('.')[1]
                        const imageSource = `data:image/${imageExt};base64, ${data.encoding}`
                        setSrc(imageSource)
                    })
                    .catch((error) => console.error(error))
        }
    }, [
        src,
        prevId,
        identifier,
        viewContainerIndex,
        visibilityIndex,
        isCBZ,
        baseUrl,
        imgIndex,
        imgAlt,
    ])

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
                className={imgClassName}
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}

export default ImageContainer
