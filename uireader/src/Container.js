import { useEffect, useRef } from 'react'

const Container = (props) => {
    const { baseUrl, itemInfo, itemType,
        visibilityIndex, containFirstImg, setContainersLen, 
        showFirstContainer, onClick
    } = props

    const containerRef = useRef()

    useEffect(() => {
        containerRef.current.innerHTML = ''

        const { img_data: imgData } = itemInfo
        const { common_width: commonWidth, media_url: mediaUrl, img_list: imgList } = imgData

        const bundleImgs = (img_obj_list) => {
            const imageContainer = document.createElement('div')
            imageContainer.className = 'img-container'
            for(let img_obj of img_obj_list) {
                let image = document.createElement('img')
                image.src = `${baseUrl}${mediaUrl}${img_obj.image_url}`
                image.alt = img_obj.name
                imageContainer.appendChild(image)
            }
            containerRef.current.appendChild(imageContainer)
        }

        let toSkip = false
        for(let i=0; i<imgList.length; i++) {
            const img = imgList[i]
            if (itemType === 'chapter' && containFirstImg && (i === 0)) {
                bundleImgs([img])
                continue
            }
            if (img.width / commonWidth <= 1.4) {
                if(!toSkip) {
                    let imgObjList = []
                    imgObjList.push(img)
                    const nextImg = imgList[i + 1]
                    if(nextImg && (nextImg.width / commonWidth <= 1.4)) {
                        imgObjList.push(nextImg)
                        toSkip = true
                    }
                    bundleImgs(imgObjList)
                } else
                    toSkip = false
            } else
                bundleImgs([img])
        }

        setContainersLen(containerRef.current.children.length)
        showFirstContainer()
    }, [containFirstImg, baseUrl, itemInfo]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const imgContainers = containerRef.current.children
        for (let imgContainer of imgContainers)
            if(imgContainer.classList.contains('show-container'))
                imgContainer.classList.remove('show-container')
        imgContainers[visibilityIndex].classList.add('show-container')
    }, [containFirstImg, itemInfo, visibilityIndex])

    return ( 
        <div
            className="container"
            ref={ containerRef }
            onClick={() => onClick() }
        ></div>
     )
}

export default Container
