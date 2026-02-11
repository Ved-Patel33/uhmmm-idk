/**
 * Scene Definitions for Valentine's Interactive Story
 * 
 * Each scene contains:
 * - background: CSS class for placeholder gradient OR path to image
 * - backgroundClass: CSS class name for placeholder styling
 * - label: Scene description for placeholder mode
 * - dialogue: array of {speaker, text, choices?}
 * - hotspots: clickable areas [{x, y, width, height, target}]
 * - thought: MC internal monologue (shown in bubble)
 * - timeSkip: text to show before scene (e.g., "A few weeks later...")
 * - autoAdvance: ms before auto-advancing to nextScene
 * - nextScene: scene to go to after dialogue ends
 */

window.SCENES = {
    // ==========================================
    // Intro Scene: Title & Setup
    // ==========================================
    intro: {
        background: 'assets/intro.png',
        label: '💕 A Valentine\'s Story',
        dialogue: [
            { speaker: '', text: 'This is a story about how two people met...' },
            { speaker: '', text: 'It all started at a volunteer event at the Mandir.' },
            { speaker: '', text: 'Little did he know, this day would change everything.' },
            { speaker: '', text: '(Click to continue...)' }
        ],
        nextScene: 'scene1'
    },

    // ==========================================
    // Scene 1: Volunteer Event (Open Space)
    // ==========================================
    scene1: {
        background: 'assets/mandir_open_space.png',
        label: '🌳 Mandir - Open Space',
        dialogue: [
            { speaker: '', text: 'I need to choose a stand to help at...' },
            { speaker: '', text: '(Click the ice cream stand in the bottem-left to select the ice cream stand)' }
        ],
        hotspots: [
            {
                x: '5%',
                y: '60%',
                width: '30%',
                height: '35%',
                target: 'scene2'
            }
        ],
        nextScene: null // Player must click hotspot
    },

    // ==========================================
    // Scene 2: Ice Cream Stand (Behind the Counter)
    // ==========================================
    scene2: {
        background: 'assets/ice_cream_stand_fantasy.png',
        character: 'assets/char_female_lead.png',
        label: '🍦 Ice Cream Stand - Behind the Counter',
        thought: "I need to tell this girl I can take over… she looks so excited… she's really pretty.",
        dialogue: [
            { speaker: 'Girl', text: 'Oh.... are you taking over?' },
            { speaker: 'You', text: 'Yeah.' },
            { speaker: 'Girl', text: "Okayyy...ughh here you go." }
        ],
        nextScene: 'scene3'
    },

    // ==========================================
    // Scene 3: Ice Cream Stand (MC Alone)
    // ==========================================
    scene3: {
        background: 'assets/ice_cream_stand.png',
        label: '🍦 Ice Cream Stand - Working Alone',
        dialogue: [
            { speaker: '', text: "Daym, there are a lot of people here." }
        ],
        autoAdvance: 6000,
        nextScene: 'scene3b'
    },

    scene3b: {
        background: 'assets/ice_cream_stand.png',
        label: '🍦 Ice Cream Stand - Unexpected Visitors',
        dialogue: [
            { speaker: 'Girls', text: "Hey.. do you mind comming to the side for a bit?" },
            { speaker: 'You', text: "Oh, uh... sure, I guess?" },
            { speaker: 'Girls', text: "Our friend thought you were cute and wanted your Snap." },
            { speaker: 'You', text: "Oh, uhmm do I get a discription of her?" },
            { speaker: 'Girls', text: "She's got two eyes and a nose, she wears glasses but has contacts too" },
            { speaker: 'You', text: "hehehe,sure" }
        ],
        nextScene: 'scene4'
    },

    // ==========================================
    // Scene 4: Eating Area
    // ==========================================
    scene4: {
        background: 'assets/eating_area.png',
        label: '🍽️ Eating Area - Break Time',
        dialogue: [
            { speaker: '', text: "Finally dinner time." },
            { speaker: 'Girl', text: "Heyy!" },
            { speaker: 'You', text: "Oh, hey...ugh how are you?" },
            { speaker: 'Girl', text: "Good, how are you?" },
            { speaker: 'GameMaker', text: "Basically small talk happens" }
        ],
        nextScene: 'scene5'
    },

    // ==========================================
    // Scene 5: Ice Cream Stand (Main Girl & Friends)
    // ==========================================
    scene5: {
        background: 'assets/ice_cream_stand.png',
        character: 'assets/char_female_lead.png',
        label: '🍦 Ice Cream Stand - She Returns',
        dialogue: [
            { speaker: '', text: "You go get some ice cream" },
            { speaker: 'Girl', text: "Oh, hii" },
            { speaker: 'You', text: "Hey.. I see you took over the stand lol" },
            { speaker: 'Girl', text: "Hehe, yea" },
            { speaker: 'GameMaker', text: "More small talk" }
        ],
        nextScene: 'scene6'
    },

    // ==========================================
    // Scene 6: At Home (Texting)
    // ==========================================
    scene6: {
        background: 'assets/bedroom_night.png',
        label: '📱 At Home - Late Night Texting',
        timeSkip: 'Later that night...',
        dialogue: [
            { speaker: '', text: "Should I text her? ...Yeah, why not." },
            { speaker: 'You (text)', text: "Hey, where'd you go I was looking for you" },
            { speaker: 'Her (text)', text: "Haha hey, I had to go home" },
            { speaker: 'You (text)', text: "Oh bummer, wyd?" },
            { speaker: 'Her (text)', text: "Nothing much, just chilling" },
            { speaker: 'GameMaker', text: "They proceed to text for a while, talking abt intrests and stff" }
        ],
        nextScene: 'scene6b'
    },
    // ==========================================
    // Scene 6.5: Montreal
    // ==========================================
    scene6b: {
        background: 'assets/bedroom_night.png',
        label: 'Montreal Snap Spree',
        timeSkip: 'A few weeks later...',
        dialogue: [
            { speaker: 'GameMaker', text: "The guy went on a trip with his freinds and may have gotten drunk" },
            { speaker: 'You', text: "Mmm I sholddd Snappp herrs" },
            { speaker: 'GameMaker', text: "He sent like 70 snaps" },
            { speaker: 'Her', text: "wowww thtat was a lot of snaps" },
            { speaker: 'GameMaker', text: "Congraduations you somehow got her number" }
        ],
        nextScene: 'scene7'
    },

    // ==========================================
    // Scene 7: Bike Ride / Video Call
    // ==========================================
    scene7: {
        background: 'assets/bike_ride.png',
        label: '🚴 Bike Ride - Her Call',
        timeSkip: 'A few weeks later...',
        dialogue: [
            { speaker: '', text: "Just a casual bike ride... and she's calling." },
            { speaker: 'Her', text: "Hey! What are you up to?" },
            { speaker: 'You', text: "Just biking around. You?" },
            { speaker: 'Her', text: "Just go to the apartment, unpacking" },
            { speaker: 'You', text: "oooo" },
            { speaker: 'GameMaker', text: "They ended up talking and stuff" }
        ],
        nextScene: 'scene8'
    },

    // ==========================================
    // Scene 8: Costume Reveal (Video Call)
    // ==========================================
    scene8: {
        background: 'assets/video_call_costume.png',
        label: '📹 Video Call - The Reveal',
        timeSkip: 'A few months later...',
        dialogue: [
            { speaker: 'Her', text: "Yea were gonna dress up as disney princesses" },
            { speaker: 'You', text: "Oh reallyyy, what princes r u gonna be" },
            { speaker: 'GameMaker', text: "Honestly dont remember if you told me or not until the day" }
        ],
        nextScene: 'scene8b'
    },

    scene8b: {
        background: 'assets/video_call_costume.png',
        label: '📹 Video Call - Halloween',
        thought: "She's wearing a Beauty and the Beast costume... She looks absolutely beautiful. Like, actually stunning.",
        dialogue: [
            { speaker: 'Her', text: "Soooo, what do you think?" },
            { speaker: 'You', text: "....You look incredible" },
            { speaker: 'You', text: "You're beautiful......" },
            { speaker: 'Her', text: "hehehehehe, Thank you." },
            { speaker: 'GameMaker', text: "You proceed to talk for a while" }
        ],
        nextScene: 'scene9'
    },

    // ==========================================
    // Scene 9: Christmas Gift
    // ==========================================
    scene9: {
        background: 'assets/christmas_gift.png',
        label: '🎄 Christmas Day - The Gift',
        timeSkip: 'Christmas Day...',
        dialogue: [
            { speaker: 'Her', text: "Why did I get this???" },
            { speaker: 'Her', text: "YWhen did I order this??" },
            { speaker: 'her', text: "OOO, this is what you were tallking aboutttt" },
            { speaker: 'You', text: "hehehe yea, i was worried it wasnt gonna come but suprise!" },
            { speaker: 'Her', text: "hehehehehe, thank you." },
            { speaker: 'You', text: "It's sadly not exactly what it shouldve been but....." },
            { speaker: 'Her', text: "it's okayy, i like it" }
        ],
        nextScene: 'sceneFinal'
    },

    // ==========================================
    // Final Scene: Valentine's Question
    // ==========================================
    sceneFinal: {
        background: 'assets/valentine_proposal.png',
        label: "The Question",
        timeSkip: "A Week Before Valentine's Day...",
        dialogue: [
            { speaker: '', text: "(You're now seeing this from her perspective...)" },
            { speaker: 'Him', text: "So... I have something to ask you." },
            { speaker: '', text: "You're wondering what he's gonna ask..." },
            { speaker: 'Him', text: "Will you be my Valentine? 💕" },
            {
                speaker: '',
                text: "What do you say?",
                choices: [
                    { text: 'Yes! 💕', class: 'yes-btn', ending: 'happy' },
                    { text: 'No...', class: 'no-btn', ending: 'sad' }
                ]
            }
        ],
        nextScene: null
    }
};
