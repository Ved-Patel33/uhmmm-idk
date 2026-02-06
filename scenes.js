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
    // Scene 1: Volunteer Event (Open Space)
    // ==========================================
    scene1: {
        backgroundClass: 'bg-volunteer',
        label: '🌳 Volunteer Event - Open Space',
        dialogue: [
            { speaker: '', text: 'I need to choose a stand to help at...' },
            { speaker: '', text: '(Click the glowing area in the top-left to select the ice cream stand)' }
        ],
        hotspots: [
            {
                x: '5%',
                y: '10%',
                width: '25%',
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
        backgroundClass: 'bg-ice-cream-stand',
        label: '🍦 Ice Cream Stand - Behind the Counter',
        thought: "I need to tell this girl I can take over… but she looks so excited… she's really pretty.",
        dialogue: [
            { speaker: 'Girl', text: 'Oh, are you taking over?' },
            { speaker: 'You', text: 'Yeah.' },
            { speaker: 'Girl', text: "Okay! It's pretty easy, just scoop and serve. Good luck!" }
        ],
        nextScene: 'scene3'
    },

    // ==========================================
    // Scene 3: Ice Cream Stand (MC Alone)
    // ==========================================
    scene3: {
        backgroundClass: 'bg-ice-cream-alone',
        label: '🍦 Ice Cream Stand - Working Alone',
        dialogue: [
            { speaker: '', text: "Alright, I got this. Just me and the ice cream now." }
        ],
        autoAdvance: 6000,
        nextScene: 'scene3b'
    },

    scene3b: {
        backgroundClass: 'bg-ice-cream-alone',
        label: '🍦 Ice Cream Stand - Unexpected Visitors',
        dialogue: [
            { speaker: 'Girls', text: "Hey! Our friend thought you were cute and wanted your Snap." },
            { speaker: 'You', text: "Oh, uh... sure, I guess?" },
            { speaker: '', text: "That was random... anyway, back to work." }
        ],
        nextScene: 'scene4'
    },

    // ==========================================
    // Scene 4: Eating Area
    // ==========================================
    scene4: {
        backgroundClass: 'bg-eating-area',
        label: '🍽️ Eating Area - Break Time',
        dialogue: [
            { speaker: '', text: "Time for a break. This food actually looks pretty good." },
            { speaker: 'Girl', text: "Hey! Mind if I sit here?" },
            { speaker: 'You', text: "Oh, hey! Yeah, go ahead." },
            { speaker: 'Girl', text: "How's the stand going?" },
            { speaker: 'You', text: "Pretty good. Got some interesting customers." },
            { speaker: 'Girl', text: "Haha, I bet. Well, I gotta get back. See you around!" },
            { speaker: 'You', text: "Yeah, see you." }
        ],
        nextScene: 'scene5'
    },

    // ==========================================
    // Scene 5: Ice Cream Stand (Main Girl & Friends)
    // ==========================================
    scene5: {
        backgroundClass: 'bg-ice-cream-friends',
        label: '🍦 Ice Cream Stand - She Returns',
        dialogue: [
            { speaker: '', text: "She's back, and she brought her friends." },
            { speaker: 'Girl', text: "We couldn't resist coming back for more ice cream!" },
            { speaker: 'You', text: "Business is booming then." },
            { speaker: 'Friend', text: "You're pretty good at this!" },
            { speaker: 'You', text: "Thanks, I try." },
            { speaker: 'Girl', text: "We should hang out sometime. Here's my number." }
        ],
        nextScene: 'scene6'
    },

    // ==========================================
    // Scene 6: At Home (Texting)
    // ==========================================
    scene6: {
        backgroundClass: 'bg-home-texting',
        label: '📱 At Home - Late Night Texting',
        timeSkip: 'Later that night...',
        dialogue: [
            { speaker: '', text: "Should I text her? ...Yeah, why not." },
            { speaker: 'You (text)', text: "Hey, it's the ice cream guy 🍦" },
            { speaker: 'Her (text)', text: "Haha hey! Took you long enough 😊" },
            { speaker: 'You (text)', text: "Had to make sure the ice cream wouldn't melt first" },
            { speaker: 'Her (text)', text: "Smooth 😂 We should hang out soon!" },
            { speaker: '', text: "This is going well..." }
        ],
        nextScene: 'scene7'
    },

    // ==========================================
    // Scene 7: Bike Ride / Video Call
    // ==========================================
    scene7: {
        backgroundClass: 'bg-bike-ride',
        label: '🚴 Bike Ride - Her Call',
        timeSkip: 'A few weeks later...',
        dialogue: [
            { speaker: '', text: "Just a casual bike ride... and she's calling." },
            { speaker: 'Her (call)', text: "Hey! What are you up to?" },
            { speaker: 'You', text: "Just biking around. You?" },
            { speaker: 'Her (call)', text: "Missing you, honestly." },
            { speaker: 'You', text: "...Same here." },
            { speaker: 'Her (call)', text: "We should video call later tonight!" },
            { speaker: 'You', text: "Definitely." }
        ],
        nextScene: 'scene8'
    },

    // ==========================================
    // Scene 8: Costume Reveal (Video Call)
    // ==========================================
    scene8: {
        backgroundClass: 'bg-video-call',
        label: '📹 Video Call - The Reveal',
        timeSkip: 'A few months later...',
        dialogue: [
            { speaker: 'Her', text: "Okay okay, close your eyes!" },
            { speaker: 'You', text: "They're closed!" },
            { speaker: 'Her', text: "Okay... open them!" }
        ],
        nextScene: 'scene8b'
    },

    scene8b: {
        backgroundClass: 'bg-video-call',
        label: '📹 Video Call - Beauty and the Beast',
        thought: "She's wearing a Beauty and the Beast costume... She looks absolutely beautiful. Like, actually stunning. I can't believe someone this amazing wants to talk to me every day.",
        dialogue: [
            { speaker: 'You', text: "Wow... you look incredible." },
            { speaker: 'Her', text: "Really? You think so?" },
            { speaker: 'You', text: "Absolutely. You're beautiful." },
            { speaker: 'Her', text: "...Thank you. That means a lot." }
        ],
        nextScene: 'scene9'
    },

    // ==========================================
    // Scene 9: Christmas Gift
    // ==========================================
    scene9: {
        backgroundClass: 'bg-christmas',
        label: '🎄 Christmas Day - The Gift',
        timeSkip: 'Christmas Day...',
        dialogue: [
            { speaker: 'You', text: "I got you something." },
            { speaker: 'Her', text: "You didn't have to!" },
            { speaker: 'You', text: "I wanted to. Open it!" },
            { speaker: 'Her', text: "OH MY GOD A WOODLAND COW PLUSHIE!" },
            { speaker: 'Her', text: "I LOVE IT SO MUCH!! Thank you!!" },
            { speaker: 'You', text: "I'm glad you like it." },
            { speaker: 'Her', text: "Like it? I LOVE it. And I love... spending time with you." }
        ],
        nextScene: 'sceneFinal'
    },

    // ==========================================
    // Final Scene: Valentine's Question
    // ==========================================
    sceneFinal: {
        backgroundClass: 'bg-valentine',
        label: "💕 Valentine's Day - The Question",
        timeSkip: "Valentine's Day...",
        dialogue: [
            { speaker: '', text: "(You're now seeing this from her perspective...)" },
            { speaker: 'Him', text: "So... I have something to ask you." },
            { speaker: '', text: "My heart is racing..." },
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
