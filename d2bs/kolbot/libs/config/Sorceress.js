function LoadConfig() {
	
	Config.QuitList = [];
	
	Config.MakeRunewords = false;
	Config.Cubing = me.getItem(549);
	Config.Gamble = true;
	Config.GambleGoldStart = 1000000;
	Config.GambleGoldStop = 500000;
	
	Scripts.Sonic = true;
	//Scripts.Manual = true;
	Config.AutoEquip = true;

	Config.PickitFiles.push("Sonic/quest.nip");

	if (me.gametype === 1) {
		Config.MakeRunewords = true;
		
		Config.PickitFiles.push("Sonic/Autoequip/expansion_sorc.nip");
		Config.PickitFiles.push("Sonic/Autoequip/expansion_merc.nip");
		Config.PickitFiles.push("Sonic/Autoequip/expansion_charms.nip");
		Config.PickitFiles.push("Sonic/Autoequip/expansion_runewords.nip");
		
		if (me.ladder > 0) {
			Config.PickitFiles.push("Sonic/Expansion/Ladder/Crafted.nip");
			Config.PickitFiles.push("Sonic/Expansion/Ladder/Magic.nip");
			Config.PickitFiles.push("Sonic/Expansion/Ladder/Misc.nip");
			Config.PickitFiles.push("Sonic/Expansion/Ladder/Rare.nip");
			Config.PickitFiles.push("Sonic/Expansion/Ladder/Set.nip");
			Config.PickitFiles.push("Sonic/Expansion/Ladder/Unid.nip");
			Config.PickitFiles.push("Sonic/Expansion/Ladder/Unique.nip");
			Config.PickitFiles.push("Sonic/Expansion/Ladder/White.nip");
		} else {
			Config.PickitFiles.push("Sonic/Expansion/NonLadder/Crafted.nip");
			Config.PickitFiles.push("Sonic/Expansion/NonLadder/Magic.nip");
			Config.PickitFiles.push("Sonic/Expansion/NonLadder/Misc.nip");
			Config.PickitFiles.push("Sonic/Expansion/NonLadder/Rare.nip");
			Config.PickitFiles.push("Sonic/Expansion/NonLadder/Set.nip");
			Config.PickitFiles.push("Sonic/Expansion/NonLadder/Unid.nip");
			Config.PickitFiles.push("Sonic/Expansion/NonLadder/Unique.nip");
			Config.PickitFiles.push("Sonic/Expansion/NonLadder/White.nip");
		}
		
		if (me.charlvl >= 87) {
			Config.GambleItems.push("Amulet");
		} else {
			Config.GambleItems.push("Ring");
		}
		
		Config.GambleItems.push("Circlet");
		Config.GambleItems.push("Coronet");
		
		if (me.diff !== 2) {
			Config.Runewords.push([Runeword.AncientsPledge, "Large Shield"]);
			Config.Runewords.push([Runeword.AncientsPledge, "Kite Shield"]);
			Config.Runewords.push([Runeword.AncientsPledge, "Bone Shield"]);
			Config.Runewords.push([Runeword.AncientsPledge, "Grim Shield"]);
			Config.KeepRunewords.push("[type] == shield # [fireresist]+[lightresist]+[coldresist]+[poisonresist] == 187");
			
			Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]);
			Config.Runewords.push([Runeword.Spirit, "Broad Sword"]);
			Config.KeepRunewords.push("[type] == sword # [fcr] >= 25 && [maxmana] >= 89");
			
			Config.Runewords.push([Runeword.Smoke, "Quilted Armor"]);
			Config.Runewords.push([Runeword.Smoke, "Leather Armor"]);
			Config.Runewords.push([Runeword.Smoke, "Hard Leather Armor"]);
			Config.Runewords.push([Runeword.Smoke, "Studded Leather"]);
			Config.Runewords.push([Runeword.Smoke, "Ring Mail"]);
			Config.Runewords.push([Runeword.Smoke, "Scale Mail"]);
			Config.Runewords.push([Runeword.Smoke, "Breast Plate"]);
			Config.Runewords.push([Runeword.Smoke, "Light Plate"]);
			Config.Runewords.push([Runeword.Smoke, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Smoke, "Serpentskin Armor"]);
			Config.KeepRunewords.push("[type] == armor # [fireresist] == 50");
			
			Config.Runewords.push([Runeword.Insight, "Voulge"]);
			Config.Runewords.push([Runeword.Insight, "Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Poleaxe"]);
			Config.Runewords.push([Runeword.Insight, "War Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Bill"]);
			Config.Runewords.push([Runeword.Insight, "Battle Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Partizan"]);
			Config.Runewords.push([Runeword.Insight, "Grim Scythe"]);	
		}
		
		if (me.charlvl <= 87) {
			Config.Runewords.push([Runeword.Treachery, "Ring Mail"]);
			Config.Runewords.push([Runeword.Treachery, "Light Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Breast Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
			Config.Runewords.push([Runeword.Treachery, "Wire Fleece"]);
			Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);
			Config.KeepRunewords.push("[name] == MagePlate # [ias] == 45 && [coldresist] == 30");
		}
		
		Config.Runewords.push([Runeword.Insight, "Colossus Voulge"]);
		Config.Runewords.push([Runeword.Insight, "Thresher"]);
		Config.Runewords.push([Runeword.Insight, "Cryptic Axe"]);
		Config.Runewords.push([Runeword.Insight, "Giant Thresher"]);
		Config.KeepRunewords.push("[type] == polearm # [strength] == 5 && [fcr] == 35");
		
		if (me.charlvl >= 85) {
			Config.Runewords.push([Runeword.Spirit, "Monarch"]);
			Config.Runewords.push([Runeword.Spirit, "Sacred Targe"]);
			Config.KeepRunewords.push("[name] == Monarch # [fcr] >= 35 && [maxmana] >= 89");	
			Config.KeepRunewords.push("[name] == SacredTarge # [fcr] >= 25 && [maxmana] >= 89");
		}
		
		Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate", Roll.Eth]);
		Config.Recipes.push([Recipe.Socket.Armor, "Sacred Armor", Roll.Eth]);
		//Config.Recipes.push([Recipe.Rune, "Lum Rune"]); 	// Upgrade Io to Lum
		//Config.Recipes.push([Recipe.Rune, "Ber Rune"]); 	// Upgrade Sur to Ber
		//if (me.findItem(375, -1, -1, 7)) Config.Recipes.push([Recipe.Gem, "Flawless Diamond"]); // Make Perfect Diamonds for mosers
	}

	if (me.gametype === 0) {
		Config.PickitFiles.push("Sonic/Classic/classic_rare.nip");
		Config.PickitFiles.push("Sonic/Classic/classic_other.nip");
		Config.PickitFiles.push("Sonic/Autoequip/classic_sorc.nip");

		if (me.charlvl >= 87) {
			Config.GambleItems.push("Amulet");
		} else {
			Config.GambleItems.push("Ring");
		}
	}

	//Config.Recipes.push([Recipe.Gem, "Flawless Skull"]); // Make Perfect Skull
	//Config.Recipes.push([Recipe.Gem, "Flawless Amethyst"]); // Make Perfect Amethyst
	//Config.Recipes.push([Recipe.Gem, "Flawless Topaz"]); // Make Perfect Topaz
	//Config.Recipes.push([Recipe.Gem, "Flawless Sapphire"]); // Make Perfect Sapphire
	//Config.Recipes.push([Recipe.Gem, "Flawless Emerald"]); // Make Perfect Emerald
	//Config.Recipes.push([Recipe.Gem, "Flawless Ruby"]); // Make Perfect Ruby
	//Config.Recipes.push([Recipe.Gem, "Flawless Diamond"]); // Make Perfect Diamond
	
	// Town settings
	Config.HealHP = 90; // Go to a healer if under designated percent of life.
	Config.HealMP = 90; // Go to a healer if under designated percent of mana.
	Config.HealStatus = false; // Go to a healer if poisoned or cursed
	Config.UseMerc = true; // Use merc. This is ignored and always false in d2classic.
	Config.MercWatch = false; // Instant merc revive during battle.

	// Potion settings
	Config.UseHP = 55; // Drink a healing potion if life is under designated percent.
	Config.UseRejuvHP = 35;  // Drink a rejuvenation potion if life is under designated percent.
	Config.UseMP = 30; // Drink a mana potion if mana is under designated percent.
	Config.UseRejuvMP = 0; // Drink a rejuvenation potion if mana is under designated percent.
	Config.UseMercHP = 75; // Give a healing potion to your merc if his/her life is under designated percent.
	Config.UseMercRejuv = 0; // Give a rejuvenation potion to your merc if his/her life is under designated percent.
	Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
	Config.MPBuffer = 4; // Number of mana potions to keep in inventory.
	Config.RejuvBuffer = 2; // Number of rejuvenation potions to keep in inventory.

	// Chicken settings
	Config.LifeChicken = 10; // Exit game if life is less or equal to designated percent.
	Config.ManaChicken = 0; // Exit game if mana is less or equal to designated percent.
	Config.MercChicken = 0; // Exit game if merc's life is less or equal to designated percent.
	Config.TownHP = 0; // Go to town if life is under designated percent.
	Config.TownMP = 0; // Go to town if mana is under designated percent.

	/* Inventory lock configuration. !!!READ CAREFULLY!!!
	 * 0 = item is locked and won't be moved. If item occupies more than one slot, ALL of those slots must be set to 0 to lock it in place.
	 * Put 0s where your torch, annihilus and everything else you want to KEEP is.
	 * 1 = item is unlocked and will be dropped, stashed or sold.
	 * If you don't change the default values, the bot won't stash items.
	 */
	Config.Inventory[0] = [1,1,1,1,1,1,1,1,1,1];
	Config.Inventory[1] = [1,1,1,1,1,1,1,1,1,1];
	Config.Inventory[2] = [1,1,1,1,1,1,1,1,1,1];
	Config.Inventory[3] = [1,1,1,1,1,1,1,1,1,1];

	Config.StashGold = 100; // Minimum amount of gold to stash.
	Config.LowGold = 800000; // Start selling crap items if lower.

	/* Potion types for belt columns from left to right.
	 * Rejuvenation potions must always be rightmost.
	 * Supported potions - Healing ("hp"), Mana ("mp") and Rejuvenation ("rv")
	 */
	Config.BeltColumn[0] = "hp";
	Config.BeltColumn[1] = "hp";
	Config.BeltColumn[2] = "hp";
	Config.BeltColumn[3] = "hp";

	/* Minimum amount of potions. If we have less, go to vendor to purchase more.
	 * Set rejuvenation columns to 0, because they can't be bought.
	 */
	Config.MinColumn[0] = 3;
	Config.MinColumn[1] = 3;
	Config.MinColumn[2] = 3;
	Config.MinColumn[3] = 3;

	// Pickit config. Default folder is kolbot/pickit.
	Config.PickRange = 40; // Pick radius
	Config.FastPick = false; // Check and pick items between attacks

	// Additional item info log settings. All info goes to \logs\ItemLog.txt
	Config.ItemInfo = false; // Log stashed, skipped (due to no space) or sold items.
	Config.ItemInfoQuality = []; // The quality of sold items to log. See NTItemAlias.dbl for values. Example: Config.ItemInfoQuality = [6, 7, 8];

	// Item identification settings
	Config.CainID.Enable = false; // Identify items at Cain
	Config.CainID.MinGold = 2500000; // Minimum gold (stash + character) to have in order to use Cain.
	Config.CainID.MinUnids = 3; // Minimum number of unid items in order to use Cain.
	Config.FieldID = false; // Identify items in the field instead of going to town.
	Config.DroppedItemsAnnounce.Enable = false;	// Announce Dropped Items to in-game newbs
	Config.DroppedItemsAnnounce.Quality = []; // Quality of item to announce. See NTItemAlias.dbl for values. Example: Config.DroppedItemsAnnounce.Quality = [6, 7, 8];

	// Repair settings
	Config.CubeRepair = false; // Repair weapons with Ort and armor with Ral rune. Don't use it if you don't understand the risk of losing items.
	Config.RepairPercent = 40; // Durability percent of any equipped item that will trigger repairs.
	
	// Public game options

	// If Config.Leader is set, the bot will only accept invites from leader. If Config.PublicMode is not 0, Baal and Diablo script will open Town Portals.
	Config.PublicMode = 0; // 1 = invite and accept, 2 = accept only, 3 = invite only, 0 = disable
	// Party message settings. Each setting represents an array of messages that will be randomly chosen.
	// $name, $level, $class and $killer are replaced by the player's name, level, class and killer
	Config.Greetings = []; // Example: ["Hello, $name (level $level $class)"]
	Config.DeathMessages = []; // Example: ["Watch out for that $killer, $name!"]
	Config.Congratulations = []; // Example: ["Congrats on level $level, $name!"]
	Config.ShitList = false; // Blacklist hostile players so they don't get invited to party.
	Config.UnpartyShitlisted = false; // Leave party if someone invited a blacklisted player.

	// General config
	Config.AutoMap = false; // Set to true to open automap at the beginning of the game.
	Config.LastMessage = ""; // Message or array of messages to say at the end of the run. Use $nextgame to say next game - "Next game: $nextgame" (works with lead entry point)
	Config.MinGameTime = 400; // Min game time in seconds. Bot will TP to town and stay in game if the run is completed before.
	Config.MaxGameTime = 7200; // Maximum game time in seconds. Quit game when limit is reached.
	Config.TeleSwitch = false; // Switch to slot II when teleporting more than 1 node.
	Config.OpenChests = me.charlvl >= 19; // Open chests. Controls key buying.
	Config.MiniShopBot = false; // Scan items in NPC shops.
	Config.PacketShopping = true; // Use packets to shop. Improves shopping speed.
	Config.TownCheck = false; // Go to town if out of potions
	Config.LogExperience = false; // Print experience statistics in the manager.
	Config.PingQuit = [{Ping: 0, Duration: 0}]; // Quit if ping is over the given value for over the given time period in seconds.

	// Shrine Scanner - scan for shrines while moving.
	// Put the shrine types in order of priority (from highest to lowest). For a list of types, see sdk/shrines.txt
	Config.ScanShrines = [15,1,2,3,4,5,6,8,9,10,11,12,13,14];

	// MF Switch
	Config.MFSwitchPercent = 0; // Boss life % to switch weapons at. Set to 0 to disable.
	Config.MFSwitch = 0; // MF weapon slot: 0 = slot I, 1 = slot II

	// Speedup config. Full packet casting is not recommended for melee skills.
	Config.FCR = 255; // 0 - disable, 1 to 255 - set value of Faster Cast Rate.
	Config.FHR = 255; // 0 - disable, 1 to 255 - set value of Faster Hit Recovery.
	Config.FBR = 255; // 0 - disable, 1 to 255 - set value of Faster Block Recovery.
	Config.IAS = 255; // 0 - disable, 1 to 255 - set value of Increased Attack Speed.
	Config.PacketCasting = 0; // 0 = disable, 1 = packet teleport, 2 = full packet casting.
	Config.WaypointMenu = true; // Set to true for Single and private realms

	// Anti-hostile config
	Config.AntiHostile = false; // Enable anti-hostile.
	Config.HostileAction = 0; // 0 - quit immediately, 1 - quit when hostile player is sighted, 2 - attack hostile.
	Config.TownOnHostile = false; // Go to town instead of quitting when HostileAction is 0 or 1.
	Config.RandomPrecast = false; // Anti-PK measure, only supported in Baal and BaalHelper and BaalAssisstant at the moment.
	Config.ViperCheck = false; // Quit if revived Tomb Vipers are sighted.

	// DClone config
	Config.StopOnDClone = true; // Go to town and idle as soon as Diablo walks the Earth
	Config.SoJWaitTime = 5; // Time in minutes to wait for another SoJ sale before leaving game. 0 = disabled
	Config.KillDclone = false; // Go to Palace Cellar 3 and try to kill Diablo Clone. Pointless if you already have Annihilus.
	Config.DCloneQuit = false; // 1 = quit when Diablo walks, 2 = quit on soj sales, 0 = disabled
	Config.WaitForHunter = true;

	// Monster skip config
	// Skip immune monsters. Possible options: "fire", "cold", "lightning", "poison", "physical", "magic".
	// You can combine multiple resists with "and", for example - "fire and cold", "physical and cold and poison"
	Config.SkipImmune = [];
	// Skip enchanted monsters. Possible options: "extra strong", "extra fast", "cursed", "magic resistant", "fire enchanted", "lightning enchanted", "cold enchanted", "mana burn", "teleportation", "spectral hit", "stone skin", "multiple shots".
	// You can combine multiple enchantments with "and", for example - "cursed and extra fast", "mana burn and extra strong and lightning enchanted"
	Config.SkipEnchant = [];
	// Skip monsters with auras. Possible options: "fanaticism", "might", "holy fire", "blessed aim", "holy freeze", "holy shock". Conviction is bugged, don't use it.
	Config.SkipAura = [];

	/* Attack config
	 * To disable an attack, set it to -1
	 * Skills MUST be POSITIVE numbers. For reference see http://pastebin.com/baShRwWM
	 */
	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = 36; // Primary skill to bosses.
	Config.AttackSkill[2] = -1; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] = 0; // Primary skill to others.
	Config.AttackSkill[4] = -1; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] = -1; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = -1; // Secondary untimed skill if monster is immune to primary untimed.

	// Low mana skills - these will be used if main skills can't be cast.
	Config.LowManaSkill[0] = 0; // Timed low mana skill.
	Config.LowManaSkill[1] = 0; // Untimed low mana skill.

	/* Advanced Attack config. Allows custom skills to be used on custom monsters.
	 *	Format: "Monster Name": [timed skill id, untimed skill id]
	 *	Example: "Baal": [38, -1] to use charged bolt on Baal
	 *	Multiple entries are separated by commas
	 */
	Config.CustomAttack = {
		"Fallen Shaman": [36, 36]
	};

	Config.Dodge = false; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.
	Config.DodgeHP = 100; // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
	Config.BossPriority = false; // Set to true to attack Unique/SuperUnique monsters first when clearing
	Config.ClearType = 0; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
	Config.TeleStomp = false; // Use merc to attack bosses if they're immune to attacks, but not to physical damage

	// Wereform setup. Make sure you read Templates/Attacks.txt for attack skill format.
	Config.Wereform = false; // 0 / false - don't shapeshift, 1 / "Werewolf" - change to werewolf, 2 / "Werebear" - change to werebear

	// Class specific config
	Config.CastStatic = 20; // Cast static until the target is at designated life percent. 100 = disabled.
	Config.StaticList = ["Izual"]; // List of monster NAMES or CLASSIDS to static. Example: Config.StaticList = ["Andariel", 243];
	
	
	// AutoBuild System ( See /d2bs/kolbot/libs/config/Builds/README.txt for instructions )
	Config.AutoBuild.Enabled = true;			//	This will enable or disable the AutoBuild system
	
	Config.AutoBuild.Template = "Sonic";	//	The name of the build associated with an existing 
												//	template filename located in libs/config/Builds/

	Config.AutoBuild.Verbose = false;			//	Allows script to print messages in console
	Config.AutoBuild.DebugMode = false;			//	Debug mode prints a little more information to console and 
												//	logs activity to /logs/AutoBuild.CharacterName._MM_DD_YYYY.log
												//	It automatically enables Config.AutoBuild.Verbose
}
