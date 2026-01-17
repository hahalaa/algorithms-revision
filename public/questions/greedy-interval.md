### Problem

Given a set of intervals  
$ I = \{(s_1,f_1), (s_2,f_2), \dots, (s_n,f_n)\} $,  

find the maximum number of mutually compatible intervals.

Explain the **greedy choice property** used.

---

### Solution

Sort the intervals by **non-decreasing finish time**.

1. Select the interval with the earliest finish time.
2. Discard all intervals that overlap with it.
3. Repeat until no intervals remain.

**Time Complexity:**  
$O(n \log n)$ due to sorting.
