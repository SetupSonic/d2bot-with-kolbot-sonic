/**
 *    @filename   Sequences.js
 *    @desc       config the sequences to be ran
 */

const Sequences = (function() {
    return {
        // advance to next difficulty after conditions have been met
        nextDifficulty: [
            // classic
            [
                // normal
                [
                    "me.charlvl >= 26",
                    "Packet.checkQuest(26, 0)"
                ],
                // nightmare
                [
                    "me.charlvl >= 62",
                    "me.fireResist >= 70",
                    "me.lightningResist >= 70",
                    "Packet.checkQuest(26, 0)"
                ]
            ],
            // xpac
            [
                // normal
                [
                    "me.charlvl >= 43",
                    "Packet.checkQuest(40, 0)"
                ],
                // nightmare
                [
                    "me.charlvl >= 70",
                    "me.fireResist >= 75",
                    "me.lightningResist >= 50",
                    "Packet.checkQuest(40, 0)"
                ]
            ]
        ],
        quest: [
            [ ////////////////// classic
                [	 // normal difficulty
                    "den", "cave", "tree", "cain", "trist", "countess", "andariel",
                    "radament", "cube", "shaft", "amulet", "summoner", "duriel", "tomb",
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",
                    "izual", "diablo"
                ],
                [	// nightmare difficulty
                    "den", "tree", "cain", "trist", "countess", "andariel",
                    "radament", "shaft", "amulet", "summoner", "duriel",
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",
                    "izual", "diablo"
                ],
                [	// hell difficulty
                    "andariel",
                    "radament", "shaft", "amulet", "summoner", "duriel",
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",
                    "izual"
                ]
            ],
            [ ////////////////// xpac
                [	 // normal difficulty
                    "den", "raven", "cave", "tree", "cain", "trist", "countess", "andariel",
                    "radament", "cube", "amulet", "summoner", "tomb", "shaft", "duriel",
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",
                    "izual", "diablo",
                    "shenk", "rescue", "anya", "ancients", "baal"
                ],
                [	// nightmare difficulty
                    "den", "countess", "andariel",
                    "radament", "cube" , "shaft", "amulet", "summoner", "duriel",
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",
                    "izual", "diablo",
                    "shenk", "anya", "ancients", "baal"
                ],
                [	// hell difficulty
                    "andariel",
                    "radament", "cube", "shaft", "amulet", "summoner", "duriel",
                    "lamessen", "eye", "brain", "heart", "travincal", "mephisto",
                    "izual"
                ]
            ]
        ],
        magicfind: [
            [ ////////////////// classic
                [	// normal difficulty - farm cs to level 26 so we can move on
                    "diablo"
                ],
                [	// nightmare difficulty
                    "andariel", "summoner", "duriel", "mephisto", "izual", "diablo"
                ],
                [	// hell difficulty
                    "duriel", "mephisto", "summoner", "andariel", "izual", "vizier"
                ]
            ],
            [ ////////////////// xpac
                [
                    "shenk", "pindle", "baal"
                ],
                [	// nightmare difficulty
                    "andariel", "mephisto", "shenk", "pindle", "baal"
                ],
                [	// hell difficulty
                    //"chests", "mausoleum", "tunnels", "duriel", "andariel", "mephisto"
					"mausoleum", "duriel", "tunnels", "andariel", "chests", "mephisto"
                ]
            ]
        ]
    }
}());
