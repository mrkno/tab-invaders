define(['module/Aliens', 'module/Bullets', 'module/Explosions'], (Aliens, Bullets, Explosions) => {
    class Play {
        constructor (game, nextState, player) {
            this._game = game;
            this._nextState = nextState;
            this._player = player;
            this._aliens = null;
        }

        create () {
            const playerConfiguration = {
                health: 1,
                lives: 1,
                score: 0,
                firingTime: 300,
                bulletSpeed: 500
            };

            this._player.create(playerConfiguration);
            this._player.setBulletGroup(new Bullets(10, 'bullet', 100, this._game));
            this._player.setExplosionGroup(new Explosions(1, 'kaboom', this._game));

            const alienConfiguration = {
                rows:4,
                cols:10,
                scoreValue:10,
                firingTime:200,
                bulletSpeed:200,
                health: 100,
                easing: Phaser.Easing.Linear.None
            };

            this._aliens = new Aliens(alienConfiguration, this._game);
            this._aliens.setBulletGroup(new Bullets(30, 'enemyBullet', 10, this._game));
            this._aliens.setExplosionGroup(new Explosions(5, 'kaboom', this._game));
            this._aliens.setPlayerShip(this._player.getPlayerShip());

            this._player.setAliensAndAlienGroup(this._aliens);

            //They start shoting, shooting is triggered by a time loop
            this._player.startShooting();
            this._aliens.startShooting();
        }

        update () {
            this._player.update();
            this._aliens.createOverLap(this._player.getBulletGroup());
            this._player.createOverLap(this._aliens.getBulletGroup());
        }
    }
    return Play;
});
