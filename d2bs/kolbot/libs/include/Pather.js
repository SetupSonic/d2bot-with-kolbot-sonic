/**
 *	@filename	Pather.js
 *	@desc		handle player movement
 */

// increase clearpath range
NodeAction.killMonsters = function(arg) {
    var monList;

    if (Config.Countess.KillGhosts && [21, 22, 23, 24, 25].indexOf(me.area) > -1) {
        monList = Attack.getMob(38, 0, 30);

        if (monList) {
            Attack.clearList(monList);
        }
    }

    if ((typeof Config.ClearPath === "number" || typeof Config.ClearPath === "object") && arg.clearPath === false) {
        switch (typeof Config.ClearPath) {
            case "number":
                Attack.clear(30, Config.ClearPath);

                break;
            case "object":
                if (!Config.ClearPath.hasOwnProperty("Areas") || Config.ClearPath.Areas.length === 0 || Config.ClearPath.Areas.indexOf(me.area) > -1) {
                    Attack.clear(Config.ClearPath.Range, Config.ClearPath.Spectype);
                }

                break;
        }
    }

    if (arg.clearPath !== false) {
        Attack.clear(30, typeof arg.clearPath === "number" ? arg.clearPath : 0);
    }
};

// Return false instead of getting wp
Pather.useWaypoint = function (targetArea, check) {
    switch (targetArea) {
    case undefined:
        throw new Error("useWaypoint: Invalid targetArea parameter: " + targetArea);
    case null:
    case "random":
        check = true;

        break;
    default:
        if (typeof targetArea !== "number") {
            throw new Error("useWaypoint: Invalid targetArea parameter");
        }

        if (Pather.wpAreas.indexOf(targetArea) < 0) {
            throw new Error("useWaypoint: Invalid area");
        }

        break;
    }

    var i, tick, wp;

    for (i = 0; i < 12; i += 1) {
        if (me.area === targetArea || me.dead) {
            break;
        }

        if (me.inTown) {
            Town.move("waypoint");
        }

        wp = getUnit(2, "waypoint");

        if (wp && wp.area === me.area) {
            if (!me.inTown && getDistance(me, wp) > 7) {
                Pather.moveToUnit(wp);
            }

            if (check || Config.WaypointMenu) {
                if (getDistance(me, wp) > 5) {
                    Pather.moveToUnit(wp);
                }

                Misc.click(0, 0, wp);

                tick = getTickCount();

                while (getTickCount() - tick < Math.max(Math.round((i + 1) * 1000 / (i / 5 + 1)), me.ping * 2)) {
                    if (getUIFlag(0x14)) { // Waypoint screen is open
                        delay(500);

                        switch (targetArea) {
                        case "random":
                            while (true) {
                                targetArea = Pather.wpAreas[rand(0, Pather.wpAreas.length - 1)];

                                // get a valid wp, avoid towns
                                if ([1, 40, 75, 103, 109].indexOf(targetArea) === -1 && getWaypoint(Pather.wpAreas.indexOf(targetArea))) {
                                    break;
                                }

                                delay(5);
                            }

                            break;
                        case null:
                            me.cancel();

                            return true;
                        }

                        if (!getWaypoint(Pather.wpAreas.indexOf(targetArea))) {
                            me.cancel();

                            return false;
                        }

                        break;
                    }

                    delay(10);
                }

                if (!getUIFlag(0x14)) {
                    print("waypoint retry " + (i + 1));
                    Pather.moveTo(me.x + rand(-5, 5), me.y + rand(-5, 5));
                    Packet.flash(me.gid);

                    continue;
                }
            }

            if (!check || getUIFlag(0x14)) {
                delay(200);
                wp.interact(targetArea);

                tick = getTickCount();

                while (getTickCount() - tick < Math.max(Math.round((i + 1) * 1000 / (i / 5 + 1)), me.ping * 2)) {
                    if (me.area === targetArea) {
                        delay(100);

                        return true;
                    }

                    delay(10);
                }

                me.cancel(); // In case lag causes the wp menu to stay open
            }

            Packet.flash(me.gid);

            if (i > 1) { // Activate check if we fail direct interact twice
                check = true;
            }
        } else {
            Packet.flash(me.gid);
        }

        delay(200 + me.ping);
    }

    if (me.area === targetArea) {
        return true;
    }

    throw new Error("useWaypoint: Failed to use waypoint");
};

