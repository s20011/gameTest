

Player = function (phaser) {

    phaser.anims.create({
        key: 'witch_left',
        frames: phaser.anims.generateFrameNumbers('witch', { start: 3, end: 5 }),
        frameRate: 5,
        repeat: -1
    });

    phaser.anims.create({
        key: 'witch_right',
        frames: phaser.anims.generateFrameNumbers('witch', { start: 6, end: 8 }),
        frameRate: 5,
        repeat: -1
    });

    this.pSprite = phaser.physics.add.sprite(400, 300, 'witch');
    this.pSprite.setCollideWorldBounds(true);

    Player.prototype.goLeft = function () {
        this.pSprite.setVelocityX(-100);
        this.pSprite.anims.play('witch_left', true);
    }

    Player.prototype.goRight = function() {
        this.pSprite.setVelocityX(100);
        this.pSprite.anims.play('witch_right', true);
    }

    Player.prototype.stand = function() {
        this.pSprite.setVelocityX(0);
    }

    Player.prototype.jump = function () {
        this.pSprite.setVelocityY(-300);
    }

}