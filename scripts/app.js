const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const enteredValue = prompt("maximum life for you and the monster , ",'100');


let chosenMaxLife = parseInt(enteredValue);

if( isNaN (chosenMaxLife) || chosenMaxLife <=0){
chosenMaxLife=100;

}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
  currentMonsterHealth = chosenMaxLife;
 currentPlayerHealth = chosenMaxLife;
resetGame(chosenMaxLife);
}

function endRound(){
  const initalPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
  currentPlayerHealth -= playerDamage;
if(currentPlayerHealth <=0 && hasBonusLife){
hasBonusLife =false;
removeBonusLife();
currentPlayerHealth = initalPlayerHealth;
alert("you would be died but bonus life saved you!")
setPlayerHealth(initalPlayerHealth);
}

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won...");
   
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("u lost");
  
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("you have a draw!")
   
  }
  if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0)
     {
           reset();
}}

function attackMonster(mode) {
  let maxDamage;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}


function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK")
}

function healPlayerHandler(){
  let healValue;
  if(currentPlayerHealth>= chosenMaxLife - HEAL_VALUE){
    alert("you can't heal to more than your max initial health.  ")
    healValue =chosenMaxLife-currentPlayerHealth;
  }else{
    healValue =HEAL_VALUE;
  }
increasePlayerHealth(healValue);
currentPlayerHealth+=healValue;
endRound();

}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click' ,healPlayerHandler )
