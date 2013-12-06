// ==UserScript==
// @name        MangaUpdates.com Improver
// @namespace   http://github.com/MilesWilford
// @author      Miles Wilford
// @description Simple script that destroys existing MangaUpdates.com/releases content and display it better.
// @version     009
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     *mangaupdates.com/releases.html*
//
// @history
//
// ==/UserScript==


function userScriptAction() {

    var groups = {"1033": ["http://scscans.wordpress.com/",""],
    "1040": ["http://anime-rg.com/","irc://irc.rizon.net/anime-rg"],
    "1065": ["http://conan.thetrogdor.com/",""],
    "107": ["http://nakamanga.com/","irc://irc.irchighway.net/nakama"],
    "1079": ["http://desertbus.blogspot.com/",""],
    "1085": ["http://persepolis130.livejournal.com/",""],
    "1088": ["http://www.blissful-sin.com/",""],
    "1093": ["http://www.tadanohito.net/",""],
    "1171": ["http://www.rycolaa.com/",""],
    "1182": ["http://4dawgz.blogspot.com/",""],
    "1204": ["http://offtopia.11.forumer.com/",""],
    "1205": ["http://community.livejournal.com/todokanai_gw/",""],
    "1230": ["http://www.mbtranslations.info/","irc://irc.rizon.net/mbt"],
    "124": ["http://perfectillusions.net/","irc://irc.irchighway.net/perfect-illusions"],
    "1242": ["http://aerandria.net/","irc://irc.irchighway.net/aerandria"],
    "1260": ["http://www.tonigobe.net/",""],
    "1264": ["http://www.sahadou.com/",""],
    "1344": ["http://www.arigatomina.com/",""],
    "1346": ["http://haoscans.wordpress.com","irc://irc.irchighway.net/HAO"],
    "135": ["http://shscans.wordpress.com/","irc://irc.irchighway.net/starryheaven"],
    "1355": ["http://www.mangaupdates.com/series.html?id=32414","irc://irc.irchighway.net/Fairy-Tail"],
    "136": ["http://www.zeonic-republic.net/","irc://irc.rizon.net/zeonic-corps"],
    "1362": ["http://community.livejournal.com/bangaqua/",""],
    "1387": ["http://jsisscans.wordpress.com/","irc://irc.irchighway.net/J-sis"],
    "1444": ["http://silversoulscans.livejournal.com/",""],
    "1568": ["http://mahouxscans.wordpress.com/",""],
    "1582": ["http://iskultrip.maryfaye.net/","irc://irc.irchighway.net/iskultrip"],
    "162": ["http://gooc.gohanxtrunks.net/","irc://irc.irchighway.net/gameover"],
    "1673": ["http://deadbeat-scans.com/","irc://irc.irchighway.net/deadbeat"],
    "1690": ["http://www.turtle-paradise.net/",""],
    "1720": ["http://fightingdreamersscanlations.wordpress.com/",""],
    "1744": ["http://community.livejournal.com/takanaga_hinako",""],
    "1750": ["http://cgrascal.fakku.net/",""],
    "1753": ["http://goingsoloonce.livejournal.com/",""],
    "1755": ["http://minhha.livejournal.com/",""],
    "1805": ["http://www.kamibana.com/",""],
    "182": ["http://www.evil-genius.us/","irc://irc.irchighway.net/[Evil_Genius]"],
    "1866": ["http://www.mangaupdates.com/series.html?id=74647",""],
    "1873": ["http://da-scan.blogspot.com/",""],
    "1889": ["http://mysweetsense.blogspot.com/",""],
    "1905": ["http://jcscans.wordpress.com/",""],
    "1909": ["http://desudesu.me/",""],
    "1972": ["http://www.hokutonogun.com/","irc://irc.rizon.net/hng"],
    "1996": ["http://fgscans.blogspot.com/",""],
    "2014": ["http://kusanyagi.blogspot.com/",""],
    "2041": ["http://getterrobo.blogspot.com/",""],
    "2047": ["http://phantomtranslator.blogspot.com/",""],
    "2059": ["http://yqii.fakku.net/",""],
    "2063": ["http://srwfc-4l.ani.vn/","irc://irc.irchighway.net/mcdonald"],
    "2070": ["http://slingsblog.blogspot.com/",""],
    "2096": ["http://naonoholics.org/",""],
    "2107": ["http://foolrulez.org/","irc://irc.irchighway.net/foolrulez"],
    "2116": ["http://www.ikaga.org/",""],
    "2146": ["http://nayukilove.wordpress.com/","irc://irc.rizon.net/nayukilove"],
    "2155": ["http://vi-scans.com/","irc://irc.irchighway.net/viscans"],
    "2156": ["http://www.redhawkscans.com/","irc://irc.irchighway.net/red-hawk"],
    "2169": ["http://dark-tower.webs.com/",""],
    "2172": ["http://tktranslate.blogspot.com/","irc://irc.rizon.net/tktranslator"],
    "2204": ["http://www.mangaupdates.com/series.html?id=50950","irc://irc.irchighway.net/cxc"],
    "222": ["http://okyaku.org/","irc://irc.irchighway.net/ivy_scan"],
    "2226": ["http://nerieru.com/wp/","irc://irc.irchighway.net/nerieru"],
    "2279": ["http://brolen9104.wordpress.com/",""],
    "2313": ["http://3dmangascanlations.wordpress.com/",""],
    "2348": ["http://kimoto.livejournal.com/",""],
    "2378": ["http://manga.megchan.com/",""],
    "2385": ["http://prettyanonymo.us/","irc://irc.rizon.net/prettyanon"],
    "239": ["http://miyakublog.blogspot.com/","irc://irc.irchighway.net/Belldandy"],
    "2404": ["http://somethingorotherscans.com/",""],
    "2414": ["http://www.animexis.org/","irc://irc.irchighway.net/animexis"],
    "2420": ["http://kangxitranslationlounge.blogspot.com/",""],
    "2427": ["http://www.deathtollscans.net/","irc://irc.irchighway.net/deathtoll"],
    "2455": ["http://www.littlewhitebutterflies.net/","irc://irc.rizon.net/LWB"],
    "246": ["http://www.lililicious.net/","irc://irc.rizon.net/lililicious"],
    "2474": ["http://otakucentralf.blogspot.com/",""],
    "2484": ["http://www.hotcakes.cc.nf/",""],
    "2485": ["http://fatedcircle.wordpress.com/",""],
    "2492": ["http://community.livejournal.com/keenonboysscans/",""],
    "2524": ["http://hoxtranslations.blogspot.com/",""],
    "2541": ["http://tastykiwiscans.blogspot.com/",""],
    "2593": ["http://community.livejournal.com/lpscanlations/",""],
    "2613": ["http://www.stilettoheelsteam.com/",""],
    "2615": ["http://manga.rayout.org/","irc://irc.rizon.net/ray=out"],
    "2630": ["http://suimasenscans.wordpress.com/","irc://irc.irchighway.net/suimasenscans"],
    "2634": ["http://community.livejournal.com/neptise/",""],
    "2643": ["http://ourtranscendence.com/","irc://irc.irchighway.net/transcendence"],
    "2691": ["http://biribiri.eu/","irc://irc.rizon.net/biritrans"],
    "2716": ["http://www.taira.it/","irc://irc.irchighway.net/jshoujo"],
    "2723": ["http://coyomoosescans.blogspot.com/",""],
    "2727": ["http://www.taptaptaptaptap.net/",""],
    "2739": ["http://www.princerevolution.org/",""],
    "2752": ["http://evilflowers.com/","irc://irc.rizon.net/Evil-Flowers"],
    "2757": ["http://imangascans.org/","irc://irc.irchighway.net/imangascans"],
    "2784": ["http://www.sr-fantrad.com/accueil_en.php",""],
    "2790": ["http://sinusescans.blogspot.com/",""],
    "2810": ["http://kaitozero.wordpress.com/",""],
    "2812": ["http://www.oddsquad.org/",""],
    "2816": ["http://mangahelpers.com/s/juinjutsuteam",""],
    "2825": ["http://redcomet.fakku.net/",""],
    "2838": ["http://nigihana.com/",""],
    "2850": ["http://offtopia.eberth.de/",""],
    "2863": ["http://anonymousdelivers.blogspot.com/",""],
    "2872": ["http://houkagotranslations.blog.com/",""],
    "2883": ["http://wtdnd.wordpress.com/",""],
    "2894": ["http://community.livejournal.com/silver_liningx",""],
    "2909": ["http://omaris-sister.blogspot.com/",""],
    "2923": ["http://caelimane.livejournal.com",""],
    "2931": ["http://www.ipitydafoo.com/","irc://irc.irchighway.net/A-Team"],
    "2944": ["http://www.doujin-moe.us/main.html",""],
    "2948": ["http://maigoscans.blogspot.ca/","irc://irc.irchighway.net/maigo"],
    "2954": ["http://mangatopia.net/","irc://irc.irchighway.net/mangatopia"],
    "3001": ["http://kissthellama.blogspot.com",""],
    "3006": ["http://chibimanga.info/",""],
    "3015": ["http://www.nanofate.us/",""],
    "3041": ["http://orionwave.blog.com/",""],
    "3083": ["http://zefiberyl.blogspot.com/",""],
    "3094": ["http://mibscanlations.blogspot.com/",""],
    "3115": ["http://community.livejournal.com/ebil_trio/",""],
    "3119": ["http://rawcrossing.com/",""],
    "3128": ["http://trinitybakuma.com/","irc://irc.irchighway.net/trinitybakuma"],
    "3137": ["http://crowsxworst.com/forum/phpBB3/viewtopic.php?f=7&t=123",""],
    "3144": ["http://zssscans.wordpress.com/","irc://irc.rizon.net/zss"],
    "3154": ["http://cityshrimp.wordpress.com/",""],
    "3205": ["http://mangastream.com/",""],
    "3213": ["http://dokukinokoscans.blogspot.com/",""],
    "3228": ["http://www.randomscans.com/","irc://irc.irchighway.net/randomscans"],
    "3237": ["http://www.daniel-lau.com/",""],
    "3265": ["http://suzume.stupidcommotion.net/index.php?group=PROzess","irc://irc.irchighway.net/blackwing"],
    "3269": ["http://simple-scans.com/","irc://irc.irchighway.net/simple-scans"],
    "3290": ["http://www.rabbitrevelry.com/anonygoo/",""],
    "3387": ["http://fth-scans.com/","irc://irc.irchighway.net/halibut"],
    "3392": ["http://hiwamatanoboru.com/",""],
    "3393": ["http://kizlan.fakku.net/",""],
    "3404": ["http://overloadscans.info/","irc://irc.irchighway.net/overloadscans"],
    "3435": ["http://numnumnummies.livejournal.com",""],
    "3443": ["http://angrfox.wordpress.com/","irc://irc.irchighway.net/AngryFox"],
    "3449": ["http://tv.littlewhitebutterflies.net/",""],
    "3464": ["http://lbb.littlewhitebutterflies.net/",""],
    "3477": ["http://egscans.org/","irc://irc.irchighway.net/EG"],
    "3506": ["http://vexedscans.blogspot.com/","irc://irc.rizon.net/vexedscans"],
    "3545": ["http://community.livejournal.com/ikemen_scans/",""],
    "3546": ["http://adziu.blogspot.com/",""],
    "3551": ["http://silentdreamscanlations.wordpress.com/","irc://irc.rizon.net/SilentDreamScans"],
    "3555": ["http://trinity-translations-team.blogspot.com",""],
    "3563": ["http://tdxtreme.wordpress.com/",""],
    "3571": ["http://www.titaniascans.com/",""],
    "3597": ["http://bcloli.blogspot.com/",""],
    "3618": ["http://risette-translations.blogspot.com/",""],
    "3621": ["http://dkthias.com/","irc://irc.rizon.net/DKThias"],
    "3625": ["http://www.rosanegra.ucoz.com/",""],
    "3635": ["http://mxr.shounen-ai.net/",""],
    "3652": ["http://stolentranslations.wordpress.com/",""],
    "367": ["http://dpscanlations.deathsvertigo.com/",""],
    "3679": ["http://www.mudascantrad.tk/","irc://irc.irchighway.net/Muda-Scanlations"],
    "3712": ["http://simhauu.com/",""],
    "3714": ["http://animummutare.wordpress.com/","irc://irc.irchighway.net/animutare"],
    "3740": ["http://shibababa.wordpress.com/",""],
    "3742": ["http://taste-and-eat.livejournal.com/",""],
    "3746": ["http://www.mangaupdates.com/series.html?id=35841","irc://irc.rizon.net/Nirpan"],
    "3767": ["http://q-ksubs.blogspot.com/",""],
    "3787": ["http://sensualareola.wordpress.com/",""],
    "3790": ["http://www.payapaya-scans.com","irc://irc.rizon.net/payapaya"],
    "3798": ["http://www.mangaupdates.com/series.html?id=9708",""],
    "3808": ["http://albedo404.blogspot.com/",""],
    "3819": ["http://www.thcmpny.com/","irc://irc.ipocalypse.net/thecompany"],
    "3825": ["http://hachimitsu-scans.blogspot.com/",""],
    "3827": ["http://www.webtoonlive.com/",""],
    "3833": ["http://riceballicious.info/","irc://irc.irchighway.net/riceballicious"],
    "3834": ["http://kawaii.ca/","irc://irc.rizon.net/kawaii-scans"],
    "3840": ["http://www.facepalmscans.com/","irc://irc.irchighway.net/facepalm"],
    "3891": ["http://www.facebook.com/pages/MACVazquez-no-Fansub/175457839167401",""],
    "3902": ["http://vividtrans.wordpress.com/",""],
    "3912": ["http://yaoi-sei.com/",""],
    "3913": ["http://chocolatescans.blogspot.com/",""],
    "3945": ["http://smscans.blogspot.com/",""],
    "3955": ["http://mujintou.wordpress.com/",""],
    "3961": ["http://strangecompanions.blogspot.com",""],
    "3974": ["http://sense-scans.com/","irc://irc.irchighway.net/sense"],
    "3980": ["http://whisper.loyal-kiss.com/",""],
    "3981": ["http://linwenolatari.livejournal.com/",""],
    "3987": ["http://zero-alliance.org/",""],
    "4001": ["http://happyscans.blogspot.com/","irc://irc.rizon.net/HappyScans"],
    "4047": ["http://taimea.livejournal.com/",""],
    "4050": ["http://lilawolves.blogspot.com/",""],
    "4069": ["http://nyajinsky.weebly.com/scans.html",""],
    "4101": ["https://dl.dropbox.com/u/10017992/mixini.html","irc://irc.irchighway.net/mixini"],
    "4108": ["http://neterumouse.blogspot.com/",""],
    "4109": ["http://icarusbride.blogspot.com/",""],
    "4121": ["http://usual-translations.blogspot.com/",""],
    "4123": ["http://blackrockscans.ucoz.net/","irc://irc.irchighway.net/blackrock"],
    "4137": ["http://colourfulabyss.blogspot.ca/","irc://irc.irchighway.net/C-A"],
    "4144": ["http://community.livejournal.com/bluespringscans/",""],
    "4146": ["http://fallensyndicate.com/",""],
    "4152": ["http://fkmtkrazy.blogspot.com/","irc://irc.rizon.net/fkmtkrazy"],
    "4159": ["http://pineapplesrus.fakku.net/",""],
    "4166": ["http://www.mangawari.com/",""],
    "4171": ["http://tsukihana-scans.dreamwidth.org/",""],
    "4176": ["http://hatarakibachi.blogspot.com/",""],
    "4180": ["http://nagare-scans.livejournal.com/",""],
    "4184": ["http://novel.oddsquad.org/",""],
    "4199": ["http://smgscanlations.wordpress.com/",""],
    "4209": ["http://lustnofansub.net",""],
    "4210": ["http://tetsuwanbirdy.blogspot.com/",""],
    "4215": ["http://amanteanime.net/en",""],
    "4225": ["http://www.world-three.org/",""],
    "4231": ["http://kireicake.com/","irc://irc.irchighway.net/cake"],
    "4236": ["http://www.cavescans.tk/",""],
    "4266": ["http://antisensescans.blogspot.com/",""],
    "4278": ["https://s2scansblog.wordpress.com/","irc://irc.irchighway.net/s2s-snp"],
    "4286": ["http://extrascans.net/","irc://irc.irchighway.net/extras"],
    "4289": ["http://getterrobo.blogspot.com/",""],
    "4297": ["http://sound-of-jewels.ucoz.com/",""],
    "4313": ["http://vortex-scans.com/blog/","irc://irc.irchighway.net/Vortex"],
    "4338": ["http://japanzai.com/","irc://irc.irchighway.net/Japanzai"],
    "4344": ["http://lemonteascans.wordpress.com/","irc://irc.irchighway.net/Lemon"],
    "4364": ["http://lolilolihunters.wordpress.com/",""],
    "4368": ["http://cetranslation.blogspot.com/",""],
    "4375": ["http://suscanlation.blogspot.com/",""],
    "4387": ["http://life4kaoru.wordpress.com/","irc://irc.rizon.net/life4kaoru"],
    "4389": ["http://livelyscans.com/","irc://irc.irchighway.net/Lively"],
    "4393": ["http://tsukiscans.blogspot.com",""],
    "4397": ["http://9th-ave.blogspot.com",""],
    "4405": ["http://sharpietranslations.blogspot.com/",""],
    "4408": ["http://lovescanlations.wordpress.com/",""],
    "4410": ["http://yotsumanga.wordpress.com/",""],
    "4419": ["http://imperialscans.com/","irc://irc.irchighway.net/Imperial-Scans"],
    "4429": ["http://afthscans.funeralofsmiles.com/",""],
    "4433": ["http://leon692.blogspot.com/",""],
    "4449": ["http://twistedmist.blogspot.com/",""],
    "4451": ["http://september.strawberrywine.org/",""],
    "4452": ["http://www.funeralofsmiles.com/",""],
    "4456": ["http://mangasyndrome.blogspot.com/",""],
    "4461": ["http://kamikakushitranslations.wordpress.com/",""],
    "4482": ["http://rp-fans.livejournal.com",""],
    "4488": ["http://TempusEdaxRerumTL.wordpress.com","irc://irc.rizon.net/TempusEdaxRerumTL"],
    "4489": ["http://urashichiken.tumblr.com/",""],
    "4492": ["http://midnightcrewsubs.blogspot.com/",""],
    "4494": ["http://mumeitl.blogspot.com/",""],
    "4503": ["http://keijoshoujoscans.wordpress.com/",""],
    "4506": ["http://tokyoillusion.wordpress.com/",""],
    "4510": ["http://recorder-class.blogspot.com/",""],
    "4515": ["http://yukifan.net",""],
    "4530": ["http://oxynclaire.wordpress.com/",""],
    "4534": ["http://iwuvkaykee.blog.jp/",""],
    "4535": ["http://thetsuuyaku.blogspot.com",""],
    "4539": ["http://lunatictranslations.wordpress.com/",""],
    "4541": ["http://giraffecorps.liamak.net/","irc://irc.irchighway.net/giraffecorps"],
    "4542": ["http://mangaholic.tk/","irc://irc.irchighway.net/retards"],
    "4554": ["http://nanachanscans.wordpress.com/","irc://irc.irchighway.net/Freetime"],
    "4566": ["http://yuriproject.net/","irc://irc.rizon.net/yuriproject"],
    "4581": ["http://www.redhawkscans.com/","irc://irc.irchighway.net/red-hawk"],
    "4588": ["http://www.mangainn.com/",""],
    "4590": ["http://carfisher.tumblr.com/",""],
    "4602": ["http://mangabandits.net/","irc://irc.irchighway.net/banditsofthedeep"],
    "4610": ["http://greendrugstore.tumblr.com/",""],
    "4611": ["http://slug-chicks.blogspot.com/",""],
    "4620": ["http://www.mangaupdates.com/series.html?id=49820",""],
    "4623": ["http://sw.littlewhitebutterflies.net/",""],
    "4629": ["http://roseliascans.blogspot.com/",""],
    "4638": ["http://delishscans.wordpress.com/",""],
    "4645": ["http://drop3njoyscan.blogspot.com/",""],
    "4656": ["http://kanariyabaiscanlations.wordpress.com/",""],
    "4664": ["http://acmedan.blogspot.com/","irc://irc.rizon.net/acmedan"],
    "4667": ["http://mangaburn.net/","irc://irc.irchighway.net/mangaburn"],
    "4673": ["http://aquascans.wordpress.com/",""],
    "4675": ["http://planethima.wordpress.com/",""],
    "4677": ["http://yukina.weebly.com/",""],
    "4681": ["http://transientmirage.com/","irc://irc.irchighway.net/transient-mirage"],
    "4683": ["http://razuriscans.livejournal.com/",""],
    "4688": ["http://www.yukipo.com/",""],
    "4689": ["http://imoutoliciouslnt.blogspot.com/",""],
    "4693": ["http://qbtranslations.wordpress.com/","irc://irc.rizon.net/QB-TL"],
    "4700": ["http://madhatterscans.haneuri.net/",""],
    "4705": ["http://bidhangingaddnine.wordpress.com/","irc://irc.irchighway.net/BidNine"],
    "4711": ["http://pknoctis.tumblr.com/",""],
    "4714": ["http://mysticiris.info/",""],
    "4715": ["http://www.mangaupdates.com/series.html?id=74820",""],
    "4722": ["http://jump-into-the-labyrinth.blogspot.com/",""],
    "4725": ["http://sukikatte.wordpress.com/",""],
    "4736": ["http://strangescans.blogspot.com/",""],
    "4740": ["http://ryuuseinomafia.wordpress.com/",""],
    "4749": ["http://www.friendshipscans.com/","irc://irc.irchighway.net/friendship"],
    "4752": ["http://yuri-ism.com/","irc://irc.rizon.net/yuri-ism"],
    "4754": ["http://www.mangapanda.com/",""],
    "4758": ["http://emeraudemanga.blogspot.it/",""],
    "4764": ["http://renzokuseiscans.blogspot.ca/","irc://irc.irchighway.net/renzokusei"],
    "4770": ["http://fujoshigeneration.com/",""],
    "4772": ["http://ilovesensei.wordpress.com/",""],
    "4776": ["http://robofaget.tumblr.com/",""],
    "4779": ["http://rabbitteam.livejournal.com/",""],
    "4786": ["http://boonscanlations.blogspot.de/",""],
    "4789": ["http://kaleidoscopicscans.wordpress.com/",""],
    "4790": ["http://nanodesutranslations.wordpress.com/","irc://irc.rizon.net/NanoDesu"],
    "4793": ["http://ydwtt.com/","irc://irc.rizon.net/ydwtt"],
    "4794": ["http://orinjido.info/","irc://irc.irchighway.net/orange"],
    "4796": ["http://untuned-strings.blogspot.com/",""],
    "4798": ["http://blueflamescanlation.webs.com/","irc://irc.irchighway.net/blueflame"],
    "4802": ["http://www.kuudere.com",""],
    "4803": ["http://chiyako92.wordpress.com/",""],
    "4806": ["http://cocobees.livejournal.com/",""],
    "4819": ["http://deusexscans.blogspot.com/",""],
    "4826": ["http://monstermusume.blisswater.info/","irc://irc.rizon.net/monstermusume"],
    "4830": ["http://shirayukiscans.tumblr.com/","irc://irc.irchighway.net/shirayuki-scans"],
    "4834": ["http://thelustyladyproject.com/",""],
    "4841": ["http://crazydelinquentsandshit.tumblr.com/",""],
    "4845": ["http://queensbladebattle.blogspot.com/",""],
    "4847": ["http://vendettascans.com/",""],
    "4850": ["http://www.surasplace.com/",""],
    "4856": ["http://iemonsy.webs.com/",""],
    "4860": ["http://wekmanga.blogspot.com/",""],
    "4863": ["http://www.sakugara.com","irc://irc.irchighway.net/sakugara"],
    "4866": ["http://www.akashiscans.com","irc://irc.irchighway.net/akashi-scans"],
    "4867": ["http://www.mangaupdates.com/series.html?id=39645","irc://irc.irchighway.net/sbikkys"],
    "4871": ["http://giraffecorps.liamak.net/",""],
    "4882": ["http://bakkinbakkingamu.com/",""],
    "489": ["http://entropy-manga.info","irc://irc.irchighway.net/entropy"],
    "4893": ["http://yuenhoe.com/blog/",""],
    "4899": ["http://mistyrainscans.blogspot.in/",""],
    "4905": ["http://secondhandscans.blogspot.com/",""],
    "4907": ["http://4kumalations.webs.com/","irc://irc.rizon.net/4kumalations"],
    "4911": ["http://omascans.wordpress.com/",""],
    "4919": ["http://fingerscans.it.cx/",""],
    "4922": ["http://psscans.info/","irc://irc.irchighway.net/psscans"],
    "4925": ["http://mairietoile.wordpress.com/",""],
    "4926": ["http://shoujosense.wordpress.com/","irc://irc.irchighway.net/Shoujosense"],
    "4934": ["http://roankun.wordpress.com",""],
    "4937": ["http://tenko.fansubban.org/",""],
    "4944": ["http://whiteflowertranslations.tumblr.com/",""],
    "4948": ["http://amiserablepileofscans.tumblr.com/",""],
    "4954": ["http://mangapirate.me/",""],
    "4956": ["http://supremecream.wordpress.com/","irc://irc.irchighway.net/Supreme"],
    "4960": ["http://www.vistrans.net/",""],
    "4973": ["http://yadorigi.livejournal.com/",""],
    "4974": ["http://captainba.tumblr.com",""],
    "4978": ["http://hotdead.blogspot.com/",""],
    "4981": ["http://its-magic-scans.blogspot.com/",""],
    "4982": ["https://wonderlandafterhours.wordpress.com/",""],
    "4984": ["http://www.bulsajo-scans.com/","irc://irc.rizon.net/Bulsajo"],
    "4987": ["http://krascans.blogspot.com.br/","irc://irc.irchighway.net/kra-scans"],
    "4990": ["http://lightnovelsmangaandmore.blogspot.com/p/mahouka-koukou-no-yuutousei.html",""],
    "4994": ["http://hufflypuff.wordpress.com/",""],
    "5000": ["http://kiwimyweewee.livejournal.com/",""],
    "5004": ["http://eromangagirls.blogspot.ca/",""],
    "5008": ["http://seinenscans.blogspot.co.uk",""],
    "501": ["http://illuminati-manga.com/","irc://irc.irchighway.net/Illuminati-Manga"],
    "5011": ["http://meo23.livejournal.com/",""],
    "5021": ["http://ak-scans.wikia.com/wiki/The_/ak/_Wiki",""],
    "5027": ["http://bentoland.wordpress.com/","irc://irc.irchighway.net/bento"],
    "5029": ["http://devil-castle.livejournal.com/",""],
    "5033": ["http://dear-marionette.livejournal.com/",""],
    "5034": ["http://darkmurmur.com/",""],
    "5037": ["http://silicascans.blogspot.com/",""],
    "5039": ["http://www.cloud9-scans.blogspot.ca/",""],
    "5040": ["http://usagitrans.blogspot.fr/",""],
    "5044": ["http://ginironochou.wordpress.com/",""],
    "5045": ["http://xcxscans.wordpress.com/",""],
    "5048": ["http://springephemeral.wordpress.com/",""],
    "5049": ["http://fickle-pickle.net/",""],
    "5050": ["http://onthemiddleofnowhere.wordpress.com/",""],
    "5051": ["http://rapidswitch.wordpress.com/",""],
    "5055": ["http://bluebirdscans.wordpress.com/",""],
    "5057": ["http://en.nightow.net/","irc://irc.immortal-anime.net/nighto"],
    "5061": ["http://serendipitymanga.blogspot.ro/",""],
    "5065": ["http://asdfscans.net/","irc://irc.irchighway.net/asdf"],
    "5070": ["http://www.mangaupdates.com/series.html?id=70001","irc://irc.irchighway.net/hel"],
    "5076": ["http://fmnlscans.wordpress.com/",""],
    "5077": ["http://boroiheya.blogspot.com/",""],
    "5085": ["http://kidukyo.livejournal.com/",""],
    "5086": ["http://paradiselovescanlations.wordpress.com/",""],
    "5088": ["http://rockinghorsescans.blogspot.com/",""],
    "5093": ["http://casanovascans.com/","irc://irc.irchighway.net/casanova"],
    "5095": ["http://www.matteiruscans.com/",""],
    "5099": ["http://kumoris.blogspot.com/",""],
    "5100": ["http://ephemeralhakanai.blogspot.sg/",""],
    "5109": ["http://beigesunshine.net/",""],
    "5127": ["http://lewishfulscanlation.blogspot.ca/",""],
    "5130": ["http://baradisescanlations.wordpress.com/",""],
    "5134": ["http://cyborg009.livejournal.com/62469.html",""],
    "5136": ["http://teatimescans.wordpress.com/","irc://irc.rizon.net/teatime-scans"],
    "5138": ["http://yaoishake.tumblr.com/",""],
    "5140": ["http://unlimitednovelfailures.mangamatters.com/","irc://irc.irchighway.net/Blackwing"],
    "5142": ["http://nondescriptors.wordpress.com/",""],
    "5153": ["http://psylockescans.wordpress.com","irc://irc.irchighway.net/psylocke"],
    "5156": ["http://www.royalroadl.com/",""],
    "5162": ["http://keydriven.wordpress.com/",""],
    "5164": ["http://undercover-witch.tumblr.com/",""],
    "5165": ["http://dazzlingscans.com/",""],
    "5178": ["http://lollistarxscanlations.blogspot.com/",""],
    "5179": ["http://manga.displaynone.us/",""],
    "5187": ["http://bartleyscans.blogspot.com",""],
    "5188": ["http://kyakkascans.blogspot.ca/",""],
    "5193": ["http://spinybackwebdesign.com/",""],
    "5196": ["http://bamboo-feathers.livejournal.com/",""],
    "5199": ["http://hoshi-kuzuu.livejournal.com/",""],
    "5204": ["http://lagscans.webs.com/",""],
    "5205": ["http://artemisproject.tumblr.com/",""],
    "5206": ["http://malscans.blogspot.com/","irc://irc.rizon.net/MALScans"],
    "5207": ["http://mtogroup.wordpress.com/","irc://irc.irchighway.net/mto-group"],
    "5210": ["http://junnasscans.tumblr.com/",""],
    "5212": ["http://www.kira-fansub.com/","irc://irc.rizon.net/Kira-fansub"],
    "5215": ["http://alscans.wordpress.com",""],
    "5217": ["http://mangacow.in/",""],
    "5223": ["http://s2scanlations.com/",""],
    "5226": ["http://prozessh.blogspot.de/","irc://irc.irchighway.net/Blackwing"],
    "5227": ["http://bunny26a3.blogspot.com/",""],
    "5228": ["http://smdc-translations.com/",""],
    "5230": ["http://www.mangaupdates.com/series.html?id=24388",""],
    "5239": ["http://bakeneko-scans.livejournal.com/",""],
    "5252": ["http://kiririn.me/","irc://irc.rizon.net/Kiririn"],
    "5260": ["http://yaoislife.tumblr.com/",""],
    "5261": ["http://underdogscan.blogspot.com/",""],
    "5263": ["http://mankitsuscans.wordpress.com/",""],
    "5264": ["http://wolfchildrenameandyuki.blogspot.com/",""],
    "527": ["http://taruby.gamerkun.com/",""],
    "5276": ["http://gurennoheyakara.blogspot.it/",""],
    "5279": ["http://tak3z0.livejournal.com/",""],
    "5282": ["http://megu-scans.blogspot.com/",""],
    "5283": ["http://zqscans2013.wordpress.com/",""],
    "5285": ["http://arainamiscans.wordpress.com/",""],
    "5286": ["http://www.mangaupdates.com/series.html?id=16845","irc://irc.irchighway.net/2hungryazns"],
    "5287": ["http://junktheeater.wordpress.com/",""],
    "5289": ["http://turnipfarmers.wordpress.com/",""],
    "5293": ["http://chichan54.tumblr.com/",""],
    "5296": ["http://krizalidtranslations.wordpress.com/",""],
    "5304": ["http://nisepanlations.tumblr.com/",""],
    "5309": ["http://oppai-scans.tumblr.com/",""],
    "5310": ["http://shuuen-scans.tumblr.com/",""],
    "5312": ["http://detectiveconanscans.wordpress.com/",""],
    "5316": ["http://www.mangaupdates.com/series.html?id=77748","irc://irc.rizon.net/swagamoto"],
    "5323": ["http://randomscans.blogspot.com/",""],
    "5326": ["http://chikiscans.com/","irc://irc.rizon.net/chiki"],
    "5329": ["http://tmnbe-scans.blogspot.com/",""],
    "5332": ["http://taste-and-eat.livejournal.com/",""],
    "5336": ["http://arascans.blogspot.com/","irc://irc.irchighway.net/arascans"],
    "5339": ["http://boyslovenetwork.blogspot.com/",""],
    "5345": ["http://aion-scanlations.blogspot.com/",""],
    "5351": ["http://boards.4chan.org/a/",""],
    "5354": ["http://redvodkatranslations.blogspot.com/","irc://irc.rizon.net/redvodkasmagicalparadise"],
    "5357": ["http://kagerouscans.tumblr.com/",""],
    "5359": ["http://peek-a-yaoi.tumblr.com/",""],
    "5361": ["http://fragmentedhollow.wordpress.com/",""],
    "5364": ["http://chocobananascans.tumblr.com",""],
    "5370": ["http://tiger-and-bunny.livejournal.com/",""],
    "5371": ["http://bl-gyaru.com/",""],
    "5373": ["http://summer-rain-scans.weebly.com/","irc://irc.ipocalypse.net/SummerRain"],
    "5374": ["http://fuwasyndrome.livejournal.com/",""],
    "5377": ["http://leno-obscurum.livejournal.com/",""],
    "5382": ["http://aoi-hisui.tumblr.com/",""],
    "5386": ["http://1008scans.wordpress.com/",""],
    "5397": ["http://binbouscan.blogspot.ca/",""],
    "5403": ["http://bapscans.blogspot.com/","irc://irc.irchighway.net/BAP"],
    "5408": ["http://mnight-haven.livejournal.com/",""],
    "5412": ["http://madmanscanlation.blogspot.com",""],
    "5415": ["http://squalo-scans.livejournal.com/",""],
    "5417": ["http://sarumi-project.livejournal.com/",""],
    "5418": ["http://dragonballremastered.wordpress.com",""],
    "5422": ["http://sweetpuriinsuscans.tumblr.com/",""],
    "5423": ["http://decadentdescent.blogspot.com/",""],
    "5424": ["https://xsuzuranx.wordpress.com/",""],
    "5427": ["http://kingyokusa-scans.tumblr.com/",""],
    "5428": ["http://kisu.kissmanga.com/","irc://irc.irchighway.net/kisukms"],
    "5433": ["http://indulgencescans.wordpress.com/",""],
    "5435": ["http://arrow-scans.blogspot.com.au/",""],
    "5437": ["http://dbptp.ithasceasedto.be/",""],
    "5445": ["http://www.mangaupdates.com/series.html?id=103819",""],
    "5447": ["http://horriblescans.wordpress.com",""],
    "5450": ["http://nubvola.livejournal.com/",""],
    "5452": ["http://rawdistro.net/","irc://irc.irchighway.net/irc-distro"],
    "5457": ["http://www.silentsky-scans.net/",""],
    "5459": ["http://cielscans.wordpress.com/",""],
    "5462": ["http://kameden.blogspot.com/",""],
    "5463": ["http://rinruritrans.x.fc2.com",""],
    "5464": ["http://mangaordersbros.co.nf/",""],
    "5465": ["http://mangaordersbros.co.nf/",""],
    "5468": ["http://www.mangaupdates.com/series.html?id=50",""],
    "5470": ["http://horobosu-scans.livejournal.com/",""],
    "5472": ["http://200wpms.wordpress.com/",""],
    "5478": ["http://mangaordersbros.co.nf/",""],
    "5479": ["http://impatientscan.blogspot.com/",""],
    "5488": ["http://closetspaces.blogspot.com/",""],
    "5495": ["http://mangalism.blogspot.com/",""],
    "5496": ["http://anontamer.blogspot.com/",""],
    "5497": ["http://mangadoom.com/",""],
    "5498": ["http://sexymamascanlations.tumblr.com",""],
    "5501": ["http://helveticascenario.wordpress.com/","irc://irc.rizon.net/soranowoto"],
    "5504": ["http://mochicasino.dreamwidth.org",""],
    "5505": ["http://japtem.com/",""],
    "5512": ["http://undertheblossomingcherrytrees.blogspot.it/",""],
    "5514": ["http://www.mangaupdates.com/series.html?id=32390",""],
    "5515": ["http://nekojiruproject.blogspot.com/",""],
    "5519": ["http://jollygoat.tumblr.com/",""],
    "5521": ["http://solefishscans.tumblr.com/",""],
    "5522": ["http://sweet-temptation-scans.blogspot.com/",""],
    "5529": ["http://www.dragonandgriffin.com",""],
    "5531": ["http://agrypniascan.blogspot.com/",""],
    "5533": ["http://mangaichiscans.blogspot.com/",""],
    "5534": ["http://weiberregiment.livejournal.com/",""],
    "5539": ["http://frostscans.wordpress.com/","irc://irc.irchighway.net/frost"],
    "5542": ["http://substitutescans.wordpress.com/",""],
    "5544": ["http://ecchibaka.blogspot.com/",""],
    "5545": ["http://mangaattheendoftime.tumblr.com/",""],
    "5546": ["http://gin-kin.tumblr.com/",""],
    "5550": ["http://ai-sakuma.livejournal.com/",""],
    "5552": ["http://anime-melc.blogspot.com/",""],
    "5557": ["http://ahr-scans.tumblr.com/",""],
    "5558": ["https://www.dropbox.com/sh/f7ous1cufsmm70r/CLMdeiHd08",""],
    "5560": ["http://www.mangaunlimited.com",""],
    "5564": ["http://underthescarletcherrytrees.blogspot.it/",""],
    "5570": ["http://laute.tumblr.com/",""],
    "5572": ["http://dekinai-scans.livejournal.com/",""],
    "5573": ["http://www.komanga.com",""],
    "5576": ["http://tsukilining.livejournal.com/",""],
    "5578": ["http://friedsquid.tk",""],
    "5581": ["http://hikaritoyamiscanlation.blogspot.com.au/",""],
    "5582": ["http://kamisamascans.wordpress.com",""],
    "5583": ["http://sakurahonyaku.wordpress.com/",""],
    "5587": ["http://www.shitbread.com",""],
    "5588": ["http://yurihou.se/",""],
    "5590": ["http://aotamago.blogspot.nl/",""],
    "5592": ["http://mangaordersbros.co.nf/",""],
    "5596": ["http://www.mangaupdates.com/series.html?id=61643",""],
    "5597": ["http://amarante-scans.tk/",""],
    "5598": ["http://www.yaoiotaku.com",""],
    "5599": ["http://sometimesidotranslations.tumblr.com/",""],
    "5600": ["http://kadavra-scanlation.blogspot.com/",""],
    "5603": ["http://ichinkoscans.tumblr.com/",""],
    "5606": ["http://suzakutheknight.livejournal.com/",""],
    "5611": ["http://elision-scans.net",""],
    "5612": ["http://lycheescans.blogspot.ca",""],
    "5613": ["http://greenlighttranslations.tumblr.com/",""],
    "5615": ["http://rosescanlations.wordpress.com/",""],
    "5616": ["http://mofogoku.wordpress.com/",""],
    "5617": ["http://bltranslation.blogspot.com",""],
    "5618": ["http://tacticsacademy.blogspot.com/",""],
    "5619": ["http://fujoshibitchs.livejournal.com/",""],
    "5620": ["http://moustachescans.wordpress.com/",""],
    "5622": ["http://amatoempire.livejournal.com/",""],
    "5623": ["http://www.mangaupdates.com/series.html?id=63699",""],
    "5627": ["http://halfassscans.wordpress.com/",""],
    "5630": ["http://tanpenshuu.tumblr.com/",""],
    "5632": ["http://www.mangaupdates.com/series.html?id=4974",""],
    "5634": ["http://aquarionscans.blogspot.com",""],
    "5635": ["http://ochinchinpartyscans.tumblr.com/",""],
    "5636": ["http://sheraroxx.blogspot.com",""],
    "5637": ["http://amscans.wordpress.com",""],
    "5638": ["http://www.moonflower-scans.tk",""],
    "5640": ["http://pocketloli.blogspot.com/","irc://irc.highway.com/pocketloli"],
    "5641": ["http://snowsan.wordpress.com",""],
    "5644": ["http://rottenscans.wordpress.com/",""],
    "5647": ["http://baka-dumb-aho-scans.tumblr.com/",""],
    "5649": ["http://aka2kuro.wordpress.com/","irc://irc.irchighway.net/AkaToKuro"],
    "5652": ["http://risinggodsoftheeastscans.tumblr.com/",""],
    "5655": ["http://lolibrigadescans.com",""],
    "5657": ["http://koketsuniirazunbakojiwoezu.wordpress.com/",""],
    "5658": ["http://wneescanslations.blogspot.com/",""],
    "5659": ["http://cm-scans.tumblr.com/",""],
    "5661": ["http://pmpowa.blogspot.it",""],
    "5663": ["http://karnoodle.tumblr.com",""],
    "5664": ["http://day0dream.blogspot.com/",""],
    "5665": ["http://konoerogaki.tumblr.com",""],
    "5666": ["http://www.futatsunotsuki.blogspot.mx/",""],
    "5668": ["http://siniyzerkalo.wordpress.com/",""],
    "5669": ["http://myth720.tumblr.com/",""],
    "5670": ["http://ninjaswithoutborders.com/",""],
    "5671": ["http://fateburnfamily.wordpress.com/",""],
    "5674": ["http://bokusekiset.tumblr.com",""],
    "5677": ["http://reapers-scans.blogspot.com/",""],
    "5681": ["http://zombiesatemymanga.blogspot.com",""],
    "5682": ["http://alice-michiyo.tumblr.com/",""],
    "5683": ["http://www.flatopia.org/",""],
    "5684": ["http://facedesktranslations.wordpress.com/",""],
    "5687": ["http://cheonsatranslations.blogspot.com/",""],
    "5689": ["http://violetdreams9.blogspot.com.au",""],
    "5691": ["http://hsscans.tumblr.com/",""],
    "5693": ["http://soltarination.tumblr.com/",""],
    "5694": ["http://blackricescans.tumblr.com",""],
    "5698": ["http://mmattari.blogspot.com/",""],
    "5701": ["http://tb-scans.tumblr.com/",""],
    "5705": ["http://forgotten--scans.weebly.com/",""],
    "5707": ["http://salnar.wordpress.com/",""],
    "5708": ["http://90percentzebra.wordpress.com/",""],
    "571": ["http://et-caetera.net/","irc://irc.irchighway.net/etc"],
    "5710": ["http://oyasumitranslations.wordpress.com",""],
    "5714": ["http://backdoorscans.tumblr.com/",""],
    "5715": ["http://dreamlesswindow.wordpress.com/",""],
    "5716": ["http://almostneet.wordpress.com/",""],
    "5720": ["http://nimu-manga.com/",""],
    "5721": ["http://hatsukkoi.tumblr.com",""],
    "5723": ["http://rapemanscans.wordpress.com/",""],
    "5724": ["http://neetscans.wordpress.com/",""],
    "5726": ["http://shackscans.blogspot.com",""],
    "5729": ["https://sites.google.com/site/cometscans/",""],
    "5734": ["http://queen-2-hearts.ucoz.com/",""],
    "5735": ["http://kimoi-group.tumblr.com/",""],
    "5736": ["http://mnemeaa.wordpress.com/",""],
    "5737": ["http://afrodhi.org/","irc://irc.irchighway.net/Afrodhi"],
    "5738": ["http://yummymanga.wordpress.com/",""],
    "5741": ["http://narascans.blogspot.com",""],
    "5744": ["http://rimyuel.wordpress.com",""],
    "5745": ["http://5amtranslations.wordpress.com",""],
    "5748": ["http://lameedits.wordpress.com/",""],
    "5752": ["http://lazylily.electrochef.us",""],
    "5754": ["http://doki.co/","irc://irc.rizon.net/doki"],
    "5756": ["http://2qscans.wordpress.com",""],
    "5758": ["http://fabled-pepper.blogspot.com/",""],
    "5759": ["http://pastebin.com/u/skythewood",""],
    "5763": ["http://slightlysarcastic.weebly.com",""],
    "5765": ["http://kiekie895.wix.com/otomescans",""],
    "5771": ["http://hyouka-rangers.tumblr.com",""],
    "5776": ["http://www.mangaupdates.com/series.html?id=99231",""],
    "602": ["http://www.emsmanga.com/","irc://irc.irchighway.net/emsmanga"],
    "630": ["http://www.baka-tsuki.org/","irc://irc.rizon.net/Baka-Tsuki"],
    "645": ["http://www.kindan-no-aku.com/",""],
    "663": ["http://shoujo-manga.org/",""],
    "666": ["http://www.makimakimanga.com/","irc://irc.rizon.net/makimaki"],
    "670": ["http://www.sakuracities.com/yaoigames/",""],
    "674": ["http://www.esthetique-realm.net/","irc://irc.irchighway.net/Esthetique"],
    "692": ["http://s-kojika.com/PKR/",""],
    "724": ["http://lyrebird.aithine.org/halfbaked/",""],
    "807": ["http://mankin-trad.net",""],
    "878": ["http://www.mangaupdates.com/series.html?id=93033","irc://irc.irchighway.net/Intercross"],
    "931": ["http://wingtipcafe.com/en/",""],
    "957": ["http://musashi.nyaatorrents.org/","irc://irc.irchighway.net/musashiquality"],
    "988": ["http://www.gensokyo.org/",""]
};

    function trimSpaces(string) {
        return string.replace(/ /g,'');
    }

    $(document).ready(function() {

        var following = [];
        if (localStorage["following"]) {
            following = JSON.parse(localStorage["following"]);
        }

        following.toggleFollow = function (mangaName) {
            if (this.indexOf(mangaName) == -1) {
                this.push(mangaName);
                console.log('follow: ' + mangaName);
            } else {
                this.splice(this.indexOf(mangaName), 1);
                console.log('unfollow: ' + mangaName);
            }
            localStorage["following"] = JSON.stringify(this);
        }

        // This will add in the new mu-improver div
        var $muImp = $('<div id="mu-improver"/>');
        $muImp.appendTo('body');
        $muImp.append('<div id="mu-improver-controls">'
            + '<p><a onclick="localStorage.clear(); return false;" href="#">Clear localStorage</a></p>'
            + '<p><a id="mu-imp-hide" href="#">Toggle Improver Display</a></p>');

        $('#mu-imp-hide').click(function() {
            $('#mu-improver > div').not('#mu-improver-controls').fadeToggle('fast');
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });

        // Now scrape the tables for the contents of their cells.
        // First, grab the date boxes
        var dates = $.makeArray($('#main_content div p.titlesmall')).map(function(date) {
            return $(date).text();
        });

        /*
         * Now, grab the content of the release tables using some fancy maps.
         * I'm going to load them all into a 3-dimensional array.  Thank god MU actually ID'd the container in this case... kind of
         *              array[table(day), row, cell]
         */
        var tables = $.makeArray($('#main_content > div > div > table')).map(function(table) {
            return $.makeArray($(table).find('tr')).map(function(tableRow) {
                return $.makeArray($(tableRow).find('td')).map(function(tableCell) {
                    return $(tableCell).html();
                });
            });
        });

        // Remove the table headers, which are the first row of each table.
        // Dear MangaUpdates: Learn to use <thead>
        tables.forEach(function(elem) {
            elem.splice(0,1)
        });

        // There should be an equal number of dates and tables.  God help us if there aren't.
        if (dates.length > tables.length) {
            console.log("For some reason there are more dates than tables.");
        } else if (dates.length < tables.length) {
            console.log("For some reason there are more tables than dates.");
        } else {
            // Note that the rest of the script is contained in this else.

            $releasesBox = $('<div id="mu-imp-release-listing"/>');
            $releasesBox.appendTo($muImp);

            /*
             * Now re-built the tables by iterating through the releases tables.
             * This will create a nice clean template for the data.
             */
            for (var i = 0; i < dates.length; i++) {
                $releasesBox.append('<h2>' + dates[i] + '</h2>');
                $releasesBox.append('<table>'
                    + tables[i].map(function(rows) {
                       return '<tr><td>'
                            + rows.join("</td><td>")
                            + '</td></tr>';
                    }).join("")
                    + '</table>'
                );
            }

            // Add in the contentBox, which will more or less act as an iFrame.
            var $contentBox = $('<div id="mu-imp-content-box"/>');
            $contentBox.appendTo($muImp);

            // First-child tds links represent links to manga pages
            var mangaLinks = $releasesBox.find('td:first-child a');

            /*
             * If a manga page is clicked, populate $contentBox with the manga's page,
             * which will be the contents of the first .series_content_cell in MU's awful semantics.
             */
            mangaLinks.click(function() {
                var target = $(this).attr('href') + ' .series_content_cell';
                $contentBox.empty();
                $contentBox.load(target);

                // Strikeout the link
                $(this).addClass('link-clicked');
                $(this).parent().parent().addClass('tr-clicked');

                // Stop the click from continuing to process
                return false;
            });


            // Preserve the option to open the manga link by adding a (Link) option on the far left
            mangaLinks.each(function() {
                var mangaName = trimSpaces($(this).text());
                var checked = "";
                if (following.indexOf(mangaName) != -1) {
                    checked = " checked"; // leading space is needed
                    $(this).parent().parent().addClass('tr-followed');
                }
                var $followBox = $('<p class="left">Follow: <input type="checkbox" name="' + mangaName + '"' + checked +' /></p>');

                $(this).before('<a class="left" href=' + $(this).attr('href') + '>(Link)</a>');
                $(this).before($followBox);

                $followBox.find('input').click(function() {
                    following.toggleFollow(mangaName);
                    $(this).parent().parent().parent().toggleClass('tr-followed');
                });
            });

            // If you click on just a table row, toggle on the coloration of that row
            $releasesBox.find('tr').click(function() {
                $(this).addClass('tr-clicked');
            });

            // Last-child td links represent links to group pages
            var groupLinks = $releasesBox.find('td:last-child a');

            groupLinks.each(function() {
                // These links all end in 'id=groupid', so it's easy to snatch it
                var $currentGroup = $(this);
                var groupLink = $currentGroup.attr('href');
                var groupId = groupLink.split('=').pop();
                var groupName = $currentGroup.text();

                // Before starting, preserve the original link
                $currentGroup.before($currentGroup.text() + ':<br />');
                $currentGroup.after('<a href=' + groupLink + '>(MU)</a>')

                // Now to finally ues that groups object from the start
                var groupInfo = groups[groupId];
                var groupUrl = groupInfo[0];
                var groupIrc = groupInfo[1];

                // If either varaible is 0 length, do not add that link
                if (groupUrl.length > 0) {
                    $currentGroup.after('<a href="' + groupUrl + '">(Website)</a>');
                }
                if (groupIrc.length > 0) {
                    $currentGroup.after('<a href="' + groupIrc + '">(IRC)</a>');
                }

                // $currentGroup was already replaced, remove it.
                $currentGroup.remove();
            });
            // Finally, re-add the pagination buttons
            $releasesBox.append('<table>' + $('#main_content > div > table').html() + '</table>');
        }

        // Now append some styles to the document.  Very, very ugly doing this in a userScript
        var cssToAdd = '\
        .link-clicked {\
            text-decoration: line-through !important;\
        }\
        \
        #mu-improver { \
            background-color: #EEE;\
            font-family: Arial;\
            position: absolute;\
                top: 0;\
                left: 0;\
            text-align: left;\
            width: 100%;\
            z-index: 100;\
        }\
        \
        #mu-improver-controls {\
            background-color: inherit;\
            border: 1px #000 solid;\
            border-radius: 8px;\
            margin: 1.4em 1.4em 0 0;\
            padding: 0 1.4em;\
            position: fixed;\
                top: 0;\
                right: 0;\
            z-index: 101;\
        }\
        \
        #mu-imp-release-listing h2 {\
            font-size: 16px;\
            padding: 0\
        }\
        \
        #mu-imp-release-listing .left {\
            clear: both;\
            display: inline-block;\
            float: left;\
            margin: 0;\
            padding: 0;\
            padding-right: 1em;\
        }\
        \
        #mu-imp-release-listing table {\
            font-size: 12px;\
            text-align: center;\
        }\
        \
        #mu-imp-release-listing tr {\
            border-bottom: 1px #000 solid;\
            display: block;\
        }\
        \
        #mu-imp-release-listing tr:hover {\
            background-color: #FFF;\
        }\
        \
            #mu-imp-release-listing tr.tr-clicked {\
                background-color: #CCC;\
            }\
            \
            #mu-imp-release-listing tr.tr-followed {\
                background-color: #FC912F;\
            }\
            \
                #mu-imp-release-listing tr.tr-followed a:hover {\
                    color: #000;\
                }\
                \
        #mu-imp-release-listing td:first-child {\
            text-align: right;\
            width: 200px;\
        }\
        \
        #mu-imp-release-listing td:nth-child(2) {\
            width: 80px;\
        }\
        \
        #mu-imp-release-listing td:last-child {\
            text-align: left;\
            width: 160px;\
        }\
        \
        #mu-imp-release-listing {\
            float: left;\
        }\
        \
        #mu-imp-content-box {\
            border-left: 1px #000 solid;\
            height: 100%;\
            overflow: scroll;\
            position: fixed;\
                top: 0;\
                left: 470px;\
        }\
        \
            #mu-imp-content-box td.series_content_cell {\
                width: auto;\
            }\
            \
            #mu-imp-content-box li {\
                display: inline;\
            }\
            \
            #mu-imp-content-box .series_content_cell table {\
                display: none;\
            }\
            \
            #mu-imp-content-box .releasestitle {\
                clear: both;\
            }\
            \
            #listContainer {\
                display: none;\
            }\
            \
            .sContainer {\
                float: left;\
                width: 250px;\
                clear: none;\
                margin-left: 3em;\
            }\
            \
            .sCat:first-child {\
                text-align: center;\
            }';

        $('body').append('<style type="text/css">' + cssToAdd + '</style>');
    });
}

// The script requires jQuery, but chrome doesn't support @require in userScripts, so this is a polyfill of sorts.
// Hopefully this explains why all the above script was stored in the userScriptAction function
if (typeof localStorage != 'undefined') {
    if (typeof jQuery == 'undefined') {
        (function(callback) {
            var script = document.createElement("script");
            script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
            script.addEventListener('load', function() {
                var script = document.createElement("script");
                script.textContent = "(" + callback.toString() + ")();";
                document.body.appendChild(script);
            }, false);
            document.body.appendChild(script);
        })(userScriptAction);
    } else {
        userScriptAction();
    }
}


