/**
 *	@filename	Town.js
 *	@desc		manage inventory, belt, stash, cube
 */

Town.checkKeys = function () {
	if (me.charlvl < 19 || me.classid === 6 || me.gold < 540 || (!me.getItem("key") && !Storage.Inventory.CanFit({sizex: 1, sizey: 1, gid:99999}))) {
		return 12;
	}

	var i,
		count = 0,
		key = me.findItems(543, 0, 3);

	if (key) {
		for (i = 0; i < key.length; i += 1) {
			count += key[i].getStat(70);
		}
	}

	return count;
};
 
Town.invSort = function() {
    let fit = {sizex: 4, sizey: 4, gid: 13378008};

    if (!Storage.Inventory.CanFit(fit)) {
		//Town.stash(true, true);
		Storage.Inventory.SortItems();
		/*
        me.cancel();

        return me.findItems(-1, -1, 3)
            .sort((a, b) => b.sizex * b.sizey - a.sizex * a.sizey)
            .forEach(i => Storage.Inventory.MoveTo(me.itemoncursor ? getUnit(101) : i, true));*/
    }

    return true;
};

Town.buyPotions = function () {
    if ((me.getStat(14) + me.getStat(15)) < (me.diff === 0 ? 100 : 1000)) { // Ain't got money fo' dat shyt
        return false;
    }   

    var i, j, npc, useShift, col, beltSize, pot,
        needPots = false,
        needBuffer = true,
        buffer = {
            hp: 0,
            mp: 0
        };

    let preAct;

    beltSize = Storage.BeltSize();
    col = Town.checkColumns(beltSize);

    // HP/MP Buffer
    if (Config.HPBuffer > 0 || Config.MPBuffer > 0) {
        pot = me.getItem(-1, 0);

        if (pot) {
            do {
                if (pot.location === 3) {
                    switch (pot.itemType) {
                    case 76:
                        buffer.hp += 1;

                        break;
                    case 77:
                        buffer.mp += 1;

                        break;
                    }
                }
            } while (pot.getNext());
        }
    }

    // Check if we need to buy potions based on Config.MinColumn
    for (i = 0; i < 4; i += 1) {
        if (["hp", "mp"].indexOf(Config.BeltColumn[i]) > -1 && col[i] > (beltSize - Math.min(Config.MinColumn[i], beltSize))) {
            needPots = true;
        }
    }

    // Check if we need any potions for buffers
    if (buffer.mp < Config.MPBuffer || buffer.hp < Config.HPBuffer) {
        for (i = 0; i < 4; i += 1) {
            // We can't buy potions because they would go into belt instead
            if (col[i] >= beltSize && (!needPots || Config.BeltColumn[i] === "rv")) {
                needBuffer = false;

                break;
            }
        }
    }

    // We have enough potions in inventory
    if (buffer.mp >= Config.MPBuffer && buffer.hp >= Config.HPBuffer) {
        needBuffer = false;
    }

    // No columns to fill
    if (!needPots && !needBuffer) {
        return true;
    }

    // save gold and buy cheaper potions
    if (me.diff == 0 && me.act >= 4 && me.gold < 120000) {
        preAct = me.act;

        Town.goToTown(3);
    }

    npc = Town.initNPC("Shop", "buyPotions");

    if (!npc) {
        if (preAct) {
            Town.goToTown(preAct);
        }

        return false;
    }

    for (i = 0; i < 4; i += 1) {
        if (col[i] > 0) {
            useShift = Town.shiftCheck(col, beltSize);
            pot = Town.getPotion(npc, Config.BeltColumn[i]);

            if (pot) {
                //print("ÿc2column ÿc0" + i + "ÿc2 needs ÿc0" + col[i] + " ÿc2potions");

                // Shift+buy will trigger if there's no empty columns or if only the current column is empty
                if (useShift) {
                    pot.buy(true);
                } else {
                    for (j = 0; j < col[i]; j += 1) {
                        pot.buy(false);
                    }
                }
            }
        }

        col = Town.checkColumns(beltSize); // Re-initialize columns (needed because 1 shift-buy can fill multiple columns)
    }

    if (needBuffer && buffer.hp < Config.HPBuffer) {
        for (i = 0; i < Config.HPBuffer - buffer.hp; i += 1) {
            pot = Town.getPotion(npc, "hp");

            if (Storage.Inventory.CanFit(pot)) {
                pot.buy(false);
            }
        }
    }

    if (needBuffer && buffer.mp < Config.MPBuffer) {
        for (i = 0; i < Config.MPBuffer - buffer.mp; i += 1) {
            pot = Town.getPotion(npc, "mp");

            if (Storage.Inventory.CanFit(pot)) {
                pot.buy(false);
            }
        }
    }

    if (preAct) {
        Town.goToTown(preAct);
    }

    return true;
};

