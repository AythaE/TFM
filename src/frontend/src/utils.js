import { Chip } from '@material-ui/core'
import React from 'react';


export function formatCommaList(list) {
    return list.join(", ")
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: 'numeric' })
}


export function normalizeHitsScore(hits, debug = false) {
    let max_score = 0;
    let score_array = [];
    let t1, t2, t3;
    if (debug) {
        console.log(hits);
        t1 = performance.now();

    }

    hits.map(h => { score_array.push(h._score) });

    max_score = Math.max(...score_array)
    if (debug) {
        console.log("max_score: " + max_score)
        t2 = performance.now();

    }

    hits.map(h => { h._score /= max_score });
    if (debug) {
        t3 = performance.now()

        console.log("After normalize")
        console.log(hits)

        console.log("time for find max_score: " + (t2 - t1) + " ms")
        console.log("time for normalizing: " + (t3 - t2) + " ms")
    }
    return hits

}

export function combMax(hits, field, debug = false) {
    hits.forEach(h => {
        if (h._score < h._source[field]) {
            if (debug) {
                console.log("New max score for hit " + h._id + " now("+field+"): " + h._source[field] + " before: " + h._score)
            }
            h._score = h._source[field]

        }
    });

    return hits;
}

export function combSum(hits, field, debug=false) {
    hits.forEach(h => {
        if (debug) {
            console.log("New sum score for hit " + h._id + " now("+field+"): " + (h._score+h._source[field]) + " before: " + h._score)
        }
        h._score += h._source[field]
    });

    return hits;
}

export function resortHits(hits, debug=false) {
    let t1, t2;
    if(debug)
        t1 = performance.now();

    hits.sort((h1, h2) => { return (h1._score - h2._score); }).reverse();
    if(debug ){
        t2 = performance.now()
        console.log("time for resorting: " + (t2 - t1) + " ms")

    }
    return hits;
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
export function generateId(len) {
    let arr = new Uint8Array((len || 10) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}