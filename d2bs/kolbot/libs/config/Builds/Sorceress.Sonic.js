//	/d2bs/kolbot/libs/Builds/Sorceress.ExampleBuild.js

/**
*
* Instructions:	See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs:	See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs:
*
* 	Strength	= 0
* 	Energy		= 1
* 	Dexterity	= 2
* 	Vitality	= 3
*
*/
js_strict(true);

// This makes updating stuff at early levels easy

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };

var AutoBuildTemplate = {

	1:	{	
			//SkillPoints: [-1],										
			//StatPoints: [-1,-1,-1,-1,-1],								
			Update: function () {
				Config.TownCheck = me.findItem("tbk", 0, 3);
				Config.TownHP = 20;
			}
		},
		
	2:	{
			SkillPoints: [-1], 											
			StatPoints: [-1, -1, -1, -1, -1],							
			Update: function () {

			}
		},
		
	3:	{
			SkillPoints: [-1], 										
			StatPoints: [-1, -1, -1, -1, -1],							
			Update: function () {
				Config.BeltColumn[2] = "mp";
				Config.BeltColumn[3] = "mp";
			}
		},
		
	4:	{
			SkillPoints: [-1],											
			StatPoints: [-1, -1, -1, -1, -1],						
			Update: function () {
				Config.UseHP = 85;
				Config.TownHP = 50;

				Config.AttackSkill[1] = 36; // Primary skill to bosses.
				Config.AttackSkill[3] = 36; // Primary skill to others.
			}
		},

	5:	{
			SkillPoints: [-1],											
			StatPoints: [-1, -1, -1, -1, -1],						
			Update: function () {

			}
		},

	6:	{
			SkillPoints: [-1],											
			StatPoints: [-1, -1, -1, -1, -1],							
			Update: function () {

			}
		},

	7:	{
			SkillPoints: [-1],									
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				Config.UseHP = 85;
				Config.TownCheck = true;
				Config.TownHP = 50;
			}
		},

	8:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
			}
		},

	9:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
			}
		},

	10:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
			}
		},

	11:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	12:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				Config.AttackSkill[1] = 47; // Primary skill to bosses.
				Config.AttackSkill[3] = 47; // Primary skill to others.	

				Config.LowManaSkill[0] = 36; // Timed low mana skill.
				Config.LowManaSkill[1] = 36; // Untimed low mana skill.

				Config.HPBuffer = 2; // Number of healing potions to keep in inventory.
				Config.MPBuffer = 10; // Number of mana potions to keep in inventory.
				
			}
		},

	13:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	14:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
			}
		},

	15:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	16:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	17:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	18:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	19:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	20:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	21:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	22:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	23:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	24:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				if (me.getSkill(39, 0) >= 1) {
					Config.AttackSkill[1] = 59; // Primary skill to bosses.
					Config.AttackSkill[2] = 45; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
					Config.AttackSkill[3] = 59; // Primary skill to others.
					Config.AttackSkill[4] = 55; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.

					Config.LowManaSkill[0] = -1; // Timed low mana skill.
					Config.LowManaSkill[1] = -1; // Untimed low mana skill.
				}

				Config.UseMP = 50; // Drink a mana potion if mana is under designated percent.

				Config.CustomAttack = {

				};
			}
		},

	25:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	26:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	27:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				Config.Dodge = true; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
				Config.DodgeRange = 15; // Distance to keep from monsters.
				Config.DodgeHP = 85; // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
			}
		},

	28:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	29:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	30:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				Config.StashGold = 10000;
				
			}
		},

	31:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	32:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	33:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				Config.ScanShrines = [];
				
			}
		},

	34:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	35:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	36:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	37:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	38:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	39:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	40:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {

			}
		},

	41:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	42:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	43:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	44:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	45:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	46:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	47:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	48:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	49:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	50:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	51:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	52:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	53:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	54:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	55:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {

			}
		},

	56:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	57:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	58:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	59:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	60:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	61:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	62:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	63:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	64:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	65:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	66:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	67:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	68:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	69:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	70:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	71:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	72:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	73:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	74:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	75:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	76:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	77:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	78:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	79:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	80:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	81:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	82:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	83:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	84:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	85:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	86:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	87:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	88:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	89:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	90:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	91:	{	
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	92:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	93:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	94:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	95:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	96:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	97:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	98:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		},

	99:	{
			SkillPoints: [-1],
			StatPoints: [-1,-1,-1,-1,-1],
			Update: function () {
				
				
			}
		}
};