Town.checkScrolls = function (id) {
    var tome = me.findItem(id, 0, 3);

    return tome ? tome.getStat(70) : 0;
};

Town.fillTome = function (code) {
    if (me.gold < 2000) {
        return false;
    }

    if (this.checkScrolls(code) >= 9) {
        return true;
    }

    var scroll, tome,
        npc = this.initNPC("Shop", "fillTome");

    if (!npc) {
        return false;
    }

    delay(500);

    if (!me.findItem(code, 0, 3)) {
        tome = npc.getItem(code);

        if (tome && Storage.Inventory.CanFit(tome)) {
            try {
                tome.buy();
            } catch (e1) {
                print(e1);

                // Couldn't buy the tome, don't spam the scrolls
                return false;
            }
        } else {
            return false;
        }
    }

    scroll = npc.getItem(code === 518 ? 529 : 530);

    if (!scroll) {
        return false;
    }

    try {
        scroll.buy(true);
    } catch (e2) {
        print(e2.message);

        return false;
    }

    return true;
};

Town.identify = function () {
    var i, item, tome, scroll, npc, list, timer, tpTome, result,
        tpTomePos = {};
    
    Town.cainID();
    
    list = Storage.Inventory.Compare(Config.Inventory);
    
    if (!list) {
        return false;
    }
    
    // Avoid unnecessary NPC visits
    for (i = 0; i < list.length; i += 1) {
        // Only unid items or sellable junk (low level) should trigger a NPC visit
        if ((!list[i].getFlag(0x10) || Config.LowGold > 0) && ([-1, 4].indexOf(Pickit.checkItem(list[i]).result) > -1 || (!list[i].getFlag(0x10) && (Item.hasTier(list[i]) || Item.hasMercTier(list[i]))))) {
            break;
        }
    }
    
    if (i === list.length) {
        return false;
    }
    
    npc = Town.initNPC("Shop", "identify");
    
    if (!npc) {
        return false;
    }
    
    tome = me.findItem(519, 0, 3);
    
    if (tome && tome.getStat(70) < list.length) {
        Town.fillTome(519);
    }
    
    MainLoop:
        while (list.length > 0) {
            item = list.shift();
            
            if (!item.getFlag(0x10) && item.location === 3 && Town.ignoredItemTypes.indexOf(item.itemType) === -1) {
                result = Pickit.checkItem(item);

                if (result.result === 1 && !item.getFlag(0x10) && (Item.hasTier(item) || Item.hasMercTier(item))) {
                    result.result = -1;
                }
                
                switch (result.result) {
                    // Items for gold, will sell magics, etc. w/o id, but at low levels
                    // magics are often not worth iding.
                    case 4:
                        Misc.itemLogger("Sold", item);
                        item.sell();
                        
                        break;
                    case -1:
                        if (tome) {
                            Town.identifyItem(item, tome);
                        } else {
                            scroll = me.findItem(530, 0, 3);

                            if (!scroll) {
                                scroll = npc.getItem(530);

                                if (scroll) {
                                    if (!Storage.Inventory.CanFit(scroll)) {
                                        tpTome = me.findItem(518, 0, 3);

                                        if (tpTome) {
                                            tpTomePos = {x: tpTome.x, y: tpTome.y};

                                            tpTome.sell();
                                            delay(500);
                                        }
                                    }

                                    delay(500);

                                    if (Storage.Inventory.CanFit(scroll)) {
                                        scroll.buy();
                                    }
                                }

                                scroll = me.findItem(530, 0, 3);
                            }
                            
                            if (!scroll) {
                                break MainLoop;
                            }
                            
                            Town.identifyItem(item, scroll);
                        }
                        
                        result = Pickit.checkItem(item);
                        
                        switch (result.result) {
                            case 1:
                                // Couldn't id autoEquip item. Don't log it. - pbp && !item.getFlag(0x10)
                                if (result.result === 1 && Config.AutoEquip && (Item.autoEquipCheck(item) || Item.autoEquipCheckMerc(item))) {
                                    break;
                                }
                                
                                Misc.itemLogger("Kept", item);
                                Misc.logItem("Kept", item, result.line);
                                
                                break;
                            case -1: // unidentified
                                break;
                            case 2: // cubing
                                Misc.itemLogger("Kept", item, "Cubing-Town");
                                Cubing.update();
                                
                                break;
                            case 3: // runeword (doesn't trigger normally)
                                break;
                            case 5: // Crafting System
                                Misc.itemLogger("Kept", item, "CraftSys-Town");
                                CraftingSystem.update(item);
                                
                                break;
                            default:
                                Misc.itemLogger("Sold", item);
                                item.sell();
                                
                                timer = getTickCount() - Town.sellTimer; // shop speedup test
                                
                                if (timer > 0 && timer < 500) {
                                    delay(timer);
                                }
                                
                                break;
                        }
                        
                        break;
                }
            }
        }
    
    Town.fillTome(518); // Check for TP tome in case it got sold for ID scrolls
    
    return true;
};