// Add a clearPath parameter
Pather.journeyTo = function (area, clearPath=false) {
    var i, special, unit, tick, target;

    target = Pather.plotCourse(area, me.area);

    print(target.course);    

    if (target.useWP) {
        Town.goToTown();
    }

    // handle variable flayer jungle entrances
    if (target.course.indexOf(78) > -1) {
        Town.goToTown(3); // without initiated act, getArea().exits will crash

        special = getArea(78);

        if (special) {
            special = special.exits;

            for (i = 0; i < special.length; i += 1) {
                if (special[i].target === 77) {
                    target.course.splice(target.course.indexOf(78), 0, 77); // add great marsh if needed

                    break;
                }
            }
        }
    }

    const towns = [null, 40, 75, 103, 109];
	
    while (target.course.length) {
        if (!me.inTown) {
            Precast.doPrecast(false);
        }
		
        if (Pather.wpAreas.indexOf(me.area) > -1 && !getWaypoint(Pather.wpAreas.indexOf(me.area))) {
            Pather.getWP(me.area, clearPath);
        }

        if (me.inTown && Pather.wpAreas.indexOf(target.course[0]) > -1 && getWaypoint(Pather.wpAreas.indexOf(target.course[0]))) {
            Pather.useWaypoint(target.course[0], !Pather.plotCourse_openedWpMenu);
            Precast.doPrecast(false);
        } else if (towns.includes(target.course[0]) && !getWaypoint(Pather.wpAreas.indexOf(target.course[0]))) { // It's a town but we dont have the wp yet - something happened between finishing acts and moving to the next act
            switch (target.course[0]) {
            case 40:
                if (Packet.checkQuest(6, 1) || Packet.checkQuest(6, 0)) {
                    Quest.talkTo("warriv", "warriv");
                    Quest.changeAct(2);
                }
                break;
            case 75:
                break;   
            case 103:
                if (Packet.checkQuest(23, 0)) {
                    Pather.useWaypoint(101);
                    Pather.moveToExit(102, true);
                    Pather.moveTo(17590, 8068);
                    delay(1500);
                    Pather.usePortal(null);
                }
                break;
            case 109:
                if (Packet.checkQuest(26, 0)) {
                    Town.goToTown(4);
                    Quest.talkTo("tyrael", "tyrael");
                    Quest.changeAct(5);
                }
                break;        
            }
        } else if (me.area === 109 && target.course[0] === 110) { // Harrogath -> Bloody Foothills
            Pather.moveTo(5026, 5095);

            unit = getUnit(2, 449); // Gate

            if (unit) {
                for (i = 0; i < 3; i += 1) {
                    Misc.click(0, 0, unit);
                    //unit.interact();

                    tick = getTickCount();

                    while (getTickCount() - tick < 3000) {
                        if (unit.mode === 2) {
                            delay(1000);

                            break;
                        }

                        delay(10);
                    }
                }
            }

            Pather.moveToExit(target.course[0], true, clearPath);
        } else if (me.area === 4 && target.course[0] === 38) { // Stony Field -> Tristram
            Pather.moveToPreset(me.area, 1, 737, 0, 0, false, true);

            for (i = 0; i < 5; i += 1) {
                if (Pather.usePortal(38)) {
                    break;
                }

                delay(1000);
            }
		} else if (me.area === 40 && target.course[0] === 47) { // Lut Gholein -> Sewers Level 1 (use Trapdoor)
            Pather.moveToPreset(me.area, 5, 19);
            Pather.useUnit(2, 74, 47);
		} else if (me.area === 44 && target.course[0] === 65) { // Lost City -> Ancient Tunnels
			Pather.moveToPreset(me.area, 5, 50);
			Pather.useUnit(2, 74, 65);
        } else if (me.area === 74 && target.course[0] === 46) { // Arcane Sanctuary -> Canyon of the Magi
            Pather.moveToPreset(me.area, 2, 357);

            for (i = 0; i < 5; i += 1) {
                unit = getUnit(2, 357);

                Misc.click(0, 0, unit);
                delay(1000);
                me.cancel();

                if (Pather.usePortal(46)) {
                    break;
                }
            }
        } else if (me.area === 54 && target.course[0] === 74) { // Palace -> Arcane
            Pather.moveTo(10073, 8670, 5, clearPath);
            Pather.usePortal(null);
		/*} else if (me.area === 92 && target.course[0] === 93) { // A3 Sewers Level 1  -> A3 Sewers Level 2
                Pather.moveToPreset(me.area, 5, 60);
                var s = getUnit(2, 367);
                if (s && s.mode == 0) {
                    Pather.moveToUnit(s);
                    while(s.mode === 0) {
                        s.interact();
                        s = getUnit(2, 367);
                    }
				}
                Pather.useUnit(2, 366, 93);*/
        } else if (me.area === 83 && target.course[0] === 100) { // Travincal -> Durance Of Hate Level 1
                Pather.moveToPreset(me.area, 5, 64);
                Pather.useUnit(2, 386, 100);
        } else if (me.area === 109 && target.course[0] === 121) { // Harrogath -> Nihlathak's Temple
            Town.move("anya");
            Pather.usePortal(121);
        } else if (me.area === 111 && target.course[0] === 125) { // Abaddon
            Pather.moveToPreset(111, 2, 60);
            Pather.usePortal(125);
        } else if (me.area === 112 && target.course[0] === 126) { // Pits of Archeon
            Pather.moveToPreset(112, 2, 60);
            Pather.usePortal(126);
        } else if (me.area === 117 && target.course[0] === 127) { // Infernal Pit
            Pather.moveToPreset(117, 2, 60);
            Pather.usePortal(127);
		} else if (me.area === 120 && target.course[0] === 128) { // Arreat Summit -> Worldstone Keep Level 1
			Pather.moveToPreset(120, 2, 547);
			Pather.useUnit(2, 547, 128);
        } else {
            Pather.moveToExit(target.course[0], true, clearPath);
        }
		
		Misc.townCheck();
		
        target.course.shift();
    }

    return me.area === area;
};

