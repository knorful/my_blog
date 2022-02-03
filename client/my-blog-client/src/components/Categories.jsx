import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const Categories = (props) => {
    return (
        <div id="Categories">
            <input placeholder='Add Categories...' list="categories-datalist" value={props.category} onChange={props.handleChange} onKeyPress={props.handleKeyPress} />
            <datalist id="categories-datalist">
                {props.categories.map((c, i) => <option key={i} value={c} />)}
            </datalist>
            <ButtonGroup color='secondary' size="small" variant="outlined" aria-label="outlined button group">
                {props.categories.map((c, i) => {
                    return <Button onDoubleClick={(e) => props.removeCategory(e, i)} onClick={props.selectCategory} key={c + i}>{c}</Button>
                })}
            </ButtonGroup>
        </div>
    );
}