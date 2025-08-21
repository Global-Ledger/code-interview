export {
  assignSymbol
}

type Wrap<T> = T & {
  [Symbol.asyncIterator](): T
}

function assignSymbol<T>(iter: T) {
  const wrapped = iter as Wrap<T>
  wrapped[Symbol.asyncIterator] = () => iter

  return wrapped
}
