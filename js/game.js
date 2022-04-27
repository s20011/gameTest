

class Playing extends Phaser.Scene {
    constructor() {
        super('Playing');
    }

    preload() {
        this.load.image('back', '../assets/back.png');
        this.load.spritesheet('witch', '../assets/witch.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('ground', '../assets/ground.png');
        this.load.image('coin', '../assets/coin.png');
    }

    create = function () {
        this.add.image(400, 300, 'back');
        MyObj.player = new Player(this, 400, 300)
        MyObj.cursor = this.input.keyboard.createCursorKeys();

        MyObj.grounds = this.physics.add.staticGroup();
        MyObj.grounds.create(100, 550,'ground');
        MyObj.grounds.create(300, 350,'ground');
        MyObj.grounds.create(500, 150, 'ground');
        MyObj.grounds.create(700, 350, 'ground');

        MyObj.coins = this.physics.add.group();
        MyObj.coins.create(190, 0, 'coin');

        //Playerと地面は衝突する関係にあることを設定
        this.physics.add.collider(MyObj.player.pSprite, MyObj.grounds);
        //coinと地面・Playerは衝突する関係にあることを設定
        this.physics.add.collider(MyObj.grounds, MyObj.coins);
        this.physics.add.collider(MyObj.player.pSprite, MyObj.coins);
    }

    update = function() {
        if(MyObj.cursor.left.isDown){
            MyObj.player.goLeft()
        } else if(MyObj.cursor.right.isDown){
            MyObj.player.goRight()
        } else {
            MyObj.player.stand();
        }

        if(MyObj.cursor.up.isDown && MyObj.player.pSprite.body.touching.down){
            MyObj.player.jump()
        }
    }
}

var MyObj = {}

var GameMain = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene:[Playing]
})