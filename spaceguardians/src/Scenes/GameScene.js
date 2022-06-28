import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
    this.player = null;
    this.aliens = null;
    this.starfield = null;
  }
  preload() {
    this.load.image('starfield', '../assets/bkg.jpg');
    this.load.image('player', '../assets/player.png');
    this.load.image('blueInvader', '../assets/blueEnemy.png');
    this.load.image('blueYellowInvader', '../assets/blueYellowEnemy.png');
    this.load.image('redBlueInvader', '../assets/redBlueEnemy.png');
    this.load.image('strongestInvader', '../assets/strongestEnemy.png');
  }
  create() {
    this.physics.world.setBounds(0, 0, 800, 600);

    this.starfield = this.add.image(0, 0, 'starfield').setScale(3);
    this.player = this.physics.add.image(400, 530, 'player');
    this.player.setCollideWorldBounds(true)

    //creating the aliens
    this.aliens = this.physics.add.group();
    this.aliens.enableBody = true;
    this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
    this.container = this.add.container(0, 0);
    //this.container.setCollideWorldBounds(true);
    this.createAliens();

  }
  createAliens() {


    for (let y = 4; y < 7; y++) {
      for (let x = 4; x < 14; x++) {
        this.alien = this.aliens.create(x * 48, y * 35, 'blueInvader');
      }
    }
    for (let y = 3; y < 4; y++) {
      for (let x = 5; x < 13; x++) {
        this.alien = this.aliens.create(x * 48, y * 35, 'blueYellowInvader');
      }
    }
    for (let y = 2; y < 3; y++) {
      for (let x = 6; x <= 11; x++) {
        this.alien = this.aliens.create(x * 48, y * 35, 'redBlueInvader');
      }
    }
    for (let y = 1; y < 2; y++) {
      for (let x = 7; x <= 10; x++) {
        if (x === 7 || x === 10) {
          this.alien = this.aliens.create(x * 48, y * 35, 'strongestInvader');
        }
      }
    }
       this.container.add(this.aliens.children.entries)

       var destX = -10;

    var tween = this.tweens.add({
        targets: this.container,
        duration: 6000,
        yoyo: true,
        repeat: -1,

        x: {

            getEnd: function (target, key, value)
            {

                return destX -155;
            },

            getStart: function (target, key, value)
            {
                return destX + 155;
            }

        }

    });

       

   
  }


  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.x -= 3;
    }
    if (cursors.right.isDown) {
      this.player.x += 3;
    }
    if (cursors.down.isDown) {
      this.container.x += 5;
  }
}
}
export default GameScene;

//game.add.tween(gameTitle).to({x: 300}, 2000, Phaser.Easing.Cubic.InOut, true, 0);
