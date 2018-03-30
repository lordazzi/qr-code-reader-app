import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { plugin } from '../plugin';
import { CameraService } from '../camera/camera.service';

@Injectable()
export class QrCodeService {

    private canvasExhibitionSubject = new Subject<boolean>();
    canvasExhibition$ = this.canvasExhibitionSubject.asObservable();

    constructor(
        private cameraService: CameraService
    ) { }

    startReadding(): Observable<string> {
        const subject = new Subject<string>();
        this.canvasExhibitionSubject.next(true);
        setTimeout(() => {
            const canvas = document.querySelector('#qrcode canvas') as HTMLCanvasElement;
            this.cameraService
                .bindToCanvas(canvas)
                .subscribe(data => {

                }, erro => {

                });
        });

        return subject.asObservable();
    }
}