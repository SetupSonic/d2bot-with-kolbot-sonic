/**
 *	@filename	Attack.js
 *	@desc		handle player attacks
 */

// add a delay if not enough mana
ClassAttack.doCast = function (unit, timedSkill, untimedSkill) {
    var i, walk, tick;

    // No valid skills can be found
    if (timedSkill < 0 && untimedSkill < 0) {
        return 2;
    }

    if (timedSkill > -1 && (!me.getState(121) || !Skill.isTimed(timedSkill))) {
        if (Skill.getRange(timedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) {
            return 0;
        }

        if (Math.round(getDistance(me, unit)) > Skill.getRange(timedSkill) || checkCollision(me, unit, 0x4)) {
            // Allow short-distance walking for melee skills
            walk = Skill.getRange(timedSkill) < 4 && getDistance(me, unit) < 10 && !checkCollision(me, unit, 0x1);

            if (!Attack.getIntoPosition(unit, Skill.getRange(timedSkill), 0x4, walk)) {
                return 0;
            }
        }

        if (Skill.getManaCost(timedSkill) > me.mp) {
            tick = getTickCount();

            while (getTickCount() - tick < 1500) {
                if (Skill.getManaCost(timedSkill) < me.mp) {
                    break;
                }

                delay(25);
            }
        }

        if (!unit.dead && !checkCollision(me, unit, 0x4)) {
            Skill.cast(timedSkill, Skill.getHand(timedSkill), unit);
        }

        return 1;
    }

    if (untimedSkill > -1) {
        if (Skill.getRange(untimedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) {
            return 0;
        }

        if (Math.round(getDistance(me, unit)) > Skill.getRange(untimedSkill) || checkCollision(me, unit, 0x4)) {
            // Allow short-distance walking for melee skills
            walk = Skill.getRange(untimedSkill) < 4 && getDistance(me, unit) < 10 && !checkCollision(me, unit, 0x1);

            if (!Attack.getIntoPosition(unit, Skill.getRange(untimedSkill), 0x4, walk)) {
                return 0;
            }
        }

        if (Skill.getManaCost(untimedSkill) > me.mp) {
            tick = getTickCount();

            while (getTickCount() - tick < 1500) {
                if (Skill.getManaCost(untimedSkill) < me.mp) {
                    break;
                }

                delay(25);
            }
        }

        if (!unit.dead) {
            Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);
        }

        return 1;
    }

    for (i = 0; i < 25; i += 1) {
        if (!me.getState(121)) {
            break;
        }

        delay(40);
    }

    return 1;
};

// Also use strong attacks against minions - not just their bosses
// add a strong attack between static
// improved telestomp
ClassAttack.doAttack = function (unit, preattack) {
    if (Config.MercWatch && Town.needMerc()) {
        Town.visitTown();
    }

    if (!me.getState(30) && me.getSkill(58, 1)) {
        Skill.cast(58, 0);
    }

    if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0]))) {
        if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
            if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
                return false;
            }
        }

        Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);

        return true;
    }

    var index, staticRange, checkSkill,
        timedSkill = -1,
        untimedSkill = -1;

    let target;

    // Static
    if (Config.CastStatic < 100 && me.getSkill(42, 1) && Attack.checkResist(unit, "lightning") && Config.StaticList.indexOf(unit.name) > -1 && Math.round(unit.hp * 100 / unit.hpmax) > Config.CastStatic) {
        staticRange = Math.floor((me.getSkill(42, 1) + 4) * 2 / 3);
        while (Math.round(unit.hp * 100 / unit.hpmax) > Config.CastStatic && Attack.checkMonster(unit)) {
            Misc.townCheck();

            ClassAttack.doCast(unit, Config.AttackSkill[1], -1);

            if (getDistance(me, unit) > staticRange || checkCollision(me, unit, 0x4)) {
                if (!Attack.getIntoPosition(unit, staticRange, 0x4)) {
                    return false;
                }
            }

            if (!Skill.cast(42, 0)) {
                break;
            }
        }
    }

    index = (unit.spectype !== 0 || unit.type === 0) ? 1 : 3; // sonic

    // Get timed skill
    if (Attack.getCustomAttack(unit)) {
        checkSkill = Attack.getCustomAttack(unit)[0];
    } else {
        checkSkill = Config.AttackSkill[index];
    }

    if (Attack.checkResist(unit, checkSkill) && ([56, 59].indexOf(checkSkill) === -1 || Attack.validSpot(unit.x, unit.y))) {
        timedSkill = checkSkill;
    } else if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5]) && ([56, 59].indexOf(Config.AttackSkill[5]) === -1 || Attack.validSpot(unit.x, unit.y))) {
        timedSkill = Config.AttackSkill[5];
    }

    // Get untimed skill
    if (Attack.getCustomAttack(unit)) {
        checkSkill = Attack.getCustomAttack(unit)[1];
    } else {
        checkSkill = Config.AttackSkill[index + 1];
    }

    if (Attack.checkResist(unit, checkSkill) && ([56, 59].indexOf(checkSkill) === -1 || Attack.validSpot(unit.x, unit.y))) {
        untimedSkill = checkSkill;
    } else if (Config.AttackSkill[6] > -1 && Attack.checkResist(unit, Config.AttackSkill[6]) && ([56, 59].indexOf(Config.AttackSkill[6]) === -1 || Attack.validSpot(unit.x, unit.y))) {
        untimedSkill = Config.AttackSkill[6];
    }

    // Low mana timed skill
    if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(timedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
        timedSkill = Config.LowManaSkill[0];
    }

    // Low mana untimed skill
    if (Config.LowManaSkill[1] > -1 && Skill.getManaCost(untimedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[1])) {
        untimedSkill = Config.LowManaSkill[1];
    }

    switch (ClassAttack.doCast(unit, timedSkill, untimedSkill)) {
    case 0: // Fail
        break;
    case 1: // Success
        return true;
    case 2: // Try to telestomp
        if (Config.TeleStomp && Attack.checkResist(unit, "physical") && Config.UseMerc) {
            while (Attack.checkMonster(unit)) {
                Misc.townCheck();

                // revive merc
                if (!me.getMerc()) {
                    Town.visitTown();
                }

                if (getDistance(me, unit) > 3) {
                    Pather.moveToUnit(unit);
                }

                if (Attack.checkResist(unit, "lightning") && me.getSkill(42, 1) && Math.round(unit.hp * 100 / unit.hpmax) > Attack.getStaticAmount()) {
                    Skill.cast(42, 0);
                }

                target = Attack.getNearestMonster();

                if (target) {
                    ClassAttack.doCast(target, Config.AttackSkill[1], Config.AttackSkill[2]);
                } else if (me.getSkill(43, 0)) {
                    Skill.cast(43, 0, unit.x, unit.y);
                }
            }

            return true;
        }

        break;
    }

    // Couldn't attack
    return false;
};

