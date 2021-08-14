const BottomMenu = (props) => {
  const { showMenus, containersLen, sliderValue, onInput } = props
  const classStr = showMenus ? 'bottom-menu show-menu' : 'bottom-menu'

  return ( 
    <div className={ classStr }>
      <div className="page-display">
          <p className="page-text">
            <span className="page-current">{ sliderValue } </span>
             of 
            <span className="page-pairs"> { containersLen }</span>
          </p>
          <p className="info-text">views</p>
      </div>
      <div className="slider-container">
          <input
            type="range"
            min="1"
            max={ containersLen }
            value={ sliderValue }
            className="slider"
            onInput={ (e) => onInput(e) }
          />
      </div>
    </div>
   )
}
 
export default BottomMenu
