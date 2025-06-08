let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let creatureHealth;
let inventory = [" stick"];
let inventoryImage = ["assets/images/icons/stick.png"]
let locationData;
let scenarioData;
let useSoundeffects = true;

const startScreen = document.querySelector("#startScreen");
const buttonStart = document.querySelector("#buttonStart");
const buttonNoNoise = document.querySelector("#noNoise");
const game = document.querySelector("#game");
const entranceSound = new Audio("assets/sound/entrancebell.mp3");
const coinSound = new Audio("assets/sound/coins.mp3");
const doorSound = new Audio("assets/sound/door.mp3");
const waterSound = new Audio("assets/sound/waterdrop.mp3");
const footstepSound = new Audio("assets/sound/footstep.mp3");
const dragonSound = new Audio("assets/sound/dragon.mp3");
const birthdaySound = new Audio("assets/sound/birthday.mp3");
const punchSound = new Audio("assets/sound/punch.mp3");
const whistleSound = new Audio("assets/sound/whistle.mp3");
const birdSound = new Audio("assets/sound/birds.mp3");
const fightSound = new Audio("assets/sound/fight.mp3");
const deathSound = new Audio("assets/sound/death.mp3");
const backgroundMusic = document.querySelector("#backgroundMusic");
const item1 = document.querySelector("#item1");
const item2 = document.querySelector("#item2");
const item3 = document.querySelector("#item3");
const item4 = document.querySelector("#item4");
const inventoryImage1 = document.querySelector("#inventoryImage1");
const inventoryImage2 = document.querySelector("#inventoryImage2");
const inventoryImage3 = document.querySelector("#inventoryImage3");
const inventoryImage4 = document.querySelector("#inventoryImage4");
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const locationImage = document.querySelector("#locationImage");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const creatureStats = document.querySelector("#creatureStats");
const creatureName = document.querySelector("#creatureName");
const creatureHealthText = document.querySelector("#creatureHealth");


const weapons = [
  { name: ' stick', power: 5, image: "assets/images/icons/stick.png" },
  { name: ' dagger', power: 30, image: "assets/images/icons/dagger.png" },
  { name: ' spear', power: 50, image: "assets/images/icons/spear.png" },
  { name: ' sword', power: 100, image: "assets/images/icons/sword.png" }
]; 

const creatures = [
  {
    name: "Gloop",
    level: 2,
    health: 15
  },
  {
    name: "Bat",
    level: 8,
    health: 60
  },
  {
    name: "Dragon",
    level: 20,
    health: 300
  }
];


// initialize buttons
buttonStart.onclick = startGame;
button1.onclick = goStore;
button2.onclick = goTavern;
button3.onclick = goForest;
button4.onclick = fightDragon;

backgroundMusic.loop = true;
backgroundMusic.volume = 0.050;

buttonNoNoise.onclick = function() {
  useSoundeffects = !useSoundeffects;	
  buttonNoNoise.innerText = useSoundeffects ? "Disable sound effects" : "Turn on sound effects";
}

function updateInventory() {
  console.log(inventoryImage.length)
  console.log(inventory.length)
if (inventoryImage.length === 1) {
  console.log(inventoryImage)
inventoryImage1.src = inventoryImage[0];
item1.style.display = "inline";
item2.style.display = "none";
item3.style.display = "none";
item4.style.display = "none"; 
} else if (inventoryImage.length === 2) {
inventoryImage1.src = inventoryImage[0];
inventoryImage2.src = inventoryImage[1];
item1.style.display = "inline";
item2.style.display = "inline";
item3.style.display = "none";
item4.style.display = "none"; 
} else if (inventoryImage.length === 3) {
inventoryImage1.src = inventoryImage[0];
inventoryImage2.src = inventoryImage[1];
inventoryImage3.src = inventoryImage[2];
item1.style.display = "inline";
item2.style.display = "inline";
item3.style.display = "inline";
item4.style.display = "none"; 
} else if (inventoryImage.length === 4) {
inventoryImage1.src = inventoryImage[0];
inventoryImage2.src = inventoryImage[1];
inventoryImage3.src = inventoryImage[2];
inventoryImage4.src = inventoryImage[3];
item1.style.display = "inline";
item2.style.display = "inline";
item3.style.display = "inline";
item4.style.display = "inline";
}}


