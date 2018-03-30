import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QrCodeService } from './qrcode.service';
import { QrcodeCamComponent } from './qrcode-cam/qrcode-cam';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		QrcodeCamComponent
	],
	exports: [
		QrcodeCamComponent
	],
	providers: [
		QrCodeService
	]
})
export class QrCodeModule { }
