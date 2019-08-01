/**
 *    @filename   SonicBuild.js
 *    @desc       autobuild thread for sonic
 */

function main() {
    include("common/misc.js");
    include("include/misc.js");
    include("sonic/settings/settings.js");
    include("sonic/common/account.js");
    include("sonic/common/autostat.js");
    include("sonic/common/autoskill.js");

    let {
        respecLevel,
        beforeRespecBuild,
        afterRespecbuild
    } = Account.get();

    let file = me.charlvl < respecLevel ? beforeRespecBuild : afterRespecbuild;

    include("sonic/build/" + file + ".js");

    print("SonicBuild: Loaded template " + file);

    while(true) {
        try {
            if (me.getStat(4)) {
                AutoStat(Build.stats);
            }

            if (me.getStat(5)) {
                AutoSkill(Build.skills);
            }
        } catch (e) {
            D2Bot.printToConsole(e);
            break;
        }

        delay(2500);
    }

    return true;
}