function update(location) {
  creatureStats.style.display = "none";
  button1.innerText = location.buttonText[0];
  button2.innerText = location.buttonText[1];
  button3.innerText = location.buttonText[2];
  button4.innerText = location.buttonText[3];
  button1.onclick = functionMap[location.buttonFunction[0]];
  button2.onclick = functionMap[location.buttonFunction[1]];
  button3.onclick = functionMap[location.buttonFunction[2]];
  button4.onclick = functionMap[location.buttonFunction[3]];
  document.getElementById("game")?.focus({ preventScroll: true });
  if (location.image) {
    text.innerHTML = location.text;
    locationImage.src = location.image;
    locationImage.style.display = "block";
  } else {
   text.innerText = location.text;
   locationImage.style.display = "none";
  }
}

function start(scenario) {
  creatureStats.style.display = "none";
  button1.innerText = scenario.buttonText[0];
  button2.innerText = scenario.buttonText[1];
  button3.innerText = scenario.buttonText[2];
  button4.innerText = scenario.buttonText[3];
  button1.onclick = functionMap[scenario.buttonFunction[0]];
  button2.onclick = functionMap[scenario.buttonFunction[1]];
  button3.onclick = functionMap[scenario.buttonFunction[2]];
  button4.onclick = functionMap[scenario.buttonFunction[3]];
  document.getElementById("game")?.focus({ preventScroll: true });
  if (scenario.image) {
    text.innerHTML = scenario.text;
    locationImage.src = scenario.image;
    locationImage.style.display = "block";
  } else {
   text.innerText = scenario.text;
   locationImage.style.display = "none";
  }
}

function goTown() {
  update(locationData.townSquare);
  if (useSoundeffects) {
  footstepSound.volume = 0.5;
  footstepSound.play();}
  button1.style.display = "inline";
  button2.style.display = "inline";
  button3.style.display = "inline";
  button4.style.display = "none";
}

function goStore() {
  update(locationData.store);
  if (useSoundeffects) {
  entranceSound.volume = 0.1;
  entranceSound.play();}
  button4.style.display = "none";
}

function goTavern() {
  update(locationData.tavern);
  if (useSoundeffects) {
  doorSound.volume = 0.5;
  doorSound.play();}
  button4.style.display = "inline";
}

function goForest() {
  update(locationData.forest);
  if (useSoundeffects) {
  footstepSound.volume = 0.5;
  footstepSound.play();}
  button1.style.display = "inline";
  button2.style.display = "inline";
  button3.style.display = "inline";
  button4.style.display = "inline";
}

function goCave() {
  update(locationData.cave);
  if (useSoundeffects) {
  waterSound.volume = 0.75;
  waterSound.play();}
  button4.style.display = "none";
}

function goClearing() {
  if (Math.random() < 0.5) {
  update(locationData.clearingEmpty);
  if (useSoundeffects) {
  birdSound.volume = 0.5;
  birdSound.play();}
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "none";
} else if (Math.random() >= 0.5) {
  update(locationData.clearingGame);
  if (useSoundeffects) {
  whistleSound.volume = 0.25;
  whistleSound.play();}
  button1.style.display = "inline";
  button2.style.display = "inline";
  button3.style.display = "none";
  button4.style.display = "none";
}}

function goMountain() {
  update(locationData.mountain);
  if (useSoundeffects) {
  dragonSound.volume = 0.25;
  dragonSound.play();} 
  button1.style.display = "inline";
  button2.style.display = "inline";
  button3.style.display = "inline";
  button4.style.display = "none";
  }

 async function startGame() {
  try {
    const [locationRes, scenarioRes] = await Promise.all([
      fetch("data/locations.json"),
      fetch("data/scenarios.json")
    ]);

    locationData = await locationRes.json();
    scenarioData = await scenarioRes.json();

    console.log("Locations:", locationData);
    console.log("Scenario:", scenarioData);

  } catch (error) {
    console.error("Error loading json files", error);
  }
  startScreen.style.display = "none";
  game.style.display = "block";
  goTown();
  updateInventory();
}


