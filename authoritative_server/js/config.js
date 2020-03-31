module.exports = {
  config: (preload, create, update, gravity) => {
    const config = {
      type: Phaser.HEADLESS,
      parent: "phaser-example",
      width: 800,
      height: 640,
      autoFocus: false,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          // gravity might break should be gravity: { y: 300 }
          gravity,
        }
      },
      scene: {
        preload,
        create,
        update
      }
    };
    return config;
  }
};
