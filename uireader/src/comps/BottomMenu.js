import { FaBookOpen } from 'react-icons/fa'
import '../styles/readermenus.scss'
import '../styles/bottom-menu.scss'

const BottomMenu = ({ showMenus, containersLen, sliderValue, onInput }) => {
    return (
        <div className={showMenus ? 'bottom-menu visible-menu' : 'bottom-menu'}>
            <div className="page-display">
                <p className="page-text">
                    <span className="page-current">{sliderValue} </span>
                    of
                    <span className="page-pairs"> {containersLen}</span>
                </p>
                <p className="info-text">
                    <FaBookOpen /> views
                </p>
            </div>
            <div className="slider-container">
                <input
                    type="range"
                    min="1"
                    max={containersLen}
                    value={sliderValue}
                    className="slider"
                    onInput={(e) => onInput(e)}
                />
            </div>
        </div>
    )
}

export default BottomMenu
