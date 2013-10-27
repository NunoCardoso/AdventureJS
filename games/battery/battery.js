/*global define */

define([
], function () {
    return {
        'images': [
        /* backgrounds */
            {
                'id'  : 'image.battery',
                'src' : 'games/battery/images/backgrounds/game.png'
            },
            {
                'id'  : 'image.classroom',
                'src' : 'games/battery/images/backgrounds/background.png'
            },
            {
                'id'  : 'image.classroom.path',
                'src' : 'games/battery/images/backgrounds/background.path.png'
            },
        /* static objects */
            {
                'id'  : 'image.lefttable',
                'src' : 'games/battery/images/objects/left-table.png'
            },
            {
                'id'  : 'image.middletable',
                'src' : 'games/battery/images/objects/middle-table.png'
            },
            {
                'id'  : 'image.righttable',
                'src' : 'games/battery/images/objects/right-table.png'
            },
            {
                'id'  : 'image.hotte',
                'src' : 'games/battery/images/objects/hotte.png'
            },
            {
                "id"  : "image.1x1",
                "src" : "games/aroundtheworld/img/object/1x1.png"
            },
        /* dynamic objects */
            {
                'id'  : 'image.labcoat',
                'src' : 'games/battery/images/objects/labcoat.png'
            },
            {
                'id'  : 'image.goggles',
                'src' : 'games/battery/images/objects/goggles.png'
            },
            {
                'id'  : 'image.lamptable',
                'src' : 'games/battery/images/objects/lampred.png'
            },
            {
                'id'  : 'image.lamp',
                'src' : 'games/battery/images/objects/lamp.png'
            },
            {
                "id"  : "image.wire",
                "src" : "games/battery/images/objects/wire.png"
            },
            {
                'id'  : 'image.sulphuricacid',
                'src' : 'games/battery/images/objects/sulphuricacid.png'
            },
        /* inventory */
            {
                'id'  : 'image.inventory.labcoat',
                'src' : 'games/battery/images/objects/labcoat-inventory.png'
            },
            {
                'id'  : 'image.inventory.goggle',
                'src' : 'games/battery/images/objects/goggles-inventory.png'
            },
            {
                'id'  : 'image.inventory.coin',
                'src' : 'games/battery/images/objects/coin-inventory.png'
            },
            {
                'id'  : 'image.inventory.lamp',
                'src' : 'games/battery/images/objects/lamp-inventory.png'
            },
            {
                'id'  : 'image.inventory.wire',
                'src' : 'games/battery/images/objects/wire-inventory.png'
            },
            {
                'id'  : 'image.inventory.essaywithclip',
                'src' : 'games/battery/images/objects/essaywithclip-inventory.png'
            },
            {
                'id'  : 'image.inventory.essay',
                'src' : 'games/battery/images/objects/essay-inventory.png'
            },
            {
                'id'  : 'image.inventory.clip',
                'src' : 'games/battery/images/objects/clip-inventory.png'
            },
            {
                'id'  : 'image.inventory.lemon',
                'src' : 'games/battery/images/objects/lemon-inventory.png'
            },
            {
                'id'  : 'image.inventory.lemonwithcoin',
                'src' : 'games/battery/images/objects/lemonwithcoin-inventory.png'
            },
            {
                'id'  : 'image.inventory.lemonwithclip',
                'src' : 'games/battery/images/objects/lemonwithclip-inventory.png'
            },
            {
                'id'  : 'image.inventory.lemonwithcoinandclip',
                'src' : 'games/battery/images/objects/lemonwithcoinandclip-inventory.png'
            },
            {
                'id'  : 'image.inventory.lemonwithcoinandclipandwire',
                'src' : 'games/battery/images/objects/lemonwithcoinandclipandwire-inventory.png'
            },
            {
                'id'  : 'image.inventory.sulphuricacid',
                'src' : 'games/battery/images/objects/sulphuricacid-inventory.png'
            }
        ],
        "sounds" : [],
        "musics" : [
            {
                "id"  : "music.intro",
                "src" : "games/aroundtheworld/msc/game-scene01.wav"
            },
            {
                "id"  : "music.classroom",
                "src" : "games/aroundtheworld/msc/chinese_juggler.mp3"
            }
        ],
        "pc" : {
            "id"    : "pc.battery.main",
            "label" : "you"
        },
        "npcs" : [
            {
                "id"    : "npc.fatkid",
                "label" : "fat kid"
            },
            {
                "id"    : "npc.nerdygirl",
                "label" : "nerdy girl"
            },
            {
                "id"    : "npc.teacher",
                "label" : "teacher"
            }
        ],
        "main": {
            "title"         : "",
            "author"        : "John Teacher",
            "description"   : "Do you really know the chemistry lessons about batteries? it is time to prove that.",
            "background"    : "image.battery",
            "startingScene" : "scene.classroom",
            "music"         : "music.intro"
        },
        "panel" : {
            "startingInventory" : [
                'object.coin',
                'object.essaywithclip'
            ],
            "verbs" : [
                {"first": "Give",    "nr" : 2, "second": "to"},
                {"first": "Use",     "nr" : 2, "second": "with"},
                {"first": "Pick up", "nr" : 1},
                {"first": "Open",    "nr" : 1},
                {"first": "Wear",    "nr" : 1},
                {"first": "Look at", "nr" : 1},
                {"first": "Close",   "nr" : 1},
                {"first": "Dismantle", "nr" : 1},
                {"first": "Talk to", "nr" : 1}
            ]
        },
        "objects": [
            {
                "id": "object.lefttable",
                "label": "table",
                "imageInStage" : "image.lefttable",
                "onForeground" : true
            },
            {
                "id": "object.middletable",
                "label": "table",
                "imageInStage" : "image.middletable",
                "onForeground" : true
            },
            {
                "id": "object.righttable",
                "label": "table",
                "imageInStage" : "image.righttable",
                "onForeground" : true
            },
            {
                "id": "object.formula",
                "label": "formula",
                "imageInStage" : "image.1x1",
                "onForeground" : false
            },
            {
                "id": "object.periodictable",
                "label": "periodic table",
                "imageInStage" : "image.1x1",
                "onForeground" : false
            },
            {
                "id": "object.lemon",
                "label": "lemon",
                "imageInStage" : "image.1x1",
                "imageInInventory" : "image.1x1",
                "onForeground" : false
            },
            {
                "id": "object.coin",
                "label": "coin",
                "imageInInventory" : "image.inventory.coin"
            },
            {
                "id": "object.essay",
                "label": "essay",
                "imageInInventory" : "image.inventory.essay"
            },
            {
                "id": "object.essaywithclip",
                "label": "essay with clip",
                "imageInInventory" : "image.inventory.essaywithclip"
            },
            {
                "id": "object.hotte",
                "label": "fume hood",
                "imageInStage" : "image.hotte",
                "onForeground" : false
            },
            {
                "id": "object.goggles",
                "label": "goggles",
                "imageInStage" : "image.goggles",
                "imageInInventory" : "image.inventory.goggles",
                "onForeground" : false
            },
            {
                "id": "object.labcoat",
                "label": "lab coat",
                "imageInStage" : "image.labcoat",
                "imageInInventory" : "image.inventory.labcoat",
                "onForeground" : false
            },
            {
                "id": "object.lamptable",
                "label": "table lamp",
                "imageInStage" : "image.lamptable",
                "onForeground" : true
            },
            {
                "id": "object.lamp",
                "label": "lamp",
                "imageInStage" : "image.lamp",
                "imageInInventory" : "image.inventory.lamp",
                "onForeground" : true
            },
            {
                "id": "object.lemonwithclip",
                "label": "lemon with clip",
                "imageInInventory" : "image.inventory.lemonwithclip"
            },
            {
                "id": "object.lemonwithcoin",
                "label": "lemon with coin",
                "imageInInventory" : "image.inventory.lemonwithcoin"
            },
            {
                "id": "object.lemonwithcoinandclip",
                "label": "lemon with coin and clip",
                "imageInInventory" : "image.inventory.lemonwithcoinandclip"
            },
            {
                "id": "object.lemonwithcoinandclipandwire",
                "label": "lemon with coin, clip and wire",
                "imageInInventory" : "image.inventory.lemonwithcoinandclipandwire"
            },
            {
                "id": "object.paperclip",
                "label": "paperclip",
                "imageInInventory" : "image.inventory.paperclip"
            },
            {
                "id": "object.sulphuricacid",
                "label": "sulphuric acid",
                "imageInStage" : "image.sulphuricacid",
                "imageInInventory" : "image.inventory.sulphuricacid",
                "onForeground" : false
            },
            {
                "id": "object.wire",
                "label": "wire",
                "imageInStage" : "image.wire",
                "imageInInventory" : "image.inventory.wire",
                "onForeground" : true
            }
        ],
        "interactions": [
        /* talk to */
            {
                "id" : "interaction.talkToFatKid",
                "verb" : "Talk to",
                "first" : {
                    "item" : "npc.fatkid"
                },
                "actions" : [
                    {
                        "action": "playDialog",
                        "dialog": "dialog.talkToFatKid"
                    }
                ]
            },
            {
                "id" : "interaction.talkToNerdyGirl",
                "verb" : "Talk to",
                "first" : {
                    "item" : "npc.nerdygirl"
                },
                "actions" : [
                    {
                        "action": "playDialog",
                        "dialog": "dialog.talkToNerdyGirl"
                    }
                ]
            },
            {
                "id" : "interaction.talkToTeacher",
                "verb" : "Talk to",
                "first" : {
                    "item" : "npc.teacher"
                },
                "actions" : [
                    {
                        "action": "playDialog",
                        "dialog": "dialog.talkToTeacher"
                    }
                ]
            },

        /* look at */
            {
                "id" : "interaction.lookAtFormula",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.formula"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "I know who wrote that! It was..."
                    },
                    {
                        "action": "prompt",
                        "text"  : "Who wrote it?",
                        "variable" : "formulaAuthor"
                    },
                    {
                        "action": "publishAchievement",
                        "achievement" : "achievement.formula"
                    }
                ]
            },
            {
                "id" : "interaction.lookAtTable1",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lefttable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "This is my classroom table."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtTable2",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.middletable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "This is that nerdy girl's table."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtTable3",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.righttable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "This is that fat kid's table."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtPeriodicTable",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.periodictable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "A periodic table. Cool."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtlemon",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lemon",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "There is a lemontree outside with lemons."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtlemon",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lemon",
                    "inInventory" : true
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "It's a lemon, and it is mine now."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtCoin",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.coin",
                    "inInventory" : true
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "My lunch money - a zinc coin"
                    }
                ]
            },
            {
                "id" : "interaction.lookAtEssayWithClip",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.essaywithclip",
                    "inInventory" : true
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Today's essay - build a battery. And a paper clip."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtEssay",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.essay",
                    "inInventory" : true
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Today's essay - build a battery."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtHotte",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.hotte"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "The classroom's fume hood. The vent is on."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtGoggles",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.goggles"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Safety goggles. Always use them with acids. Plus, I look nice with them."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtLabcoat",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.labcoat"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "A lab coat. Reminds me of hospitals."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtlamptable",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lamptable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "My lamp table. It's not connected."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtlamp",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lamp"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "It's a lamp. Hope it's not broken."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtlemonwithclip",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lemonwithclip"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "The lemon with a paperclip as cathode."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtlemonwithcoin",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lemonwithcoin"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "The lemon with a coin as anode."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtlemonwithcoinandclip",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lemonwithcoinandclip"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "The lemon with a coin as anode, and a clip as cathode."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtlemonwithcoinandclipandwire",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.lemonwithcoinandclipandwire"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "The lemon with a coin as anode, clip as cathode, and electric wires."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtpaperclip",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.paperclip"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "A metal paper clip."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtsulphuricacid",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.sulphuricacid"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "H2SO4. Sulphuric Acid. Cool."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtWire",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.wire",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "The lamp's wire. It is loose."
                    }
                ]
            },
            {
                "id" : "interaction.lookAtWire",
                "verb" : "Look at",
                "first" : {
                    "item" : "object.wire",
                    "inInventory" : true
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "An electric wire."
                    }
                ]
            },
        /* pick up */
            {
                "id" : "interaction.pickuplefttable",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.lefttable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "I can't put a table in my pocket."
                    }
                ]
            },
            {
                "id" : "interaction.pickupmiddletable",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.middletable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "I can't put a table in my pocket."
                    }
                ]
            },
            {
                "id" : "interaction.pickuprighttable",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.righttable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "I can't put a table in my pocket."
                    }
                ]
            },
            {
                "id" : "interaction.pickupperiodictable",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.periodictable"
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Nah. I have better posters in my room."
                    }
                ]
            },
            {
                "id" : "interaction.pickuplemon",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.lemon",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action" : "fromSceneToInventory",
                        "object" : "object.lemon"
                    },
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Yay, a lemon. Now I can have lunch."
                    }
                ]
            },
            {
                "id" : "interaction.pickupgoggles",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.goggles",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action" : "fromSceneToInventory",
                        "object" : "object.goggles"
                    },
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Yay, goggles!"
                    },
                    {
                        "action": "publishAchievement",
                        "achievement": "achievement.gotgoggles"
                    }
                ]
            },
            {
                "id" : "interaction.pickuphotte",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.hotte",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "No thanks. I don't need that."
                    }
                ]
            },
            {
                "id" : "interaction.pickuplabcoat",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.labcoat",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action" : "fromSceneToInventory",
                        "object" : "object.labcoat"
                    },
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Time to do some science!"
                    },
                    {
                        "action": "publishAchievement",
                        "achievement": "achievement.gotlabcoat"
                    }
                ]
            },
            {
                "id" : "interaction.pickuptablelamp",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.tablelamp",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "No way. It is broken!"
                    }
                ]
            },
            {
                "id" : "interaction.pickuplamp",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.lamp",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action" : "fromSceneToInventory",
                        "object" : "object.lamp"
                    },
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Need something to test electric current."
                    }
                ]
            },
            {
                "id" : "interaction.pickupsulphuricacid",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.sulphuricacid",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action" : "fromSceneToInventory",
                        "object" : "object.sulphuricacid"
                    },
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Careful, this is dangerous stuff."
                    }
                ]
            },
            {
                "id" : "interaction.pickupwire",
                "verb" : "Pick up",
                "first" : {
                    "item" : "object.wire",
                    "inInventory" : false
                },
                "actions" : [
                    {
                        "action" : "fromSceneToInventory",
                        "object" : "object.wire"
                    },
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "An electric wire, and now it's mine."
                    }
                ]
            },
        /* wear */
            {
                "id" : "interaction.weargoggles",
                "verb" : "Wear",
                "first" : {
                    "item" : "object.goggles"
                },
                "actions" : [
                    {
                        "action" : "addCharacterSalt",
                        "salt"   : "goggles"
                    },
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Mode goggles activated."
                    },
                    {
                        "action": "publishAchievement",
                        "achievement": "achievement.wearinggoggles"
                    }
                ]
            },
            {
                "id" : "interaction.wearlabcoat",
                "verb" : "Wear",
                "first" : {
                    "item" : "object.labcoat"
                },
                "actions" : [
                    {
                        "action" : "addCharacterSalt",
                        "salt"   : "labcoat"
                    },
                    {
                        "action": "dialogMessage",
                        "character": "pc.battery.main",
                        "text" : "Doctor mode activated."
                    },
                    {
                        "action": "publishAchievement",
                        "achievement": "achievement.wearinglabcoat"
                    }
                ]
            }
        ],

        "scenes": [
            {
                "id"                 : "scene.classroom",
                "background"         : "image.classroom",
                "backgroundpath"     : "image.classroom.path",
                "backgroundmode"     : "fit",
                "description"        : "Come on, this is easy. Just do what the teacher challlenged you to do.",
                "interactable"       : true,
                "music"              : "music.classroom",
                "npcs" : [
                    {
                        "id" : "npc.fatkid",
                        "position" : {
                            "x"    : 475,
                            "y"    : 370
                        }
                    },
                    {
                        "id" : "npc.nerdygirl",
                        "position" : {
                            "x"    : 300,
                            "y"    : 370
                        }
                    },
                    {
                        "id" : "npc.teacher",
                        "position" : {
                            "x"    : 600,
                            "y"    : 280
                        }
                    }
                ],
                "objects" : [
                    {
                        "id" : "object.lefttable",
                        "x"  : 136,
                        "y"  : 272,
                        "w"  : 113,
                        "h"  : 103
                    },
                    {
                        "id" : "object.middletable",
                        "x"  : 308,
                        "y"  : 266,
                        "w"  : 112,
                        "h"  : 109
                    },
                    {
                        "id" : "object.righttable",
                        "x"  : 480,
                        "y"  : 272,
                        "w"  : 113,
                        "h"  : 103
                    },
                    {
                        "id" : "object.periodictable",
                        "x"  : 205,
                        "y"  : 35,
                        "w"  : 195,
                        "h"  : 105
                    },
                    {
                        "id" : "object.formula",
                        "x"  : 730,
                        "y"  : 190,
                        "w"  : 50,
                        "h"  : 50
                    },
                    {
                        "id" : "object.lemon",
                        "x"  : 503,
                        "y"  : 185,
                        "w"  : 20,
                        "h"  : 20
                    },
                    {
                        "id" : "object.hotte",
                        "x"  : 67,
                        "y"  : 0,
                        "w"  : 112,
                        "h"  : 249
                    },
                    {
                        "id" : "object.labcoat",
                        "x"  : 0,
                        "y"  : 220,
                        "w"  : 70,
                        "h"  : 100
                    },
                    {
                        "id" : "object.goggles",
                        "x"  : 420,
                        "y"  : 110,
                        "w"  : 30,
                        "h"  : 30
                    },
                    {
                        "id" : "object.lamptable",
                        "x"  : 180,
                        "y"  : 220,
                        "w"  : 70,
                        "h"  : 70
                    },
                    {
                        "id" : "object.lamp",
                        "x"  : 220,
                        "y"  : 236,
                        "w"  : 30,
                        "h"  : 20
                    },
                    {
                        "id" : "object.sulphuricacid",
                        "x"  : 400,
                        "y"  : 142,
                        "w"  : 70,
                        "h"  : 70
                    },
                    {
                        "id" : "object.wire",
                        "x"  : 200,
                        "y"  : 270,
                        "w"  : 30,
                        "h"  : 50
                    }
                ],
                "exits" : [
                    {
                        "id" : "exit.classroom",
                        "label" : "begin",
                        "role" : "begin",
                        "x" : 50,
                        "y" : 170,
                        "w" : 100,
                        "h" : 200
                    }
                ],
                "conditions" : []
            }
        ],
        "flags" : {
            "formulaAuthor" : false
        },
        "conditions" : [],
        "dialogoptions" : [
            {
                "id"      : "dialogoption.withFatKid",
                "choices" : [
                    {
                        "text"        : "Hi. What are you listening to?",
                        "dialog"      : "dialog.withFatKidListening",
                        "persistence" : "once"
                    },
                    {
                        "text"        : "Bye.",
                        "dialog"      : "dialog.withFatKidBye",
                        "persistence" : "always"
                    }
                ]
            },
            {
                "id"      : "dialogoption.withNerdyGirl",
                "choices" : [
                    {
                        "text"        : "Hi. What are you doing?",
                        "dialog"      : "dialog.withNerdyGirlDoing",
                        "persistence" : "once"
                    },
                    {
                        "text"        : "Bye.",
                        "dialog"      : "dialog.withNerdyGirlBye",
                        "persistence" : "always"
                    }
                ]
            },
            {
                "id"      : "dialogoption.withTeacher",
                "choices" : [
                    {
                        "text"        : "Er... started what?",
                        "dialog"      : "dialog.withTeacherStarted",
                        "persistence" : "once"
                    },
                    {
                        "text"        : "Bye.",
                        "dialog"      : "dialog.withTeacherBye",
                        "persistence" : "always"
                    }
                ]
            }
        ],
        "dialogs" : [
            {
                "id"    : "dialog.talkToFatKid",
                "to"    : "npc.fatkid",
                "lines" : [
                    {
                        "character" : "npc.fatkid",
                        "text"      : "Hey dude, wasup?"
                    }
                ],
                "onEnd" : [
                    {
                        "action"        : "startDialogOptions",
                        "dialogOptions" : "dialogoption.withFatKid"
                    }
                ]
            },
            {
                "id"    : "dialog.withFatKidListening",
                "to"    : "npc.fatkid",
                "lines" : [
                    {
                        "character" : "pc.battery.main",
                        "text"      : "What are you listening to?"
                    },
                    {
                        "character" : "npc.fatkid",
                        "text"      : "Celine Dion. She rocks!"
                    }
                ],
                "onEnd" : [
                    {
                        "action"        : "continueDialogOptions",
                        "dialogOptions" : "dialogoption.withFatKid"
                    }
                ]
            },
            {
                "id"    : "dialog.withFatKidBye",
                "to"    : "npc.fatkid",
                "lines" : [
                    {
                        "character" : "pc.battery.main",
                        "text"      : "Bye, see you later."
                    },
                    {
                        "character" : "npc.fatkid",
                        "text"      : "Later, bro."
                    }
                ],
                "onEnd" : [
                    {
                        "action"    : "endDialog",
                        "character" : "npc.fatkid"
                    }
                ]
            },
            {
                "id"    : "dialog.talkToNerdyGirl",
                "to"    : "npc.nerdygirl",
                "lines" : [
                    {
                        "character" : "npc.nerdygirl",
                        "text"      : "What do you want? I'm busy!"
                    }
                ],
                "onEnd" : [
                    {
                        "action"        : "startDialogOptions",
                        "dialogOptions" : "dialogoption.withNerdyGirl"
                    }
                ]
            },
            {
                "id"    : "dialog.withNerdyGirlDoing",
                "to"    : "npc.nerdygirl",
                "lines" : [
                    {
                        "character" : "pc.battery.main",
                        "text"      : "What are you doing? A battery?"
                    },
                    {
                        "character" : "npc.nerdygirl",
                        "text"      : "Pff, I assembled batteries when I was 6."
                    }
                ],
                "onEnd" : [
                    {
                        "action"        : "continueDialogOptions",
                        "dialogOptions" : "dialogoption.withNerdyGirl"
                    }
                ]
            },
            {
                "id"    : "dialog.withNerdyGirlBye",
                "to"    : "npc.nerdygirl",
                "lines" : [
                    {
                        "character" : "pc.battery.main",
                        "text"      : "Bye, see you later."
                    },
                    {
                        "character" : "npc.nerdygirl",
                        "text"      : "Finally! I can go back to my work, now."
                    }
                ],
                "onEnd" : [
                    {
                        "action"    : "endDialog",
                        "character" : "npc.nerdygirl"
                    }
                ]
            },
            {
                "id"    : "dialog.talkToTeacher",
                "to"    : "npc.teacher",
                "lines" : [
                    {
                        "character" : "npc.teacher",
                        "text"      : "You haven't started it!?"
                    }
                ],
                "onEnd" : [
                    {
                        "action"        : "startDialogOptions",
                        "dialogOptions" : "dialogoption.withTeacher"
                    }
                ]
            },
            {
                "id"    : "dialog.withTeacherStarted",
                "to"    : "npc.teacher",
                "lines" : [
                    {
                        "character" : "pc.battery.main",
                        "text"      : "Er... started what?"
                    },
                    {
                        "character" : "npc.teacher",
                        "text"      : "The battery, of course. I expect you tot build a battery in the next hour."
                    },
                    {
                        "character" : "npc.teacher",
                        "text"      : "Weren't you paying any attention at all on what I say?"
                    }
                ],
                "onEnd" : [
                    {
                        "action"        : "continueDialogOptions",
                        "dialogOptions" : "dialogoption.withTeacher"
                    }
                ]
            },
            {
                "id"    : "dialog.withTeacherBye",
                "to"    : "npc.teacher",
                "lines" : [
                    {
                        "character" : "pc.battery.main",
                        "text"      : "Bye, see you later."
                    },
                    {
                        "character" : "npc.teacher",
                        "text"      : "Build me that battery, and show it to me!"
                    }
                ],
                "onEnd" : [
                    {
                        "action"    : "endDialog",
                        "character" : "npc.teacher"
                    }
                ]
            }
        ],
        "achievements": [
            {
                "id"    : "achievement.formula",
                "title" : "You guessed a formula's author"
            },
            {
                "id"    : "achievement.battery",
                "title" : "You built a battery!"
            },
            {
                "id"    : "achievement.gotgoggles",
                "title" : "Got goggles!"
            },
            {
                "id"    : "achievement.gotlabcoat",
                "title" : "Got lab coat!"
            },
            {
                "id"    : "achievement.wearinggoggles",
                "title" : "Weared goggles!"
            },
            {
                "id"    : "achievement.wearinglabcoat",
                "title" : "Weared lab coat!"
            }
        ]
    };
});