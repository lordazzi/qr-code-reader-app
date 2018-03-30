import { QrCodeService } from './../qrcode.service';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'qrcode-cam',
  templateUrl: 'qrcode-cam.html'
})
export class QrcodeCamComponent implements OnInit, OnDestroy {

  showCanvas: boolean;

  private height: number = innerWidth;
  private width: number = innerHeight;

  private subscriptions = new Subscription();

  constructor(
    private qrCodeService: QrCodeService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.qrCodeService.canvasExhibition$.subscribe(exhibition => {
        this.setCanvasExhibition(exhibition);
      })
    );

    this.setCanvasExhibition(this.showCanvas);
    window.addEventListener('onresize', () => {
      this.setCanvasSize();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setCanvasSize() {
    this.width = innerWidth;
    this.height = innerHeight;
  }

  setCanvasExhibition(exhibition: boolean) {
    if (this.showCanvas = exhibition) {
      (this.el.nativeElement as HTMLElement).style.display = 'block';
    } else {
      (this.el.nativeElement as HTMLElement).style.display = null;
    }
  }
}