function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    if (useSoundeffects) {
    coinSound.play();}
    document.getElementById("game")?.focus({ preventScroll: true });
  } else {
    text.innerText = "You do not have enough gold to buy health. Maybe focus on some inner healing instead?";
    document.getElementById("game")?.focus({ preventScroll: true });
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      let newWeaponImage = weapons[currentWeapon].image;
      text.innerText = "You now have a " + newWeapon + ". You can now kill stronger creatures, if you really want to.";
      inventory.push(newWeapon);
      inventoryImage.push(newWeaponImage);
      text.innerText += " In your inventory you have: " + inventory;
      if (useSoundeffects) {
      coinSound.play();}
      updateInventory();
      document.getElementById("game")?.focus({ preventScroll: true });
    } else {
      text.innerText = "You do not have enough gold to buy a weapon. Maybe that's for the best.";
      document.getElementById("game")?.focus({ preventScroll: true });
    }
  } else {
    text.innerText = "You already have the most powerful weapon! Is enough not enough for you?";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
    document.getElementById("game")?.focus({ preventScroll: true });
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    if (useSoundeffects) {
    coinSound.play();}
    gold += 15;
    goldText.innerText = gold;
    let soldWeapon = inventory.shift();
    inventoryImage.shift();
    text.innerText = "You sold a " + soldWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
    updateInventory();
    document.getElementById("game")?.focus({ preventScroll: true });
  } else {
    text.innerText = "Don't sell your only weapon!";
    document.getElementById("game")?.focus({ preventScroll: true });
  }
}

function buyDrink() {
  if (gold >= 5) {
    if (useSoundeffects) {
    coinSound.play();}
    gold -= 5;
    health += 5;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You bought a drink. You feel a bit better.";
    document.getElementById("game")?.focus({ preventScroll: true });
  } else {
    text.innerText = "You do not have enough gold to buy a drink. Maybe you should drink some water instead?";
    document.getElementById("game")?.focus({ preventScroll: true });
  }
}

function buyStew() {
  if (health > 5 && gold >= 10) {
    if (useSoundeffects) {
    coinSound.play();}
    gold -= 10;
    health -= 5;
    goldText.innerText = gold;    
    healthText.innerText = health;
    text.innerText = "You bought a stew. You bite into what you assumed was meat, only for it to collapse into a warm, gooey substance that tastes like someone tried to ferment broth in a sock. You don't feel so good.";
    document.getElementById("game")?.focus({ preventScroll: true });
  } else if (health > 6 && gold < 10) {
    text.innerText = "You do not have enough gold to buy a stew. Maybe that's for the best. The tavern is known for its questionable hygiene.";
    document.getElementById("game")?.focus({ preventScroll: true });
  } else if (health <= 5 && gold >= 10) {
   stewDeath();
  }
}

function stewDeath () {
  start(scenarioData.stewDeath);
  if (useSoundeffects) {
  deathSound.volume = 0.5;
  deathSound.play();}
  button1.style.display = "inline"
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "none";
}

function startFight() {
  if (Math.random() >= 0.5) {
    if (useSoundeffects) {
    birthdaySound.volume = 0.5;
    birthdaySound.play();}
    health += 5;
    healthText.innerText = health;
    text.innerText = "You walk towards the nearest person in the tavern, raising your fist. They smile and wave back. They are celebrating their birthday and brought their friends. They buy you a drink. You eat some cake. Life is good. You gain 5 health.";
    document.getElementById("game")?.focus({ preventScroll: true });
  } else if (Math.random() < 0.5 && health > 5) {
    if (useSoundeffects) {
    punchSound.volume = 0.5;
    punchSound.play();}
    health = 1;
    healthText.innerText = health;
    text.innerText = "You walk towards the nearest person in the tavern and punch them in the face. They were celebrating their birthday and brought their friends. They beat you up and leave you lying on the floor. They get some drinks and eat some cake. You lose all but 1 health.";
    document.getElementById("game")?.focus({ preventScroll: true });
  } else if (Math.random() < 0.5 && health === 1) {
    text.innerText = "You walk towards the nearest person in the tavern, raising your fists. They look at you with pity and shake their head. You are too weak to fight. You feel embarrassed. Maybe you should leave.";
    document.getElementById("game")?.focus({ preventScroll: true });
  }   
}

function fightGloop() {
  fighting = 0;
  goFight();
}

function fightBat() {
  fighting = 1;
  goFight();
}