// set the journeyTo clearPath
Pather.getWP = function (area, clearPath) {
    var i, wp, preset,
        wpIDs = [119, 145, 156, 157, 237, 238, 288, 323, 324, 398, 402, 429, 494, 496, 511, 539];

    for (let z = 0; z < 3 && area !== me.area; z++) {
        Pather.journeyTo(area, clearPath);
    }
	
	if (area !== me.area) {
		D2Bot.printToConsole("Journeyto in getwp failed to get to target area " + area);
		return false;
	}

    for (i = 0; i < wpIDs.length; i += 1) {
		preset = getPresetUnit(area, 2, wpIDs[i]);
		
        if (preset) {
            Pather.moveToUnit(preset, 0, 0, clearPath);

            wp = getUnit(2, "waypoint");

            if (wp && wp.area === me.area) {    
                if (getDistance(me, wp) > 5) {
                    Pather.moveToUnit(wp, 0, 0, clearPath);
                }

                for (let retry = 0; retry < 5; retry += 1) {
                    Misc.click(0, 0, wp);

                    let tick = getTickCount();

                    while (getTickCount() - tick < Math.max(Math.round((i + 1) * 1000 / (i / 5 + 1)), me.ping * 2)) {                       
                        if (getUIFlag(0x14)) { // Waypoint screen is open
                            delay(500);

                            if (getWaypoint(Pather.wpAreas.indexOf(area))) {
                                return true;
                            }
                        }

                        delay(50);
                    }

                    if (!getUIFlag(0x14)) {
                        Pather.moveTo(me.x + rand(-5, 5), me.y + rand(-5, 5));
                        Packet.flash(me.gid);
                    }                               
                }

                D2Bot.printToConsole('Still failed to get waypoint: ' + area);
            }
        }
    }

    return false;
};

