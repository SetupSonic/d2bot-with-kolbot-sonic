/**
 *	@filename	Misc.js
 *	@desc		misc library containing Skill, Misc and Sort classes
 */

Misc.charClass = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"];
Misc.difficultyString = ["Normal", "Nightmare", "Hell"];

// updates config obj across all threads
Misc.updateConfig = function() {
    scriptBroadcast("config--" + JSON.stringify(Misc.copy(Config)));
};

Misc.randomString = function(len, num) {
    let possible = 'abcdefghijklmnopqrstuvwxyz';

    if (num) {
        possible += '0123456789';
    }

    let text = '';

    for (let i = 0; i < len; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

Misc.logCoords = function() {
    const PATH = "libs/sonic/logs/coord.json";
    if (!FileTools.exists(PATH)) {
        let list = { coords: [] };

        Misc.dataAction.create(PATH, list, 0);
    }

    print('Logging x: ' + me.x + ', y: ' + me.y);

    return Misc.dataAction.update(PATH, "coords", { x: me.x, y: me.y, radius: 10 }, 0);
};

// perform CRUD operations on data files
Misc.dataAction = {
    create: function(path, obj, format=2) {
        return Misc.fileAction(path, 1, JSON.stringify(obj, null, format));
    },
    read: function(path) {
        return JSON.parse(Misc.fileAction(path, 0));
    },
    update: function(path, prop, value, format=2) {
        let obj = this.read(path);

        if (obj.hasOwnProperty(prop) && Array.isArray(obj[prop])) {
            if (obj[prop].includes(value)) {
                return true;
            } else {
                obj[prop].push(value);
            }
        } else {
            obj[prop] = value;
        }

        return Misc.fileAction(path, 1, JSON.stringify(obj, null, format));
    },
    delete: function(path, prop) {

    }
};

// add a flash - increase retry amount
Misc.openChest = function(unit) {
    // Skip invalid and Countess chests
    if (!unit || unit.x === 12526 || unit.x === 12565) {
        return false;
    }

    // already open
    if (unit.mode) {
        return true;
    }

    // locked chest, no keys
    if (me.classid !== 6 && unit.islocked && !me.findItem(543, 0, 3)) {
        return false;
    }

    var i, tick;

    for (i = 0; i < 5; i += 1) {
        if (Pather.moveTo(unit.x + 1, unit.y + 2, 3) && getDistance(me, unit.x + 1, unit.y + 2) < 5) {
            //Misc.click(0, 0, unit);
            sendPacket(1, 0x13, 4, unit.type, 4, unit.gid);
        }

        tick = getTickCount();

        while (getTickCount() - tick < 1000) {
            if (unit.mode) {
                return true;
            }

            delay(10);
        }

        Packet.flash(me.gid);
    }

    if (!me.idle) {
        Misc.click(0, 0, me.x, me.y); // Click to stop walking in case we got stuck
    }

    return false;
};

Packet.entityAction = function(npc) {
    let entity = getUnit(1, npc);

    while (!entity) {
        Town.move(npc);
        Packet.flash(me.gid);
        delay(me.ping * 2);

        entity = getUnit(1, npc);
    }
	
	switch (npc.toLowerCase()) {
		case "akara":
			sendPacket(1, 0x38, 4, 0, 4, entity.gid, 4, 0);
			break;
		default:
			sendPacket(1, 0x38, 4, 0, 4, entity.gid, 4, 0);
	}

    return true;
};

Packet.questMessage = function(where, who, message) {
    let npc = getUnit(1, who);

    while (!npc) {
        Town.move(where);
        Packet.flash(me.gid);
        delay(me.ping * 2);

        npc = getUnit(1, who);
    }

    if (npc) {
        let tick = getTickCount();

        while (getTickCount() - tick < 1000) {
            sendPacket(1, 0x31, 4, npc.gid, 4, message);
            delay(me.ping);
        }

        return true;
    }

    return false;
};

Packet.checkQuest = (id, state, time=5) => {
    let tick = getTickCount();

    while (getTickCount() - tick < time) {
        sendPacket(1, 0x40);

        if (me.getQuest(id, state)) {
            return true;
        }

        delay(5);
    }

    return false;
};

/**

 POINTS BASED PICKIT - //pbp

 **/

// cursoritem check
// force keep item - when equiping khalim flaili want to keep current equipped
Item.equip = function (item, bodyLoc, keep) {
    if (!this.canEquip(item)) {
        return false;
    }

    // Already equipped in the right slot
    if (item.mode === 1 && item.bodylocation === bodyLoc) {
        return true;
    }

    var i, cursorItem;

    if (item.location === 7) {
        if (!Town.openStash()) {
            return false;
        }
    }

    for (i = 0; i < 3; i += 1) {
        if (item.toCursor()) {
            clickItem(0, bodyLoc);
            delay(me.ping * 2 + 500);

            if (item.bodylocation === bodyLoc) {
                if (getCursorType() === 3) {
                    //Misc.click(0, 0, me);

                    cursorItem = getUnit(100);

                    if (cursorItem) {
                        if (NTIP.CheckItem(cursorItem, NTIP_CheckListNoTier, true).result == 1 || this.autoEquipCheckMerc(cursorItem) || keep) {
                            if (Storage.Inventory.CanFit(cursorItem)) {
                                Storage.Inventory.MoveTo(cursorItem);
                            }
                        }

                        cursorItem = getUnit(100);

                        if (cursorItem) {
                            cursorItem.drop();
                        }
                    }
                }

                return true;
            }
        }
    }

    return false;
};

// Don't keep old tier items
Item.autoEquipCheck = function (item) {
    if (!Config.AutoEquip) {
        return true;
    }

    var i,
        tier = NTIP.GetTier(item),
        bodyLoc = Item.getBodyLoc(item);

    if (tier > 0 && bodyLoc) {
        for (i = 0; i < bodyLoc.length; i += 1) {
            // Low tier items shouldn't be kept if they can't be equipped
            if (tier > Item.getEquippedItem(bodyLoc[i]).tier && (Item.canEquip(item) || !item.getFlag(0x10))) {
                //print("\xFFc4AutoEquip \xFFc0New char item: " + item.name + " \xFFc0(new: " + tier + ")");
                return true;
            }
        }
    }

    //pbp

    return false;
};

// Don't print to console
// also use scroll to id
Item.autoEquip = function () {
    if (!Config.AutoEquip) {
        return true;
    }

    var i, j, tier, bodyLoc, tome, gid, scroll,
        items = me.findItems(-1, 0);

    if (!items) {
        return false;
    }

    function sortEq(a, b) {
        if (Item.canEquip(a)) {
            return -1;
        }

        if (Item.canEquip(b)) {
            return 1;
        }

        return 0;
    }

    me.cancel();

    // Remove items without tier
    for (i = 0; i < items.length; i += 1) {
        if (NTIP.GetTier(items[i]) === 0) {
            items.splice(i, 1);

            i -= 1;
        }
    }

    while (items.length > 0) {
        items.sort(sortEq);

        tier = NTIP.GetTier(items[0]);
        bodyLoc = this.getBodyLoc(items[0]);

        if (tier > 0 && bodyLoc) {
            for (j = 0; j < bodyLoc.length; j += 1) {
                if ([3, 7].indexOf(items[0].location) > -1 && tier > this.getEquippedItem(bodyLoc[j]).tier && this.getEquippedItem(bodyLoc[j]).classid !== 174) { // khalim's will adjustment
                    if (!items[0].getFlag(0x10)) { // unid
                        tome = me.findItem(519, 0, 3);
                        scroll = me.findItem(530, 0, 3);

                        if ((tome && tome.getStat(70) > 0) || scroll) {
                            if (items[0].location === 7) {
                                Town.openStash();
                            }

                            Town.identifyItem(items[0], scroll ? scroll : tome);
                        }
                    }

                    gid = items[0].gid;

                    if (this.equip(items[0], bodyLoc[j])) {
                        //Misc.logItem("Equipped", me.getItem(-1, -1, gid));
                    }

                    break;
                }
            }
        }

        items.shift();
    }

    return true;
};

// better req check
// only check vs base stats
Item.canEquip = function (item, bodyLoc) {
    if (item.type !== 4) { // Not an item
        return false;
    }

    if (!item.getFlag(0x10)) { // Unid item
        return false;
    }

    return me.charlvl >= item.getStat(92) && Item.getMyHardStats(0) >= item.strreq && Item.getMyHardStats(2) >= item.dexreq;
};

// return stat values excluding stat bonuses from sets and/or items
Item.getMyHardStats = function (type) {
    this.validItem = function (item) {
        // ignore item bonuses from secondary weapon slot
        if (me.gametype === 1 && [11, 12].indexOf(item.bodylocation) > -1) {
            return false;
        }

        /*
        // some items dont have str or dex require
        if (!item.strreq) {
            item.strreq = 0;
        }

        if (!item.dexreq) {
            item.dexreq = 0;
        }*/

        // check if character meets str, dex, and level requirement since stat bonuses only apply when they are active
        return me.getStat(0) >= item.strreq && me.getStat(2) >= item.dexreq && me.charlvl >= item.lvlreq;
    };

    this.setBonus = function (type) { //get stats from set bonuses
        if (type === 1 || type === 3) { //set bonuses does not have energy or vitality (we can ignore this)
            return 0;
        }

        var sets = { //these are the only sets with possible stat bonuses
            "angelic": [], "artic": [], "civerb": [], "iratha": [],
            "isenhart": [], "vidala": [], "cowking": [], "disciple": [],
            "griswold": [], "mavina": [], "naj": [], "orphan": []
        };

        var i, j, setStat = 0,
            items = me.getItems();

        if (items) {
            for (i = 0; i < items.length; i += 1) {
                if (items[i].mode === 1 && items[i].quality === 5 && this.validItem(items[i])) {
                    idSwitch:
                        switch (items[i].classid) {
                            case 311: //crown
                                if (items[i].getStat(41) === 30) { //light resist
                                    sets.iratha.push(items[i]);
                                }

                                break;
                            case 337: //light gauntlet
                                if (items[i].getStat(7) === 20) { //life
                                    sets.artic.push(items[i]);
                                } else if (items[i].getStat(43) === 30) { //cold resist
                                    sets.iratha.push(items[i]);
                                }

                                break;
                            case 340: //heavy boots
                                if (items[i].getStat(2) === 20) { //dexterity
                                    sets.cowking.push(items[i]);
                                }

                                break;
                            case 347: //heavy belt
                                if (items[i].getStat(21) === 5) { //min damage
                                    sets.iratha.push(items[i]);
                                }

                                break;
                            case 520: //amulet
                                if (items[i].getStat(114) === 20) { //damage to mana
                                    sets.angelic.push(items[i]);
                                } else if (items[i].getStat(74) === 4) { //replenish life
                                    sets.civerb.push(items[i]);
                                } else if (items[i].getStat(110) === 75) { //poison length reduced
                                    sets.iratha.push(items[i]);
                                } else if (items[i].getStat(43) === 20) { //cold resist
                                    sets.vidala.push(items[i]);
                                } else if (items[i].getStat(43) === 18) { //cold resist
                                    sets.disciple.push(items[i]);
                                }

                                break;
                            case 522: //ring
                                if (items[i].getStat(74) === 6) { //replenish life
                                    for (j = 0; j < sets.angelic.length; j += 1) { //do not count ring twice
                                        if (sets.angelic[j].classid === items[i].classid) {
                                            break idSwitch;
                                        }
                                    }

                                    sets.angelic.push(items[i]);
                                }

                                break;
                            case 27: //sabre
                                for (j = 0; j < sets.angelic.length; j += 1) { //do not count twice in case of dual wield
                                    if (sets.angelic[j].classid === items[i].classid) {
                                        break idSwitch;
                                    }
                                }

                                sets.angelic.push(items[i]);

                                break;
                            case 317: //ring mail
                                sets.angelic.push(items[i]);

                                break;
                            case 74: //short war bow
                            case 313: //quilted armor
                            case 345: //light belt
                                sets.artic.push(items[i]);

                                break;
                            case 16: //grand scepter
                                for (j = 0; j < sets.civerb.length; j += 1) { //do not count twice in case of dual wield
                                    if (sets.civerb[j].classid === items[i].classid) {
                                        break idSwitch;
                                    }
                                }

                                sets.civerb.push(items[i]);

                                break;
                            case 330:
                                sets.civerb.push(items[i]);

                                break;
                            case 30: //broad sword
                                for (j = 0; j < sets.isenhart.length; j += 1) { //do not count twice in case of dual wield
                                    if (sets.isenhart[j].classid === items[i].classid) {
                                        break idSwitch;
                                    }
                                }

                                sets.isenhart.push(items[i]);

                                break;
                            case 309: //full helm
                            case 320: //breast plate
                            case 333: //gothic shield
                                sets.isenhart.push(items[i]);

                                break;
                            case 73: //long battle bow
                            case 314: //leather armor
                            case 342: //light plated boots
                                sets.vidala.push(items[i]);

                                break;
                            case 316: //studded leather
                            case 352: //war hat
                                sets.cowking.push(items[i]);

                                break;
                            case 385: //demonhide boots
                            case 429: //dusk shroud
                            case 450: //bramble mitts
                            case 462: //mithril coil
                                sets.disciple.push(items[i]);

                                break;
                            case 213: //caduceus
                                for (j = 0; j < sets.griswold.length; j += 1) { //do not count twice in case of dual wield
                                    if (sets.griswold[j].classid === items[i].classid) {
                                        break idSwitch;
                                    }
                                }

                                sets.griswold.push(items[i]);

                                break;
                            case 372: //ornate plate
                            case 427: //corona
                            case 502: //vortex shield
                                sets.griswold.push(items[i]);

                                break;
                            case 302: //grand matron bow
                            case 383: //battle gauntlets
                            case 391: //sharkskin belt
                            case 421: //diadem
                            case 439: //kraken shell
                                sets.mavina.push(items[i]);

                                break;
                            case 261: //elder staff
                            case 418: //circlet
                            case 438: //hellforge plate
                                sets.naj.push(items[i]);

                                break;
                            case 356: //winged helm
                            case 375: //round shield
                            case 381: //sharkskin gloves
                            case 393: //battle belt
                                sets.orphan.push(items[i]);

                                break;
                        }
                }
            }
        }

        for (i in sets) {
            if (sets.hasOwnProperty(i)) {
                MainSwitch:
                    switch (i) {
                        case "angelic":
                            if (sets[i].length >= 2 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            break;
                        case "artic":
                            if (sets[i].length >= 2 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 5)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 5;
                            }

                            break;
                        case "civerb":
                            if (sets[i].length === 3 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 15)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 15;
                            }

                            break;
                        case "iratha":
                            if (sets[i].length === 4 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 15)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 15;
                            }

                            break;
                        case "isenhart":
                            if (sets[i].length >= 2 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            if (sets[i].length >= 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            break;
                        case "vidala":
                            if (sets[i].length >= 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 15)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 15;
                            }

                            if (sets[i].length === 4 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            break;
                        case "cowking":
                            if (sets[i].length === 3 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            break;
                        case "disciple":
                            if (sets[i].length >= 4 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            break;
                        case "griswold":
                            if (sets[i].length >= 2 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            if (sets[i].length >= 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 30)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 30;
                            }

                            break;
                        case "mavina":
                            if (sets[i].length >= 2 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            if (sets[i].length >= 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 30)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 30;
                            }

                            break;
                        case "naj":
                            if (sets[i].length === 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 15)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 15;
                            }

                            if (sets[i].length === 3 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            break;
                        case "orphan":
                            if (sets[i].length === 4 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            if (sets[i].length === 4 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            break;
                    }
            }
        }

        return setStat;
    };

    // this check may not be necessary with this.validItem(), but consider it double check
    this.verifySetStats = function (unit, type, stats) { //verify that the set bonuses are there
        var i, temp, string;

        if (type === 0) {
            string = 3473; //to strength
        } else {
            string = 3474; //to dexterity
        }

        if (unit) {
            temp = unit.description.split("\n");

            for (i = 0; i < temp.length; i += 1) {
                if (temp[i].match(getLocaleString(string), "i")) {
                    if (parseInt(temp[i].replace(/(y|ÿ)c[0-9!"+<;.*]/, ""), 10) === stats) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    var i, statID,
        addedStat = 0,
        items = me.getItems();

    switch (type) {
        case 0: // strength
            type = 0;
            statID = 220;

            break;
        case 1: // energy
            type = 1;
            statID = 222;

            break;
        case 2: // dexterity
            type = 2;
            statID = 221;

            break;
        case 3: // vitality
            type = 3;
            statID = 223;

            break;
    }

    if (items) {
        for (i = 0; i < items.length; i += 1) {
            // items equipped or charms in inventory
            if ((items[i].mode === 1 || (items[i].location === 3 && [82, 83, 84].indexOf(items[i].itemType) > -1)) && this.validItem(items[i])) {
                // stats
                if (items[i].getStat(type)) {
                    addedStat += items[i].getStat(type);
                }

                // stats per level
                if (items[i].getStat(statID)) {
                    addedStat += Math.floor(items[i].getStat(statID) / 8 * me.charlvl);
                }
            }
        }
    }

    return (me.getStat(type) - addedStat - this.setBonus(type));
};

/**

    MERC AUTO EQUIP - credit to dzik

 **/

Item.hasMercTier = function (item) {
    return Config.AutoEquip && NTIP.GetMercTier(item) > 0 && !me.classic;
};

Item.canEquipMerc = function (item, bodyLoc) {
    if (item.type !== 4 || me.classic) { // Not an item
        return false;
    }

    let merc = me.getMerc();

    if (!merc) { // dont have merc or he is dead
        return false;
    }

    if (!item.getFlag(0x10)) { // Unid item
        return false;
    }

    let curr = this.getEquippedItemMerc(bodyLoc);

    if (item.getStat(92) > merc.getStat(12) || item.dexreq > merc.getStat(2) - curr.dex || item.strreq > merc.getStat(0) - curr.str) { // Higher requirements
        return false;
    }

    return true;
};

Item.equipMerc = function (item, bodyLoc) {
    if (!this.canEquipMerc(item, bodyLoc)) {
        return false;
    }

    // Already equipped in the right slot
    if (item.mode === 1 && item.bodylocation === bodyLoc) {
        return true;
    }

    var i, cursorItem;

    if (item.location === 7) {
        if (!Town.openStash()) {
            return false;
        }
    }

    for (i = 0; i < 3; i += 1) {
        if (item.toCursor()) {
            clickItem(4, bodyLoc);
            delay(me.ping * 2 + 500);

            if (item.bodylocation === bodyLoc) {
                if (getCursorType() === 3) {
                    //Misc.click(0, 0, me);

                    cursorItem = getUnit(100);

                    if (cursorItem) {
                        if (NTIP.CheckItem(cursorItem, NTIP_CheckListNoTier, true).result == 1) {
                            if (Storage.Inventory.CanFit(cursorItem)) {
                                Storage.Inventory.MoveTo(cursorItem);
                            }
                        }

                        cursorItem = getUnit(100);

                        if (cursorItem) {
                            cursorItem.drop();
                        }
                    }
                }

                return true;
            }
        }
    }

    return false;
};

Item.getEquippedItemMerc = function (bodyLoc) {
    var merc = me.getMerc();
    var item = merc.getItem();

    if (item) {
        do {
            if (item.bodylocation === bodyLoc && item.location === 1) {
                //print("Current Merc item tier: " + NTIP.GetMercTier(item) + " (" + item.name + ")");
                return {
                    classid: item.classid,
                    tier: NTIP.GetMercTier(item),
                    name: item.name,
                    str: item.getStatEx(0),
                    dex: item.getStatEx(2)
                };
            }
        } while (item.getNext());
    }

    // Don't have anything equipped in there
    return {
        classid: -1,
        tier: -1,
        name: "none",
        str: 0,
        dex: 0
    };
};

Item.getBodyLocMerc = function (item) {
    var bodyLoc = false, merc = me.getMerc();

    switch (item.itemType) {
        case 3: // Armor
            bodyLoc = 3;

            break;
        case 37: // Helm
        case 75: // Circlet
            bodyLoc = 1;

            break;
        case 27:
            if (merc.classid == 271) bodyLoc = 4;
            break;
        case 33: //
        case 34: //
            if (merc.classid == 338) bodyLoc = 4;

            break;
        default:
            return false;
    }

    if (typeof bodyLoc === "number") {
        bodyLoc = [bodyLoc];
    }

    return bodyLoc;
};

Item.autoEquipCheckMerc = function (item) {
    if (!Config.AutoEquip) {
        return true;
    }

    if (Config.AutoEquip && !me.getMerc()) {
        return false;
    }

    var i,
        tier = NTIP.GetMercTier(item),
        bodyLoc = this.getBodyLocMerc(item);

    if (tier > 0 && bodyLoc) {
        for (i = 0; i < bodyLoc.length; i += 1) {
            // Low tier items shouldn't be kept if they can't be equipped
            var oldTier = this.getEquippedItemMerc(bodyLoc[i]).tier;
            if (tier > oldTier && (this.canEquipMerc(item) || !item.getFlag(0x10))) {
                return true;
            }
        }
    }

    return false;
};

Item.autoEquipMerc = function () {
    if (!Config.AutoEquip || !me.getMerc()) {
        return true;
    }

    var i, j, tier, bodyLoc, tome, gid, classid, scroll,
        items = me.findItems(-1, 0);

    if (!items) {
        return false;
    }

    function sortEq(a, b) {
        if (Item.canEquipMerc(a) && Item.canEquipMerc(b)) {
            return NTIP.GetMercTier(b) - NTIP.GetMercTier(a);
        }

        if (Item.canEquipMerc(a)) {
            return -1;
        }

        if (Item.canEquipMerc(b)) {
            return 1;
        }

        return 0;
    }

    me.cancel();

    // Remove items without tier
    for (i = 0; i < items.length; i += 1) {
        if (NTIP.GetMercTier(items[i]) === 0) {
            items.splice(i, 1);

            i -= 1;
        }
    }

    while (items.length > 0) {
        items.sort(sortEq);

        tier = NTIP.GetMercTier(items[0]);
        bodyLoc = this.getBodyLocMerc(items[0]);

        if (tier > 0 && bodyLoc) {
            for (j = 0; j < bodyLoc.length; j += 1) {
                if ([3, 7].indexOf(items[0].location) > -1 && tier > this.getEquippedItemMerc(bodyLoc[j]).tier) { // khalim's will adjustment
                    if (!items[0].getFlag(0x10)) { // unid
                        tome = me.findItem(519, 0, 3);
                        scroll = me.findItem(530, 0, 3);

                        if ((tome && tome.getStat(70) > 0) || scroll) {
                            if (items[0].location === 7) {
                                Town.openStash();
                            }

                            Town.identifyItem(items[0], scroll ? scroll : tome);
                        }
                    }

                    gid = items[0].gid;
                    classid = items[0].classid;

                    if (this.equipMerc(items[0], bodyLoc[j])) {
                        //print("Equiped Merc item.")
                    }

                    break;
                }
            }
        }

        items.shift();
    }

    return true;
};

Item.removeItemsMerc = function () {
    let cursorItem;
    let merc = me.getMerc();

    if (!merc) {
        return true;
    }

    let items = merc.getItems();

    if (items) {
        //items.forEach(function(i) {
        for (var i = 0; i < items.length; i++) {
            clickItem(4, items[i].bodylocation);
            //clickItem(4, i.bodylocation);
            delay(me.ping * 2 + 500);

            cursorItem = getUnit(100);

            if (cursorItem) {
                if (Storage.Inventory.CanFit(cursorItem)) {
                    Storage.Inventory.MoveTo(cursorItem);
                } else {
                    cursorItem.drop();
                }
            }
        }
    }

    return !!merc.getItem();
};