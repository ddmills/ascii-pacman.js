
/*
 * 0 = up
 * 1 = right
 * 2 = down
 * 3 = left
 */
var p_tiles = {
    '0': {'open': ' &utri; ', 'closed': '<span class="t t-4"> &utrif; </span>'},
    '1': {'open': ' &rtri; ', 'closed': '<span class="t t-4"> &rtrif; </span>'},
    '2': {'open': ' &dtri; ', 'closed': '<span class="t t-4"> &dtrif; </span>'},
    '3': {'open': ' &ltri; ', 'closed': '<span class="t t-4"> &ltrif; </span>'},
}
var score = 0;
var dir = 0;
var desire = 0;
var open = false;
var pos = {'x': 0, 'y': 5}
var won = false;

function tile_d(d) {
    if (d == 0) {
        return map[pos['y'] - 1][pos['x']];
    } else if (d == 1) {
        return map[pos['y']][pos['x'] + 1];
    } else if (d == 2) {
        return map[pos['y'] + 1][pos['x']];
    } else if (d == 3) {
        return map[pos['y']][pos['x'] - 1];
    }
    return map[pos['y']][pos['x']];
}

function updatePosition() {
    var next = tile_d(desire)
    if (next != undefined && next != 2) {
        dir = desire;
    } else {
        next = tile_d(dir);
    }
    if (next != undefined && next != 2) {
        if (next == 0) { score++; }
        map[pos['y']][pos['x']] = 1;
        if (dir == 0) {
            map[pos['y'] - 1][pos['x']] = 4;
            pos['y']--;
        } else if (dir == 1) {
            map[pos['y']][pos['x'] + 1] = 4;
            pos['x']++;
        } else if (dir == 2) {
            map[pos['y'] + 1][pos['x']] = 4;
            pos['y']++;
        } else if (dir == 3) {
            map[pos['y']][pos['x'] - 1] = 4;
            pos['x']--;
        }
    }
}


function render() {
   var r = '';
   for (var i = 0; i < map[0].length + 2; i++) {
        r += tiles[2];
   }
   r += '<br />'
   for (var i = 0; i < map.length; i++) {
        s = tiles[2];
        for( var j = 0; j < map[i].length; j++) {
            var p = map[i][j];
            if (p == 4) {
                if (open) {
                    s += p_tiles[dir]['open'];
                } else {
                    s += p_tiles[dir]['closed'];
                }
                //open = !open;
            } else {
                s += tiles[p];
            }
        }
        r += s + tiles[2] + '<br />';
   }
   for (var i = 0; i < map[0].length + 2; i++) {
        r += tiles[2];
   }
   document.getElementById('a').innerHTML = r;
}

function updateScore() {
    document.getElementById('s').innerHTML = score;
}
var interval = setInterval(function() {
    updatePosition();
    updateScore();
    render();
    if (score >= 85) {
        clearInterval(interval);
        alert('you won dawg');
    }
}, 300);

render();