Town.doChores = function () {
    if (!me.inTown) {
        Town.goToTown();
    }
	
    var i,
        cancelFlags = [0x01, 0x02, 0x04, 0x08, 0x14, 0x16, 0x0c, 0x0f, 0x19, 0x1a];

    if (me.classid === 4 && Config.FindItem && Config.FindItemSwitch) { // weapon switch fix in case last game dropped with item find switch on
        Precast.weaponSwitch(Math.abs(Config.FindItemSwitch - 1));
    }

    if (Config.MFSwitchPercent) {
        Precast.weaponSwitch(Math.abs(Config.MFSwitch - 1));
    }

    if (Precast.haveCTA > -1) {
        Precast.weaponSwitch(Math.abs(Precast.haveCTA - 1));
    }

    if (me.gold >= (me.mercrevivecost * 10)) {
        Town.reviveMerc();
    }
	
    Town.checkQuestItems();
	Town.heal();
    Town.identify();
    Town.clearInventory();
    Town.shopItems();
    Town.buyPotions();
    Town.fillTome(518);
	
    if (me.charlvl >= 7 && me.gold >= 5000) {
        Town.clearScrolls();
        Town.fillTome(519);
		Town.buyKeys();
    }
	
    Item.autoEquip();
    Item.autoEquipMerc();
    Town.clearInventory();
    Town.gamble();

    if (me.getStat(12) >= 3) {
        Town.repair();
    }

    Cubing.doCubing();
    Runewords.makeRunewords();
    Item.autoEquip();
    Item.autoEquipMerc();
    Town.stash(true);
    Town.invSort();

    for (i = 0; i < cancelFlags.length; i += 1) {
        if (getUIFlag(cancelFlags[i])) {
            delay(500);
            me.cancel();

            break;
        }
    }

    me.cancel();

    return true;
};

Town.reviveMerc = function () {
    if (!Town.needMerc()) {
        return true;
    }

    // Fuck Aheara
    if (me.act === 3) {
        Town.goToTown(2);
    }

    var preArea = me.area,
        npc = Town.initNPC("Merc", "reviveMerc");

    if (!npc) {
        return false;
    }

    npc = getInteractedNPC();

    if (!npc) {
        return false;
    }

ReviveLoop:
    for (let i = 0; i < 15; i += 1) {
        sendPacket(1, 0x62, 4, npc.gid);

        let tick = getTickCount();

        while (getTickCount() - tick < Math.max(1000, me.ping * 2 + 200)) {
            if (me.getMerc()) {
                me.cancel(); // fix crash

                break ReviveLoop;
            }

            delay(10);
        }
    }

    me.cancel();

    Attack.checkInfinity();

    if (!!me.getMerc()) {
        if (Config.MercWatch) { // Cast BO on merc so he doesn't just die again
            print("MercWatch precast");
            Pather.useWaypoint("random");
            Precast.doPrecast(true);
            Pather.useWaypoint(preArea);
        }

        return true;
    }

    return false;
};

