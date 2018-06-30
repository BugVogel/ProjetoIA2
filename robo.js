



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
    var visitedPositions = [[currentPosition]];



  
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
        else if(this.verifyLoop(currentPosition, visitedPositions)){
            this.fitness = this.fitness + 30;
            return;
        }
        else if(this.maze[currentPosition[0]][currentPosition[1]] == 3){ //chegou ao fim do labirinto
            this.fitness =0;
            return;
        }
        else{
            this.fitness = this.fitness - 5;
        }


        visitedPositions.push(currentPosition);

    }
    





}




Robot.prototype.verifyLoop = function(currentPosition, visitedPositions){

    for(var i = 0; i<visitedPositions.length; i++){
        var comparablePosition = visitedPositions[i];
        if(currentPosition[0] == comparablePosition[0] && currentPosition[1] == comparablePosition[1]){
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


    var mutateDecision = Math.floor(Math.random() *2);
    

    if(this.path.length == 1 || mutateDecision == 1 ){ //Se tiver somente uma direção adiciona, ou se for sorteado

        var direction = this.generateTwoMult();
        this.path.push(direction);
        
    }
    else{
        this.path.pop();

    }


    
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

        pathChild.push(this.path[positionModified]);

    }

  
    return child; //child

    

    
}
    



    


