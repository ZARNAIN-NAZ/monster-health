const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK"
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MOSNTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";


const enteredValue = prompt("maximum life for you and the monster , ", '100');


let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;

}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;


adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val ,monsterHealth , playerHealth) {
  let LogEntry= {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    LogEntry.target = " MONSTER";
  }
  else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    LogEntry = {
      event: ev,
      value: val,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  }
  else if (ev === LOG_EVENT_MONSTER_ATTACK){
    LogEntry = {
      event: ev,
      value: val,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
} 
else if (ev === LOG_EVENT_PLAYER_HEAL) {
  LogEntry = {
    event: ev,
    value: val,
    target: 'PLAYER',
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
} else if (ev === LOG_EVENT_GAME_OVER) {

  LogEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
}
battleLog.push(LogEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initalPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
  currentPlayerHealth -= playerDamage;
writeToLog(
  LOG_EVENT_MONSTER_ATTACK ,
   playerDamage,
    currentMonsterHealth , 
    currentPlayerHealth
    )

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initalPlayerHealth;
    alert("you would be died but bonus life saved you!")
    setPlayerHealth(initalPlayerHealth);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won...");
    writeToLog(LOG_EVENT_GAME_OVER ,
      "PLAYER WON",
       currentMonsterHealth , 
       currentPlayerHealth
       )
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("u lost");
    writeToLog(LOG_EVENT_GAME_OVER ,
      "MOSNTER WON",
       currentMonsterHealth , 
       currentPlayerHealth
       )
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("you have a draw!")
    writeToLog(LOG_EVENT_GAME_OVER ,
      "A DRAW",
       currentMonsterHealth , 
       currentPlayerHealth
       )
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let LogEvent;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    LogEvent = LOG_EVENT_PLAYER_ATTACK
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    LogEvent = LOG_EVENT_PLAYER_STRONG_ATTACK

  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(
   LogEvent ,
   damage,
     currentMonsterHealth , 
     currentPlayerHealth
     )
  endRound();
}


function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK)
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("you can't heal to more than your max initial health.  ")
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;

  writeToLog(
   LOG_EVENT_PLAYER_HEAL ,
   healValue,
      currentMonsterHealth , 
      currentPlayerHealth
      )
  endRound();

}
function printLogHandler(){
  console.log(battleLog);
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener("click" , printLogHandler)
