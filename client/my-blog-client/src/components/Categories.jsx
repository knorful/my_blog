import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const Categories = (props) => {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        // console.log("newValue => " + newValue);
        setCategory(e.target.value);

    }

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            setCategories((prev) => [...prev, category])
            setCategory("")
        }
    }

    const removeCategory = (e, index) => {
        e.preventDefault();
        let newCategories = categories.filter((c, i) => index !== i);
        setCategories(newCategories);
    }

    return (
        <div id="Categories">
            <input placeholder='Add Categories...' list="categories-datalist" value={category} onChange={handleChange} onKeyPress={handleKeyPress} />
            <datalist id="categories-datalist">
                {categories.map((c,i) => <option key={i} value={c} />)}
            </datalist>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                {categories.map((c, i) => {
                    return <Button onClick={(e) => removeCategory(e, i)} key={c + i}>{c}</Button>
                })}
            </ButtonGroup>
        </div>
    );
}