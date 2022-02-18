import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import useFetch from './useFetch'
import TopMenu from './TopMenu'
import Container from './Container'
import BottomMenu from './BottomMenu'

const ItemReader = ({ baseUrl }) => {
    const { pathname } = useLocation()
    const itemType = pathname.search('/chapters') >= 0 ? 'chapter' : 'volume'
    const itemTitle = itemType.charAt(0).toUpperCase() + itemType.slice(1)
    const { series, item: itemNum } = useParams()
    const fetchUrl = `${baseUrl}/api/series/${series}/${itemType}s/${itemNum}/`
    const { data, isPending, error } = useFetch(fetchUrl)

    const [containFirstImg, setContainFirstImg] = useState(true)
    const [showMenus, setShowMenus] = useState(false)
    const containersLen = useRef(0)
    const [visibilityIndex, setVisibilityIndex] = useState(0)

    useEffect(() => {
        if (data) document.title = `${data.name} | ${itemTitle} ${itemNum}`
    }, [data, itemTitle, itemNum])

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (
                e.code === 'Space' ||
                e.code === 'ArrowLeft' ||
                e.code === 'ArrowDown'
            ) {
                const lastIndex = containersLen.current - 1
                if (visibilityIndex < lastIndex)
                    setVisibilityIndex(visibilityIndex + 1)
            } else if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
                if (visibilityIndex > 0) setVisibilityIndex(visibilityIndex - 1)
            } else if (e.code === 'KeyF') {
                if (document.fullscreenElement === null)
                    document.documentElement.requestFullscreen()
                else document.exitFullscreen()
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [visibilityIndex])

    const restructureContainers = () => setContainFirstImg(!containFirstImg)
    const setContainersLen = (length) => (containersLen.current = length)
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
                    <div>Loading ...</div>
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
                        containFirstImg={containFirstImg}
                        setContainersLen={setContainersLen}
                        showFirstContainer={showFirstContainer}
                        onClick={handleClick}
                    />
                    <BottomMenu
                        showMenus={showMenus}
                        containersLen={containersLen.current}
                        sliderValue={visibilityIndex + 1}
                        onInput={handleSliderInput}
                    />
                </>
            )}
        </>
    )
}

export default ItemReader
