



var Environment = function(maze, initialPopulationSize , x,y){


    this.initialPopulationSize = initialPopulationSize;
    this.survivors = [];
    this.survivorsChildren = [];
    this.robots = [];
    this.maze = maze;
    this.generation_counter=0;
    this.x = x;
    this.y = y;
    this.bestFit = Infinity;
    
} 

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
        }

    }
}


Environment.prototype.generateInitialPopulation = function(){
//Chama o metodo de gerar mapa aleatorio do robo

	 this.generation_counter++;
	   
    for(var i =0; i<this.initialPopulationSize; i++){
        
        var robot = new Robot(this.x,this.y, this.maze);           
        this.robots.push(robot);
        
    }

}


Environment.prototype.generateTwoMult = function(){

    return (Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1))) + Math.ceil(1) ) *2;



}



Environment.prototype.newGeneration = function(survivors){
//Irá chamar o generate child de robo, irá alterar o survivorsChildren com os novos 
//E depois colocará uma concatenação de survivors e children em robots e limpará survivorsChildren e survivors
//Ou podemos usar a roleta


   this.generation_counter++;
   console.log(this.generation_counter);


    for(var i=0; i<this.survivors.length; i++){
        for(var j=0; j<this.survivors.length; j++){

            if(this.survivors[i] != this.survivors[j]) {//se não for ele mesmo
                
                var child = this.survivors[i].generatChild(this.survivors[j]); //Gera filho e adiciona no array de filhos
                this.survivorsChildren.push(child);
                
            }

           
           
        }
        this.survivorsChildren.push(this.survivors[i]);
       
    }




    for(var i=0; i<this.survivorsChildren.length; i++){

        
        this.survivorsChildren[i].mutate(); //Muta os filhos
      
    }

	 this.robots = [];
    this.robots = this.survivorsChildren;
    this.survivorsChildren = [];
    this.survivors = [];

    
    
}




Environment.prototype.selectSurvivors = function(){
//Escolher os robos que possuem os 20 melhores fitness para proxima geração
//Os pais continuam na nova geração

    for(var i=0; i<this.robots.length; i++){


        this.robots[i].calcFitness(); //calcula o fitness
    
    }

 
   this.robots.sort(sortFitness); //ordena pelo fitness

   

    for(var i=0; i<20; i++){ //seleciona os 20 melhores para sobreviver

        this.survivors.push(this.robots[i]);
        //console.log(this.survivors[i]);    
        
    }

    this.bestFit = this.survivors[0].getFitness();
    console.log(this.survivors[0]);



}



Environment.prototype.getAverageFitnessAfterSelectSurvivors = function(){

    var average =0;
    for(var i=0; i<this.survivors.length;i++){
        average += this.survivors[i].getFitness();
    }

    average /= this.survivors.length;
    return average;

}


Environment.prototype.getBestFitAfterSelectSurvivors = function(){

return this.bestFit;
 
}



function sortFitness(a,b){ //Ordenar robôs pelos fitness

    
   
    return a.getFitness() - b.getFitness();

}



