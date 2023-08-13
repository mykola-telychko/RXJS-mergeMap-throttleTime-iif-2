console.clear();
import { fromEvent, iif, of } from 'rxjs';
import { mergeMap, map, throttleTime, filter } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/conditional/iif

const r$ = of(`Header!!`);
const x$ = of(`Bottom!`);

fromEvent(document, 'mousemove')
  .pipe(
    throttleTime(50),
    filter((move: MouseEvent) => move.clientY < 210),
    map((move: MouseEvent) => move.clientY),
    mergeMap((yCoord) => iif(() => yCoord < 110, r$, x$))
  )
  .subscribe((v) => {
    console.log(v);
    document.getElementById('sayer').innerText = v;
  });
