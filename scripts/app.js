const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE =17; 
const MONSTER_ATTACK =14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);
function attackMonster(mode){
  let maxDamage;
if(mode==="ATTACK")
{
maxDamage = ATTACK_VALUE;
}else if(mode === "STRONG_ATTACK"){
  maxDamage = STRONG_ATTACK_VALUE;
}
}


function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  const playerDamage= dealPlayerDamage(MONSTER_ATTACK)
  currentPlayerHealth -=playerDamage;
  if(currentMonsterHealth <= 0 && currentPlayerHealth >0){
    alert("you won...");

  }
  else if(currentPlayerHealth<=0  && currentMonsterHealth >0){
    alert("u lost")
  }
  else if (currentPlayerHealth <=0 && currentMonsterHealth <=0){
    alert("you have a draw!")
  }
}

function strongAttackHandler(){
    const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
    currentMonsterHealth -= damage;
    const playerDamage= dealPlayerDamage(MONSTER_ATTACK)
    currentPlayerHealth -=playerDamage;
    if(currentMonsterHealth <= 0 && currentPlayerHealth >0){
      alert("you won...");
  
    }
    else if(currentPlayerHealth<=0  && currentMonsterHealth >0){
      alert("u lost")
    }
    else if (currentPlayerHealth <=0 && currentMonsterHealth <=0){
      alert("you have a draw!")
    }
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);

