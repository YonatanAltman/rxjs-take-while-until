import './style.css';

import { tap, BehaviorSubject, takeWhile, Subject, takeUntil, ReplaySubject } from 'rxjs';

const message$ = new ReplaySubject<string>(1);
const destroy$ = new Subject<void>();

let term = true;

const _while = message$.pipe(
  takeWhile(()=> term),
  tap((val)=> console.log(val)),

).subscribe();
const _until = message$.pipe(
  takeUntil(destroy$),
  tap((val)=> console.log(val)),

).subscribe();

console.log(`_while: ${_while.closed}`); //  = false
console.log(`_until: ${_until.closed}`); //  = false
message$.next('First');

term = false;
destroy$.next();

console.log(`_while: ${_while.closed}`); //  = ??
console.log(`_until: ${_until.closed}`); //  = ??

message$.next('Seconde');

console.log(`_while: ${_while.closed}`); //  = true
console.log(`_until: ${_until.closed}`); //  = true

term = true;
message$.next('Seconde'); // ??
