var dogImage;
var database;
var dog;
var foodStock;
var feedTheDog;
var addFood;
function preload() {
  dogImage = loadImage("Images/dog1.jpeg");
}

function setup() {
  database = firebase.database();

  createCanvas(1500, 700);

  dog = createSprite(250, 350, 150, 150);
  dog.addImage("Junior", dogImage);
  dog.scale = 0.1;
  var dogRef = database.ref("foodCount");
  dogRef.on("value", function (data) {
    foodStock = data.val();
  });
  feedTheDog = createButton("feedTheDog");
  addFood = createButton("addFood");
  feedTheDog.position(480, 250);
  addFood.position(400, 250);
  textSize(20);
}

function draw() {
  background("black");

  feedTheDog.mousePressed(() => {
    updateFood();
    if (foodStock <= 0) {
      foodStock = 0;
    }
  });
  addFood.mousePressed(() => {
    database.ref("/").update({
      foodCount: foodStock + 1,
    });
  });

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Leftover Food: " + foodStock, 40, 40);
}

function updateFood() {
  database.ref("/").update({
    foodCount: foodStock - 1,
  });
}
