/**
 *	@filename	OOG.js
 *	@desc		handle out of game operations like creating characters/accounts, maintaining profile datafiles, d2bot# logging etc.
 */

// Adding possible lockup locations (10, 11, 21, and 30) when creating an account
ControlAction.makeAccount = function (info) {
    me.blockMouse = true;

    var tick,
        realms = {
            "uswest": 0,
            "useast": 1,
            "asia": 2,
            "europe": 3
        };

    while (getLocation() !== 42) {// cycle until in empty char screen
        switch (getLocation()) {
            case 8: // main menu
                ControlAction.clickRealm(realms[info.realm]);
                ControlAction.click(6, 264, 366, 272, 35);

                break;
            case 9: // login screen
                ControlAction.click(6, 264, 572, 272, 35);

                break;
            case 10: // Login Error
            case 11: // Unable To Connect
                return false; //these locations should be handled by the starter
            case 18: // splash
                ControlAction.click(2, 0, 599, 800, 600);

                break;
            case 21: // Main Menu - Connecting
                tick = getTickCount();

                while (getLocation() === 21) {
                    if (getTickCount() - tick > 10000) {
                        ControlAction.click(6, 330, 416, 128, 35);
                    }

                    delay(500);
                }

                break;
            case 29: // Char create
                ControlAction.click(6, 33, 572, 128, 35);

                break;
            case 30: // bnet disconnected
                //D2Bot.printToConsole("Make account error in: " + getLocation());
                D2Bot.restart(); //retry make account(?)

                break;
            case 31: // ToU
                ControlAction.click(6, 525, 513, 128, 35);

                break;
            case 32: // new account
                ControlAction.setText(1, 322, 342, 162, 19, info.account);
                ControlAction.setText(1, 322, 396, 162, 19, info.password);
                ControlAction.setText(1, 322, 450, 162, 19, info.password);
                ControlAction.click(6, 627, 572, 128, 35);

                break;
            case 33: // please read
                ControlAction.click(6, 525, 513, 128, 35);

                break;
            case 34: // e-mail
                if (getControl(6, 415, 412, 128, 35)) {
                    ControlAction.click(6, 415, 412, 128, 35);
                } else {
                    ControlAction.click(6, 265, 572, 272, 35);
                }

                break;
            default:
                break;
        }

        delay(100);
    }

    me.blockMouse = false;

    return true;
};

// Need location 23 (forever connecting on char screen) handling
ControlAction.findCharacter = function (info) {
    var control, text, tick;

    tick = getTickCount();

    while (getLocation() !== 12) {
        if (getTickCount() - tick >= 5000) {
            break;
        }

        delay(25);
    }

    if (getLocation() === 23) {
        D2Bot.restart(); // there could be better solution
    }

    if (getLocation() === 12) {
        control = getControl(4, 37, 178, 200, 92);

        if (control) {
            do {
                text = control.getText();

                if (text instanceof Array && typeof text[1] === "string" && text[1] === info.charName) {
                    return true;
                }
            } while (control.getNext());
        }
    }

    return false;
};

// Fixed deadlock bug
// Added case 23 to getLocation() loop - might be a messy solution - vita
ControlAction.makeCharacter = function (info) {
    me.blockMouse = true;

    if (!info.charClass) {
        info.charClass = "barbarian";
    }

    var clickCoords = [];

    while (getLocation() !== 1) { // cycle until in lobby
        switch (getLocation()) {
            case 12: // character select
            case 23: // connecting
            case 42: // empty character select
                ControlAction.click(6, 33, 528, 168, 60);

                break;
            case 29: // select character
                switch (info.charClass) {
                    case "barbarian":
                        clickCoords = [400, 280];

                        break;
                    case "amazon":
                        clickCoords = [100, 280];

                        break;
                    case "necromancer":
                        clickCoords = [300, 290];

                        break;
                    case "sorceress":
                        clickCoords = [620, 270];

                        break;
                    case "assassin":
                        clickCoords = [200, 280];

                        break;
                    case "druid":
                        clickCoords = [700, 280];

                        break;
                    case "paladin":
                        clickCoords = [521, 260];

                        break;
                }

                // coords:
                // zon: 100, 280
                // barb: 400, 280
                // necro: 300, 290
                // sin: 200, 280
                // paladin: 521 260
                // sorc: 620, 270
                // druid: 700, 280

                getControl().click(clickCoords[0], clickCoords[1]);
                delay(500);

                break;
            case 15: // new character
                if (getControl(6, 421, 337, 96, 32)) { // hardcore char warning
                    ControlAction.click(6, 421, 337, 96, 32);
                } else {
                    ControlAction.setText(1, 318, 510, 157, 16, info.charName);

                    if (!info.expansion) {
                        ControlAction.click(6, 319, 540, 15, 16);
                    }

                    if (!info.ladder) {
                        ControlAction.click(6, 319, 580, 15, 16);
                    }

                    if (info.hardcore) {
                        ControlAction.click(6, 319, 560, 15, 16);
                    }

                    ControlAction.click(6, 627, 572, 128, 35);
                }

                break;
            // we need other solution here for bad names, existing names, etc (delete json and restart?)
            case 30: // char name exists (text box 4, 268, 320, 264, 120)
                ControlAction.click(6, 351, 337, 96, 32);
                ControlAction.click(6, 33, 572, 128, 35);

                me.blockMouse = false;

                return false;
            default:
                break;
        }

        delay(500);
    }

    me.blockMouse = false;

    return true;
};

// Deletes a character
ControlAction.deleteCharacter = function (info) {
    me.blockMouse = true;

    var control, text;

    MainLoop:
        while (getLocation() !== 1) { // cycle until in lobby
            switch (getLocation()) {
                case 12: // character select
                    control = getControl(4, 37, 178, 200, 92);

                    if (control) {
                        do {
                            text = control.getText();

                            if (text instanceof Array && typeof text[1] === "string" && text[1].toLowerCase() === info.charName.toLowerCase()) {
                                control.click();
                                ControlAction.click(6, 433, 528, 168, 60); // click delete
                                delay(500);
                                ControlAction.click(6, 421, 337, 96, 32); // confirm delete

                                break MainLoop;
                            }
                        } while (control.getNext());
                    }

                    break;
                case 42: // empty character select
                    break MainLoop;

                    break;
                case 14: // disconnected?
                case 30: // player not found?
                    me.blockMouse = false;

                    return false;
                default:
                    break;
            }

            delay(100);
        }

    me.blockMouse = false;

    return true;

};