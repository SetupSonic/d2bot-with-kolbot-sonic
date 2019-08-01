/**
*	@filename	Storage.js
*	@author		McGod, kolton (small kolbot related edits)
*	@desc		manage inventory, belt, stash, cube
*/

var Container = function (name, width, height, location) {
	var h, w;

	this.name = name;
	this.width = width;
	this.height = height;
	this.location = location;
	this.buffer = [];
	this.itemList = [];
	this.openPositions = this.height * this.width;

	// Initalize the buffer array for use, set all as empty.
	for (h = 0; h < this.height; h += 1) {
		this.buffer.push([]);

		for (w = 0; w < this.width; w += 1) {
			this.buffer[h][w] = 0;
		}
	}

	/* Container.Mark(item)
	 *	Marks the item in the buffer, and adds it to the item list. 
	 */
	this.Mark = function (item) {
		var x, y;

		//Make sure it is in this container.
		if (item.location !== this.location || item.mode !== 0) {
			return false;
		}

		//Mark item in buffer.
		for (x = item.x; x < (item.x + item.sizex); x += 1) {
			for (y = item.y; y < (item.y + item.sizey); y += 1) {
				this.buffer[y][x] = this.itemList.length + 1;
				this.openPositions -= 1;
			}
		}

		//Add item to list.
		this.itemList.push(copyUnit(item));

		return true;
	};

	/* Container.isLocked(item)
	 *	Checks if the item is in a locked spot
	 */
	this.IsLocked = function (item, baseRef) {
		var h, w, reference;

		reference = baseRef.slice(0);

		//Make sure it is in this container.
		if (item.mode !== 0 || item.location !== this.location) {
			return false;
		}

		// Make sure the item is ours
		if (!item.getParent() || item.getParent().gid !== me.gid) {
			return false;
		}

		//Insure valid reference.
		if (typeof (reference) !== "object" || reference.length !== this.buffer.length || reference[0].length !== this.buffer[0].length) {
			throw new Error("Storage.IsLocked: Invalid inventory reference");
		}

		try {
			// Check if the item lies in a locked spot.
			for (h = item.y; h < (item.y + item.sizey); h += 1) {
				for (w = item.x; w < (item.x + item.sizex); w += 1) {
					if (reference[h][w] === 0) {
						return true;
					}
				}
			}
		} catch (e2) {
			throw new Error("Storage.IsLocked error! Item info: " + item.name + " " + item.y + " " + item.sizey + " " + item.x + " " + item.sizex + " " + item.mode + " " + item.location);
		}

		return false;
	};

	this.Reset = function () {
		var h, w;

		for (h = 0; h < this.height; h += 1) {
			for (w = 0; w < this.width; w += 1) {
				this.buffer[h][w] = 0;
			}
		}

		this.itemList = [];
		return true;
	};

    this.CanFit = function (item) {
        return (!!this.FindSpot(item));
    };

    this.SortItems = function() {
        print("Sorting "+ this.name + " ... ");

        var cube = me.findItem(549);
		
		//Town.openStash();
		
        //if (this.location === 7 && cube) sendPacket(1, 0x27, 4, me.findItem(-1, -1, me.findItems(-1, -1, 3) == false ? 1 : 3).gid, 4, cube.gid);
        //if (this.location === 7 && !cube) Town.openStash();

        Storage.Reload();

        var x, y, item, nPos;

        for ( y = this.width -1 ; y>=0 ; y-- ) {
            for ( x = this.height-1 ; x>=0 ; x-- ) {

                delay(1);

                if ( this.buffer[x][y] == 0 ) {
                    continue; // nothing on this spot
                }

                item = this.itemList[this.buffer[x][y]-1]

                if ( item.classid==549 ) {
                    continue; // dont touch the cube
                }

                if ( this.location==3 && this.IsLocked(item, Config.Inventory)) {
                    continue; // locked spot / item
                }

                var ix = item.y, iy = item.x; // WTF x and y is vice versa switched

                if( ix < x || iy < y ) {
                    continue; // not top left part of item
                }

                //print(item.name+" in "+this.name+" Spot at X:"+x+" Y:"+y+" ... ");

                //Check if the item could fit an earlier position
                nPos = this.FindSpot(item);
                if ( !nPos || (nPos.x >= ix && nPos.y >= iy) ) {
                    continue; // fits here or more backwards
                }

                if (!this.MoveTo(getUnit(-1,-1,-1,item.gid), true)) {
                    continue; // we couldnt move the item
                }

                // We moved an item so reload & restart
                Storage.Reload();
                y = this.width  - 0;
                break; // Loop again from begin

            }
		}
        print("Sorting " + this.name + " done ");
        //me.cancel();
    };

	/* Container.FindSpot(item)
	 *      Finds a spot available in the buffer to place the item.
	 */
    this.FindSpot = function (item) {
        var x, y, nx, ny;

        //Make sure it's a valid item
        if (!item) {
            return false;
        }

        Storage.Reload();

        //Loop buffer looking for spot to place item.
        for (y = 0; y < this.width - (item.sizex - 1); y += 1) {
            Loop:
                for (x = 0; x < this.height - (item.sizey - 1); x += 1) {
                    //Check if there is something in this spot.
                    if (this.buffer[x][y] > 0) {
						if (item.gid == undefined) {
							print("UNDEFINED PROPERTY ITEM.GID IN SORTITEMS")
							D2Bot.printToConsole(item.toSource());
							continue;
						}
						
                        if (item.gid != this.itemList[this.buffer[x][y]-1].gid ) // ignore same gid
							continue;
                    }

                    //Loop the item size to make sure we can fit it.
                    for (nx = 0; nx < item.sizey; nx += 1) {
                        for (ny = 0; ny < item.sizex; ny += 1) {
                            if (this.buffer[x + nx][y + ny]) {
                                if(item.gid != this.itemList[this.buffer[x+nx][y+ny]-1].gid ) // ignore same gid
									continue Loop;
                            }
                        }
                    }

                    return ({x: x, y: y});
                }
        }

        return false;
    };

	this.MoveTo = function (item) {
		var nPos, n, nDelay, tick, cItem, cube;

		try {
			//Can we even fit it in here?
			nPos = this.FindSpot(item);

			if (!nPos) {
				return false;
			}

			if (item.location === 6 && this.location === 7) {
            	if (!Storage.Inventory.MoveTo(item)) {
            		print("Unable to move item to inventory");
            		return false;
            	}
			}			
			
			//Can't deal with items on ground!
			if (item.mode === 3) {
				return false;
			}

			//Item already on the cursor.
			if (me.itemoncursor && item.mode !== 4) {
				return false;
			}

            //Failed to open proper buffer
            if (!Town.openStash() || (item.location === 6 && !Cubing.openCube())) {
                return false;
            }

			//Pick to cursor if not already.
			if (!item.toCursor()) {
				return false;
			}

			tick = getTickCount();

			while (getUIFlag(0x1a)) {
				if (getTickCount() - tick > 500) {
					print("Failed to close Cube");
					return false;
				}

				me.cancel(0);
				delay(me.ping * 2 + 100);
			}

			//Loop three times to try and place it.
			for (n = 0; n < 5; n += 1) {
				if (this.location === 6) { // place item into cube
					cItem = getUnit(100);
					cube = me.getItem(549);
					
					if (cItem !== null && cube !== null) {
						sendPacket(1, 0x2a, 4, cItem.gid, 4, cube.gid);
					}
				} else {
					clickItem(0, nPos.y, nPos.x, this.location);
				}

				nDelay = getTickCount();

				while ((getTickCount() - nDelay) < Math.max(1000, me.ping * 3 + 500)) {
					if (!me.itemoncursor) {
						print("Successfully placed " + item.name + " at X: " + nPos.x + " Y: " + nPos.y);
						delay(200);

						return true;
					}

					delay(10);
				}
			}

			return true;
		} catch (e) {
			return false;
		}
	};

	/* Container.Dump()
	 *	Prints all known information about container.
	 */
	this.Dump = function () {
		var x, y, string;

		print(this.name + " has the width of " + this.width + " and the height of " + this.height);
		print(this.name + " has " + this.itemList.length + " items inside, and has " + this.openPositions + " spots left.");

		for (x = 0; x < this.height; x += 1) {
			string = "";

			for (y = 0; y < this.width; y += 1) {
				string += (this.buffer[x][y] > 0) ? "\xFFc1x" : "\xFFc0o";
			}

			print(string);
		}
	};

	/* Container.UsedSpacePercent()
	 *	Returns percentage of the container used.
	 */
	this.UsedSpacePercent = function () {
		var x, y,
			usedSpace = 0,
			totalSpace = this.height * this.width;

		Storage.Reload();

		for (x = 0; x < this.height; x += 1) {
			for (y = 0; y < this.width; y += 1) {
				if (this.buffer[x][y] > 0) {
					usedSpace += 1;
				}
			}
		}

		return usedSpace * 100 / totalSpace;
	};

	/* Container.compare(reference)
	 *	Compare given container versus the current one, return all new items in current buffer.
	 */
	this.Compare = function (baseRef) {
		var h, w, n, item, itemList, reference;

		Storage.Reload();

		try {
			itemList = [];
			reference = baseRef.slice(0, baseRef.length);

			//Insure valid reference.
			if (typeof (reference) !== "object" || reference.length !== this.buffer.length || reference[0].length !== this.buffer[0].length) {
				throw new Error("Unable to compare different containers.");
			}

			for (h = 0; h < this.height; h += 1) {
Loop:
				for (w = 0; w < this.width; w += 1) {
					item = this.itemList[this.buffer[h][w] - 1];

					if (!item) {
						continue;
					}

					for (n = 0; n < itemList.length; n += 1) {
						if (itemList[n].gid === item.gid) {
							continue Loop;
						}
					}

					//Check if the buffers changed and the current buffer has an item there.
					if (this.buffer[h][w] > 0 && reference[h][w] > 0) {
						itemList.push(copyUnit(item));
					}
				}
			}

			return itemList;
		} catch (e) {
			return false;
		}
	};

	this.toSource = function () {
		return this.buffer.toSource();
	};
};

