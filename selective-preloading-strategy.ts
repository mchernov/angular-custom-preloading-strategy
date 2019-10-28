import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {

    constructor(private route: ActivatedRoute) {
    }

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        let currentRoute = this.route.root.firstChild.snapshot.routeConfig.path;
        //.indexOf(..) is supported by IE 9-11, don't change to .includes(..)
        if (route.data && route.data['preload'] && route.data['preloadFor'].indexOf(currentRoute) > -1) {
            // log the route path to the console
            //console.log('Preloaded: ' + route.path + ' for ' + currentRoute);
            return load();
        } else {
            return of(null);
        }
    }
}