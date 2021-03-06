



 var  Robot = function(x,y,maze){


    /*
    Direções
        8
      4   6
        2
    0 é parede        
    */
    this.path = [];
    this.fitness = 0;
    this.initialPosition = [];
    this.initialPosition[0] = x;
    this.initialPosition[1] = y;
    this.maze = maze;

    

    this.path.push(this.generateTwoMult());
    






}


Robot.prototype.setFitness = function(fitness){
    this.fitness = fitness;
}

Robot.prototype.getFitness = function(){
    return this.fitness;
}


Robot.prototype.getMaze = function(){
    return this.maze;
}

Robot.prototype.getPath = function(){
    return this.path;
}



Robot.prototype.calcFitness = function(){

//Teste do mapa, atribuição de escore
//para todo movimento dar ponto, se bate em parede dar ponto, quantidade de movimentos


    this.fitness = 0; //zera pois ele vai recalcular do ponto inicial novamente
    var currentPosition = [this.initialPosition[0], this.initialPosition[1]];
    var visitedPositionsX = [];
    var visitedPositionsY = [];
    
	 visitedPositionsX.push(this.initialPosition[0]);
	 visitedPositionsY.push(this.initialPosition[1]);

  
    for(var i=0; i<this.path.length; i++){


        var direction = this.path[i];

        switch(direction){

            case 2: //Desce
                currentPosition = getBottom(currentPosition);
            break;
            case 4:
                currentPosition = getLeft(currentPosition);
            break;
            case 6:
                currentPosition = getRight(currentPosition);
            break;
            case 8: 
                currentPosition = getTop(currentPosition);
            break;

        }

       
        //Verificar quanto de fitness aplicar
        if( currentPosition[0] <0 || currentPosition[1] <0 || currentPosition[0] >= this.maze.length || currentPosition[1] >= this.maze[0].length ){
            this.fitness = this.fitness + 50;
            return;
        }
        else if(this.maze[currentPosition[0]][currentPosition[1]] == 0){
            this.fitness = this.fitness + 50;
            return;
        }
        else if(this.verifyLoop(currentPosition, visitedPositionsX, visitedPositionsY)){
            this.fitness = this.fitness + 30;
            return;
        }
        else if(this.maze[currentPosition[0]][currentPosition[1]] == 3){ //chegou ao fim do labirinto
            this.fitness = this.fitness - 1000;
            return;
        }
        else{
            this.fitness = this.fitness - 5;
        }




        visitedPositionsX.push(currentPosition[0]);
        visitedPositionsY.push(currentPosition[1])

    }
    





}




Robot.prototype.verifyLoop = function(currentPosition, visitedPositionsX, visitedPositionsY){

    for(var i = 0; i<visitedPositionsX.length; i++){
        var comparablePositionX = visitedPositionsX[i];
        var comparablePositionY = visitedPositionsY[i];
        if(currentPosition[0] == comparablePositionX && currentPosition[1] == comparablePositionY){
            return true;
        }
    }
    return false;
}




function getTop(position){

    position[0] -= 1;
    return position;

}

function getBottom(position){

    position[0] += 1;
    return position;

}

function getRight(position){

    position[1] += 1;
    return position;

}

function getLeft(position){

    position[1] -= 1;
    return position;

}


Robot.prototype.mutate = function(){
//Sortear um espaço vazio que nao seja parede e trocar por um aleatorio


   var mutateDecision = Math.floor(Math.random()*20);
    
	if(mutateDecision >= 5 && mutateDecision <= 5){
		//5% de chance de acrescentar uma posição
		var direction = this.generateTwoMult();
		this.path.push(direction);	
	}
	else if(mutateDecision >= 7 && mutateDecision <= 7){
		this.path.pop();	
    }
	else if(mutateDecision >= 3 && mutateDecision <=4){
		
		var pos_mut = Math.floor(Math.random()*(this.path.length*0.3) + this.path.length*0.7 ); //muta somente os ultimos passos
		this.path[pos_mut] = this.generateTwoMult();
		
	}

   
    
    //if(this.path.length == 1 || mutateDecision == 1 ){ //Se tiver somente uma direção adiciona, ou se for sorteado

      //  var direction = this.generateTwoMult();
      //  this.path.push(direction);
        
    //}
    //else if(mutateDecision == 0){
        //this.path.pop();

    //}
    //else{
    	//do nothing
    //}


    
}


Robot.prototype.generateTwoMult = function(){
    
    
   
    return (Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1))) + Math.ceil(1) ) *2;

    


}


Robot.prototype.generatChild = function(partner){
//Deve considerar somente os ponto que não possuem parede
//Faz swap de cada ponto que nao possui paredes entre os pais sobreviventes

    var child = $.extend(true, {}, partner);
    var pathChild = child.getPath();
    var positionModified = Math.floor(Math.random() * this.path.length);//escolhe a posição a receber o gene do pai

    if( typeof pathChild[positionModified] != undefined){ //se a posição do parceiro existir

        pathChild[positionModified] = this.path[positionModified];  


    }
    else{ //Adiciona um novo passo(gene) retirado do pai

        //pathChild.push(this.path[positionModified]);

    }

  
    return child; //child

    

    
}
    



    


