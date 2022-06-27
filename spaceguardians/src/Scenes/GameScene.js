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
    this.starfield = this.add.image(0, 0, 'starfield').setScale(3);
    this.player = this.add.image(400, 530, 'player');
    //creating the aliens
    this.aliens = this.add.group();
    this.aliens.enableBody = true;
    this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
    this.createAliens();
  }
  createAliens() {
    for (let y = 4; y < 7; y++) {
      for (let x = 4; x < 14; x++) {
        let alien = this.aliens.create(x * 48, y * 35, 'blueInvader');
        // alien.anchor.setTo(1, 1);
        // alien.animations.add('fly', [0, 1, 2, 3], 20, true);
        // alien.play('fly');
        // alien.body.moves = false;
      }
    }
    for (let y = 3; y < 4; y++) {
      for (let x = 5; x < 13; x++) {
        let alien = this.aliens.create(x * 48, y * 35, 'blueYellowInvader');
      }
    }
    for (let y = 2; y < 3; y++) {
      for (let x = 6; x <= 11; x++) {
        let alien = this.aliens.create(x * 48, y * 35, 'redBlueInvader');
      }
    }
    for (let y = 1; y < 2; y++) {
      for (let x = 7; x <= 10; x++) {
        if (x === 7 || x == 10) {
          let alien = this.aliens.create(x * 48, y * 35, 'strongestInvader');
        }
      }
    }
    this.aliens.x = 150;
    this.aliens.y = 40;

    // //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    // var tween = this.add
    //   .tween(this.aliens)
    //   .to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    // tween.onLoop.add(this.descend, this);
  }
  descend() {
    this.aliens.y += 10;
  }
}

export default GameScene;
