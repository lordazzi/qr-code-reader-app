import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

declare let plugin: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const canvas = document.getElementById('canvas');
      plugin.CanvasCamera.initialize(canvas);
      plugin.CanvasCamera.start({
        width: innerWidth,
        height: innerHeight,
        canvas: {
          width: innerWidth,
          height: innerHeight
        },
        capture: {
          width: innerWidth,
          height: innerHeight
        },
        fps: 30,
        use: 'file',
        flashMode: false,
        thumbnailRatio: 1 / 6,
        cameraFacing: 'back',
        onBeforeDraw: function (frame) {
          // do something before drawing a frame
        },
        onAfterDraw: function (frame) {
          // do something after drawing a frame
        }
      });
    });
  }
}

