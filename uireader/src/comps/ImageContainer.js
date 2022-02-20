import { useState, useEffect } from 'react'

const ImageContainer = ({
    dataSrc,
    imgAlt,
    viewContainerIndex,
    visibilityIndex,
}) => {
    const [src, setSrc] = useState('')
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (viewContainerIndex === visibilityIndex) setSrc(dataSrc)
    }, [viewContainerIndex, dataSrc, visibilityIndex])

    return (
        <div className="img-container">
            {!loaded && (
                <div className="img-overlay">
                    <div className="loader-inner ball-scale">
                        <div></div>
                    </div>
                </div>
            )}
            <img src={src} alt={imgAlt} onLoad={() => setLoaded(true)} />
        </div>
    )
}

export default ImageContainer
