import ImageContainer from './ImageContainer'
import '../styles/readercontainer.scss'

const Container = ({
    viewDataList,
    baseUrl,
    mediaUrl,
    itemType,
    identifier,
    visibilityIndex,
    isMagEnabled,
    onClick,
}) => {
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