// Also use tp scrolls
Pather.makePortal = function (use) {
    if (me.inTown) {
        return true;
    }

    var i, portal, oldPortal, oldGid, tick, tpTome, tpScroll;

    for (i = 0; i < 5; i += 1) {
        if (me.dead) {
            break;
        }

        tpScroll = me.findItem("tsc", 0, 3);
        tpTome = me.findItem("tbk", 0, 3);

        if (!tpTome && !tpScroll) {
            //throw new Error("makePortal: No TP tomes.");
            return false;
        }

        if ((tpTome && !tpTome.getStat(70)) && !tpScroll) {
            //throw new Error("makePortal: No scrolls.");
            return false;
        }

        oldPortal = getUnit(2, "portal");

        if (oldPortal) {
            do {
                if (oldPortal.getParent() === me.name) {
                    oldGid = oldPortal.gid;

                    break;
                }
            } while (oldPortal.getNext());
        }

        if (!tpTome) {
            tpScroll.interact()
        } else {
            tpTome.interact()
        }

        tick = getTickCount();

MainLoop:
        while (getTickCount() - tick < Math.max(500 + i * 100, me.ping * 2 + 100)) {
            portal = getUnit(2, "portal");

            if (portal) {
                do {
                    if (portal.getParent() === me.name && portal.gid !== oldGid) {
                        if (use) {
                            if (Pather.usePortal(null, null, copyUnit(portal))) {
                                return true;
                            }

                            break MainLoop; // don't spam usePortal
                        } else {
                            return copyUnit(portal);
                        }
                    }
                } while (portal.getNext());
            }

            delay(10);
        }

        Packet.flash(me.gid);
        delay(200 + me.ping);
    }

    return false;
};

// Try and clear a blocked path
Pather.moveTo = function (x, y, retry, clearPath, pop) {
    if (me.dead) { // Abort if dead
        return false;
    }

    var i, path, adjustedNode, cleared,
        node = {x: x, y: y},
        fail = 0;

    for (i = 0; i < Pather.cancelFlags.length; i += 1) {
        if (getUIFlag(Pather.cancelFlags[i])) {
            me.cancel();
        }
    }

    if (getDistance(me, x, y) < 2) {
        return true;
    }

    if (x === undefined || y === undefined) {
        throw new Error("moveTo: Function must be called with at least 2 arguments.");
    }

    if (typeof x !== "number" || typeof y !== "number") {
        throw new Error("moveTo: Coords must be numbers");
    }

    if (retry === undefined) {
		if (me.area === 62 || me.area === 63 || me.area === 64) {
			retry = 10;
		} else {
			retry = 3; 
		}        
    }

    if (clearPath === undefined) {
        clearPath = false;
    }

    if (pop === undefined) {
        pop = false;
    }

    Pather.useTeleport = Pather.teleport && !me.getState(139) && !me.getState(140) && !me.inTown &&
                        ((me.classid === 1 && me.getSkill(54, 1)) || me.getStat(97, 54));

    // Teleport without calling getPath if the spot is close enough
    if (Pather.useTeleport && getDistance(me, x, y) <= Pather.teleDistance) {
        //Misc.townCheck();

        return Pather.teleportTo(x, y);
    }

    path = getPath(me.area, x, y, me.x, me.y, Pather.useTeleport ? 1 : 0, Pather.useTeleport ? ([62, 63, 64].indexOf(me.area) > -1 ? 30 : Pather.teleDistance) : Pather.walkDistance);

    if (!path) {
        throw new Error("moveTo: Failed to generate path.");
    }

    path.reverse();

    if (pop) {
        path.pop();
    }

    PathDebug.drawPath(path);

    if (Pather.useTeleport && Config.TeleSwitch) {
        Misc.teleSwitch();
    }

    while (path.length > 0) {
        if (me.dead) { // Abort if dead
            return false;
        }

        for (i = 0; i < Pather.cancelFlags.length; i += 1) {
            if (getUIFlag(Pather.cancelFlags[i])) {
                me.cancel();
            }
        }

        node = path.shift();

        if (getDistance(me, node) > 2) {
            // Make life in Maggot Lair easier
            if ([62, 63, 64].indexOf(me.area) > -1) {
                adjustedNode = Pather.getNearestWalkable(node.x, node.y, 15, 3, 0x1 | 0x4 | 0x800 | 0x1000);

                if (adjustedNode) {
                    node.x = adjustedNode[0];
                    node.y = adjustedNode[1];
                }
            }

            if (Pather.useTeleport ? Pather.teleportTo(node.x, node.y) : Pather.walkTo(node.x, node.y, (fail > 0 || me.inTown) ? 2 : 4)) {
                if (!me.inTown) {
                    if (Pather.recursion) {
                        Pather.recursion = false;

                        NodeAction.go({clearPath: clearPath});

                        if (getDistance(me, node.x, node.y) > 5) {
                            Pather.moveTo(node.x, node.y);
                        }

                        Pather.recursion = true;
                    }

                    Misc.townCheck();
                }
            } else {
                if (fail > 0 && (!Pather.useTeleport || !me.getSkill(54, 1)) && !me.inTown) {
                    // Don't go berserk on longer paths
                    if (!cleared) {
                        Attack.clear(5);

                        cleared = true;
                    }

                    if (fail > 1 && me.getSkill(143, 1)) {
                        Skill.cast(143, 0, node.x, node.y);
                    }
                }

                // Reduce node distance in new path
                path = getPath(me.area, x, y, me.x, me.y, Pather.useTeleport ? 1 : 0, Pather.useTeleport ? rand(25, 35) : rand(10, 15));
                fail += 1;

                if (!path) {
                    throw new Error("moveTo: Failed to generate path.");
                }

                path.reverse();
                PathDebug.drawPath(path);

                if (pop) {
                    path.pop();
                }

                print("move retry " + fail);

                if (fail > 0 && fail >= retry) {
                    break;
                }
            }
        }

        delay(5);
    }

    if (Pather.useTeleport && Config.TeleSwitch) {
        Precast.weaponSwitch(Misc.oldSwitch);
    }

    PathDebug.removeHooks();

    return getDistance(me, node.x, node.y) < 5;
};

