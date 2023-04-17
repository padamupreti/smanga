import { useEffect, useLayoutEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import TopMenu from './TopMenu'
import Container from './Container'
import BottomMenu from './BottomMenu'

const ItemReader = ({ itemType, identifier, fetchUrl, baseUrl }) => {
    const { data, isPending, error } = useFetch(fetchUrl)

    const [viewDataList, setViewDataList] = useState([])
    const [containFirstImg, setContainFirstImg] = useState(false)
    const [showMenus, setShowMenus] = useState(false)
    const [visibilityIndex, setVisibilityIndex] = useState(0)
    const [isMagEnabled, setIsMagEnabled] = useState(false)

    useLayoutEffect(() => {
        if (data) {
            let tempViewList = []
            const { img_data: imgData } = data
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
            showFirstContainer()
        }
    }, [baseUrl, data, itemType, containFirstImg])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.code === 'Space' ||
                e.code === 'ArrowLeft' ||
                e.code === 'ArrowDown' ||
                e.code === 'KeyJ'
            ) {
                const lastIndex = viewDataList.length - 1
                if (visibilityIndex < lastIndex)
                    setVisibilityIndex(visibilityIndex + 1)
            } else if (
                e.code === 'ArrowRight' ||
                e.code === 'ArrowUp' ||
                e.code === 'KeyL'
            ) {
                if (visibilityIndex > 0) setVisibilityIndex(visibilityIndex - 1)
            } else if (e.code === 'KeyF') {
                if (document.fullscreenElement === null)
                    document.documentElement.requestFullscreen()
                else document.exitFullscreen()
            } else if (e.code === 'KeyM') setIsMagEnabled(!isMagEnabled)
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [viewDataList, visibilityIndex, isMagEnabled])

    const restructureContainers = () => setContainFirstImg(!containFirstImg)
    const showFirstContainer = () => setVisibilityIndex(0)
    const handleClick = () => setShowMenus(!showMenus)
    const handleSliderInput = (e) =>
        setVisibilityIndex(parseInt(e.target.value, 10) - 1)

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
                    <TopMenu
                        showMenus={showMenus}
                        itemInfo={data}
                        itemType={itemType}
                        identifier={identifier}
                        restruct={restructureContainers}
                    />
                    <Container
                        viewDataList={viewDataList}
                        baseUrl={baseUrl}
                        mediaUrl={data.img_data.media_url}
                        itemType={itemType}
                        identifier={identifier}
                        visibilityIndex={visibilityIndex}
                        isMagEnabled={isMagEnabled}
                        onClick={handleClick}
                    />
                    <BottomMenu
                        showMenus={showMenus}
                        containersLen={viewDataList.length}
                        sliderValue={visibilityIndex + 1}
                        onInput={handleSliderInput}
                    />
                </>
            )}
        </>
    )
}

export default ItemReader
