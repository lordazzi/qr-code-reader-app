import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CameraService } from '../camera/camera.service';

@Injectable()
export class QrCodeService {

    private canvasExhibitionSubject = new Subject<boolean>();
    canvasExhibition$ = this.canvasExhibitionSubject.asObservable();

    private isReadingQrCode = false;

    constructor(
        private cameraService: CameraService
    ) { }

    startReadding(): Observable<string> {
        const subject = new Subject<string>();
        this.canvasExhibitionSubject.next(true);

        setTimeout(() => {
            const canvas = document.querySelector('#qrcode canvas') as HTMLCanvasElement;
            const subscription = this.cameraService
                .bindToCanvas(canvas)
                .subscribe(image => {
                    try {
                        if (!this.isReadingQrCode) {
                            this.isReadingQrCode = true;
                            qrcode.callback = data => {
                                if (data === 'error decoding QR Code') {
                                    this.isReadingQrCode = false;
                                } else {
                                    subject.next(data);
                                    subject.complete();
                                    subscription.unsubscribe();
                                    this.cameraService.stop();
                                }
                            }
                            setTimeout(() => qrcode.decode(image));
                        }
                    } catch (e) {
                        this.isReadingQrCode = false;
                        subject.error(e);
                    }
                }, erro => {
                    subject.error(erro);
                });
        });

        return subject.asObservable();
    }
}