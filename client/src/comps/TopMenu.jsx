import { Link } from 'react-router-dom'
import { FaRedoAlt, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa'
import '../styles/readermenus.scss'
import '../styles/topmenu.scss'

const TopMenu = ({ showMenus, itemInfo, itemType, identifier, restruct }) => {
    const { name, prev_item: prevItem, next_item: nextItem } = itemInfo

    return (
        <div className={showMenus ? 'top-menu visible-menu' : 'top-menu'}>
            <p>{name}</p>
            <div>
                {itemType !== 'CBZ' && (
                    <>
                        {itemType === 'chapter' && (
                            <button
                                className="change re-toggle"
                                onClick={restruct}
                            >
                                <FaRedoAlt />
                            </button>
                        )}
                        <Link
                            to={nextItem ? `./../${nextItem}/` : '.'}
                            className={`change change-left ${
                                nextItem ? '' : 'disabled'
                            }`}
                        >
                            <FaArrowLeft />
                        </Link>
                        <Link to="./../" className="change change-text">
                            {'#' + identifier}
                        </Link>

                        <Link
                            to={prevItem ? `./../${prevItem}/` : '.'}
                            className={`change change-right ${
                                prevItem ? '' : 'disabled'
                            }`}
                        >
                            <FaArrowRight />
                        </Link>
                    </>
                )}
                <Link to="/" className="change change-spaced">
                    <FaHome />
                </Link>
            </div>
        </div>
    )
}

export default TopMenu
