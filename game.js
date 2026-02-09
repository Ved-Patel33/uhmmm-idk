/**
 * Valentine's Interactive Story Game Engine
 */

class GameEngine {
  constructor() {
    this.currentSceneId = null;
    this.dialogueIndex = 0;
    this.isTyping = false;
    this.typewriterTimeout = null;
    this.autoAdvanceTimeout = null;

    // DOM Elements
    this.backgroundLayer = document.getElementById('background-layer');
    this.dialogueContainer = document.getElementById('dialogue-container');
    this.speakerName = document.getElementById('speaker-name');
    this.dialogueText = document.getElementById('dialogue-text');
    this.clickIndicator = document.getElementById('click-indicator');
    this.choicesContainer = document.getElementById('choices-container');
    this.thoughtBubble = document.getElementById('thought-bubble');
    this.fadeOverlay = document.getElementById('fade-overlay');
    this.timeSkipOverlay = document.getElementById('time-skip-overlay');
    this.timeSkipText = document.getElementById('time-skip-text');
    this.endingScreen = document.getElementById('ending-screen');
    this.hotspotsContainer = document.getElementById('hotspots-container');

    this.init();
  }

  init() {
    // Click to advance dialogue
    this.dialogueContainer.addEventListener('click', () => this.advanceDialogue());

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        this.advanceDialogue();
      }
    });
  }

  /**
   * Load and start a scene
   */
  async loadScene(sceneId) {
    const scene = window.SCENES[sceneId];
    if (!scene) {
      console.error(`Scene not found: ${sceneId}`);
      return;
    }

    this.currentSceneId = sceneId;
    this.dialogueIndex = 0;

    // Clear previous state
    this.clearHotspots();
    this.hideDialogue();
    this.hideThought();
    this.choicesContainer.innerHTML = '';

    // Handle time skip if present
    if (scene.timeSkip) {
      await this.showTimeSkip(scene.timeSkip);
    }

    // Fade transition
    await this.fadeOut();

    // Set background - supports both CSS class and image URL
    // Remove all bg- classes first
    this.backgroundLayer.className = '';

    if (scene.backgroundClass) {
      // Use CSS gradient class
      this.backgroundLayer.classList.add(scene.backgroundClass);
      this.backgroundLayer.style.backgroundImage = '';
    } else if (scene.background) {
      // Use image URL
      this.backgroundLayer.style.backgroundImage = `url('${scene.background}')`;
    }

    // Update scene indicator
    const sceneIndicator = document.getElementById('scene-indicator');
    if (sceneIndicator && scene.label) {
      sceneIndicator.textContent = scene.label;
      sceneIndicator.style.display = 'block';
    } else if (sceneIndicator) {
      sceneIndicator.style.display = 'none';
    }

    await this.fadeIn();

    // Create hotspots if any
    if (scene.hotspots && scene.hotspots.length > 0) {
      this.createHotspots(scene.hotspots);
    }

    // Show initial thought if present
    if (scene.thought) {
      await this.showThought(scene.thought);
      await this.delay(3000);
      this.hideThought();
    }

    // Start dialogue if present
    if (scene.dialogue && scene.dialogue.length > 0) {
      await this.delay(500);
      this.showDialogue();
      this.displayCurrentDialogue();
    }

    // Auto advance for timed scenes
    if (scene.autoAdvance) {
      this.autoAdvanceTimeout = setTimeout(() => {
        this.transitionToScene(scene.nextScene);
      }, scene.autoAdvance);
    }
  }

  /**
   * Create clickable hotspots
   */
  createHotspots(hotspots) {
    hotspots.forEach(hotspot => {
      const el = document.createElement('div');
      el.className = 'hotspot';
      el.style.left = hotspot.x;
      el.style.top = hotspot.y;
      el.style.width = hotspot.width;
      el.style.height = hotspot.height;
      el.setAttribute('data-target', hotspot.target);

      el.addEventListener('click', () => {
        this.transitionToScene(hotspot.target);
      });

      this.hotspotsContainer.appendChild(el);
    });
  }

  clearHotspots() {
    this.hotspotsContainer.innerHTML = '';
  }

  /**
   * Display current dialogue line with typewriter effect
   */
  displayCurrentDialogue() {
    const scene = window.SCENES[this.currentSceneId];
    const dialogue = scene.dialogue[this.dialogueIndex];

    if (!dialogue) return;

    // Set speaker name
    this.speakerName.textContent = dialogue.speaker || '';
    this.speakerName.style.display = dialogue.speaker ? 'block' : 'none';

    // Typewriter effect
    this.typeText(dialogue.text);
  }

  /**
   * Typewriter text effect
   */
  typeText(text) {
    this.isTyping = true;
    this.clickIndicator.classList.remove('visible');
    this.dialogueText.innerHTML = '';

    let index = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    const type = () => {
      if (index < text.length) {
        this.dialogueText.textContent = text.substring(0, index + 1);
        this.dialogueText.appendChild(cursor);
        index++;
        this.typewriterTimeout = setTimeout(type, 30);
      } else {
        this.isTyping = false;
        this.dialogueText.textContent = text;
        this.clickIndicator.classList.add('visible');

        // Check if this dialogue has choices
        const scene = window.SCENES[this.currentSceneId];
        const dialogue = scene.dialogue[this.dialogueIndex];
        if (dialogue.choices) {
          this.showChoices(dialogue.choices);
        }
      }
    };

    type();
  }

  /**
   * Advance to next dialogue or scene
   */
  advanceDialogue() {
    if (this.isTyping) {
      // Skip typewriter, show full text
      clearTimeout(this.typewriterTimeout);
      const scene = window.SCENES[this.currentSceneId];
      const dialogue = scene.dialogue[this.dialogueIndex];
      this.dialogueText.textContent = dialogue.text;
      this.isTyping = false;
      this.clickIndicator.classList.add('visible');

      if (dialogue.choices) {
        this.showChoices(dialogue.choices);
      }
      return;
    }

    const scene = window.SCENES[this.currentSceneId];

    // If current dialogue has choices, don't advance on click
    const currentDialogue = scene.dialogue[this.dialogueIndex];
    if (currentDialogue && currentDialogue.choices) {
      return;
    }

    this.dialogueIndex++;

    if (this.dialogueIndex < scene.dialogue.length) {
      this.displayCurrentDialogue();
    } else {
      // End of dialogue, go to next scene
      if (scene.nextScene) {
        this.transitionToScene(scene.nextScene);
      }
    }
  }

  /**
   * Show choice buttons
   */
  showChoices(choices) {
    this.choicesContainer.innerHTML = '';
    this.clickIndicator.classList.remove('visible');

    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = `choice-btn ${choice.class || ''}`;
      btn.textContent = choice.text;
      btn.addEventListener('click', () => {
        if (choice.ending) {
          this.showEnding(choice.ending);
        } else if (choice.target) {
          this.transitionToScene(choice.target);
        }
      });
      this.choicesContainer.appendChild(btn);
    });
  }

  /**
   * Show/hide dialogue container
   */
  showDialogue() {
    this.dialogueContainer.classList.add('visible');
  }

  hideDialogue() {
    this.dialogueContainer.classList.remove('visible');
  }

  /**
   * Show MC thought bubble
   */
  async showThought(text) {
    this.thoughtBubble.textContent = text;
    this.thoughtBubble.classList.add('visible');
  }

  hideThought() {
    this.thoughtBubble.classList.remove('visible');
  }

  /**
   * Fade transitions
   */
  async fadeOut() {
    this.fadeOverlay.classList.add('active');
    await this.delay(600);
  }

  async fadeIn() {
    this.fadeOverlay.classList.remove('active');
    await this.delay(600);
  }

  /**
   * Time skip overlay
   */
  async showTimeSkip(text) {
    this.timeSkipText.textContent = text;
    this.timeSkipOverlay.classList.add('active');
    await this.delay(2500);
    this.timeSkipOverlay.classList.remove('active');
    await this.delay(600);
  }

  /**
   * Transition to new scene
   */
  async transitionToScene(sceneId) {
    if (this.autoAdvanceTimeout) {
      clearTimeout(this.autoAdvanceTimeout);
    }
    await this.loadScene(sceneId);
  }

  /**
   * Show ending screen
   */
  async showEnding(type) {
    await this.fadeOut();

    const endingEl = document.getElementById('ending-screen');
    const h1 = endingEl.querySelector('h1');
    const p = endingEl.querySelector('p');

    if (type === 'happy') {
      h1.textContent = '💕 Yayyy!! 💕';
      p.textContent = "And they lived happily ever after...";
      // Trigger confetti
      if (window.confetti) {
        window.confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      h1.textContent = '💔';
      p.textContent = "Maybe next time...";
    }

    endingEl.classList.add('active');
  }

  /**
   * Utility delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.game = new GameEngine();
  window.game.loadScene('intro');
});