// use classid instead of gid always
// gid can change
Attack.kill = function (classId) {
    if (Config.AttackSkill[1] < 0) {
        return false;
    }

    var i, target,
        errorInfo = "",
        attackCount = 0;

    let maxAttack = 300;

    if (me.charlvl < 40) {
        maxAttack *= 3;
    }

    if (typeof classId === "object") {
        target = classId;
    }

    for (i = 0; !target && i < 5; i += 1) {
        target = getUnit(1, classId);

        delay(200);
    }

    if (!target) {
        throw new Error("Attack.kill: Target not found");
    }

    if (Config.MFLeader) {
        Pather.makePortal();
        say("kill " + classId);
    }

    while (attackCount < maxAttack && Attack.checkMonster(target) && Attack.skipCheck(target)) {
        Misc.townCheck();

        if (!target || !copyUnit(target).x) { // Check if unit got invalidated, happens if necro raises a skeleton from the boss's corpse.
            target = getUnit(1, classId);

            if (!target) {
                break;
            }
        }

        if (Config.Dodge && me.hp * 100 / me.hpmax <= Config.DodgeHP) {
            Attack.deploy(target, Config.DodgeRange, 5, 9);
        }

        if (Config.MFSwitchPercent && target.hp / 128 * 100 < Config.MFSwitchPercent) {
            Precast.weaponSwitch(Math.abs(Config.MFSwitch));
        }

        if (attackCount > 0 && attackCount % 5 === 0 && Skill.getRange(Config.AttackSkill[1]) < 4) {
            Packet.flash(me.gid);
        }

        if (!ClassAttack.doAttack(target, attackCount % 15 === 0)) {
            errorInfo = " (doAttack failed)";

            break;
        }

        attackCount += 1;
    }

    if (attackCount === maxAttack) {
        errorInfo = " (attackCount exceeded) " + maxAttack;
    }

    if (Config.MFSwitchPercent) {
        Precast.weaponSwitch(Math.abs(Config.MFSwitch - 1));
    }

    ClassAttack.afterAttack();

    if (!target || !copyUnit(target).x) {
        return true;
    }

    if (target.hp > 0 && target.mode !== 0 && target.mode !== 12) {
        throw new Error("Failed to kill " + target.name + errorInfo);
    }

    return true;
};

// Take a array of coords - path and clear
// pick parameter is range of items to pick
Attack.clearCoordList = function (list, pick) {
    for (let node of list) {
        Attack.clear(node.radius);
        Pather.moveTo(node.x, node.y);
        Attack.clear(node.radius);

        if (pick) {
            Pickit.pickItems(pick);
        }
    }
};

Attack.getNearestMonster = function (range=30) {
    var gid, distance,
        monster = getUnit(1);

    if (monster) {
        do {
            if (Attack.checkMonster(monster) && !monster.getParent() && Attack.canAttack(monster)) {
                distance = getDistance(me, monster);

                if (distance < range) {
                    range = distance;
                    gid = monster.gid;
                }
            }
        } while (monster.getNext());
    }

    if (gid) {
        monster = getUnit(1, -1, -1, gid);
    } else {
        monster = false;
    }

    return monster;
};

// used for xpac
Attack.getStaticAmount = function() {
   switch (me.diff) {
       case 0:
           return 10;
       case 1:
           return 40;
       case 2:
           return 60;
   }

    return 100;
};

Attack.clearClassids = function (...ids) {
    let monster = getUnit(1);

    if (monster) {
        let list = [];

        do {
            if (ids.includes(monster.classid) && Attack.checkMonster(monster)) {
                list.push(copyUnit(monster));
            }
        } while (monster.getNext());

        Attack.clearList(list);
    }

    return true;
};