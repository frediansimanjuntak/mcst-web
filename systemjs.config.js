/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'dist/app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'moment': 'npm:moment/',
      'ng2-table': 'npm:ng2-table',
      'angular2-datatable': 'npm:angular2-datatable',
      'angular2-moment': 'npm:angular2-moment',
      'ng2-bootstrap': 'npm:ng2-bootstrap',
      'ng2-file-upload' : 'npm:ng2-file-upload',
      'ng2-select' : 'npm:ng2-select',
      'lodash': 'npm:lodash',
      'jquery' : 'npm:jquery/dist/',
      'primeng': 'npm:primeng',
      'fullcalendar' : 'npm:fullcalendar/dist/', 
      'angular2-signaturepad': 'npm:angular2-signaturepad',
      'signature_pad' : 'npm:signature_pad',
      'angular2-modal': 'npm:angular2-modal',
      'mydatepicker': 'npm:mydatepicker/bundles/mydatepicker.umd.js',
      "ngx-modal": "node_modules/ngx-modal",
      'angular2-modal/plugins/bootstrap': 'npm:angular2-modal/bundles/angular2-modal.bootstrap.umd.js',
      'ng2-imageupload': 'node_modules/ng2-imageupload',
      'ng2-slim-progress-bar': 'node_modules/ng2-slim-progress-bar/bundles/index.umd.js',
      'angular2-notifications': 'node_modules/angular2-notifications',
      'ng2-pdf-viewer': 'node_modules/ng2-pdf-viewer',
      'pdfjs-dist': 'node_modules/pdfjs-dist',
      "underscore" : "npm:underscore/underscore.js",
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: { main: './main.js', defaultExtension: 'js' },
      rxjs: { defaultExtension: 'js' },
      'moment': { main: 'moment.js', defaultExtension: 'js' },
      'angular2-moment': { main: './index.js', defaultExtension: 'js' },
      'ng2-table': { main: 'ng2-table.js', defaultExtension: 'js' },
      mydatepicker: { defaultExtension: 'js' },
      'ng2-bootstrap': { main: '/bundles/ng2-bootstrap.umd.js', defaultExtension: 'js' },
      'ng2-file-upload' : { main: './ng2-file-upload.js', defaultExtension: 'js' },
      'ng2-select' : { main: './ng2-select.js', defaultExtension: 'js' },
      'jquery': { main: 'jquery.js', defaultExtension: 'js' },
      'angular2-datatable': { main: 'index.js', defaultExtension: 'js' },
      'lodash': { main: 'lodash.js', defaultExtension: 'js' },
      primeng: { defaultExtension: 'js' },
      'fullcalendar': { main: 'fullcalendar.js', defaultExtension: 'js' },
      "ngx-modal": { "main": "index.js", "defaultExtension": "js" },
      'ng2-imageupload': { main: 'index.js', defaultExtension: 'js'},
      'angular2-modal': { defaultExtension: 'js', main: '/bundles/angular2-modal.umd.js' },
      'angular2-notifications': { main: 'components.js', defaultExtension: 'js' },
      'angular2-signaturepad': { main: 'index.js', defaultExtension: 'js' },
      'signature_pad': { main: 'signature_pad.js', defaultExtension: 'js' },
      'ng2-pdf-viewer': { main: 'dist/index.js', defaultExtension: 'js' },
      'pdfjs-dist': { defaultExtension: 'js' }
    }
  });
})(this);
