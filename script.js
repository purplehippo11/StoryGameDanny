// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "outside_pumpkin_patch";
let time = 494;
let bladeStopped = false;
let snakeOilTimer;

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  outside_pumpkin_patch: {
    title: "Location: Outside the Pumpkin Patch",
    character: "Character: You",
    text: "The air smells of musk. Your sensory organs have been hijacked by the elixir of nostalgia. A grande sized pumpkin spice latte gets implanted into your head. Yeah... it is definitely fall. You brought cookie butter to Dr. Danny's animal hospital for her 9:00 PM checkup. The receptionist took her inside early. Now the desk is empty. A note reads: AT NINE, YOUR CAT BECOMES A DOUBLE CHOCOLATE CHUNK COOKIE. You've got to be kitten me. The hospital is inside Danny's haunted mansion, right beside this pumpkin patch. Your watch says 8:14 PM. SCREEEECH!!! Vampire bats burst out of the fog. The mansion door is open!",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Run into the mansion (-10 HP)",
        action: function () {
          updateHealth(-10);
        },
        minutes: 10,
        nextScene: "entrance_house",
      },
      {
        text: "Hide in the pumpkin patch (-25 HP)",
        action: function () {
          updateHealth(-25);
        },
        minutes: 4,
        nextScene: "deep_pumpkin_patch",
      },
    ],
  },

  deep_pumpkin_patch: {
    title: "The Pumpkin Patch",
    text: "Six HUGE pumpkins sit in one row, numbered from left to right. Vines cover their lids. The bats are still circling. Searching the wrong pumpkin means standing out here even longer. Which one could cookie butter be inside?",
    choices: [
      {
        text: "Search pumpkin 1",
        action: function () {
          updateHealth(-25);
        },
        minutes: 3,
        nextScene: "deep_pumpkin_patch",
      },
      {
        text: "Search pumpkin 2",
        action: function () {
          updateHealth(-25);
        },
        minutes: 3,
        nextScene: "deep_pumpkin_patch",
      },
      {
        text: "Search pumpkin 3",
        action: function () {
          updateHealth(-25);
        },
        minutes: 3,
        nextScene: "deep_pumpkin_patch",
      },
      {
        text: "Search pumpkin 4",
        minutes: 1,
        nextScene: "pumpkin",
      },
      {
        text: "Search pumpkin 5",
        action: function () {
          updateHealth(-25);
        },
        minutes: 3,
        nextScene: "deep_pumpkin_patch",
      },
      {
        text: "Search pumpkin 6",
        action: function () {
          updateHealth(-25);
        },
        minutes: 3,
        nextScene: "deep_pumpkin_patch",
      },
      {
        text: "Go into the mansion",
        minutes: 2,
        nextScene: "entrance_house",
      },
    ],
  },

  entrance_house: {
    title: "Location: Entrance of the Mansion",
    text: "The portraits are twisting, the chandelier is swinging, the DOORS are bending. Your watch races forward whenever you move through the mansion. Dr. Danny has enchanted this place to waste your time! You turn on your flashlight. The bats keep away from its beam, but they can still swoop at you from behind. A faint prrrrrr echoes through the vents. Upstairs or basement? TIME IS OF THE ESSENCE!",
    choices: [
      {
        text: "Go upstairs",
        minutes: 5,
        nextScene: "upstairsBedroom",
      },
      {
        text: "Explore the basement",
        minutes: 3,
        nextScene: "basement",
      },
      {
        text: "Go outside to the pumpkin patch (-15 HP)",
        action: function () {
          updateHealth(-15);
        },
        minutes: 2,
        nextScene: "deep_pumpkin_patch",
      },
    ],
  },

  upstairsBedroom: {
    title: "The Upstairs Bedroom",
    text: "Is this real life? The walls are moving, the moon is shifting... prrrrrr. That sound again! It seems to come from everywhere at once. A vent connects this room to the basement. Maybe the sound is traveling through it? A skeleton's hand pokes out from under the bed. Beside it stands a dusty closet. Search carefully. You don't have fur-ever. hahahaa..",
    choices: [
      {
        text: "Check under the bed",
        minutes: 2,
        nextScene: "skeletonUnderBed",
      },
      {
        text: "Check inside the closet",
        minutes: 2,
        nextScene: "insideCloset",
      },
      {
        text: "Go to the basement",
        minutes: 3,
        nextScene: "basement",
      },
    ],
  },

  skeletonUnderBed: {
    title: "The Skeleton Under the Bed",
    text: "BOOOOOO!!!!! It's a pile of bones. Nothing suspicious here. Except for the key clenched in its hand. The fingers twitch when you reach for it. Yeah... this is going to hurt.",
    choices: [
      {
        text: "Take the skeleton key and go to the basement (-15 HP)",
        action: function () {
          pickUpItem("skeleton key");
          updateHealth(-15);
        },
        minutes: 1,
        nextScene: "basement",
      },
      {
        text: "Pretend to die with the skeleton (YOU WILL DIE)",
        action: function () {
          updateHealth(-100);
        },
      },
      {
        text: "Leave the key and go to the basement",
        minutes: 1,
        nextScene: "basement",
      },
    ],
  },

  insideCloset: {
    title: "Inside the Closet",
    text: "SWOOOSH! Dust and spider webs fly toward you. No cat. Just cat kibble and a bottle labeled SNAKE OIL. A smaller label says: NOT MEDICINE. DO NOT DRINK. The spiders are crawling toward your hands. You can grab the kibble, but you won't get away without a few bites.",
    choices: [
      {
        text: "Take the kibble and go to the basement (-10 HP)",
        action: function () {
          pickUpItem("cat kibble");
          updateHealth(-10);
        },
        minutes: 1,
        nextScene: "basement",
      },
      {
        text: "Drink the snake oil (POISON)",
        action: function () {
          snakeOilTimer = setInterval(function () {
            updateHealth(-10);
          }, 1000);
        },
        minutes: 1,
        nextScene: "snakeOil",
      },
      {
        text: "Leave everything and go to the basement",
        minutes: 1,
        nextScene: "basement",
      },
    ],
  },

  basement: {
    title: "The Basement",
    text: "hissssss... scratch scratch. cookie butter might be CLOSE BY! Two routes lead to the SAME dungeon below: a locked door protects a stone stairwell, while a broken wooden staircase drops straight down through an open doorway. The wooden stairs look faster. They also look like they might snap. A cold fireplace and some cabinets sit against the wall.",
    choices: [
      {
        text: "Leave the basement",
        minutes: 2,
        nextScene: "entrance_house",
      },
      {
        text: "Try the locked stairwell",
        minutes: 1,
        nextScene: "stairwell",
      },
      {
        text: "Risk the broken stairs (-30 HP)",
        action: function () {
          updateHealth(-30);
        },
        minutes: 1,
        nextScene: "dungeon",
      },
      {
        text: "Search the chimney",
        minutes: 1,
        nextScene: "chimney",
      },
      {
        text: "Search the cabinets",
        minutes: 1,
        nextScene: "cabinets",
      },
    ],
  },

  stairwell: {
    title: "The Locked Stairwell",
    text: "The door won't budge. You've got to be kitten me! A keyhole shaped like a tiny skull sits beneath the handle. Through a crack, your flashlight reveals stone steps leading DOWN. They look slippery, but much safer than the broken wooden staircase.",
    choices: [
      {
        text: "Use the skeleton key and take the stone stairs (-5 HP)",
        action: unlockDoor,
        minutes: 2,
        nextScene: "dungeon",
      },
      {
        text: "Return to the basement",
        minutes: 1,
        nextScene: "basement",
      },
    ],
  },

  cabinets: {
    title: "The Basement Cabinets",
    text: "A serrated kitchen knife lies behind a cracked glass jar. A dusty label reads PUMPKIN CARVING SUPPLIES. Hmmm. Why would an animal hospital need these? You could reach around the glass carefully or grab the knife in a rush.",
    choices: [
      {
        text: "Carefully take the knife (-5 HP)",
        action: function () {
          pickUpItem("serrated kitchen knife");
          updateHealth(-5);
        },
        minutes: 2,
        nextScene: "basement",
      },
      {
        text: "Grab the knife quickly (-20 HP)",
        action: function () {
          pickUpItem("serrated kitchen knife");
          updateHealth(-20);
        },
        minutes: 1,
        nextScene: "basement",
      },
      {
        text: "Leave the knife",
        minutes: 1,
        nextScene: "basement",
      },
    ],
  },

  chimney: {
    title: "The Chimney",
    text: "The scratching is louder here. You shine your flashlight up the chimney. Two red eyes stare back. That is DEFINITELY not cookie butter. Whatever is up there has claws. Very large claws.",
    choices: [
      {
        text: "Reach inside anyway (-25 HP)",
        action: function () {
          updateHealth(-25);
        },
        minutes: 2,
        nextScene: "basement",
      },
      {
        text: "Back away",
        minutes: 1,
        nextScene: "basement",
      },
    ],
  },

  dungeon: {
    title: "The Dungeon",
    text: "You are fe-line scared! Saw blades, chains, arm cuffs... WHY does an animal hospital have this?! A swinging blade blocks the path to a cat sized wooden crate. MEOWWWW. A metal vent above the crate carries the sound upstairs. There is a narrow gap in the blade's mechanism. Your empty glass bottle might fit.",
    choices: [
      {
        text: "Block the blade with the bottle (-10 HP the first time)",
        action: function () {
          if (bladeStopped) {
            return;
          }
          if (!inventory.includes("empty glass bottle")) {
            timeDisplay.textContent += " You already used your bottle.";
            return false;
          }
          inventory.splice(inventory.indexOf("empty glass bottle"), 1);
          bladeStopped = true;
          inventoryDisplay.textContent = inventory.join(", ");
          updateHealth(-10);
        },
        minutes: 2,
        nextScene: "woodenCrate",
      },
      {
        text: "Cross without the bottle (-35 HP if the blade is moving)",
        action: function () {
          if (!bladeStopped) {
            updateHealth(-35);
          }
        },
        minutes: 1,
        nextScene: "woodenCrate",
      },
      {
        text: "Leave the dungeon",
        minutes: 2,
        nextScene: "basement",
      },
    ],
  },

  woodenCrate: {
    title: "The Wooden Crate",
    text: "You made it past the blade! The crate has a simple latch. The meowing gets louder when you touch it. Splinters stick out around the lid. Is cookie butter finally in here?",
    choices: [
      {
        text: "Open the crate (-10 HP)",
        action: function () {
          updateHealth(-10);
        },
        minutes: 1,
        nextScene: "note",
      },
      {
        text: "Leave the dungeon",
        minutes: 2,
        nextScene: "basement",
      },
    ],
  },

  note: {
    title: "The Fake Meows",
    text: "Oh no. NOTHING. Totally anticlimactic. It's a speaker playing cat sounds into the vent! Dr. Danny has been leading you away from cookie butter. Four paw prints are painted on the speaker. A folded sticky note is stuck underneath. That has GOT to mean something.",
    choices: [
      {
        text: "Spend two minutes reading the note",
        action: function () {
          pickUpItem("sticky note");
        },
        minutes: 2,
        nextScene: "clue",
      },
      {
        text: "Leave without reading it",
        minutes: 2,
        nextScene: "basement",
      },
    ],
  },

  clue: {
    title: "The Sticky Note",
    text: "What you seek is purr-ty close by. Leave this house and follow the blood orange sky. Count the paw prints on the speaker, then count the pumpkins from LEFT to RIGHT. The same number hides your cat. Bring a carving knife. Leave her trapped until nine and she'll become a cookie. Free her before then and the spell breaks. Four paw prints... pumpkin FOUR! You keep the note so you won't forget.",
    choices: [
      {
        text: "Return to the basement",
        minutes: 2,
        nextScene: "basement",
      },
    ],
  },

  pumpkin: {
    title: "Pumpkin Four",
    text: "You press your ear against the fourth pumpkin. A real, shaky meow answers. COOKIE BUTTER! You found her! Thick vines seal the lid shut, but they run along the outside of the pumpkin. You can cut them without touching her. cookie butter is panicking and swiping through a crack. Some kibble might keep her calm while you lift the lid.",
    choices: [
      {
        text: "Use the kitchen knife (-10 HP unless you have kibble)",
        action: function () {
          if (!inventory.includes("serrated kitchen knife")) {
            timeDisplay.textContent +=
              " You need a knife. Try the basement cabinets.";
            return false;
          }
          if (inventory.includes("cat kibble")) {
            inventory.splice(inventory.indexOf("cat kibble"), 1);
            inventoryDisplay.textContent = inventory.join(", ");
          } else {
            updateHealth(-10);
          }
        },
        minutes: 3,
        nextScene: "solution",
      },
      {
        text: "Try cutting the vines with the fingernail clipper",
        minutes: 46,
        nextScene: "solution",
      },
      {
        text: "Go back for supplies",
        minutes: 2,
        nextScene: "entrance_house",
      },
    ],
  },

  snakeOil: {
    title: "The Snake Oil",
    text: "That was NOT medicine. Your throat burns. Your arms go numb. You can't even stand up. The poison takes 10 HP every second. cookie butter is still out there, but you can't move...",
    choices: [],
  },

  solution: {
    title: "Cookie Butter is Safe!",
    text: "SNIP! The final vine falls away. cookie butter leaps into your arms. The clock freezes before nine. The bats scatter and Dr. Danny's spell breaks. You hold her close. Next time, you're reading the animal hospital reviews FIRST.",
    choices: [
      {
        text: "Restart",
        action: restartGame,
      },
    ],
  },

  dead: {
    title: "You are dead",
    text: "Your HP reached 0. You collapse before you can save cookie butter. Game over.",
    choices: [
      {
        text: "Restart",
        action: restartGame,
      },
    ],
  },

  tooLate: {
    title: "9:00 PM",
    text: "The clock strikes nine. A flash of chocolate colored light bursts from the pumpkin patch. You ran out of time. cookie butter has become an actual cookie. Game over.",
    choices: [
      {
        text: "Restart",
        action: restartGame,
      },
    ],
  },
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name')
// in the function itself, but that would be very wordy
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {
  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character || "You";
  updateTime(0);

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.nextScene) {
        updateTime(choice.minutes || 1);
        if (time >= 540) {
          return;
        }
      }

      if (choice.action) {
        if (choice.action() === false) {
          return;
        }
      }

      if (health <= 0 || time >= 540) {
        return;
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });

  if (
    health > 0 &&
    health < 100 &&
    time < 540 &&
    currentScene !== "solution" &&
    currentScene !== "snakeOil" &&
    inventory.includes("a bandaid")
  ) {
    const button = document.createElement("button");
    button.textContent = "Use the bandaid (+25 HP)";
    button.addEventListener("click", useBandaid);
    choicesContainer.appendChild(button);
  }
}

// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health
function updateHealth(amount) {
  health += amount;
  if (health > 100) {
    health = 100;
  }
  if (health < 0) {
    health = 0;
  }
  healthDisplay.textContent = health;
  if (health === 0) {
    clearInterval(snakeOilTimer);
    updateScene("dead");
  }
}

// This refreshes the health display

updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is.
// --------------------------------------------------

// Create a variable for inventory
let inventory = [
  "a flashlight",
  "a bandaid",
  "a fingernail clipper",
  "empty glass bottle",
];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const timeDisplay = document.getElementById("time-display");
inventoryDisplay.textContent = inventory.join(", ");

// Create a function to update inventory
function pickUpItem(itemName) {
  // Add itemName to the inventory array
  // Show the updated inventory on the page
  if (!inventory.includes(itemName)) {
    inventory.push(itemName);
  }
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL
// Depending on how you want to implement the conditional logic, you may
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (!inventory.includes("skeleton key")) {
    timeDisplay.textContent +=
      " The door is locked. You need the skeleton key.";
    return false;
  }
  updateHealth(-5);
}

function updateTime(amount) {
  time += amount;
  const hours = Math.floor(time / 60);
  let minutes = time % 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  timeDisplay.textContent = "" + hours + ":" + minutes + " PM";
  if (amount > 0 && time >= 540) {
    time = 540;
    clearInterval(snakeOilTimer);
    updateScene("tooLate");
  }
}

function useBandaid() {
  if (
    !inventory.includes("a bandaid") ||
    health <= 0 ||
    time >= 540 ||
    currentScene === "snakeOil" ||
    currentScene === "solution"
  ) {
    return;
  }
  inventory.splice(inventory.indexOf("a bandaid"), 1);
  inventoryDisplay.textContent = inventory.join(", ");
  updateHealth(25);
  updateScene(currentScene);
}

function restartGame() {
  clearInterval(snakeOilTimer);
  health = 100;
  time = 494;
  bladeStopped = false;
  inventory = [
    "a flashlight",
    "a bandaid",
    "a fingernail clipper",
    "empty glass bottle",
  ];
  inventoryDisplay.textContent = inventory.join(", ");
  updateHealth(0);
  updateScene("outside_pumpkin_patch");
}

// This updates the screen with the current scene
updateScene(currentScene);
