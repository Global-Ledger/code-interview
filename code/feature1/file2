import { makeQueue } from "somefile1";
import type { AnyObject, Fn } from "somefile2";
import { Done } from "somefile3";
import { assignSymbol } from "file3";

export {
  makeChannel,
};
export type {
  Channel
};

type Channel<T extends AnyObject> = ReturnType<typeof makeChannel<T>>

/** @see https://gobyexample.com/channels */
function makeChannel<T extends AnyObject, Done = typeof Done>(highWaterMark = Infinity, done = Done as Done) {
  type Reader = {
    res: Fn<[T|Done]>
    rej: Fn
  }
  type Writer = {
    res: Fn<[]>
    rej: Fn
  }
  let results = makeQueue<T, Done>(done)

  , reads = makeQueue<Reader>()
  , writes = makeQueue<Writer>()
  , error: any = undefined
  , closed = false
  , channel = {
    push,
    close,
    next,
    return: close,
    throw: close,
  }

  return assignSymbol(channel)

  /**
   * @returns Resolved promise
  */
  function close(err?: any) {
    closed = true

    let write
    const aborted = Error("Aborted")
    while (write = writes.shift())
      write.rej(aborted)

    if (
      !error
      && err

      && err instanceof Error
    )
      error = err

    if (
      error
      || !results.size
    ) {
      let read

      if (error)
        while (read = reads.shift()?.rej)
          read(error)
      else
        while (read = reads.shift()?.res)
          read(done)
    }

    return Done
  }
  
  /** push, write
   * ```go
   * channel <- value
   * ```
  */
  function push(value: T) {
    if (closed)
      throw Error("Channel is already closed")

    const read = reads.shift()?.res

    if (read) {
      read(value)
      return
    }

    const {size} = results
    results.push(value)

    if (size >= highWaterMark) {
      return newWriter()
    }

    return
  }

  /** shift, read, get, next
   * ```go
   * value := <-channel
   * ```
  */
  function next() {
    if (error)
      throw error

    if (
      results.size
    ) {
      const val = results.shift()
      , write = writes.shift()?.res

      if (write)
        write()

      return val as (T|Done)& Promise<T|Done>
    }
      
    if (closed)
      return done as (T|Done)& Promise<T|Done>
    
    return newReader()
  }

  function newReader() {
    return new Promise(pushReader)
  }
  function pushReader(res: Reader["res"], rej: Reader["rej"]) {
    reads.push({res, rej})
  }
  function newWriter() {
    return new Promise<void>(pushWriter)
  }
  function pushWriter(res: Writer["res"], rej: Writer["rej"]) {
    writes.push({res, rej})
  }
}
