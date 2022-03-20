var bgImg;
var frogImg;
var coinImg, seaImg;
var grass, coin,frog,sea;
var grassGroup, coinGroup;
var score = 0;
var gameState = 'play';

function preload(){
    //bgImg = loadImage('images/bgsea.png');
    frogImg = loadImage('images/frog.png');
    coinImg = loadImage('images/coin.png');
    grassImg = loadImage('images/grass.png');
    seaImg = loadImage('images/bgsea.jpg');
}

function setup(){
    createCanvas(600,500);

    sea = createSprite(0,200,500,500);
    frog = createSprite(300,250,24,24);
    sea.addImage('Sea',seaImg);
    frog.addImage('Frog',frogImg);
    grassGroup = new Group()
    coinGroup = new Group()   
}

function drawGrass()
{
    if (frameCount % 200 == 0)
    {   
        grass = createSprite(Math.round(random(100, 500)),50,20,20);
        grass.addImage('Grass',grassImg);
        //grass.debug = true;
        grass.setCollider('Rectangle',0,-30,240,5);
        grass.velocityY = 1;
        grass.scale = 0.75;
        grass.lifetime = 450;
        grassGroup.add(grass);
    }

}
function drawCoin()
{
    if (frameCount % 100 == 0)
    {
        coin = createSprite(Math.round(random(75, 500)),Math.round(random(50, 250)),50,50);
        coin.addImage('Coin',coinImg);
        //coin.debug = true;
        coin.setCollider('Circle',0,0,20);
        coin.velocityY = 1;
        coin.lifetime = 450
        coinGroup.add(coin)
    }
}

function draw(){
    drawSprites();
    if (sea.y > -400)
            sea.velocityY = -1;
    else
        sea.y = 200;
    if (gameState == 'play')
    {    
        frog.velocityY = 7
        frog.velocityX = 0;
        if(keyDown('space') && frog.y > 50)
        {
            frog.velocityY = -30;
        }
        if(keyDown('right') && frog.x < 550)
        {
            frog.velocityX = 5;
        }
        if(keyDown('left') && frog.x > 50)
        {
            frog.velocityX = -5;
        }
        if (grassGroup.isTouching(frog) && keyDown('space')==false)
        {
            frog.velocityY = 1
        }
        if(coinGroup.isTouching(frog))
        {
            score += 1;
            coin.lifetime=0;
        }
        if(frog.y > 500)
        {
            gameState = 'over';
        }
        drawGrass();
        drawCoin();
        textSize(20);
        fill('red');
        text('SCORE :'+' '+ score,465,50)
    }
    if(gameState == 'over')
    {
        frog.destroy();
        grassGroup.destroyEach();
        coinGroup.destroyEach();
        textSize(19);
        fill('yellow');
        text('Game Over !!',230,300);
    }
    
}
//var grassvisible = false

