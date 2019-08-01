/**
 *	@filename	Prototypes.js
 *	@desc		various 'Unit' and 'me' prototypes
 */

Object.defineProperty(Party.prototype, 'act', {
	get: function() {
		if (this.area > 0) {
			if (this.area < 40) {
				return 1;
			} else if (this.area < 75) {
				return 2;
			} else if (this.area < 103) {
				return 3;
			} else if (this.area < 109) {
				return 4;
			} else {
				return 5;
			}
		}

		return false;
	}
});

Object.defineProperty(Unit.prototype, 'fireResist', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.fireResist: Must be used with player units.");
		}

		return this.getStat(39);
	}
});

Object.defineProperty(Unit.prototype, 'coldResist', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.coldResist: Must be used with player units.");
		}

		return this.getStat(43);
	}
});

Object.defineProperty(Unit.prototype, 'lightningResist', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.lightningResist: Must be used with player units.");
		}

		return this.getStat(41);
	}
});

Object.defineProperty(Unit.prototype, 'normal', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.normal: Must be used with player units.");
		}

		return this.diff == 0;
	}
});

Object.defineProperty(Unit.prototype, 'nightmare', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.nightmare: Must be used with player units.");
		}

		return this.diff == 1;
	}
});

Object.defineProperty(Unit.prototype, 'hell', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.hell: Must be used with player units.");
		}

		return this.diff == 2;
	}
});

Object.defineProperty(Unit.prototype, 'classic', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.classic: Must be used with player units.");
		}

		return this.gametype == 0;
	}
});

Object.defineProperty(Unit.prototype, 'amazon', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.amazon: Must be used with player units.");
		}

		return this.classid == 0;
	}
});

Object.defineProperty(Unit.prototype, 'sorceress', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.sorceress: Must be used with player units.");
		}

		return this.classid == 1;
	}
});

Object.defineProperty(Unit.prototype, 'necromancer', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.necromancer: Must be used with player units.");
		}

		return this.classid == 2;
	}
});

Object.defineProperty(Unit.prototype, 'paladin', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.paladin: Must be used with player units.");
		}

		return this.classid == 3;
	}
});

Object.defineProperty(Unit.prototype, 'barbarian', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.barbarian: Must be used with player units.");
		}

		return this.classid == 4;
	}
});

Object.defineProperty(Unit.prototype, 'druid', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.druid: Must be used with player units.");
		}

		return this.classid == 5;
	}
});

Object.defineProperty(Unit.prototype, 'assassin', {
	get: function() {
		if (this.type > 0) {
			throw new Error("Unit.assassin: Must be used with player units.");
		}

		return this.classid == 6;
	}
});