Town.checkQuestItems = function () {
    // skill book
    if (me.getItem(552)) {
        Quest.useItem(552);
    }

    // golden bird stuff
    if (me.getItem(546)) {
        Town.goToTown(3);
        Quest.talkTo("meshif", "meshif");
    }

    if (me.getItem(547)) {
        Town.goToTown(3);
		Quest.talkTo("cain", "cain");
		Quest.talkTo("alkor", "alkor");
        Quest.talkTo("alkor", "alkor");
    }

    if (me.getItem(545)) {
        Quest.useItem(545);
    }

    // anya resist scroll
    if (me.getItem(646)) {
        Quest.useItem(646);
    }

    return true;
};

/*Town.clearStash = function () {
    return me.findItems(-1, -1, 7).forEach(function(item) {
		if (Town.ignoredItemTypes.indexOf(item.itemType) > -1) {
			Packet.dropItem(item);
		}
		
        else if ((Pickit.checkItem(item).result == 4 || NTIP.CheckItem(item, NTIP_CheckListNoTier, true).result == 0) &&
            (!Cubing.keepItem(item) && !Runewords.keepItem(item) && !CraftingSystem.keepItem(item))) {
            Packet.dropItem(item);
        }
    });
};*/

Town.stash = function (stashGold, force=false) {
	var ignoredClassids = [91, 174];
	var sorted;
	
    if (stashGold === undefined) {
        stashGold = true;
    }
	
    if (!Town.needStash() && !force) {
        return true;
    }
	
    me.cancel();
	
    var i, result,
        items = Storage.Inventory.Compare(Config.Inventory);

    if (items) {
        for (i = 0; i < items.length; i += 1) {
            if (Town.ignoredItemTypes.indexOf(items[i].itemType) == -1 && ignoredClassids.indexOf(items[i].classid) == -1) {
				
				if (!Storage.Stash.CanFit(items[i])) {
					if (!sorted) {
						Town.clearStash();
						Storage.Stash.SortItems();
						sorted = true;
						if (!Storage.Stash.CanFit(items[i])) continue;
					} else {
						continue;
					}
				}				
				
                result = (NTIP.CheckItem(items[i], NTIP_CheckListNoTier, true).result > 0 && NTIP.CheckItem(items[i], NTIP_CheckListNoTier, true).result < 4) || Cubing.keepItem(items[i]) || Runewords.keepItem(items[i]) || CraftingSystem.keepItem(items[i]);

                if (result) {
                    Misc.itemLogger("Stashed", items[i]);
                    Storage.Stash.MoveTo(items[i]);
                }
            }
        }
    }
	
    // Stash gold
    if (stashGold) {
        if (me.getStat(14) >= Config.StashGold && me.getStat(15) < 25e5 && Town.openStash()) {
            gold(me.getStat(14), 3);
            delay(1000);
            me.cancel();
        }
    }

    return true;
};

