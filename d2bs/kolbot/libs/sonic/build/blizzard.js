/**
 *    @filename   blizzard.js
 *    @desc       blizzard build for after level 25
 */

const Build = {
    stats: [
        ["strength", 60], ["vitality", "all"]
    ],
    skills: [
        // one pointers
        { id: 42, level: 1 }, // static
        { id: 43, level: 1 }, // teleknisis
        { id: 54, level: 1 }, // teleport
        { id: 40, level: 1 }, // frozen armor

        // build - add needed skills
        { id: 39, level: 1 }, // ice bolt
        { id: 45, level: 1 }, // ice blast
        { id: 55, level: 1 }, // gspike
        { id: 44, level: 1 }, // frost nova
        { id: 59, level: 1 }, // blizzard

        { id: 45, level: 15 }, // ice blast
        { id: 59, level: 20 }, // blizzard
        { id: 65, level: 17, save: false },  // c mastery

        // Now max
        { id: 45, level: 20 }, // ice blast
        { id: 55, level: 20 }, // gspike
        { id: 39, level: 20 } // ice bolt
    ]
};