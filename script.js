let xp = 0
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document. querySelector("#button2");
const button3 = document.querySelector("button3");
const text = document.querySelector("text");
const xpText = document.querySelector("xptext");
const healthText = document.querySelector("healthtext");
const goldText = document.querySelector("goldText");
const monsterStats = document.querySelector("monsterStat");
const monsterNameText = document.querySelector("monsterName");
const monsterHealthText = document.querySelector("#monsterhealth");

const weapons = [
    {
        name: "stick",
        power:5
    },
    {
        name:"dagger",
        power: 30
    },
    {
        name:"claw hammer",
        power: 50
    },
    {
        name:"sword",
        power:100
    }
];
const monsters = [
    {
        name:"slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health: 300
    }
];


const locations = [
    {
        name:"town square",
        "button text": ["goStore","Go to Cave", "Fight dragon"],
        "button functions":[goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says\"Store.\""
    },
    {
        name:"store",
        "button text":["buy 10 health (10 gold)", "buy weapon (30 gold)","Go to town square"],
        "button functions":[buyHealth,buyWeapon,goTown],
        text:"you enter the store."
    },
{
name:"cave",
"button text":["fight slime","fight fanged beast", "Go to town square"],
"button functions":[fightSlime, fightBeast, goTown],
text: "you enter the cave. you see some monsters."

},
{
    name:"fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text:"you sre fighting a monster."
},
  { name: "kill monster",
   "button text":["go to town square","go to town square "],
   " button fuctions": [attack, dodge, goTown],
   text:'The monster screams "arg!" as it dies. you gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions":[restart, restart, restart],
  },
  {
    name: "win",
    "button text":["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions":[restart, restart,restart],
    text: "you defeat the dragon! YOU WIN THE GAME!" 
  },
  {
    name: "easter egg",
    "button text": ["2","8", "Go to town square?"],
    "button functions" : [pickTwo, pickEight, goTown],
    text:" you find a secret game. pick a number. ten mumbers will be randomly chosen between 0 and 10. if the number you choose matches one of the random numbers,you win!"
  } 
]
//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update (location){
monsterStats.style.display="none";
    button1.innerText= location["button text"][0] ;
    button2.innerText= location["button text"][1];
    button3.innerText= location ["button text"][2];
    button1.onClick= location["button functions"][0];
    button2.onClick= location["button functions"][1];
    button3.onClick= loction["button functions"][2];
    text.innerText= location.text;
}

function goTown () {
   update(locations[0]);
    
}

function goStore() {
    update(locations[1])
    }
function goCave () {
    console.log("going to cave")
}

function buyHealth (){
if (gold>=10) {
    gold-= 10
    health += 10
    goldText.innerText = gold;
    healthText.innerText = health;
} else {
    text.innerText="you do not have enough gold to buy health.";
 }
}

function buyWeapon () {
if (currentWeapon<weapons.length-1) {
    if  (gold>=30){
        gold-=30;
        currentWeapon ++;
        goldText.innerText= gold;
        let newWeapon = weapons[currentweapon].name;
        text.innerText="you now have a"+ newWeapon+".";
        inventory.push(newWeapon);
        text.innerText +="in your inventory you have " +inventory;
  } else {
    text.innerText = " you do not have enough gold to by weapon.";
  } else {
    text.innerText = "you already have the most powerful weapon!";
    button2.innerText = "sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
}
function sellWeapon (){
    if (inventory.length >1){
        gold +=15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText="you sold a "+ currentWeapon + ".";
        text.innerText += "in your inventory you have: " +inventory;
    } else {
        text.innerText="Don't sell your only weapon!";
    }
}
function fightSlime(){
    fighting = 0;
    goFight();
}
function fightBeast(){
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function goFight(){
 update(locations[3]);
 monsterHealth=monsters[fighting].health;
 monsterStats.computedStyleMap.display="block";
 monsterNameText.innerText=monsters[fighting].name;
 monsterHealthText.innerText=monsterHealth
}
function attack (){
 text.innerText="The"+ monsters[fighting].name+"attacks";
 text.innerText += "you attack it with your" + weapon[currentWeapon].name+".";
 if (isMonsterHit()){
    health -= getMonsterAttackValue(monsters[fighting].level);
 } else {
    text.innerText += "you miss";
 }
 
 monsterHealth -= weapons[currentWeapon].power + Math.floor (Math.random()* xp)+1;;
 healthText.innerText = health;
 monsterHealthText.innerText=monsterHealth;
 if (health <=0) {
    lose();
 } 
 else if (monsterHealth <=0) {
    fighting === 2 ? winGame() :defeatMonster();
 }
 if (Math.random()<=.1 && inventory.length !==1){
    text.innerText += "your"+ inventory.pop()+ "breaks";
    currentWeapon--;
 }
}
function getMonsterAttackValue(level){
    let hit = (level * 5)-(Math.floor(Math.random()* xp));
    console.log(hit);
    return hit;
}
function isMonsterHit(){
    return Math.random()>.2 || health < 20;
}

function Dodge(){
text.innerText = "you dodge the attack from the"+monsters[fighting].name +".";
}

function defeatMonster(){
gold += Math.floor(monsters[fighting].level * 6.7);
xp += monsters[fighting].level;
goldText.innerText= gold;
xpText.innerText=xp;
update(location[4]);
}

function lose(){
update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory=["stick"];
    goldText.innerText= gold;
    healthText.innerText = xp;
    xpText.innerText=xp;
    goTown();
}
function easterEgg(){
    update(locations[7]);
}
function pickTwo(){
    pickTwo(2)
}

function pickEight(){
    pickEight(8)
}
function pick(guess) {
    let numbers = [];
    while(numbers.length<10) {
         numbers.push(Math.floor(Math.random()  *11))
    }
    text.innerText="you picked" + guess+ ".Here are the random numbers:\n";
    for (let i =0; i < 10; i++){
        text.innerText += numbers[i]+"\n";
    }
    if (numbers.indexOf(guess) !== -1){
        text.innerText += "Right! You win 20 gold!"
        gold +=20;
        goldText.innerText = gold;
    }
    else {
        text.innerText += "wrong! you lose 10 health!"
        health -= 10;
        healthText.innerText = health;
     if (health <= 0 ){
        lose();
     }   
    }
}

