import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import TopMenu from './TopMenu'
import Container from './Container'
import BottomMenu from './BottomMenu'

const ItemReader = ({ baseUrl }) => {
    const { pathname, search } = useLocation()
    const itemType = pathname.search('/chapters') >= 0 ? 'chapter' : 'volume'
    const itemTitle = itemType.charAt(0).toUpperCase() + itemType.slice(1)
    const { series, item: itemNum } = useParams()
    let fetchUrl
    if (series && itemNum) {
        fetchUrl = `${baseUrl}/api/series/${series}/${itemType}s/${itemNum}/`
    } else {
        const searchParams = new URLSearchParams(search)
        const name = searchParams.get('name')
        fetchUrl = `${baseUrl}/api/cbz/?name=${name}`
    }
    const { data, isPending, error } = useFetch(fetchUrl)

    const [containFirstImg, setContainFirstImg] = useState(true)
    const [showMenus, setShowMenus] = useState(false)
    const [containersLen, setContainersLen] = useState(0)
    const [visibilityIndex, setVisibilityIndex] = useState(0)
    const [isMagEnabled, setIsMagEnabled] = useState(false)

    useEffect(() => {
        if (data) document.title = `${data.name} | ${itemTitle} ${itemNum}`
    }, [data, itemTitle, itemNum])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.code === 'Space' ||
                e.code === 'ArrowLeft' ||
                e.code === 'ArrowDown' ||
                e.code === 'KeyJ'
            ) {
                const lastIndex = containersLen - 1
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
    }, [containersLen, visibilityIndex, isMagEnabled])

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
                        itemNum={itemNum}
                        restruct={restructureContainers}
                    />
                    <Container
                        baseUrl={baseUrl}
                        itemInfo={data}
                        itemType={itemType}
                        visibilityIndex={visibilityIndex}
                        isMagEnabled={isMagEnabled}
                        containFirstImg={containFirstImg}
                        setContainersLen={setContainersLen}
                        showFirstContainer={showFirstContainer}
                        onClick={handleClick}
                    />
                    <BottomMenu
                        showMenus={showMenus}
                        containersLen={containersLen}
                        sliderValue={visibilityIndex + 1}
                        onInput={handleSliderInput}
                    />
                </>
            )}
        </>
    )
}

export default ItemReader
