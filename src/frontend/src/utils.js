import { Chip } from '@material-ui/core'
import React from 'react';


export function formatCommaList(list) {
    return list.join(", ")
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: 'numeric' })
}

export function renderChipsFromList(list, listName = generateId()) {
    // TODO make this clickable and search for this keyword
    return (
        <div>
            {list.map((elem, index) => { return (<Chip key={listName + '-' + index} label={elem} classes={{ root: "keyword" }}></Chip>) })}
        </div>
    );
}


// dec2hex :: Integer -> String
function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2)
}

// generateId :: Integer -> String
function generateId(len) {
    let arr = new Uint8Array((len || 10) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}