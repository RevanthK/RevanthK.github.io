"use strict";

//FLIP FLAP
let flap = document.querySelector(".split-flap-wrapper");
let completedFlaps = 0;
let audio = new Audio('./assets/splitflap.mp3');
let isPlaying = false;

function setup(currentPos, symbolOrder, target) {
  completedFlaps = 0; // Reset counter when setting up new word
  for (let [index, item] of [...flap.children].entries()) {
    let SVG_POS = 8;
    if (index === SVG_POS) {
      continue;
    }

    let symbolCursor = symbolOrder.indexOf(currentPos[index]);
    //Get DOM element/
    let top_flap_queued = item.querySelector(".top-flap-queued");
    let top_flap_visible = item.querySelector(".top-flap-visible");
    let bottom_flap_queued = item.querySelector(".bottom-flap-queued");
    let bottom_flap_visible = item.querySelector(".bottom-flap-visible");

    //SETUP
    top_flap_visible.innerHTML = `<span>${symbolOrder[symbolCursor]}</span>`;
    top_flap_queued.innerHTML = `<span>${
      symbolOrder[(symbolCursor + 1) % symbolOrder.length]
    }</span>`;
    bottom_flap_queued.innerHTML = `<span>${
      symbolOrder[(symbolCursor + 1) % symbolOrder.length]
    }</span>`;
    bottom_flap_visible.innerHTML = `<span>${currentPos[index]}</span>`;

    if (top_flap_visible.innerHTML !== `<span>${target[index]}</span>`) {
      top_flap_visible.classList.remove("top-flap-animation");
      void top_flap_visible.offsetWidth;
      top_flap_visible.classList.add("top-flap-animation");
    }

    if (bottom_flap_visible.innerHTML !== `<span>${target[index]}</span>`) {
      bottom_flap_queued.classList.remove("bottom-flap-animation");
      void bottom_flap_queued.offsetWidth;
      bottom_flap_queued.classList.add("bottom-flap-animation");
    }

    function updateTopFlaps(e) {
      top_flap_visible.innerHTML = `<span>${
        symbolOrder[(symbolCursor + 1) % symbolOrder.length]
      }</span>`;
      top_flap_queued.innerHTML = `<span>${
        symbolOrder[(symbolCursor + 2) % symbolOrder.length]
      }</span>`;
    }

    top_flap_visible.addEventListener("animationend", updateTopFlaps);

    function updateBottomFlaps(e) {
      bottom_flap_visible.innerHTML = `<span>${
        symbolOrder[(symbolCursor + 1) % symbolOrder.length]
      }</span>`;
      bottom_flap_queued.innerHTML = `<span>${
        symbolOrder[(symbolCursor + 2) % symbolOrder.length]
      }</span>`;

      //run a check if we landed on the correct position.
      const targetChar = target[index];

      if (top_flap_visible.innerHTML === `<span>${targetChar}</span>`) {
        completedFlaps++;
        
        if (completedFlaps === 8) { 
          if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            isPlaying = false;
          }
        }
        top_flap_visible.removeEventListener("animationend", updateTopFlaps);
        bottom_flap_queued.removeEventListener(
          "animationend",
          updateBottomFlaps
        );
        return;
      } else {
        function resetAnimation() {
          top_flap_visible.classList.remove("top-flap-animation");
          void top_flap_visible.offsetWidth;
          top_flap_visible.classList.add("top-flap-animation");
          bottom_flap_queued.classList.remove("bottom-flap-animation");
          void bottom_flap_queued.offsetWidth;
          bottom_flap_queued.classList.add("bottom-flap-animation");
        }
        symbolCursor++;
        resetAnimation();
      }
    }

    //STEP 3
    bottom_flap_queued.addEventListener("animationend", updateBottomFlaps);
    const targetChar = target[index];

    if (top_flap_visible.innerHTML === `<span>${targetChar}</span>`) {
      completedFlaps++;
      top_flap_visible.removeEventListener("animationend", updateTopFlaps);
      bottom_flap_queued.removeEventListener("animationend", updateBottomFlaps);
    }

    if (bottom_flap_visible.innerHTML === `<span>${targetChar}</span>`) {
      top_flap_visible.removeEventListener("animationend", updateTopFlaps);
      bottom_flap_queued.removeEventListener("animationend", updateBottomFlaps);
    }
  }
}

let alphabet =
  "abcdefghijklmnopqrstuvwxyz🕺🔨👷🍔🌍🧙ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-=_~!@#$%^&*? ";

// Add helper function to normalize emoji characters
function normalizeEmoji(char) {
  if (typeof char === 'string' && char.startsWith('\\u')) {
    // Handle surrogate pairs
    if (char.length > 6) { // If it's a surrogate pair
      const firstPart = parseInt(char.slice(2, 6), 16);
      const secondPart = parseInt(char.slice(8, 12), 16);
      return String.fromCodePoint(firstPart, secondPart);
    }
    // Single code point
    return String.fromCodePoint(parseInt(char.slice(2), 16));
  }
  return char;
}

function compareEmojis(char1, char2) {
  // Convert both to their normalized form
  const normalized1 = normalizeEmoji(char1);
  const normalized2 = normalizeEmoji(char2);
  
  // Get all code points for each character
  const codePoints1 = [...normalized1].map(c => c.codePointAt(0));
  const codePoints2 = [...normalized2].map(c => c.codePointAt(0));
  
  // Compare the sequences of code points
  return codePoints1.length === codePoints2.length && 
         codePoints1.every((cp, i) => cp === codePoints2[i]);
}

const splitEmoji = (string) => {
  if (!!Intl?.Segmenter) {
    const segments = [...new Intl.Segmenter().segment(string)];
    return segments.map(x => x.segment);
  } else {
    // For browsers without Intl.Segmenter, use a more robust emoji splitting
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    const matches = string.match(emojiRegex) || [];
    const nonEmojis = string.replace(emojiRegex, '').split('');
    return [...matches, ...nonEmojis].filter(Boolean);
  }
}

// Update the SplitFlapCharacters array to use consistent emojis
const SplitFlapCharacters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '🕺', '🔨', '👷', '🍔', '🌍', '🧙',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '-', '=', ' ', '~', '!', '@', '#', '$', '%', '^', '&', '*', '?'
];

// Update the words array to use consistent emojis
const words = ["Builder🔨", "Foodie 🍔", "Travel 🌍", "CodeWiz🧙", "Founder👷"];
let currentWordIndex = 0;

function cycleWords() {
  const currentWord = words[currentWordIndex];
  // Convert the word to an array of characters, preserving emojis
  const targetArray = Array.from(currentWord);
  
  // Stop any existing audio
  if (isPlaying) {
    audio.pause();
    audio.currentTime = 0;
  }
  
  // Play new audio
  isPlaying = true;
  audio.play().catch(error => {
    console.log("Playback prevented:", error);
    isPlaying = false;
  });
  
  
  setup([...new Array(8).fill("a")], SplitFlapCharacters, targetArray);
  
  currentWordIndex = (currentWordIndex + 1) % words.length;
  setTimeout(cycleWords, 15000);
}

cycleWords();
