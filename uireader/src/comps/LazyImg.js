import { useEffect, useState } from 'react'

const LazyImg = ({ dataSrc, alt, imgContainerIndex, visibilityIndex }) => {
    const [src, setSrc] = useState('')

    useEffect(() => {
        if (imgContainerIndex === visibilityIndex) setSrc(dataSrc)
    }, [imgContainerIndex, dataSrc, visibilityIndex])

    return <img src={src} alt={alt} />
}

export default LazyImg