// Try and kill monsters if there's some fail to walk
Pather.walkTo = function (x, y, minDist) {
    while (!me.gameReady) {
        delay(100);
    }

    if (minDist === undefined) {
        minDist = me.inTown ? 2 : 4;
    }

    var i, angle, angles, nTimer, whereToClick, tick,
        nFail = 0,
        attemptCount = 0;

    // Stamina handler and Charge
    if (!me.inTown && !me.dead) {
        if (me.runwalk === 1 && me.stamina / me.staminamax * 100 <= 20) {
            me.runwalk = 0;
        }

        if (me.runwalk === 0 && me.stamina / me.staminamax * 100 >= 50) {
            me.runwalk = 1;
        }

        if (Config.Charge && me.classid === 3 && me.mp >= 9 && getDistance(me.x, me.y, x, y) > 8 && Skill.setSkill(107, 1)) {
            if (Config.Vigor) {
                Skill.setSkill(115, 0);
            }

            Misc.click(0, 1, x, y);

            while (me.mode !== 1 && me.mode !== 5 && !me.dead) {
                delay(40);
            }
        }
    }

    if (me.inTown && me.runwalk === 0) {
        me.runwalk = 1;
    }

    while (getDistance(me.x, me.y, x, y) > minDist && !me.dead) {
        if (me.classid === 3 && Config.Vigor) {
            Skill.setSkill(115, 0);
        }

        if (Pather.openDoors(x, y) && getDistance(me.x, me.y, x, y) <= minDist) {
            return true;
        }

        Misc.click(0, 0, x, y);

        attemptCount += 1;
        nTimer = getTickCount();

ModeLoop:
        while (me.mode !== 2 && me.mode !== 3 && me.mode !== 6) {
            if (me.dead) {
                return false;
            }

            if ((getTickCount() - nTimer) > 500) {
                nFail += 1;

                if (nFail >= 1 && !me.inTown) {
                    //me.overhead('Try to clear a path!')
                    Attack.clear(5)
                }

                if (nFail >= 3) {
                    return false;
                }

                angle = Math.atan2(me.y - y, me.x - x);
                angles = [Math.PI / 2, -Math.PI / 2];

                for (i = 0; i < angles.length; i += 1) {
                    // TODO: might need rework into getnearestwalkable
                    whereToClick = {
                        x: Math.round(Math.cos(angle + angles[i]) * 5 + me.x),
                        y: Math.round(Math.sin(angle + angles[i]) * 5 + me.y)
                    };

                    if (Attack.validSpot(whereToClick.x, whereToClick.y)) {
                        Misc.click(0, 0, whereToClick.x, whereToClick.y);

                        tick = getTickCount();

                        while (getDistance(me, whereToClick) > 2 && getTickCount() - tick < 1000) {
                            delay(40);
                        }

                        break;
                    }
                }

                break ModeLoop;
            }

            delay(10);
        }

        // Wait until we're done walking - idle or dead
        while (getDistance(me.x, me.y, x, y) > minDist && me.mode !== 1 && me.mode !== 5 && !me.dead) {
            delay(10);
        }

        if (attemptCount >= 8) {
            return false;
        }
    }

    return !me.dead && getDistance(me.x, me.y, x, y) <= minDist;
};

