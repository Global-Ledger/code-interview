# Feature 1 — Async Parallel Processing

This folder contains three TypeScript files (`file1.ts`, `file2.ts`, `file3.ts`) that together implement a parallel async iterator system. The goal of this exercise is to evaluate your ability to read, understand, and reason about asynchronous code, resource management, and stream-like data handling.

## File Overview

### `file1.ts`
Implements the `parallel` function where rely on the following modules from the `utils` library:
- [`file2.ts`](https://github.com/Global-Ledger/code-interview/blob/develop/code/feature1/file2.ts)
- [`file3.ts`](https://github.com/Global-Ledger/code-interview/blob/develop/code/feature1/file3.ts)

## Interview Questions

Please read through all three files and answer the following questions. Your responses will help us assess your understanding of asynchronous iteration, stream control, and error handling.

1. What does the `parallel` function do?
2. How does `channel.push(next)` work, and what is the role of `highWaterMark`?
3. Why is `Promise.allSettled` used when closing cursors?
4. What happens if one of the cursors throws an exception?
5. How would you test this code?

## What We're Looking For

- Clear understanding of async iteration and stream control
- Ability to trace data flow across multiple modules
- Awareness of error handling and resource cleanup
- Thoughtful testing strategies

You may write your answers in a separate markdown file or annotate the code directly. This exercise is designed to evaluate both your technical insight and your ability to communicate it clearly.


