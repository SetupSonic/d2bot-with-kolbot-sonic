//Does exactly the same precasts minus energy shield cause sorc gets stuck in packs no tp = death

Precast.doPrecast = function (force) {
	var buffSummons = false;

	// Force BO 15 seconds before it expires
	Precast.precastCTA(!me.getState(32) || force || (getTickCount() - Precast.BOTick >= Precast.BODuration - 15000));

	switch (me.classid) {
	case 0: // Amazon
		if (Config.SummonValkyrie) {
			Precast.summon(32); // Valkyrie
		}

		break;
	case 1: // Sorceress
		//if (!me.getState(38) || force) { // ts
		//	Skill.cast(57, 0); // Thunder Storm
		//}

		//if (!me.getState(30) || force) {
		//	Skill.cast(58, 0); // Energy Shield
		//}

		if ((!me.getState(88) && !me.getState(10) && !me.getState(20)) || force) {
			if (!Skill.cast(50, 0)) { // Shiver Armor
				if (!Skill.cast(60, 0)) { // Chilling Armor
					Skill.cast(40, 0); // Frozen Armor
				}
			}
		}

		//if (me.getSkill(52, 0) && (!me.getState(16) || force)) {
		//	Precast.enchant();
		//}

		break;
	case 2: // Necromancer
		if (!me.getState(14) || force) {
			Skill.cast(68, 0);
		}

		switch (Config.Golem) {
		case 0:
		case "None":
			break;
		case 1:
		case "Clay":
			Precast.summon(75);
			break;
		case 2:
		case "Blood":
			Precast.summon(85);
			break;
		case 3:
		case "Fire":
			Precast.summon(94);
			break;
		}

		break;
	case 3: // Paladin
		if (!me.getState(101) || force) {
			Precast.precastSkill(117); // Holy Shield
		}

		break;
	case 4: // Barbarian - TODO: BO duration
		if (!me.getState(32) || !me.getState(51) || !me.getState(26) || force) {
			if (Config.BOSwitch) {
				Precast.weaponSwitch(Config.BOSwitch);
			}

			if (!me.getState(51) || force) {
				Skill.cast(155, 0); // Battle Command
			}

			if (!me.getState(32) || force) {
				Skill.cast(149, 0); // Battle Orders
			}

			if (!me.getState(26) || force) {
				Skill.cast(138, 0); // Shout
			}

			if (Config.BOSwitch) {
				Precast.weaponSwitch(Math.abs(Config.BOSwitch - 1));
			}
		}

		break;
	case 5: // Druid
		if (!me.getState(151) || force) {
			Skill.cast(235, 0); // Cyclone Armor
		}

		if (Config.SummonRaven) {
			Precast.summon(221); // Raven
		}

		switch (Config.SummonAnimal) {
		case 1:
		case "Spirit Wolf":
			buffSummons = Precast.summon(227) || buffSummons; // Summon Spirit Wolf

			break;
		case 2:
		case "Dire Wolf":
			buffSummons = Precast.summon(237) || buffSummons; // Summon Dire Wolf

			break;
		case 3:
		case "Grizzly":
			buffSummons = Precast.summon(247) || buffSummons; // Summon Grizzly

			break;
		}

		switch (Config.SummonVine) {
		case 1:
		case "Poison Creeper":
			buffSummons = Precast.summon(222) || buffSummons; // Poison Creeper

			break;
		case 2:
		case "Carrion Vine":
			buffSummons = Precast.summon(231) || buffSummons; // Carrion Vine

			break;
		case 3:
		case "Solar Creeper":
			buffSummons = Precast.summon(241) || buffSummons; // Solar Creeper

			break;
		}

		switch (Config.SummonSpirit) {
		case 1:
		case "Oak Sage":
			buffSummons = Precast.summon(226) || buffSummons; // Oak Sage

			break;
		case 2:
		case "Heart of Wolverine":
			buffSummons = Precast.summon(236) || buffSummons; // Heart of Wolverine

			break;
		case 3:
		case "Spirit of Barbs":
			buffSummons = Precast.summon(246) || buffSummons; // Spirit of Barbs

			break;
		}

		if (!me.getState(144) || force) {
			Skill.cast(250, 0); // Hurricane
		}

		if (buffSummons) {
			Precast.precastCTA(force);
		}

		break;
	case 6: // Assassin
		if (Config.UseFade && (!me.getState(159) || force)) {
			Skill.cast(267, 0); // Fade
		}

		if (Config.UseVenom && (!me.getState(31) || force)) {
			Skill.cast(278, 0); // Venom
		}

		if (!me.getState(158) || force) {
			Skill.cast(277, 0); // Blade Shield	
		}

		if (!Config.UseFade && Config.UseBoS && (!me.getState(157) || force)) {
			Skill.cast(258, 0); // Burst of Speed
		}

		switch (Config.SummonShadow) {
		case 1:
		case "Warrior":
			Precast.summon(268); // Shadow Warrior
			break;
		case 2:
		case "Master":
			Precast.summon(279); // Shadow Master
			break;
		}

		break;
	}
};