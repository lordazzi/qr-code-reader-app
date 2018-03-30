import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CameraSuccessCallback } from './camera-success-callback.interface';
import { plugin } from '../plugin';

export class CameraService {
    bindToCanvas(canvas: HTMLCanvasElement): Observable<string> {
        const subject = new Subject<string>();

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
            cameraFacing: 'back'
        },
            e => subject.error(e),
            (data: CameraSuccessCallback) => subject.next(data.output.images.fullsize.data));

        return subject.asObservable();
    }

    stop() {
        plugin.CanvasCamera.stop();
    }
}
