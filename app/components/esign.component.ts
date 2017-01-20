import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
    selector: 'signaturepad',
    template: `
        <div style="width: 300px; height: 200px; border: 1px solid black;">
            <signature-pad [style]="{'border':'1px'}" [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>
        </div>
        <div>
            <button (click)="drawClear()">Clear</button>
        </div>
    `
})

export class SignaturePadPage{
    data:any;

    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 5,
        'canvasWidth': 300,
        'canvasHeight': 200
    };

    constructor() {
        // no-op
    }

    ngAfterViewInit() {
        // this.signaturePad is now available
        this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    }

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        this.data= this.signaturePad.toDataURL('image/png');
    }

    drawClear(){
        this.signaturePad.clear();
    }   

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
    }
}