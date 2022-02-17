import { Link } from 'react-router-dom'

const TopMenu = (props) => {
    const { showMenus, itemInfo, itemType, itemNum, restruct } = props
    const classStr = showMenus ? 'top-menu show-menu' : 'top-menu'
    const { name, prev_item: prevItem, next_item: nextItem } = itemInfo

    return (
        <div className={classStr}>
            <p>{name}</p>
            <div className="top-buttons">
                {itemType === 'chapter' && (
                    <button
                        className="change re-toggle"
                        onClick={() => restruct()}
                    >
                        Re
                    </button>
                )}
                <Link
                    to={nextItem ? `../${nextItem}/` : '#'}
                    className={`change change-left ${
                        nextItem ? '' : 'disabled'
                    }`}
                >
                    &lt;
                </Link>
                <Link to={`../`} className="change">
                    {'#' + itemNum}
                </Link>
                <Link
                    to={prevItem ? `../${prevItem}/` : '#'}
                    className={`change change-right ${
                        prevItem ? '' : 'disabled'
                    }`}
                >
                    &gt;
                </Link>
                <Link to="/" className="change change-spaced">
                    Home
                </Link>
            </div>
        </div>
    )
}

export default TopMenu