function stealStew() {
  if (Math.random() < 0.5 && health > 10) {
    health -= 10;
    healthText.innerText = health;
    text.innerText = "You successfully steal the stew and grab a bite. You don't feel so good. The dragon looks at you with a look of understanding, as if it knows what you're going through. You lose 10 health.";
    button1.style.display = "inline";
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    document.getElementById("game")?.focus({ preventScroll: true });
  } else if (Math.random() < 0.5 && health <= 10) {
    lose();
  } else {
    fightDragon();
    }
  }

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  start(scenarioData.fight);
  if (useSoundeffects) {
  fightSound.volume = 0.5;
  fightSound.play();}
  creatureHealth = creatures[fighting].health;
  creatureStats.style.display = "block";
  creatureName.innerText = creatures[fighting].name;
  creatureHealthText.innerText = creatureHealth;
  button1.style.display = "inline";
  button1.style.display = "inline";
  button1.style.display = "inline";
  button1.style.display = "inline";
}

function attack() {
  text.innerText = "The " + creatures[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getCreatureAttackValue(creatures[fighting].level);
  if (isCreatureHit()) {
    creatureHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
    document.getElementById("game")?.focus({ preventScroll: true });
  } else {
    text.innerText += " You miss.";
    document.getElementById("game")?.focus({ preventScroll: true });
  }
  healthText.innerText = health;
  creatureHealthText.innerText = creatureHealth;
  if (health <= 0) {
    lose();
  } else if (creatureHealth <= 0) {
    if (fighting === 2) {
      endGame();
    } else {
      murderCreature();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += "Oh no... your " + inventory.pop() + " breaks.";
    currentWeapon--;
    document.getElementById("game")?.focus({ preventScroll: true });
    inventoryImage.pop();
    updateInventory();
  }
}

function getCreatureAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isCreatureHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + creatures[fighting].name;
  document.getElementById("game")?.focus({ preventScroll: true });
}

function murderCreature() {
  if (useSoundeffects) {
  deathSound.volume = 0.5;
  deathSound.play();}
  gold += Math.floor(creatures[fighting].level * 6.7);
  xp += creatures[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  start(scenarioData.murderCreature);
  button1.style.display = "inline";
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "none";
}

function lose() {
  if (useSoundeffects) {
  deathSound.volume = 0.5;
  deathSound.play();}
  start(scenarioData.lose);
  button1.style.display = "inline";
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "none";
}

function endGame() {
  if (useSoundeffects) {
  deathSound.volume = 0.5;
  deathSound.play();}
  start(scenarioData.endGame);
  button1.style.display = "inline";
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "none";
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function gamble() {
  start(scenarioData.gamble);
  button1.style.display = "inline";
  button2.style.display = "inline";
  button3.style.display = "inline";
  button4.style.display = "inline";
}

function pickOne() {
  pick(1);
  button1.style.display = "none";
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "inline";
}

function pickTwo() {
  pick(2);
  button1.style.display = "none";
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "inline";
}

function pickThree() {
  pick(3);
  button1.style.display = "none";
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "inline";
}


function pick(guess) {
  if (guess === Math.floor(Math.random() * 3) + 1) {
    document.getElementById("game")?.focus({ preventScroll: true });
    if (useSoundeffects) {
    coinSound.play();}
    text.innerText = "You won! The man glares at you and mumbles something about how outsiders always cheat. He hands you 20 gold.";
    gold += 20;
    goldText.innerText = gold;
  } else {
    document.getElementById("game")?.focus({ preventScroll: true });
    text.innerText = "You lose. The man laughs at you and bonks you on the head with his - very full - coinpouch. You feel a bit dizzy and your vision blurs. You lose 10 health.";
    health -= 10;
    healthText.innerText = health;
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "inline";
    if (health <= 0) {
      lose();
    }}}

const functionMap = {
  goTown,
  goStore,
  goTavern,
  goForest,
  goCave,
  goClearing,
  goMountain,
  buyHealth,
  buyWeapon,
  sellWeapon,
  buyDrink,
  buyStew,
  startFight,
  fightGloop,
  fightBat,
  stealStew,
  fightDragon,
  attack,
  dodge,
  murderCreature,
  lose,
  endGame,
  restart,
  gamble,
  pickOne,
  pickTwo,
  pickThree
}
