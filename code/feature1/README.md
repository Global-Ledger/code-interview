# Feature 1 — Async Parallel Processing

This folder contains three TypeScript files (`file1.ts`, `file2.ts`, `file3.ts`) that together implement a parallel async iterator system. The goal of this exercise is to evaluate your ability to read, understand, and reason about asynchronous code, resource management, and stream-like data handling.

##  File Overview

- `file1.ts`: Implements the `parallel` function, which runs multiple async iterators concurrently and streams their results through a shared channel.
- `file2.ts`: Provides the `makeChannel` function, which handles buffered communication between producers and consumers. It is based on a queue-like mechanism and supports backpressure via `highWaterMark`.
- `file3.ts`: Contains utility logic, including `assignSymbol`, which ensures objects conform to the `AsyncIterator` protocol.

These files are adapted from the following open-source modules:
- [`file2.ts`](https://github.com/Global-Ledger/code-interview/blob/develop/code/feature1/file2.ts)
- [`file3.ts`](https://github.com/Global-Ledger/code-interview/blob/develop/code/feature1/file3.ts)

##  Your Task

Please read through all three files and answer the following questions. Your responses will help us understand how you approach unfamiliar code, how deeply you grasp asynchronous patterns, and how you think about edge cases and testing.

###  Interview Questions

1. **What does the `parallel` function do?**  
   Describe its purpose and how it coordinates multiple async iterators.

2. **How does `channel.push(next)` work, and what is the role of `highWaterMark`?**  
   Explain how backpressure is managed and how values are buffered.

3. **Why is `Promise.allSettled` used when closing cursors?**  
   What are the benefits of this approach compared to `Promise.all`?

4. **What happens if one of the cursors throws an exception?**  
   How is error propagation handled across the system?

5. **How would you test this code?**  
   Suggest strategies for unit testing and integration testing, including edge cases.

##  What We're Looking For

- Clear understanding of async iteration and stream control
- Ability to trace data flow across multiple modules
- Awareness of error handling and resource cleanup
- Thoughtful testing strategies

Feel free to write your answers in a separate markdown file or inline as comments. We’re excited to see how you think!
