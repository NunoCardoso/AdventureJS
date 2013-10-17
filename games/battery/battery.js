/*global define */

define([
], function () {
    return {
        'images': [
            {
                'id'  : 'image.battery',
                'src' : 'games/aroundtheworld/img/background/around-the-world.jpg'
            },
            {
                'id'  : 'image.fatkid',
                'src' : 'games/battery/images/characters/fat-kid-character.png'
            },
            {
                'id'  : 'image.nerdygirl',
                'src' : 'games/battery/images/characters/nerdy-girl-character.png'
            },
            {
                'id'  : 'image.teacher',
                'src' : 'games/battery/images/characters/teacher-character.png'
            },
            {
                'id'  : 'image.classroom',
                'src' : 'games/battery/images/backgrounds/background.png'
            },
            {
                'id'  : 'image.classroom.path',
                'src' : 'games/aroundtheworld/img/background/all.path.png'
            },
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
            "id"    : "pc.main",
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
            ],
            "verbs" : [
                {"first": "Give",    "nr" : 2, "second": "to"},
                {"first": "Use",     "nr" : 2, "second": "with"},
                {"first": "Pick up", "nr" : 1},
                {"first": "Open",    "nr" : 1},
                {"first": "Push",    "nr" : 1},
                {"first": "Look at", "nr" : 1},
                {"first": "Close",   "nr" : 1},
                {"first": "Break",   "nr" : 1},
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
            }
        ],
        "interactions": [
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
        "flags" : {},
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
                        "character" : "pc.main",
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
                        "character" : "pc.main",
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
                        "character" : "pc.main",
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
                        "character" : "pc.main",
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
                        "character" : "pc.main",
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
                        "character" : "pc.main",
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
                "id"    : "achievement.battery",
                "title" : "You built a battery!"
            }
        ]
    };
});