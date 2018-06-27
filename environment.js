

var Environment = function(){


    this.populationSize = 200;
    this.survivors = [];
    this.survivorsChildren = [];
    this.robots = [];
    this.maze = [[]];
    this.generation_counter=0;



} 


Environment.prototype.generateInitialPopulation = function(){
//Chama o metodo de gerar mapa aleatorio do robo




}


Environment.prototype.generateTwoMult = function(){

    return (Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1))) + Math.ceil(1) ) *2;



}



Environment.prototype.newGeneration = function(survivors){
//Irá chamar o generate child de robo, irá alterar o survivorsChildren com os novos 
//E depois colocará uma concatenação de survivors e children em robots e limpará survivorsChildren e survivors
//Ou podemos usar a roleta


    
}




Environment.prototype.selectSurvivors = function(){
//Escolher os robos que possuem os 200 melhores fitness para proxima geração
//Os pais continuam na nova geração



}



