import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { plugin } from '../plugin';

@Injectable()
export class QrCodeService {

    private canvasExhibitionSubject = new Subject<boolean>();
    canvasExhibition$ = this.canvasExhibitionSubject.asObservable();

    startReadding(): Observable<string> {
        const subject = new Subject<string>();
        this.canvasExhibitionSubject.next(true);
        setTimeout(() => {

            const canvas: HTMLCanvasElement = document.querySelector('#qrcode canvas') as HTMLCanvasElement;
            plugin.CanvasCamera.initialize(canvas, undefined);
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
                use: 'data',
                flashMode: false,
                thumbnailRatio: 1 / 6,
                cameraFacing: 'back',
                onBeforeDraw: () => { },
                onAfterDraw: () => { }
            }, (e) => console.error('error', e), data => {
                debugger;
            });
        });

        return subject.asObservable();
    }
}