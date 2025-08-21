import type { StreamOptions } from "somefile1"
import type { Arg0, Return } from "somefile2"
import { makeChannel } from "somefile3"
import { closeCursor } from "somefile4"
import { Done, DoneIterable } from "somefile5"
import type { Cursor } from "somefile4"
import { assignSymbol } from "./file2"

export {
  parallel
}

function parallel<T>(
  cursors: readonly Cursor<T>[],
  {
    highWaterMark = 2 * cursors.length
  } = {} as Partial<{
    "highWaterMark": StreamOptions<any>["highWaterMark"]
  }
  >
) {

  if (!cursors.length)
    return DoneIterable as ReturnType<typeof assignSymbol<typeof paralleled>>

  if (highWaterMark < 1)
    highWaterMark = 1

  const channel = makeChannel<IteratorResult<T>>(highWaterMark)

  let count = 0
  , closing = false
  , err: any
  , started = false

  const paralleled = {
    next,
    "throw": close,
    "return": close,
  } as AsyncIterator<T>
  
  return assignSymbol(paralleled)

  function close(err?: Arg0<typeof stop>) {
    if (!closing) {
      closing = true
      Promise.allSettled(cursors.map(c => closeCursor(c)))
      stop(err)
    }

    return Done
  }

  function start() {
    if (started)
      return

    started = true
    const {length} = cursors
    if (!length)
      return stop()

    for (let c = 0; c < length; c++)
      startCursor(cursors[c])

    return true as const
  }

  async function startCursor(cursor: Cursor<T>) {
    count++
    try {
      let pointer = cursor[Symbol.asyncIterator]()
      , next: Return<typeof pointer["next"]>

      while (next = await pointer.next()) {
        if (closing || next.done)
          break

        await channel.push(next)

        if (closing)
          break
      }
    } catch (e) {
      err ||= e
      await close(err)
    } finally {
      await closeCursor(cursor)
    }

    count--

    if (count <= 0) {
      stop()
    }
  }

  function next() {
    start()

    if (err)
      throw err

    // istanbul ignore next: Later
    if (closing)
      return Done

    return channel.next()
  }

  function stop(err?: Arg0<typeof channel.close>) {
    channel.close(err)
  }
}
