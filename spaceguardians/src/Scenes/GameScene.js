import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
    this.player = null;
    this.aliens = null;
    this.starfield = null;
    this.blueInvader = {};
    this.redInvader = {};
    this.yellowInvader = {};
    this.strongestInvader = {};
    this.score = 0;
    this.blueInvaderLength = 30;
  }
  preload() {
    this.load.image('starfield', '../assets/bkg.jpg');
    this.load.image('player', '../assets/player.png');
    this.load.image('blueInvader', '../assets/blueEnemy.png');
    this.load.image('blueYellowInvader', '../assets/blueYellowEnemy.png');
    this.load.image('redBlueInvader', '../assets/redBlueEnemy.png');
    this.load.image('strongestInvader', '../assets/strongestEnemy.png');
    this.load.image('bullet', '../assets/bullet.png');
  }
  create() {
    this.physics.world.setBounds(0, 0, 800, 600);
    this.starfield = this.add.image(0, 0, 'starfield').setScale(3);
    this.player = this.physics.add.image(400, 530, 'player');
    this.add.text(20, 20, `Score : ${this.score}`);
    this.player.setCollideWorldBounds(true);
    // creating the bullet
    this.lastFired = null;
    var Bullet = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize: function Bullet(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(400, 1);
      },
      fire: function (x, y) {
        this.setPosition(x, y - 50);
        this.setActive(true);
        this.setVisible(true);
      },
      update: function (time, delta) {
        this.y -= this.speed * delta;
        if (this.y < -50) {
          this.setActive(false);
          this.setVisible(false);
        }
      },
    });
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 1,
      runChildUpdate: true,
    });
    //creating the aliens
    this.aliens = this.add.group();
    this.container = this.add.container(0, 0);
    this.createAliens();
  }

  createAliens() {
    let blueInvaderCounter = 0;
    for (let y = 4; y < 7; y++) {
      for (let x = 4; x < 14; x++) {
        ++blueInvaderCounter;
        this.blueInvader[`invader-${blueInvaderCounter}`] = this.aliens.create(
          x * 48,
          y * 35,
          'blueInvader'
        );
        this.blueInvader[`invader-${blueInvaderCounter}`] =
          this.physics.add.existing(
            this.blueInvader[`invader-${blueInvaderCounter}`],
            0
          );
        this.blueInvader[`invader-${blueInvaderCounter}`].id =
          blueInvaderCounter;
        this.physics.add.collider(
          this.bullets,
          this.blueInvader[`invader-${blueInvaderCounter}`],
          function (invader, bullet) {
            invader.destroy();
            bullet.destroy();
            invader = null;
            console.log(invader);
          }
        );
      }
    }
    for (let y = 3; y < 4; y++) {
      for (let x = 5; x < 13; x++) {
        this.yellowInvader = this.aliens.create(
          x * 48,
          y * 35,
          'blueYellowInvader'
        );
      }
    }
    for (let y = 2; y < 3; y++) {
      for (let x = 6; x <= 11; x++) {
        this.redInvader = this.aliens.create(x * 48, y * 35, 'redBlueInvader');
      }
    }
    for (let y = 1; y < 2; y++) {
      for (let x = 7; x <= 10; x++) {
        if (x === 7 || x === 10) {
          this.strongestInvader = this.aliens.create(
            x * 48,
            y * 35,
            'strongestInvader'
          );
        }
      }
    }
    this.container.add(this.aliens.children.entries);

    var destX = -10;

    var tween = this.tweens.add({
      targets: this.container,
      duration: 6000,
      yoyo: true,
      repeat: -1,
      x: {
        getEnd: function (target, key, value) {
          return destX - 155;
        },
        getStart: function (target, key, value) {
          return destX + 155;
        },
      },
    });
  }

  update(time, delta) {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.x -= 3;
    }
    if (cursors.right.isDown) {
      this.player.x += 3;
    }
    if (cursors.space.isDown) {
      var bullet = this.bullets.get();
      if (bullet) {
        bullet.fire(this.player.x, this.player.y);
        this.lastFired = time + 50;
      }
    }
    if (time % 200 === 0) {
      console.log(typeof this.blueInvader);
    }
    
  }
}
export default GameScene;