var Storage = new function () {
	this.Init = function () {
		this.StashY = me.gametype === 0 ? 4 : 8;
		this.Inventory = new Container("Inventory", 10, 4, 3);
		this.TradeScreen = new Container("Inventory", 10, 4, 5);
		this.Stash = new Container("Stash", 6, this.StashY, 7);
		this.Belt = new Container("Belt", 4 * this.BeltSize(), 1, 2);
		this.Cube = new Container("Horadric Cube", 3, 4, 6);
		this.InvRef = [];

		this.Reload();
	};

	this.BeltSize = function () {
		var item = me.getItem(-1, 1); // get equipped item

		if (!item) { // nothing equipped
			return 1;
		}

		do {
			if (item.bodylocation === 8) { // belt slot
				switch (item.code) {
				case "lbl": // sash
				case "vbl": // light belt
					return 2;
				case "mbl": // belt
				case "tbl": // heavy belt
					return 3;
				default: // everything else
					return 4;
				}
			}
		} while (item.getNext());

		return 1; // no belt
	};
	
	this.Reload = function () {
		this.Inventory.Reset();
		this.Stash.Reset();
		this.Belt.Reset();
		this.Cube.Reset();
		this.TradeScreen.Reset();

		var item = me.getItem();

		if (!item) {
			return false;
		}

		do {
			switch (item.location) {
			case 3:
				this.Inventory.Mark(item);

				break;
			case 5:
				this.TradeScreen.Mark(item);

				break;
			case 2:
				this.Belt.Mark(item);

				break;
			case 6:
				this.Cube.Mark(item);

				break;
			case 7:
				this.Stash.Mark(item);

				break;
			}
		} while (item.getNext());

		return true;
	};
};