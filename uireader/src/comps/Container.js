import { useState, useLayoutEffect } from 'react'
import ImageContainer from './ImageContainer'
import '../styles/readercontainer.scss'

const Container = ({
    baseUrl,
    itemInfo,
    itemType,
    identifier,
    visibilityIndex,
    isMagEnabled,
    containFirstImg,
    setContainersLen,
    showFirstContainer,
    onClick,
}) => {
    const [viewDataList, setViewDataList] = useState([])
    const { img_data: imgData } = itemInfo
    const { media_url: mediaUrl } = imgData

    useLayoutEffect(() => {
        let tempViewList = []
        const { common_width: commonWidth, img_list: imgList } = imgData

        let toSkip = false
        for (let i = 0; i < imgList.length; i++) {
            const img = imgList[i]
            img.index = i
            if (itemType === 'chapter' && containFirstImg && i === 0) {
                tempViewList.push([img])
                continue
            }
            if (img.width / commonWidth <= 1.4) {
                if (!toSkip) {
                    let imgObjList = [img]
                    const nextImg = imgList[i + 1]
                    if (nextImg && nextImg.width / commonWidth <= 1.4) {
                        imgObjList.push(nextImg)
                        toSkip = true
                    }
                    tempViewList.push(imgObjList)
                } else toSkip = false
            } else tempViewList.push([img])
        }

        setViewDataList(tempViewList)
        setContainersLen(tempViewList.length)
        showFirstContainer()
    }, [containFirstImg, baseUrl, itemInfo]) // eslint-disable-line react-hooks/exhaustive-deps

    const genViewDataKey = (viewData) => {
        let key = ''
        viewData.forEach(
            (imgData) =>
                (key +=
                    viewData[0] === imgData
                        ? imgData.image_alt
                        : `+${imgData.image_alt}`)
        )
        return key
    }

    return (
        <div className="container" onClick={onClick}>
            {viewDataList.map((viewData) => (
                <div
                    key={`${genViewDataKey(viewData)}`}
                    className={
                        viewDataList.indexOf(viewData) === visibilityIndex
                            ? 'view-container visible-container'
                            : 'view-container'
                    }
                >
                    {viewData.map((imgData) => (
                        <ImageContainer
                            key={imgData.image_alt}
                            itemType={itemType}
                            baseUrl={baseUrl}
                            identifier={
                                itemType !== 'CBZ'
                                    ? `${baseUrl}${mediaUrl}${imgData.image_url}`
                                    : identifier
                            }
                            imgIndex={imgData.index}
                            imgAlt={imgData.image_alt}
                            viewContainerIndex={viewDataList.indexOf(viewData)}
                            visibilityIndex={visibilityIndex}
                            isMagEnabled={isMagEnabled}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Container
