/*
 * 1 = empty
 * 0 = bead
 * 2 = wall
 * 3 = super
 * 4 = pacman
 */

var map = [
[3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3],
[0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0],
[0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[2, 2, 0 ,2, 2, 0, 2, 2, 0, 2, 2],
[4, 0, 0 ,2, 1, 1, 1, 2, 0, 0, 0],
[0, 2, 0 ,2, 1, 5, 1, 2, 0, 2, 0],
[0, 2, 0 ,2, 2, 2, 2, 2, 0, 2, 0],
[0, 2, 0 ,2, 0, 0, 0, 2, 0, 2, 0],
[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
[2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2],
[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
[0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0],
[3, 0, 0 ,0, 0, 2, 0, 0, 0, 0, 3],];

var tiles = {
    0: '<span class="t t-0"> &middot; </span>',
    1: '<span class="t t-1"> &nbsp; </span>',
    2: '<span class="t t-2"> &squ; </span>',
    3: '<span class="t t-3"> &hercon; </span>',
    4: '<span class="t t-4"> o </span>',
    5: '<span class="t t-5"> M </span>',
    6: '<span class="t t-6"> M </span>',
    7: '<span class="t t-7"> M </span>',
    8: '<span class="t t-8"> M </span>',
}

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

var c_map = {
    '119': '0',
    '100': '1',
    '115': '2',
    '97': '3',
}

document.onkeypress = function(e) {
    var e = window.event || e;
    var c = e.charCode;
    var n_dir = c_map[c] ? c_map[c] : dir;
    var n_tile = tile_d(n_dir);
    desire = n_dir;
    if (n_tile != undefined && n_tile != 2) {
        dir = n_dir;
    }
}
render();