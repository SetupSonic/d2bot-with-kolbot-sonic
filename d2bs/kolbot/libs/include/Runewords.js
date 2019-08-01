/**
 *    @filename   Runewords.js
 *    @desc       make and reroll runewords
 */

// don't wait until base is found to pick runes
Runewords.buildLists = function () {
    var i, j, k, items, hel, baseCheck, uniqueRunewords;

    this.validGids = [];
    this.needList = [];
	
    items = me.findItems(-1, 0);
	uniqueRunewords = [];	
	
    for (i = 0; i < Config.Runewords.length; i += 1) {
		
		if (uniqueRunewords.indexOf(Config.Runewords[i][0].toString()) == -1) { //Limit runesets for each runeword to 1
			uniqueRunewords.push(Config.Runewords[i][0].toString());
		} else {
			continue;
		}        
		
		if (!baseCheck) {
            baseCheck = this.getBase(Config.Runewords[i][0], Config.Runewords[i][1]) || this.getBase(Config.Runewords[i][0], Config.Runewords[i][1], true);
        }

    RuneLoop:
        for (j = 0; j < Config.Runewords[i][0].length; j += 1) {
            for (k = 0; k < items.length; k += 1) {
                if (items[k].classid === Config.Runewords[i][0][j] && this.validItem(items[k])) {
                    this.validGids.push(items[k].gid);
                    items.splice(k, 1);

                    k -= 1;

                    continue RuneLoop;
                }
            }
            this.needList.push(Config.Runewords[i][0][j]);
        }
    }

    // hel rune for rerolling purposes
    if (baseCheck) {
        hel = me.getItem(624, 0);

        if (hel) {
            do {
                if (this.validGids.indexOf(hel.gid) === -1 && this.validItem(hel)) {
                    this.validGids.push(hel.gid);

                    return;
                }
            } while (hel.getNext());
        }

        this.needList.push(624);
    }
};

/*
Runewords.checkItem = function (unit) { // for pickit ***Limits 1 runeset for as many different basetypes for one rw. So even if 6 entries for smoke rw, keep only 1 runeset
	if (!Config.MakeRunewords) {
		return false;
	}
	
	let uniqueRunewords = [];
	let runeList = [];
	
	for (let i = 0; i < Config.Runewords.length; i++) {
		if (uniqueRunewords.indexOf(Config.Runewords[i][0].toString()) == -1) {
			uniqueRunewords.push(Config.Runewords[i][0].toString());
		} else {
			continue;
		}
		
		runeList = runeList.concat(Config.Runewords[i][0]);
	}
	
	let count = runeList.reduce(function(n, val) {return n + (val === unit.classid)}, 0) || 0;
	
	if (unit.itemType === 74 && me.findItems(unit.classid).length <= count) { // rune
		return true;
	}

	return false;
};

Runewords.keepItem = function (unit) { // for pickit ***Limits 1 runeset for as many different basetypes for one rw. So even if 6 entries for smoke rw, keep only 1 runeset
	if (!Config.MakeRunewords) {
		return false;
	}
	
	let uniqueRunewords = [];
	let runeList = [];
	
	for (let i = 0; i < Config.Runewords.length; i++) {
		if (uniqueRunewords.indexOf(Config.Runewords[i][0].toString()) == -1) {
			uniqueRunewords.push(Config.Runewords[i][0].toString());
		} else {
			continue;
		}
		
		runeList = runeList.concat(Config.Runewords[i][0]);
	}
	
	let count = runeList.reduce(function(n, val) {return n + (val === unit.classid)}, 0) || 0;
	
	if (unit.itemType === 74 && me.findItems(unit.classid).length <= count) { // rune
		return true;
	}

	return false;
};
*/

Runewords.makeRunewords = function () {
    if (!Config.MakeRunewords) {
        return false;
    }

    var i, items;

    while (true) {
        this.buildLists();

        items = this.checkRunewords(); // get a runeword. format = [base, runes...]

        if (!items) { // can't make runewords - exit loop
            break;
        }

        if (!Town.openStash()) {
            return false;
        }

        for (i = 1; i < items.length; i += 1) {
            this.socketItem(items[0], items[i]);
        }
    }

    me.cancel();

    //this.rerollRunewords();

    return true;
};