// Check for monsters blocking doorway
Pather.openDoors = function (x, y) {
    if (me.inTown) {
        return false;
    }

    // Regular doors
    var i, tick, monList, monCount,
        door = getUnit(2, "door", 0);

    if (door) {
        do {
            if ((getDistance(door, x, y) < 4 && getDistance(me, door) < 9) || getDistance(me, door) < 4) {
                for (i = 0; i < 3; i += 1) {
                    Misc.click(0, 0, door);
                    //door.interact();

                    tick = getTickCount();

                    while (getTickCount() - tick < 1000) {
                        if (door.mode === 2) {
                            me.overhead("Opened a door!");

                            return true;
                        }

                        delay(10);
                    }

                    if (i === 2) {
                        Packet.flash(me.gid)
                    }
                }
            }
        } while (door.getNext());

        // Blocked by monster handler
        monList = Attack.buildMonsterList().length;
        monCount = Attack.getMonsterCount(door.x, door.y, 7, monList);

        // 2 monsters close to the door
        if (monCount >= 2) {
            Attack.clear((getDistance(me, door) < 10) ? 10 : 15)
        }
    }

    return false;
};

// Added a flash and clearpath parameter
Pather.useUnit = function(type, id, targetArea, clearPath) {
    var i, tick, unit,
        preArea = me.area;

    for (i = 0; i < 5; i += 1) {
        unit = getUnit(type, id);

        if (unit) {
            break;
        }

        delay(200);
    }

    if (!unit) {
        throw new Error("useUnit: Unit not found. ID: " + id);
    }

    for (i = 0; i < 7; i += 1) {
		if (i > 2) {
			Attack.deploy(unit, 20, 5, 30);
			me.overhead("Let me in, hoe.");
		}
		
        if (getDistance(me, unit) > 5) {
            Pather.moveToUnit(unit, 0, 0, clearPath);
        }

		if (type === 2 && unit.mode === 0) {
			if ((me.area === 83 && targetArea === 100 && me.getQuest(21, 0) !== 1) || (me.area === 120 && targetArea === 128 && me.getQuest(39, 0) !== 1)) {
				throw new Error("useUnit: Incomplete quest.");
			}

			if (me.area === 92) {
				Pather.openUnit(2, 367);
			} else {
				Pather.openUnit(2, id);
			}
		}		
		
        delay(300);

		if (type === 5 || i > 2) {
			Misc.click(0, 0, unit);
		} else {
			sendPacket(1, 0x13, 4, unit.type, 4, unit.gid);
		}

        tick = getTickCount();

        while (getTickCount() - tick < 3000) {
            if ((!targetArea && me.area !== preArea) || me.area === targetArea) {
                delay(100);

                return true;
            }

            delay(10);
        }

        //Packet.flash(me.gid);
        Pather.moveTo(me.x + 3 * rand(-1, 1), me.y + 3 * rand(-1, 1));
    }

    return targetArea ? me.area === targetArea : me.area !== preArea;
};

// Check if I have a certain wp
Pather.checkWP = function(area) {
    // we might actually have wp - just not have init yet
    if (!getWaypoint(Pather.wpAreas.indexOf(area))) {
        if (me.inTown) {
            Town.move("waypoint");
        }

        let wp;

        for (let i = 0; i < 15; i += 1) {
            wp = getUnit(2, "waypoint");

            if (wp && wp.area === me.area) {
                if (!me.inTown && getDistance(me, wp) > 7) {
                    Pather.moveToUnit(wp);
                }

                Misc.click(0, 0, wp);

                let tick = getTickCount();

                while (getTickCount() - tick < Math.max(Math.round((i + 1) * 1000 / (i / 5 + 1)), me.ping * 2)) {
                    if (getUIFlag(0x14)) { // Waypoint screen is open
                        delay(500);
                        break;
                    }

                    delay(50);
                }
            }

            if (getUIFlag(0x14)) { // Waypoint screen is open
                me.cancel();
                break;
            }
        }
    }

    return getWaypoint(Pather.wpAreas.indexOf(area));
};