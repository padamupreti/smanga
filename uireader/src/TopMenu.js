import { Link } from 'react-router-dom'

const TopMenu = (props) => {
  const { showMenus, itemInfo, itemType, itemNum, restruct } = props
  const classStr = showMenus ? 'top-menu show-menu' : 'top-menu'
  const { name, prev_item: prevItem, next_item: nextItem } = itemInfo

  return (
    <div className={ classStr }>
      <p>{ name }</p>
      <div className="top-buttons">
        { itemType === 'chapter' && 
          <button className="change re-toggle" onClick={ () => restruct() }>Re</button> }
        { nextItem && <Link to={ `../${nextItem}/` } className="change change-left">&lt;</Link> }
        { !nextItem && <Link to="#" className="change change-left disabled">&lt;</Link> }
        <Link to={ `../` } className="change">{ '#' + itemNum }</Link>
        { prevItem && <Link to={ `../${prevItem}/` } className="change change-right">&gt;</Link> }
        { !prevItem && <Link to="#" className="change change-right disabled">&gt;</Link> }
        <Link to="/" className="change change-spaced">Home</Link>
      </div>
    </div>
   )
}
 
export default TopMenu
