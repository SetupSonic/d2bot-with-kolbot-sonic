/**
 *   @filename   AutoStat.js
 *   @author     IMBA
 *   @desc       Automatically allocates stat points
 */

var _0x94c2=['\x70\x75\x73\x68','\x61\x72\x74\x69\x63','\x63\x6f\x77\x6b\x69\x6e\x67','\x61\x6e\x67\x65\x6c\x69\x63','\x63\x69\x76\x65\x72\x62','\x64\x69\x73\x63\x69\x70\x6c\x65','\x69\x73\x65\x6e\x68\x61\x72\x74','\x67\x72\x69\x73\x77\x6f\x6c\x64','\x6d\x61\x76\x69\x6e\x61','\x6f\x72\x70\x68\x61\x6e','\x68\x61\x73\x4f\x77\x6e\x50\x72\x6f\x70\x65\x72\x74\x79','\x76\x69\x64\x61\x6c\x61','\x67\x65\x74\x49\x74\x65\x6d\x73','\x6c\x6f\x63\x61\x74\x69\x6f\x6e','\x66\x6c\x6f\x6f\x72','\x63\x68\x61\x72\x6c\x76\x6c','\x63\x65\x69\x6c','\x75\x73\x65\x53\x74\x61\x74\x73','\x6d\x69\x6e','\x61\x64\x64\x53\x74\x61\x74\x50\x6f\x69\x6e\x74','\x73\x74\x72\x65\x6e\x67\x74\x68','\x73\x74\x72\x69\x6e\x67','\x61\x6c\x6c','\x67\x65\x74\x48\x61\x72\x64\x53\x74\x61\x74\x73','\x65\x6e\x65\x72\x67\x79','\x64\x65\x78\x74\x65\x72\x69\x74\x79','\x62\x6c\x6f\x63\x6b','\x72\x65\x71\x75\x69\x72\x65\x64\x44\x65\x78','\x76\x69\x74\x61\x6c\x69\x74\x79','\x70\x69\x6e\x67','\x67\x65\x74\x42\x6c\x6f\x63\x6b','\x67\x65\x74\x49\x74\x65\x6d','\x69\x6e\x64\x65\x78\x4f\x66','\x62\x6f\x64\x79\x6c\x6f\x63\x61\x74\x69\x6f\x6e','\x69\x74\x65\x6d\x54\x79\x70\x65','\x67\x61\x6d\x65\x74\x79\x70\x65','\x67\x65\x74\x53\x74\x61\x74','\x63\x6c\x61\x73\x73\x69\x64','\x76\x65\x72\x69\x66\x79\x53\x65\x74\x53\x74\x61\x74\x73','\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6f\x6e','\x73\x70\x6c\x69\x74','\x6c\x65\x6e\x67\x74\x68','\x6d\x61\x74\x63\x68','\x72\x65\x70\x6c\x61\x63\x65','\x76\x61\x6c\x69\x64\x49\x74\x65\x6d','\x73\x74\x72\x72\x65\x71','\x64\x65\x78\x72\x65\x71','\x6c\x76\x6c\x72\x65\x71','\x73\x65\x74\x42\x6f\x6e\x75\x73','\x6d\x6f\x64\x65','\x71\x75\x61\x6c\x69\x74\x79','\x69\x72\x61\x74\x68\x61'];(function(_0x42f6d7,_0x2efcc6){var _0xa7c58d=function(_0x16603a){while(--_0x16603a){_0x42f6d7['\x70\x75\x73\x68'](_0x42f6d7['\x73\x68\x69\x66\x74']());}};_0xa7c58d(++_0x2efcc6);}(_0x94c2,0x1f2));var _0x294c=function(_0x1f4fe0,_0x578716){_0x1f4fe0=_0x1f4fe0-0x0;var _0x308b21=_0x94c2[_0x1f4fe0];return _0x308b21;};function AutoStat(_0x22e0f2,_0x53b23b,_0x1faaad,_0x2bcad9){if(_0x53b23b===undefined){_0x53b23b=0x0;}if(_0x1faaad===undefined){_0x1faaad=0x0;}if(_0x2bcad9===undefined){_0x2bcad9=!![];}this[_0x294c('0x0')]=function(){var _0x530fcc=![],_0x5b0980=me[_0x294c('0x1')](-0x1,0x1);if(_0x5b0980){do{if([0x4,0x5][_0x294c('0x2')](_0x5b0980[_0x294c('0x3')])>-0x1&&[0x2,0x33,0x45,0x46]['\x69\x6e\x64\x65\x78\x4f\x66'](_0x5b0980[_0x294c('0x4')])>-0x1){_0x530fcc=!![];}}while(_0x5b0980['\x67\x65\x74\x4e\x65\x78\x74']());}if(!_0x530fcc){return _0x1faaad;}if(me[_0x294c('0x5')]===0x0){return Math['\x66\x6c\x6f\x6f\x72'](me[_0x294c('0x6')](0x14)+getBaseStat(0xf,me[_0x294c('0x7')],0x17));}return Math['\x6d\x69\x6e'](0x4b,Math['\x66\x6c\x6f\x6f\x72']((me['\x67\x65\x74\x53\x74\x61\x74'](0x14)+getBaseStat(0xf,me[_0x294c('0x7')],0x17))*(me[_0x294c('0x6')](0x2)-0xf)/(me['\x63\x68\x61\x72\x6c\x76\x6c']*0x2)));};this[_0x294c('0x8')]=function(_0x5c1af0,_0x22ecff,_0x299eca){var _0x6758b4,_0x27193c,_0x486dab;if(_0x22ecff===0x0){_0x486dab=0xd91;}else{_0x486dab=0xd92;}if(_0x5c1af0){_0x27193c=_0x5c1af0[_0x294c('0x9')][_0x294c('0xa')]('\x0a');for(_0x6758b4=0x0;_0x6758b4<_0x27193c[_0x294c('0xb')];_0x6758b4+=0x1){if(_0x27193c[_0x6758b4][_0x294c('0xc')](getLocaleString(_0x486dab),'\x69')){if(parseInt(_0x27193c[_0x6758b4][_0x294c('0xd')](/(y|ÿ)c[0-9!"+<;.*]/,''),0xa)===_0x299eca){return!![];}}}}return![];};this[_0x294c('0xe')]=function(_0x4ba53e){if(me[_0x294c('0x5')]===0x1&&[0xb,0xc][_0x294c('0x2')](_0x4ba53e[_0x294c('0x3')])>-0x1){return![];}if(!_0x4ba53e['\x73\x74\x72\x72\x65\x71']){_0x4ba53e[_0x294c('0xf')]=0x0;}if(!_0x4ba53e[_0x294c('0x10')]){_0x4ba53e['\x64\x65\x78\x72\x65\x71']=0x0;}return me[_0x294c('0x6')](0x0)>=_0x4ba53e[_0x294c('0xf')]&&me['\x67\x65\x74\x53\x74\x61\x74'](0x2)>=_0x4ba53e[_0x294c('0x10')]&&me['\x63\x68\x61\x72\x6c\x76\x6c']>=_0x4ba53e[_0x294c('0x11')];};this[_0x294c('0x12')]=function(_0xedf124){if(_0xedf124===0x1||_0xedf124===0x3){return 0x0;}var _0x4aa9a0={'\x61\x6e\x67\x65\x6c\x69\x63':[],'\x61\x72\x74\x69\x63':[],'\x63\x69\x76\x65\x72\x62':[],'\x69\x72\x61\x74\x68\x61':[],'\x69\x73\x65\x6e\x68\x61\x72\x74':[],'\x76\x69\x64\x61\x6c\x61':[],'\x63\x6f\x77\x6b\x69\x6e\x67':[],'\x64\x69\x73\x63\x69\x70\x6c\x65':[],'\x67\x72\x69\x73\x77\x6f\x6c\x64':[],'\x6d\x61\x76\x69\x6e\x61':[],'\x6e\x61\x6a':[],'\x6f\x72\x70\x68\x61\x6e':[]};var _0x166d28,_0x1f9000,_0x3efafe=0x0,_0x27f8bc=me['\x67\x65\x74\x49\x74\x65\x6d\x73']();if(_0x27f8bc){for(_0x166d28=0x0;_0x166d28<_0x27f8bc[_0x294c('0xb')];_0x166d28+=0x1){if(_0x27f8bc[_0x166d28][_0x294c('0x13')]===0x1&&_0x27f8bc[_0x166d28][_0x294c('0x14')]===0x5&&this[_0x294c('0xe')](_0x27f8bc[_0x166d28])){_0x220fd7:switch(_0x27f8bc[_0x166d28][_0x294c('0x7')]){case 0x137:if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x29)===0x1e){_0x4aa9a0[_0x294c('0x15')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}break;case 0x151:if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x7)===0x14){_0x4aa9a0[_0x294c('0x17')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}else if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x2b)===0x1e){_0x4aa9a0[_0x294c('0x15')]['\x70\x75\x73\x68'](_0x27f8bc[_0x166d28]);}break;case 0x154:if(_0x27f8bc[_0x166d28]['\x67\x65\x74\x53\x74\x61\x74'](0x2)===0x14){_0x4aa9a0[_0x294c('0x18')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}break;case 0x15b:if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x15)===0x5){_0x4aa9a0['\x69\x72\x61\x74\x68\x61'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}break;case 0x208:if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x72)===0x14){_0x4aa9a0[_0x294c('0x19')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}else if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x4a)===0x4){_0x4aa9a0[_0x294c('0x1a')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}else if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x6e)===0x4b){_0x4aa9a0['\x69\x72\x61\x74\x68\x61'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}else if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x2b)===0x14){_0x4aa9a0['\x76\x69\x64\x61\x6c\x61'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}else if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x2b)===0x12){_0x4aa9a0[_0x294c('0x1b')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}break;case 0x20a:if(_0x27f8bc[_0x166d28][_0x294c('0x6')](0x4a)===0x6){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x294c('0x19')]['\x6c\x65\x6e\x67\x74\x68'];_0x1f9000+=0x1){if(_0x4aa9a0['\x61\x6e\x67\x65\x6c\x69\x63'][_0x1f9000]['\x63\x6c\x61\x73\x73\x69\x64']===_0x27f8bc[_0x166d28][_0x294c('0x7')]){break _0x220fd7;}}_0x4aa9a0[_0x294c('0x19')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);}break;case 0x1b:for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x294c('0x19')]['\x6c\x65\x6e\x67\x74\x68'];_0x1f9000+=0x1){if(_0x4aa9a0[_0x294c('0x19')][_0x1f9000][_0x294c('0x7')]===_0x27f8bc[_0x166d28][_0x294c('0x7')]){break _0x220fd7;}}_0x4aa9a0[_0x294c('0x19')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x13d:_0x4aa9a0['\x61\x6e\x67\x65\x6c\x69\x63'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x4a:case 0x139:case 0x159:_0x4aa9a0['\x61\x72\x74\x69\x63'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x10:for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x294c('0x1a')][_0x294c('0xb')];_0x1f9000+=0x1){if(_0x4aa9a0['\x63\x69\x76\x65\x72\x62'][_0x1f9000][_0x294c('0x7')]===_0x27f8bc[_0x166d28][_0x294c('0x7')]){break _0x220fd7;}}_0x4aa9a0['\x63\x69\x76\x65\x72\x62'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x14a:_0x4aa9a0[_0x294c('0x1a')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x1e:for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0['\x69\x73\x65\x6e\x68\x61\x72\x74'][_0x294c('0xb')];_0x1f9000+=0x1){if(_0x4aa9a0['\x69\x73\x65\x6e\x68\x61\x72\x74'][_0x1f9000][_0x294c('0x7')]===_0x27f8bc[_0x166d28][_0x294c('0x7')]){break _0x220fd7;}}_0x4aa9a0[_0x294c('0x1c')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x135:case 0x140:case 0x14d:_0x4aa9a0[_0x294c('0x1c')]['\x70\x75\x73\x68'](_0x27f8bc[_0x166d28]);break;case 0x49:case 0x13a:case 0x156:_0x4aa9a0['\x76\x69\x64\x61\x6c\x61']['\x70\x75\x73\x68'](_0x27f8bc[_0x166d28]);break;case 0x13c:case 0x160:_0x4aa9a0[_0x294c('0x18')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x181:case 0x1ad:case 0x1c2:case 0x1ce:_0x4aa9a0['\x64\x69\x73\x63\x69\x70\x6c\x65'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0xd5:for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0['\x67\x72\x69\x73\x77\x6f\x6c\x64'][_0x294c('0xb')];_0x1f9000+=0x1){if(_0x4aa9a0[_0x294c('0x1d')][_0x1f9000][_0x294c('0x7')]===_0x27f8bc[_0x166d28]['\x63\x6c\x61\x73\x73\x69\x64']){break _0x220fd7;}}_0x4aa9a0['\x67\x72\x69\x73\x77\x6f\x6c\x64'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x174:case 0x1ab:case 0x1f6:_0x4aa9a0[_0x294c('0x1d')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x12e:case 0x17f:case 0x187:case 0x1a5:case 0x1b7:_0x4aa9a0[_0x294c('0x1e')]['\x70\x75\x73\x68'](_0x27f8bc[_0x166d28]);break;case 0x105:case 0x1a2:case 0x1b6:_0x4aa9a0['\x6e\x61\x6a'][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;case 0x164:case 0x177:case 0x17d:case 0x189:_0x4aa9a0[_0x294c('0x1f')][_0x294c('0x16')](_0x27f8bc[_0x166d28]);break;}}}}for(_0x166d28 in _0x4aa9a0){if(_0x4aa9a0[_0x294c('0x20')](_0x166d28)){_0x5469c8:switch(_0x166d28){case'\x61\x6e\x67\x65\x6c\x69\x63':if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]>=0x2&&_0xedf124===0x2){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xa)){break _0x5469c8;}}_0x3efafe+=0xa;}break;case _0x294c('0x17'):if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]>=0x2&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0x5)){break _0x5469c8;}}_0x3efafe+=0x5;}break;case _0x294c('0x1a'):if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]===0x3&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xf)){break _0x5469c8;}}_0x3efafe+=0xf;}break;case _0x294c('0x15'):if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]===0x4&&_0xedf124===0x2){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xf)){break _0x5469c8;}}_0x3efafe+=0xf;}break;case _0x294c('0x1c'):if(_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68']>=0x2&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xa)){break _0x5469c8;}}_0x3efafe+=0xa;}if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]>=0x3&&_0xedf124===0x2){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xa)){break _0x5469c8;}}_0x3efafe+=0xa;}break;case _0x294c('0x21'):if(_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68']>=0x3&&_0xedf124===0x2){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xf)){break _0x5469c8;}}_0x3efafe+=0xf;}if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]===0x4&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xa)){break _0x5469c8;}}_0x3efafe+=0xa;}break;case'\x63\x6f\x77\x6b\x69\x6e\x67':if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]===0x3&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0x14)){break _0x5469c8;}}_0x3efafe+=0x14;}break;case _0x294c('0x1b'):if(_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68']>=0x4&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xa)){break _0x5469c8;}}_0x3efafe+=0xa;}break;case _0x294c('0x1d'):if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]>=0x2&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68'];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0x14)){break _0x5469c8;}}_0x3efafe+=0x14;}if(_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68']>=0x3&&_0xedf124===0x2){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0x1e)){break _0x5469c8;}}_0x3efafe+=0x1e;}break;case _0x294c('0x1e'):if(_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68']>=0x2&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68'];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0x14)){break _0x5469c8;}}_0x3efafe+=0x14;}if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]>=0x3&&_0xedf124===0x2){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0x1e)){break _0x5469c8;}}_0x3efafe+=0x1e;}break;case'\x6e\x61\x6a':if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]===0x3&&_0xedf124===0x2){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xf)){break _0x5469c8;}}_0x3efafe+=0xf;}if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]===0x3&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28][_0x294c('0xb')];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0x14)){break _0x5469c8;}}_0x3efafe+=0x14;}break;case _0x294c('0x1f'):if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]===0x4&&_0xedf124===0x2){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68'];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0xa)){break _0x5469c8;}}_0x3efafe+=0xa;}if(_0x4aa9a0[_0x166d28][_0x294c('0xb')]===0x4&&_0xedf124===0x0){for(_0x1f9000=0x0;_0x1f9000<_0x4aa9a0[_0x166d28]['\x6c\x65\x6e\x67\x74\x68'];_0x1f9000+=0x1){if(!this[_0x294c('0x8')](_0x4aa9a0[_0x166d28][_0x1f9000],_0xedf124,0x14)){break _0x5469c8;}}_0x3efafe+=0x14;}break;}}}return _0x3efafe;};this['\x67\x65\x74\x48\x61\x72\x64\x53\x74\x61\x74\x73']=function(_0x305b90){var _0x33735f,_0x247ae2,_0x22d6a9=0x0,_0x160bb7=me[_0x294c('0x22')]();switch(_0x305b90){case 0x0:_0x305b90=0x0;_0x247ae2=0xdc;break;case 0x1:_0x305b90=0x1;_0x247ae2=0xde;break;case 0x2:_0x305b90=0x2;_0x247ae2=0xdd;break;case 0x3:_0x305b90=0x3;_0x247ae2=0xdf;break;}if(_0x160bb7){for(_0x33735f=0x0;_0x33735f<_0x160bb7[_0x294c('0xb')];_0x33735f+=0x1){if((_0x160bb7[_0x33735f]['\x6d\x6f\x64\x65']===0x1||_0x160bb7[_0x33735f][_0x294c('0x23')]===0x3&&[0x52,0x53,0x54][_0x294c('0x2')](_0x160bb7[_0x33735f][_0x294c('0x4')])>-0x1)&&this[_0x294c('0xe')](_0x160bb7[_0x33735f])){if(_0x160bb7[_0x33735f]['\x67\x65\x74\x53\x74\x61\x74'](_0x305b90)){_0x22d6a9+=_0x160bb7[_0x33735f]['\x67\x65\x74\x53\x74\x61\x74'](_0x305b90);}if(_0x160bb7[_0x33735f][_0x294c('0x6')](_0x247ae2)){_0x22d6a9+=Math[_0x294c('0x24')](_0x160bb7[_0x33735f][_0x294c('0x6')](_0x247ae2)/0x8*me[_0x294c('0x25')]);}}}}return me[_0x294c('0x6')](_0x305b90)-_0x22d6a9-this[_0x294c('0x12')](_0x305b90);};this['\x72\x65\x71\x75\x69\x72\x65\x64\x44\x65\x78']=function(){var _0x2ac130,_0x4e6bfd=![],_0x306477=0x0,_0x3d0aed=me[_0x294c('0x22')]();if(_0x3d0aed){for(_0x2ac130=0x0;_0x2ac130<_0x3d0aed[_0x294c('0xb')];_0x2ac130+=0x1){if(_0x3d0aed[_0x2ac130][_0x294c('0x13')]===0x1&&[0xb,0xc][_0x294c('0x2')](_0x3d0aed[_0x2ac130][_0x294c('0x3')])===-0x1&&!this[_0x294c('0xe')](_0x3d0aed[_0x2ac130])){if(_0x3d0aed[_0x2ac130]['\x71\x75\x61\x6c\x69\x74\x79']===0x5){_0x4e6bfd=!![];break;}if(_0x3d0aed[_0x2ac130][_0x294c('0x6')](0x2)){_0x306477+=_0x3d0aed[_0x2ac130][_0x294c('0x6')](0x2);}if(_0x3d0aed[_0x2ac130]['\x67\x65\x74\x53\x74\x61\x74'](0xdd)){_0x306477+=Math[_0x294c('0x24')](_0x3d0aed[_0x2ac130][_0x294c('0x6')](0xdd)/0x8*me[_0x294c('0x25')]);}}}}if(_0x4e6bfd){return 0x1;}return Math[_0x294c('0x26')](0x2*me[_0x294c('0x25')]*_0x1faaad/(me[_0x294c('0x6')](0x14)+getBaseStat(0xf,me[_0x294c('0x7')],0x17))+0xf)-me[_0x294c('0x6')](0x2)-_0x306477;};this[_0x294c('0x27')]=function(_0x29a8f4,_0x12fa0b){var _0x31b8f4=me[_0x294c('0x6')](0x4),_0x13ecda=getTickCount();if(_0x12fa0b===undefined){_0x12fa0b=![];}if(_0x2bcad9){if(_0x12fa0b){sendPacket(0x1,0x3a,0x1,_0x29a8f4,0x1,Math[_0x294c('0x28')](me[_0x294c('0x6')](0x4)-_0x53b23b-0x1,_0x12fa0b-0x1,0x63));}else{sendPacket(0x1,0x3a,0x1,_0x29a8f4,0x1,Math[_0x294c('0x28')](me[_0x294c('0x6')](0x4)-_0x53b23b-0x1,0x63));}}else{useStatPoint(_0x29a8f4);}while(getTickCount()-_0x13ecda<0xbb8){if(_0x31b8f4>me[_0x294c('0x6')](0x4)){return!![];}delay(0x64);}return![];};this[_0x294c('0x29')]=function(){var _0x8d25c1,_0x2c5beb;for(_0x8d25c1=0x0;_0x8d25c1<_0x22e0f2[_0x294c('0xb')];_0x8d25c1+=0x1){switch(_0x22e0f2[_0x8d25c1][0x0]){case 0x0:case _0x294c('0x2a'):if(typeof _0x22e0f2[_0x8d25c1][0x1]===_0x294c('0x2b')){switch(_0x22e0f2[_0x8d25c1][0x1]){case _0x294c('0x2c'):return this[_0x294c('0x27')](0x0);default:break;}}else{_0x2c5beb=this[_0x294c('0x2d')](0x0);if(_0x2c5beb<_0x22e0f2[_0x8d25c1][0x1]){return this[_0x294c('0x27')](0x0,_0x22e0f2[_0x8d25c1][0x1]-_0x2c5beb);}}break;case 0x1:case _0x294c('0x2e'):if(typeof _0x22e0f2[_0x8d25c1][0x1]===_0x294c('0x2b')){switch(_0x22e0f2[_0x8d25c1][0x1]){case _0x294c('0x2c'):return this[_0x294c('0x27')](0x1);default:break;}}else{_0x2c5beb=this[_0x294c('0x2d')](0x1);if(_0x2c5beb<_0x22e0f2[_0x8d25c1][0x1]){return this[_0x294c('0x27')](0x1,_0x22e0f2[_0x8d25c1][0x1]-_0x2c5beb);}}break;case 0x2:case _0x294c('0x2f'):if(typeof _0x22e0f2[_0x8d25c1][0x1]===_0x294c('0x2b')){switch(_0x22e0f2[_0x8d25c1][0x1]){case _0x294c('0x30'):if(me[_0x294c('0x5')]===0x1){if(this['\x67\x65\x74\x42\x6c\x6f\x63\x6b']()<_0x1faaad){return this[_0x294c('0x27')](0x2,this[_0x294c('0x31')]());}}break;case _0x294c('0x2c'):return this[_0x294c('0x27')](0x2);default:break;}}else{_0x2c5beb=this[_0x294c('0x2d')](0x2);if(_0x2c5beb<_0x22e0f2[_0x8d25c1][0x1]){return this[_0x294c('0x27')](0x2,_0x22e0f2[_0x8d25c1][0x1]-_0x2c5beb);}}break;case 0x3:case _0x294c('0x32'):if(typeof _0x22e0f2[_0x8d25c1][0x1]===_0x294c('0x2b')){switch(_0x22e0f2[_0x8d25c1][0x1]){case'\x61\x6c\x6c':return this[_0x294c('0x27')](0x3);default:break;}}else{_0x2c5beb=this[_0x294c('0x2d')](0x3);if(_0x2c5beb<_0x22e0f2[_0x8d25c1][0x1]){return this[_0x294c('0x27')](0x3,_0x22e0f2[_0x8d25c1][0x1]-_0x2c5beb);}}break;}}return![];};while(me[_0x294c('0x6')](0x4)>_0x53b23b){this[_0x294c('0x29')]();delay(0x96+me[_0x294c('0x33')]);}return!![];}