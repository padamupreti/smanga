import { useEffect, useRef } from 'react'
import '../styles/readercontainer.scss'

const Container = ({
    baseUrl,
    itemInfo,
    itemType,
    visibilityIndex,
    containFirstImg,
    setContainersLen,
    showFirstContainer,
    onClick,
}) => {
    const containerRef = useRef()

    useEffect(() => {
        containerRef.current.innerHTML = ''

        const { img_data: imgData } = itemInfo
        const {
            common_width: commonWidth,
            media_url: mediaUrl,
            img_list: imgList,
        } = imgData

        const bundleImgs = (imgObjList) => {
            const imageContainer = document.createElement('div')
            imageContainer.className = 'img-container'
            for (let imgObj of imgObjList) {
                let image = document.createElement('img')
                image.setAttribute(
                    'data-src',
                    `${baseUrl}${mediaUrl}${imgObj.image_url}`
                )
                image.alt = imgObj.name
                imageContainer.appendChild(image)
            }
            containerRef.current.appendChild(imageContainer)
        }

        let toSkip = false
        for (let i = 0; i < imgList.length; i++) {
            const img = imgList[i]
            if (itemType === 'chapter' && containFirstImg && i === 0) {
                bundleImgs([img])
                continue
            }
            if (img.width / commonWidth <= 1.4) {
                if (!toSkip) {
                    let imgObjList = []
                    imgObjList.push(img)
                    const nextImg = imgList[i + 1]
                    if (nextImg && nextImg.width / commonWidth <= 1.4) {
                        imgObjList.push(nextImg)
                        toSkip = true
                    }
                    bundleImgs(imgObjList)
                } else toSkip = false
            } else bundleImgs([img])
        }

        setContainersLen(containerRef.current.children.length)
        showFirstContainer()
    }, [containFirstImg, baseUrl, itemInfo]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const imgContainers = containerRef.current.children
        for (let imgContainer of imgContainers)
            if (imgContainer.classList.contains('visible-container'))
                imgContainer.classList.remove('visible-container')
        const visContainer = imgContainers[visibilityIndex]
        visContainer.classList.add('visible-container')
        const visImages = visContainer.children
        for (let visImage of visImages)
            if (!visImage.hasAttribute('src'))
                visImage.src = visImage.getAttribute('data-src')
    }, [containFirstImg, itemInfo, visibilityIndex])

    return (
        <div
            className="container"
            ref={containerRef}
            onClick={() => onClick()}
        />
    )
}

export default Container
