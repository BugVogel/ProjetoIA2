

var Robot = function(){


    /*
    Direções
        8
      4   6
        2
    0 é parede        
    */
    this.map = [[]];
    this.fitness = 0;
    this.maxIntaration =  200;






}



Robot.prototype.randomMap = function(originalMaze){
//Gera mapa aleatorio para população inicial
//Olhar o labirinto original e vai gerar valores aleatorios de direção apenas nos campos onde não há parede.
//Parede =0 e caminho = 1 e chegada = 3






}

Robot.prototype.calcFitness = function(){

//Teste do mapa, atribuição de escore
//para todo movimento dar ponto, se bate em parede dar ponto, quantidade de movimentos



}


Robot.prototype.mutate = function(){
//Sortear um espaço vazio que nao seja parede e trocar por um aleatorio


    
}


Robot.prototype.generateTwoMult = function(){

    return (Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1))) + Math.ceil(1) ) *2;



}


Robot.prototype.generatChild = function(partner){
//Deve considerar somente os ponto que não possuem parede
//Faz swap de cada ponto que nao possui paredes entre os pais sobreviventes




    var child = new Robot();


    return child;
}