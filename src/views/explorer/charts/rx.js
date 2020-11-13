import { interval, Observable, of } from 'rxjs'
import { concatAll, retryWhen } from 'rxjs/operators'
/**
 * 定时器，添加第一次立刻执行，第一次X为-1
 */
export const intervalImmediately = (heartBeat) => {
  const observable = new Observable(subscriber => {
    subscriber.next(of(-1))
    subscriber.next(interval(heartBeat))
  })

  return observable.pipe(
    concatAll(),
    retryWhen(() => interval(heartBeat))
  )
  // .subscribe(res => console.log(res))
}