Town.clearInventory = function () {
    var i, col, result, item, beltSize,
        items = [];
    
    //Town.checkQuestItems(); // only golden bird quest for now
    
    // Return potions to belt
    item = me.getItem(-1, 0);
    
    if (item) {
        do {
            if (item.location === 3 && [76, 77, 78].indexOf(item.itemType) > -1) {
                items.push(copyUnit(item));
            }
        } while (item.getNext());
        
        beltSize = Storage.BeltSize();
        col = Town.checkColumns(beltSize);
        
        // Sort from HP to RV
        items.sort(function (a, b) {
            return a.itemType - b.itemType;
        });
        
        while (items.length) {
            item = items.shift();
            
            for (i = 0; i < 4; i += 1) {
                if (item.code.indexOf(Config.BeltColumn[i]) > -1 && col[i] > 0) {
                    if (col[i] === beltSize) { // Pick up the potion and put it in belt if the column is empty
                        if (item.toCursor()) {
                            clickItem(0, i, 0, 2);
                        }
                    } else {
                        clickItem(2, item.x, item.y, item.location); // Shift-click potion
                    }
                    
                    delay(me.ping + 200);
                    
                    col = Town.checkColumns(beltSize);
                }
            }
        }
    }
    
    // Cleanup remaining potions
    item = me.getItem(-1, 0);
    
    if (item) {
        items = [
            [], // array for hp
            [] // array for mp
        ];
        
        do {
            if (item.itemType === 76) {
                items[0].push(copyUnit(item));
            }
            
            if (item.itemType === 77) {
                items[1].push(copyUnit(item));
            }
        } while (item.getNext());
        
        // Cleanup healing potions
        while (items[0].length > Config.HPBuffer) {
            items[0].shift().interact();
            delay(200 + me.ping);
        }
        
        // Cleanup mana potions
        while (items[1].length > Config.MPBuffer) {
            items[1].shift().interact();
            delay(200 + me.ping);
        }
    }
    
    // Any leftover items from a failed ID (crashed game, disconnect etc.)
    items = Storage.Inventory.Compare(Config.Inventory);
    
    for (i = 0; !!items && i < items.length; i += 1) {
        if ([18, 41, 76, 77, 78].indexOf(items[i].itemType) === -1 && // Don't drop tomes, keys or potions
                // Keep some quest items
            items[i].classid !== 524 && // Scroll of Inifuss
            items[i].classid !== 525 && // Key to Cairn Stones
            items[i].classid !== 549 && // Horadric Cube
            items[i].classid !== 92 && // Staff of Kings
            items[i].classid !== 521 && // Viper Amulet
            items[i].classid !== 91 && // Horadric Staff
            items[i].classid !== 552 && // Book of Skill
            items[i].classid !== 545 && // Potion of Life
            items[i].classid !== 546 && // A Jade Figurine
            items[i].classid !== 547 && // The Golden Bird
            items[i].classid !== 548 && // Lam Esen's Tome
            items[i].classid !== 553 && // Khalim's Eye
            items[i].classid !== 554 && // Khalim's Heart 
            items[i].classid !== 555 && // Khalim's Brain
            items[i].classid !== 173 && // Khalim's Flail
            items[i].classid !== 174 && // Khalim's Will
            items[i].classid !== 644 && // Malah's Potion
            items[i].classid !== 646 && // Scroll of Resistance
                //
            (items[i].code !== 529 || !!me.findItem(518, 0, 3)) && // Don't throw scrolls if no tome is found (obsolete code?)
            (items[i].code !== 530 || !!me.findItem(519, 0, 3)) && // Don't throw scrolls if no tome is found (obsolete code?)
            !Cubing.keepItem(items[i]) && // Don't throw cubing ingredients
            !Runewords.keepItem(items[i]) && // Don't throw runeword ingredients
            !CraftingSystem.keepItem(items[i]) // Don't throw crafting system ingredients
        ) {
            result = Pickit.checkItem(items[i]).result;
            //pbp
            if (!items[i].getFlag(0x10)) {
                result = -1;
            }
            
            switch (result) {
                case 0: // Drop item
                    if ((getUIFlag(0x0C) || getUIFlag(0x08)) && (items[i].getItemCost(1) <= 1 || items[i].itemType === 39)) { // Quest items and such
                        me.cancel();
                        delay(200);
                    }
                    
                    if (getUIFlag(0xC) || (Config.PacketShopping && getInteractedNPC() && getInteractedNPC().itemcount > 0)) { // Might as well sell the item if already in shop
                        print("clearInventory sell " + items[i].name);
                        Misc.itemLogger("Sold", items[i]);
                        items[i].sell();
                    } else {
                        Misc.itemLogger("Dropped", items[i], "clearInventory");
                        items[i].drop();
                    }
                    
                    break;
                case 4: // Sell item
                    try {
                        print("LowGold sell " + items[i].name);
                        Town.initNPC("Shop", "clearInventory");
                        Misc.itemLogger("Sold", items[i]);
                        items[i].sell();
                    } catch (e) {
                        print(e);
                    }
                    
                    break;
            }
        }
    }
    
    return true;
};