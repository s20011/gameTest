let timer;
let info;

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
        MyObj.player = new Player(this, 400, 300);
        MyObj.cursor = this.input.keyboard.createCursorKeys();

        MyObj.grounds = this.physics.add.staticGroup();
        MyObj.block = this.physics.add.staticGroup()
        MyObj.grounds.create(100, 580,'ground');
        MyObj.grounds.create(290, 580,'ground');
        MyObj.grounds.create(480, 580,'ground');
        MyObj.grounds.create(570, 580,'ground');
        MyObj.grounds.create(660, 580,'ground');
        MyObj.grounds.create(750, 580, 'ground');
        //ゴールの位置
        MyObj.grounds.create(670, 150, 'ground');

        MyObj.block.create(400, 150, 'ground');
        MyObj.block.create(300, 340,'ground');
        MyObj.block.create(700, 450, 'ground');


        MyObj.coins = this.physics.add.group();
        MyObj.coins.create(670, 0, 'coin');


        //Playerと地面は衝突する関係にあることを設定
        this.physics.add.collider(MyObj.player.pSprite, MyObj.grounds);
        this.physics.add.collider(MyObj.player.pSprite, MyObj.block);
        //coinと地面・Playerは衝突する関係にあることを設定
        this.physics.add.collider(MyObj.grounds, MyObj.coins);
        this.physics.add.collider(
            MyObj.player.pSprite, MyObj.coins,
            (p, c) => {
                //コインとplayerが衝突したらコインが消える
                c.destroy();
            }, null , this
        );


        info = this.add.text(10, 10, '', {font: '48px Arial', fill: '#000000'});
        timer = this.time.addEvent({
            delay: 3000, callback: this.blockAlpha, callbackScope: this
        });


    }

    update = function() {
        if(MyObj.cursor.left.isDown){
            MyObj.player.goLeft();
        } else if(MyObj.cursor.right.isDown){
            MyObj.player.goRight();
        } else {
            MyObj.player.stand();
        }

        if(MyObj.cursor.up.isDown && MyObj.player.pSprite.body.touching.down){
            MyObj.player.jump()
        }

        if(MyObj.cursor.shift.isDown){
            this.scene.restart();
        }

        info.setText('time:' + Math.floor(3000 - timer.getElapsed()));


    }

    blockAlpha = function () {
        MyObj.block.setAlpha(0)
    }

}

let MyObj = {}

let GameMain = new Phaser.Game({
    type: Phaser.WEBGL,
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