import { useState, useLayoutEffect } from 'react'
import ImageContainer from './ImageContainer'
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
    const [viewDataList, setViewDataList] = useState([])
    const { img_data: imgData } = itemInfo
    const { media_url: mediaUrl } = imgData

    useLayoutEffect(() => {
        let tempViewList = []
        const { common_width: commonWidth, img_list: imgList } = imgData

        let toSkip = false
        for (let i = 0; i < imgList.length; i++) {
            const img = imgList[i]
            if (itemType === 'chapter' && containFirstImg && i === 0) {
                tempViewList.push([img])
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
                        ? imgData.image_url
                        : `+${imgData.image_url}`)
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
                            key={`${imgData.name}`}
                            dataSrc={`${baseUrl}${mediaUrl}${imgData.image_url}`}
                            imgAlt={`${imgData.name}`}
                            viewContainerIndex={viewDataList.indexOf(viewData)}
                            visibilityIndex={visibilityIndex}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Container
