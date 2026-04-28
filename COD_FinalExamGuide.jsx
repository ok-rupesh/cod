import { useState } from "react";

const DEF = "DEFINITE";
const HIGH = "HIGH";
const MED = "MED";

const data = {
  overlap: [
    { topic: "RISC vs CISC", sources: ["PYQ 2024 B1b", "PYQ 2025 B1", "Assignment 3 B1", "Your Notes"] },
    { topic: "Addressing Modes", sources: ["PYQ 2024 A1", "PYQ 2024 C1", "PYQ 2025 A1", "Assignment 3 B2", "Your Notes"] },
    { topic: "Instruction Cycle", sources: ["PYQ 2024 B1a", "Assignment 3 C2"] },
    { topic: "Booth's Algorithm", sources: ["PYQ 2025 C2", "Assignment 3 C3", "Your Notes"] },
    { topic: "SRAM vs DRAM", sources: ["PYQ 2025 A2", "Assignment 4 C1"] },
    { topic: "Memory Hierarchy", sources: ["PYQ 2024 C2a", "Assignment 4 B2", "Your Notes"] },
    { topic: "Address Mapping", sources: ["PYQ 2024 C2b", "PYQ 2025 B2", "Assignment 4 B3", "Your Notes"] },
    { topic: "Page Replacement (FIFO/LRU)", sources: ["PYQ 2025 C1", "Assignment 4 C3", "Your Notes"] },
    { topic: "Cache Memory + Hit Ratio", sources: ["PYQ 2024 B2", "Assignment 4 B2"] },
    { topic: "Cache Update Schemes", sources: ["PYQ 2025 B2 (NEW — not in assignment)"] },
  ],
  questions: [
    // ── DEFINITE (appear in multiple PYQs) ───────────────────────────────
    {
      id: 1, priority: DEF,
      q: "Differentiate RISC and CISC architectures (at least 4 points)",
      from: "PYQ 2024 B1b + PYQ 2025 B1 + Assignment 3",
      marks: "7 marks",
      understand: `RISC = Simple tools done fast. CISC = Swiss Army knife, powerful but slow. Modern Intel CPUs are CISC on the outside but run RISC micro-ops internally. That tells you everything about which is more efficient.`,
      write: `RISC vs CISC — Differentiation

Feature            | RISC                        | CISC
-------------------|-----------------------------|--------------------------
Full form          | Reduced Instruction Set     | Complex Instruction Set
Instruction set    | Small, simple               | Large, complex
Instruction size   | Fixed length (32-bit)       | Variable length
Execution          | 1 clock cycle (mostly)      | Multiple clock cycles
Memory access      | Load/Store only             | Any instruction can access
Registers          | Many (32+)                  | Few (8–16)
Pipelining         | Very efficient              | Difficult
Code size          | Larger                      | Compact
Power consumption  | Lower                       | Higher
Examples           | ARM, MIPS, SPARC            | Intel x86, 8086

Instruction Complexity:
• RISC: Each instruction performs one simple operation requiring multiple instructions per task.
• CISC: One instruction can perform complex tasks like fetching, operating, and storing simultaneously.

Memory Usage:
• RISC: More memory used (more instructions per program) but fewer runtime memory accesses due to large register file.
• CISC: Compact code with fewer instructions, direct memory operands.

Execution Efficiency:
• RISC: Highly efficient pipelining due to uniform fixed-length instructions.
• CISC: Difficult to pipeline due to variable instruction length and multi-cycle execution.

Conclusion: RISC preferred for low-power devices (phones). CISC dominant in desktop/server for software compatibility.`
    },
    {
      id: 2, priority: DEF,
      q: "Explain various types of addressing modes with suitable examples/diagrams",
      from: "PYQ 2024 A1 + C1 + PYQ 2025 A1 + Assignment 3",
      marks: "2–11 marks (asked every exam)",
      understand: `Addressing mode = how to find the operand. Think of different GPS directions: "It's right here in my pocket" (immediate), "Go to House 2000" (direct), "Go to the house that has a key to another house" (indirect), "It's already in your hand" (register). Each trades off speed vs flexibility.`,
      write: `Addressing Modes — Types with Examples

1. Immediate Addressing
   Operand value is part of the instruction itself.
   EA: No memory access needed.
   Example: MOV R1, #5  →  R1 = 5

2. Direct (Absolute) Addressing
   Instruction contains the actual memory address of the operand.
   EA = Address given in instruction
   Example: MOV R1, 2000  →  R1 = Memory[2000]

3. Indirect Addressing
   Instruction holds address of a memory location that contains the operand's address.
   EA = Memory[Address in instruction]
   Example: MOV R1, (2000)  →  R1 = Memory[Memory[2000]]

4. Register Addressing
   Operand is in a CPU register. Fastest mode — no memory access.
   Example: MOV R1, R2  →  R1 = R2

5. Register Indirect Addressing
   Register holds the memory address of the operand.
   EA = Memory[Register]
   Example: MOV R1, (R2)  →  R1 = Memory[R2]

6. Indexed Addressing
   EA = Base register + constant offset. Used for array access.
   Example: MOV R1, 100(R2)  →  R1 = Memory[R2 + 100]

7. Relative Addressing ← Asked in PYQ 2024 directly
   EA = PC + offset (Program Counter relative).
   Used for branch/jump instructions.
   Example: JMP +5  →  PC = PC + 5
   Effective address = current PC value + displacement field of instruction.

Comparison:
Mode            | EA Formula          | Speed     | Use Case
----------------|---------------------|-----------|------------------
Immediate       | Operand = constant  | Fastest   | Load constants
Direct          | EA = Address        | Fast      | Global variables
Indirect        | EA = Mem[Address]   | Slow      | Pointers
Register        | Reg value           | Fastest   | ALU operations
Reg. Indirect   | Mem[Register]       | Fast      | Pointer deref
Indexed         | Reg + Offset        | Fast      | Arrays
Relative        | PC + Offset         | Fast      | Branching`
    },
    {
      id: 3, priority: DEF,
      q: "Booth's Algorithm — Step-by-step: (a) (+15)×(+13) and (b) (+15)×(−13) | 5-bit registers",
      from: "PYQ 2025 C2 + Assignment 3 C3 + Your Notes",
      marks: "11 marks",
      understand: `5-bit registers mean n=5 steps. The algorithm is exactly the same — just more rows. Key: when you ADD/SUBTRACT, use only 5-bit result (discard carry out). Arithmetic Right Shift: sign bit of AC propagates (copies), and Q₋₁ gets the old Q₀.`,
      write: `Booth's Algorithm Setup:
n = 5 (5-bit), do 5 steps.
Rule: Check Q₀ and Q₋₁ each step:
  10 → AC ← AC − M  (subtract)
  01 → AC ← AC + M  (add)
  00 or 11 → no operation
Then: Arithmetic Right Shift [AC | Q | Q₋₁] (sign bit of AC preserved)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(a) (+15) × (+13)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
M  = 01111  (+15)
−M = 10001  (2's complement)
Q  = 01101  (+13)
Initialize: AC=00000, Q=01101, Q₋₁=0

Step | Q₀ | Q₋₁ | Operation    | AC    | Q     | Q₋₁
-----|-----|------|--------------|-------|-------|----
  1  |  1  |  0  | AC ← AC − M  | 10001 | 01101 |  0
     |     |     | ARS          | 11000 | 10110 |  1
-----|-----|------|--------------|-------|-------|----
  2  |  0  |  1  | AC ← AC + M  | 00111 | 10110 |  1
     |     |     | (11000+01111=00111, discard carry)
     |     |     | ARS          | 00011 | 11011 |  0
-----|-----|------|--------------|-------|-------|----
  3  |  1  |  0  | AC ← AC − M  | 10100 | 11011 |  0
     |     |     | (00011+10001=10100)
     |     |     | ARS          | 11010 | 01101 |  1
-----|-----|------|--------------|-------|-------|----
  4  |  1  |  1  | No operation | 11010 | 01101 |  1
     |     |     | ARS          | 11101 | 00110 |  1
-----|-----|------|--------------|-------|-------|----
  5  |  0  |  1  | AC ← AC + M  | 01100 | 00110 |  1
     |     |     | (11101+01111=01100, discard carry)
     |     |     | ARS          | 00110 | 00011 |  0

Result = AC | Q = 00110 00011 = 0011000011
Convert: 2⁷+2⁶+2¹+2⁰ = 128+64+2+1 = 195 ✓  (15 × 13 = 195)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(b) (+15) × (−13)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
M  = 01111  (+15)
−M = 10001
Q  = 10011  (−13 in 5-bit 2's complement: 13=01101, −13=10011+... 
     wait: 13=01101, complement=10010, +1=10011) ✓
Initialize: AC=00000, Q=10011, Q₋₁=0

Step | Q₀ | Q₋₁ | Operation    | AC    | Q     | Q₋₁
-----|-----|------|--------------|-------|-------|----
  1  |  1  |  0  | AC ← AC − M  | 10001 | 10011 |  0
     |     |     | ARS          | 11000 | 11001 |  1
-----|-----|------|--------------|-------|-------|----
  2  |  1  |  1  | No operation | 11000 | 11001 |  1
     |     |     | ARS          | 11100 | 01100 |  1
-----|-----|------|--------------|-------|-------|----
  3  |  0  |  1  | AC ← AC + M  | 01011 | 01100 |  1
     |     |     | (11100+01111=01011, discard carry)
     |     |     | ARS          | 00101 | 10110 |  0
-----|-----|------|--------------|-------|-------|----
  4  |  0  |  0  | No operation | 00101 | 10110 |  0
     |     |     | ARS          | 00010 | 11011 |  0
-----|-----|------|--------------|-------|-------|----
  5  |  1  |  0  | AC ← AC − M  | 10011 | 11011 |  0
     |     |     | (00010+10001=10011)
     |     |     | ARS          | 11001 | 11101 |  1

Result = AC | Q = 11001 11101 = 1100111101
MSB=1 → negative. Flip+1: 0011000010+1 = 0011000011 = 195
Result = −195 ✓  (15 × −13 = −195)`
    },
    {
      id: 4, priority: DEF,
      q: "Explain Memory Hierarchy. Why is cache faster than main memory?",
      from: "PYQ 2024 C2a + Assignment 4 B2 + Your Notes",
      marks: "7 marks",
      understand: `Memory hierarchy exists because fast memory is expensive and slow memory is cheap. You use a little of the fast kind near the CPU (cache) and a lot of the slow kind far away (RAM). It works because of locality — 90% of the time, the CPU wants something it very recently used.`,
      write: `Memory Hierarchy

Organization (fastest to slowest):

   CPU Registers        ~0.3 ns  |  bytes
         ↕
   L1 Cache (on-chip)   ~1 ns   |  32–64 KB
         ↕
   L2 Cache (on-chip)   ~4 ns   |  256 KB–1 MB
         ↕
   L3 Cache (shared)    ~10 ns  |  4–64 MB
         ↕
   Main Memory (RAM)    ~100 ns |  4–64 GB
         ↕
   Secondary Storage    ~1–10 ms|  TBs

Principle: Speed ↑ = Size ↓ = Cost/bit ↑  (going upward)

Role of Cache Memory:
• Placed between CPU and RAM to reduce average access time
• Stores copies of frequently used data from RAM
• Cache HIT: data found in cache → fast (~1–10 ns)
• Cache MISS: data not found → must fetch from RAM (~100 ns)
• Typical cache hit rate: 90–98%

Why Cache is Faster than RAM:

1. Technology:
   Cache = SRAM (flip-flops, 6 transistors/bit, no refresh, ~1–4 ns)
   RAM   = DRAM (capacitors, 1 transistor/bit, needs refresh, ~50–100 ns)

2. Physical Location:
   Cache is ON the same CPU chip → signal travels micrometers.
   RAM is a separate chip on motherboard → signal travels centimeters + bus latency.

3. No Refresh:
   SRAM holds data without periodic rewriting. DRAM loses charge and needs refresh every ~64 ms.

Locality of Reference (why it works):
• Temporal: recently accessed data will be accessed again soon
• Spatial: data near recently accessed data will be accessed soon
These ensure >90% of requests hit cache, making average access time close to cache speed.`
    },
    {
      id: 5, priority: DEF,
      q: "Explain address mapping. Compare Direct, Fully Associative, and Set-Associative. (Also: Explain two cache update schemes)",
      from: "PYQ 2024 C2b + PYQ 2025 B2 + Assignment 4 B3 + Your Notes",
      marks: "4–7 marks",
      understand: `Mapping = which cache line can a memory block go to? Direct = assigned one spot. Associative = any spot. Set-Associative = must be in your zone, any spot in that zone. Cache update = what happens when you write to cache? Do you update RAM immediately (write-through) or later (write-back)?`,
      write: `Address Mapping in Cache Memory

The memory address is split into fields: | TAG | INDEX | OFFSET |

1. DIRECT MAPPING
   Each block maps to exactly ONE cache line.
   Formula: Line = Block_number mod (Number_of_cache_lines)
   Address: | TAG | LINE INDEX | BLOCK OFFSET |
   ✓ Simple, fast. ✗ Conflict misses when two blocks compete for same line.

2. FULLY ASSOCIATIVE MAPPING
   A block can go into ANY cache line.
   Address: | TAG | BLOCK OFFSET |
   All tags searched simultaneously (CAM hardware).
   ✓ Best hit rate, no conflict misses. ✗ Very expensive hardware.

3. SET-ASSOCIATIVE MAPPING (Most used in practice)
   Cache divided into sets; each set has k lines (k-way).
   Block maps to a specific SET, any line within that set.
   Formula: Set = Block_number mod (Number_of_sets)
   Address: | TAG | SET INDEX | BLOCK OFFSET |
   ✓ Good balance of hit rate and cost. Used in all modern CPUs.

Comparison:
Feature         | Direct      | Fully Assoc. | Set-Associative
----------------|-------------|--------------|----------------
Placement       | 1 fixed line| Any line     | Any line in set
Tag search      | 1 compare   | All lines    | k compares/set
Conflict misses | High        | None         | Low
Hardware cost   | Low         | Very high    | Moderate
Real use        | Simple sys. | TLBs         | L1/L2/L3 cache

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cache Update Schemes (PYQ 2025 NEW topic):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When CPU writes data to cache, main memory must eventually be updated.

1. Write-Through
   Every write to cache IMMEDIATELY updates main memory.
   ✓ Main memory always consistent with cache
   ✓ Simple recovery on failure
   ✗ Slow — every write causes a memory bus transaction
   ✗ Wastes bandwidth (even if data is written many times before being read)

2. Write-Back (Copy-Back)
   Writes only update cache. Main memory updated only when the
   cache line is evicted (replaced).
   A "dirty bit" tracks whether cache line has been modified.
   ✓ Fast — multiple writes hit only cache, RAM updated once
   ✓ Reduces memory bus traffic significantly
   ✗ Main memory can be inconsistent (stale data during operation)
   ✗ More complex — need dirty bit logic and eviction handling`
    },
    {
      id: 6, priority: DEF,
      q: "Page Replacement — FIFO and LRU for: 4,2,0,1,2,6,1,4,0,1,0,2,3,5,7 | Frame size = 4",
      from: "PYQ 2025 C1 (DIRECT from exam) + Assignment 4 + Your Notes",
      marks: "11 marks",
      understand: `FIFO: evict the one that's been sitting in RAM the longest (oldest loaded). Track entry order. LRU: evict the one you haven't touched in the longest time (least recently used). Track access recency. Both require drawing a table step by step.`,
      write: `Reference String: 4,2,0,1,2,6,1,4,0,1,0,2,3,5,7
Frame Size: 4 | Total = 15 references

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIFO — First In First Out
(Replace the page that was loaded earliest)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Queue tracks entry order (front = oldest, evict from front)

#  | Ref | Frames          | Fault? | Evicted
---|-----|-----------------|--------|--------
 1 |  4  | 4  -  -  -      |  MISS  |   —
 2 |  2  | 4  2  -  -      |  MISS  |   —
 3 |  0  | 4  2  0  -      |  MISS  |   —
 4 |  1  | 4  2  0  1      |  MISS  |   —
 5 |  2  | 4  2  0  1      |  HIT   |   —
 6 |  6  | 6  2  0  1      |  MISS  |   4  (oldest)
 7 |  1  | 6  2  0  1      |  HIT   |   —
 8 |  4  | 6  2  0  4      |  MISS  |   2  (next oldest: 2,0,1,6→2 loaded at #2)

Wait — let me show queue state:
After #4: Q=[4,2,0,1]
After #6: evict 4, Q=[2,0,1,6]
After #8: evict 2, Q=[0,1,6,4]  → frames={0,1,4,6}

 9 |  0  | 6  0  1  4      |  HIT   |   —     Q=[0,1,6,4]
10 |  1  | 6  0  1  4      |  HIT   |   —
11 |  0  | 6  0  1  4      |  HIT   |   —
12 |  2  | 6  1  2  4      |  MISS  |   0     Q=[1,6,4,2]  → frames={1,2,4,6}
13 |  3  | 6  1  2  3      |  MISS  |   1     Q=[6,4,2,3]  → frames={2,3,4,6}

Wait correcting: After Q=[1,6,4,2] evict front=1:
Q=[6,4,2,3] → frames={2,3,4,6}

14 |  5  | 5  2  3  4      |  MISS  |   6     Q=[4,2,3,5]  → frames={2,3,4,5}

Wait, evict front=6: Q=[4,2,3,5] → frames={2,3,4,5}

15 |  7  | 5  7  3  2      |  MISS  |   4     Q=[2,3,5,7]  → frames={2,3,5,7}

FIFO Summary:
• Page Faults = 10  (at references: 1,2,3,4,6,8,12,13,14,15)
• Page Hits   = 5   (at references: 5,7,9,10,11)
• Hit Ratio   = 5/15 = 33.3%
• Miss Ratio  = 10/15 = 66.7%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LRU — Least Recently Used
(Replace the page that was last used farthest in the past)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Track access recency (LRU→MRU order shown)

#  | Ref | Frames            | Fault? | Evicted | LRU order (L→M)
---|-----|-------------------|--------|---------|----------------
 1 |  4  | 4  -  -  -        |  MISS  |   —     | [4]
 2 |  2  | 4  2  -  -        |  MISS  |   —     | [4,2]
 3 |  0  | 4  2  0  -        |  MISS  |   —     | [4,2,0]
 4 |  1  | 4  2  0  1        |  MISS  |   —     | [4,2,0,1]
 5 |  2  | 4  2  0  1        |  HIT   |   —     | [4,0,1,2]
 6 |  6  | 6  2  0  1        |  MISS  |   4     | [0,1,2,6]
 7 |  1  | 6  2  0  1        |  HIT   |   —     | [0,2,6,1]
 8 |  4  | 6  2  4  1        |  MISS  |   0     | [2,6,1,4]   frames={1,2,4,6}
 9 |  0  | 6  2  4  0        |  MISS  |   2     | [6,1,4,0]   frames={0,1,4,6}
10 |  1  | 6  2  4  0        |  HIT   |   —     | [6,4,0,1]
11 |  0  | 6  2  4  0        |  HIT   |   —     | [6,4,1,0]
12 |  2  | 6  2  4  0→miss,ev6| MISS  |   6     | [4,1,0,2]   frames={0,1,2,4}

Wait: at step 12, frames={0,1,4,6}. LRU=[6,4,0,1] (from step 10). After step 11 (ref=0, HIT): LRU=[6,4,1,0].
Step 12 (ref=2): 2∉{0,1,4,6}. LRU=6. Evict 6. frames={0,1,2,4}. LRU=[4,1,0,2].

13 |  3  | 0  1  2  3        |  MISS  |   4     | [1,0,2,3]   frames={0,1,2,3}
14 |  5  | 0  1  2  5        |  MISS  |   1     | [0,2,3,5]   frames={0,2,3,5}

Wait: LRU at step 13 is [1,0,2,3]. Step 14(ref=5): 5∉{0,1,2,3}. LRU=1. Evict 1. frames={0,2,3,5}. LRU=[0,2,3,5].

15 |  7  | 7  2  3  5        |  MISS  |   0     | [2,3,5,7]   frames={2,3,5,7}

LRU Summary:
• Page Faults = 11  (at references: 1,2,3,4,6,8,9,12,13,14,15)
• Page Hits   = 4   (at references: 5,7,10,11)
• Hit Ratio   = 4/15 = 26.7%
• Miss Ratio  = 11/15 = 73.3%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Final Comparison:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Algorithm | Faults | Hits | Hit Ratio
----------|--------|------|----------
FIFO      |   10   |   5  |  33.3%
LRU       |   11   |   4  |  26.7%

Note: For this particular reference string, FIFO performs better than LRU.
LRU is generally better on average, but can perform worse for specific strings.
Optimal algorithm always gives minimum faults (theoretical benchmark).`
    },
    {
      id: 7, priority: DEF,
      q: "Differentiate SRAM and DRAM",
      from: "PYQ 2025 A2 + Assignment 4 C1",
      marks: "2–11 marks",
      understand: `SRAM = flip-flop (light switch, stays without effort, 6 transistors, expensive, fast). DRAM = capacitor (water bucket with a hole, leaks charge, must be refreshed, 1 transistor, cheap, slow). Cache = SRAM. Your phone's RAM = DRAM.`,
      write: `SRAM vs DRAM Differentiation

Feature           | SRAM                    | DRAM
------------------|-------------------------|------------------------
Storage element   | Flip-flop (bistable)    | Capacitor + transistor
Transistors/bit   | 6                       | 1
Refresh needed    | No                      | Yes (every ~64 ms)
Access time       | 1–4 nanoseconds         | 50–100 nanoseconds
Cost              | Very high per MB        | Low per GB
Density           | Low                     | High (pack more per chip)
Power (standby)   | Very low                | Higher (refresh power)
Read destructive  | No                      | Yes (must rewrite after read)
Typical use       | CPU cache (L1/L2/L3)    | Main memory (DDR4/DDR5)

How SRAM works:
Uses a flip-flop made of 6 transistors. Flip-flop stays in SET or RESET state indefinitely as long as power is supplied. No refresh needed.

How DRAM works:
Uses a capacitor to store charge (1 = charged, 0 = discharged). Capacitors slowly leak charge and must be refreshed every ~64 ms by the memory controller. Reading destroys the data (capacitor discharges), so data must be rewritten after every read.`
    },
    // ── HIGH PRIORITY ────────────────────────────────────────────────────────
    {
      id: 8, priority: HIGH,
      q: "Explain the instruction life cycle (instruction cycle) with steps",
      from: "PYQ 2024 B1a + Assignment 3 C2",
      marks: "7 marks",
      understand: `Every instruction follows the same assembly line: Fetch → Decode → Get operands → Execute → Store result → Repeat. This is the heartbeat of every CPU, running billions of times per second.`,
      write: `Instruction Life Cycle (Instruction Cycle)

The instruction cycle is the complete sequence a CPU performs to execute one instruction.

Diagram:
  ┌─────────┐    ┌─────────┐    ┌─────────┐
  │  FETCH  │───▶│ DECODE  │───▶│ EXECUTE │
  └─────────┘    └─────────┘    └────┬────┘
       ▲                              │
       └──────────────────────────────┘
              (cycle repeats)

Registers: PC (Program Counter), IR (Instruction Register),
           MAR (Memory Address Register), MDR (Memory Data Register)

Phases:

1. FETCH
   • MAR ← PC           (send instruction address to memory)
   • MDR ← Memory[MAR]  (read instruction from memory)
   • IR  ← MDR           (load instruction into IR)
   • PC  ← PC + 1        (advance to next instruction)

2. DECODE
   • Control unit examines opcode in IR
   • Determines operation type, addressing mode, operands
   • Generates control signals

3. OPERAND FETCH
   • Effective address calculated based on addressing mode
   • Operand fetched from register or memory if needed

4. EXECUTE
   • ALU performs the arithmetic/logical operation
   • OR: data transfer (MOV), branch condition checked (JMP)

5. WRITE BACK
   • Result stored in destination register or memory
   • FLAGS register updated (zero, carry, overflow, sign flags)

6. INTERRUPT CHECK
   • CPU checks for pending interrupts after each cycle
   • If interrupt: save state, jump to Interrupt Service Routine (ISR)`
    },
    {
      id: 9, priority: HIGH,
      q: "Explain Cache memory in detail. Define Hit ratio.",
      from: "PYQ 2024 B2",
      marks: "7 marks",
      understand: `Cache is a small fast buffer between CPU and RAM. Hit = found in cache (fast). Miss = not found, must go to RAM (slow). Hit ratio = how often you find things in cache. A 95% hit ratio means 95% of requests are served at cache speed — that's why modern CPUs feel fast.`,
      write: `Cache Memory — Detailed Explanation

Definition:
Cache memory is a small, high-speed memory placed between the CPU and main memory to reduce average memory access time. It stores copies of frequently accessed data.

Organization:
• L1 Cache: On-chip, ~32–64 KB, ~1 ns. First level checked.
• L2 Cache: On-chip, ~256 KB–1 MB, ~4 ns. Checked on L1 miss.
• L3 Cache: Shared across cores, ~4–64 MB, ~10 ns.

Working:
When CPU requests data at address X:
1. Check L1 → if found: Cache Hit (serve immediately)
2. If not found: Check L2 → L3 → Main Memory
3. Block containing X is loaded into cache for future accesses
4. Subsequent accesses to X served from cache

Why Cache works — Locality of Reference:
• Temporal locality: recently accessed data is likely to be accessed again
• Spatial locality: data near recently accessed data is likely to be accessed

Cache Mapping:
Defines where in cache a memory block can be stored.
• Direct mapping: each block maps to 1 specific line
• Fully associative: block can go in any line
• Set-associative: block maps to a set, any line within set

─────────────────────────────────
Hit Ratio Definition:
─────────────────────────────────
Hit Ratio = Number of Cache Hits / Total Memory References

      Hit Ratio = h / (h + m)

Where h = number of hits, m = number of misses

Example: If 95 out of 100 memory accesses found in cache:
Hit Ratio = 95/100 = 0.95 = 95%

Average Memory Access Time (AMAT):
AMAT = Hit Ratio × Cache Access Time + Miss Ratio × Main Memory Access Time
     = h × Tc + (1−h) × Tm

A higher hit ratio means better system performance.
Typical hit rate in modern systems: 90–98%.`
    },
    {
      id: 10, priority: HIGH,
      q: "How is effective address calculated in relative addressing mode?",
      from: "PYQ 2024 A1 — directly asked",
      marks: "2 marks",
      understand: `Relative addressing = GPS saying "turn 5 houses ahead from where you are now." The current position is the PC. The instruction gives you the offset (how many houses ahead/behind). EA = PC + offset. Simple. Used for branches so code can run at any memory location.`,
      write: `Relative Addressing Mode — Effective Address Calculation

In relative addressing mode, the effective address (EA) is calculated by adding a displacement (offset) to the current value of the Program Counter (PC).

Formula:
EA = PC + Displacement (offset)

The displacement is a signed value stored as part of the instruction (can be positive for forward jump, negative for backward jump).

Example:
If PC = 1000 and displacement = +25:
EA = 1000 + 25 = 1025

The CPU will fetch the operand from memory address 1025.

Why used:
• Enables position-independent code (code works regardless of where it's loaded in memory)
• Efficient for branch/jump instructions
• The offset is usually small (encoded in few bits), saving instruction space`
    },
    // ── MEDIUM ───────────────────────────────────────────────────────────────
    {
      id: 11, priority: MED,
      q: "Explain Instruction Set Architecture (ISA). How does it interface hardware and software?",
      from: "Assignment 3 C1",
      marks: "11 marks",
      understand: `ISA is the contract between software and hardware. The compiler speaks ISA (machine code). The CPU executes ISA. Neither knows each other's internals — they only know the shared ISA language. This is why the same .exe runs on an Intel Core i5 AND an AMD Ryzen — both implement x86 ISA.`,
      write: `ISA — Instruction Set Architecture

Definition:
ISA is the abstract specification of a computer's architecture from the programmer's perspective. It defines what instructions the CPU can execute, without specifying how the hardware implements them.

ISA as Hardware-Software Interface:

   High-Level Language (C, Java)
            ↓  [Compiler]
   Assembly Language
            ↓  [Assembler]
   Machine Code (ISA instructions)
            ↓
   ════════ ISA BOUNDARY ════════
            ↓
   Microarchitecture (Pipeline, Cache)
            ↓
   Physical Hardware (Transistors, Gates)

Components of ISA:
1. Instruction Set — MOV, ADD, SUB, AND, JMP, IN, OUT etc.
2. Instruction Format — | Opcode | Mode | Register | Address |
3. Data Types — Integer, float, char, Boolean, BCD
4. Register Set — PC, IR, SP, FLAGS, General-purpose (R0–R31)
5. Addressing Modes — how to locate operands
6. Memory Architecture — word size, byte ordering (endianness)
7. Exception Handling — how the CPU handles errors and interrupts

Benefits of ISA Abstraction:
• Portability: same ISA code runs on different hardware generations
• Modularity: hardware upgrades don't break software
• Ecosystem: multiple vendors can implement the same ISA (Intel + AMD both implement x86)

Examples: x86 (Intel/AMD desktop), ARM (all smartphones), MIPS (embedded systems)`
    },
    {
      id: 12, priority: MED,
      q: "Arithmetic micro-operations: Selective Set, Complement, Clear, Mask — A=1010, B=1100",
      from: "Assignment 3 B3",
      marks: "7 marks",
      understand: `Each operation uses one logic gate: Set=OR, Complement=XOR, Clear=AND(NOT B), Mask=AND. B is the selector. It decides WHICH bits of A get affected. That's it.`,
      write: `Given: A = 1010,  B = 1100

a) Selective Set: A ← A OR B
   Sets bits in A to 1 wherever B has a 1.
   A    = 1010
   B    = 1100
   Result = 1110

b) Selective Complement: A ← A XOR B
   Flips bits in A wherever B has a 1.
   A    = 1010
   B    = 1100
   Result = 0110

c) Selective Clear: A ← A AND (NOT B)
   Clears bits in A to 0 wherever B has a 1.
   NOT B = 0011
   A     = 1010
   Result = 0010

d) Mask: A ← A AND B
   Keeps bits of A only where B = 1; all others become 0.
   A    = 1010
   B    = 1100
   Result = 1000

Summary:
Operation             | Result
----------------------|-------
Selective Set         | 1110
Selective Complement  | 0110
Selective Clear       | 0010
Mask                  | 1000`
    },
    {
      id: 13, priority: MED,
      q: "Cache numerical: Memory 64K×16, Cache 1K words, Direct mapping, Block size 4 words",
      from: "Assignment 4 C2",
      marks: "11 marks",
      understand: `Split the 16-bit address into 3 parts. Start from the bottom: OFFSET = log₂(block size). INDEX = log₂(cache lines). TAG = what's left. Cache line size = 1 valid bit + TAG bits + data bits.`,
      write: `Given: Memory=64K×16 (16-bit address), Cache=1K words, Block=4 words, Direct mapping

Step 1: Number of cache lines = 1024 ÷ 4 = 256 = 2⁸

Part (a) — Address Fields:
• Block Offset = log₂(4)   = 2 bits  (which word in block)
• Index        = log₂(256) = 8 bits  (which cache line)
• Tag          = 16−8−2    = 6 bits  (identifies which memory block)

Address Format: | TAG (6) | INDEX (8) | OFFSET (2) |

Part (b) — Bits per cache line:
• Valid bit   = 1 bit
• Tag         = 6 bits
• Data        = 4 words × 16 bits = 64 bits
• TOTAL       = 71 bits per cache line`
    },
  ]
};

const PRI = {
  DEFINITE: { label: "🎯 DEFINITE", short: "DEFINITE", color: "#22c55e", bg: "#052e16", border: "#14532d", textBg: "#0a3d1a" },
  HIGH:     { label: "🔥 HIGH",     short: "HIGH",     color: "#f97316", bg: "#1c0a00", border: "#7c2d12", textBg: "#2a1000" },
  MED:      { label: "⭐ MEDIUM",   short: "MED",      color: "#f59e0b", bg: "#1a1200", border: "#78350f", textBg: "#221a00" },
};

export default function App() {
  const [filter, setFilter] = useState("ALL");
  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState({});
  const [showOverlap, setShowOverlap] = useState(true);

  const toggle = id => setExpanded(e => ({ ...e, [id]: !e[id] }));
  const getTab = id => activeTab[id] || "write";
  const setTab = (id, t) => setActiveTab(p => ({ ...p, [id]: t }));

  const counts = { DEFINITE: 0, HIGH: 0, MED: 0 };
  data.questions.forEach(q => counts[q.priority]++);

  const filtered = filter === "ALL" ? data.questions : data.questions.filter(q => q.priority === filter);

  return (
    <div style={{ background: "#07070f", minHeight: "100vh", color: "#e2e8f0", fontFamily: "monospace", paddingBottom: 48 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg,#0a0a1f 0%,#050510 100%)", borderBottom: "1px solid #1a1a3e", padding: "18px 14px 14px" }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 4 }}>BCO009B · JECRC · Units 3 & 4</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#f8fafc" }}>PYQ + Assignment Study Guide</div>
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, marginBottom: 12 }}>Cross-referenced: PYQ 2024 + PYQ 2025 + Assignments 3 & 4 + Your Notes</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ background: "#052e16", border: "1px solid #14532d", color: "#22c55e", padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>🎯 {counts.DEFINITE} DEFINITE</span>
          <span style={{ background: "#1c0a00", border: "1px solid #7c2d12", color: "#f97316", padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>🔥 {counts.HIGH} HIGH</span>
          <span style={{ background: "#1a1200", border: "1px solid #78350f", color: "#f59e0b", padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>⭐ {counts.MED} MEDIUM</span>
        </div>
      </div>

      {/* Overlap Analysis */}
      <div style={{ margin: "10px 10px 0" }}>
        <button onClick={() => setShowOverlap(s => !s)}
          style={{ width: "100%", background: "#0a1a0a", border: "1px solid #14532d", borderRadius: 8, padding: "10px 14px", cursor: "pointer", color: "#4ade80", fontSize: 11, fontWeight: 700, display: "flex", justifyContent: "space-between", letterSpacing: 0.5 }}>
          <span>📊 TOPIC OVERLAP ANALYSIS (PYQs × Assignment × Notes)</span>
          <span>{showOverlap ? "▲" : "▼"}</span>
        </button>
        {showOverlap && (
          <div style={{ background: "#050d05", border: "1px solid #14532d", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "10px 14px" }}>
            {data.overlap.map((item, i) => (
              <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < data.overlap.length - 1 ? "1px solid #0f2b0f" : "none" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#86efac", marginBottom: 3 }}>{item.topic}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {item.sources.map((s, j) => (
                    <span key={j} style={{ fontSize: 9, color: "#4ade80", background: "#0a2a0a", border: "1px solid #14532d", padding: "2px 7px", borderRadius: 10 }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Buttons */}
      <div style={{ display: "flex", gap: 6, padding: "10px 10px 0", flexWrap: "wrap" }}>
        {["ALL", "DEFINITE", "HIGH", "MED"].map(f => {
          const active = filter === f;
          const cfg = f !== "ALL" ? PRI[f] : null;
          return (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "monospace",
                background: active ? (cfg?.bg || "#1e293b") : "transparent",
                color: active ? (cfg?.color || "#fff") : "#475569",
                borderColor: active ? (cfg?.border || "#475569") : "#1e293b" }}>
              {f === "ALL" ? "All" : PRI[f].label}
            </button>
          );
        })}
      </div>

      {/* Questions */}
      <div style={{ padding: "10px 10px 0", display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(item => {
          const pc = PRI[item.priority];
          const open = expanded[item.id];
          const tab = getTab(item.id);
          return (
            <div key={item.id} style={{ border: `1px solid ${open ? pc.border : "#151520"}`, borderRadius: 10, overflow: "hidden", background: open ? pc.bg : "#0a0a12" }}>
              {/* Header */}
              <button onClick={() => toggle(item.id)}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "11px 13px", display: "flex", gap: 8, alignItems: "flex-start", textAlign: "left" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 5 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: pc.color, background: pc.textBg, border: `1px solid ${pc.border}`, padding: "2px 8px", borderRadius: 12, letterSpacing: 0.5 }}>{pc.label}</span>
                    <span style={{ fontSize: 9, color: "#475569", background: "#0f172a", border: "1px solid #1e293b", padding: "2px 7px", borderRadius: 12 }}>{item.marks}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.5 }}>{item.q}</div>
                  <div style={{ fontSize: 10, color: "#475569", marginTop: 4, fontStyle: "italic" }}>📌 {item.from}</div>
                </div>
                <span style={{ color: pc.color, fontSize: 20, fontWeight: 900, flexShrink: 0, marginTop: 2 }}>{open ? "−" : "+"}</span>
              </button>

              {open && (
                <div style={{ borderTop: `1px solid ${pc.border}33`, padding: "0 13px 13px" }}>
                  {/* Tab Buttons */}
                  <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid #1e293b", marginBottom: 10 }}>
                    <button onClick={() => setTab(item.id, "understand")}
                      style={{ flex: 1, padding: "8px 4px", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: 11, fontWeight: 700,
                        background: tab === "understand" ? "#0f2044" : "#08080f",
                        color: tab === "understand" ? "#60a5fa" : "#334155" }}>
                      🧠 UNDERSTAND
                    </button>
                    <button onClick={() => setTab(item.id, "write")}
                      style={{ flex: 1, padding: "8px 4px", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: 11, fontWeight: 700,
                        background: tab === "write" ? "#0a2a14" : "#08080f",
                        color: tab === "write" ? "#4ade80" : "#334155" }}>
                      ✍️ WRITE IN EXAM
                    </button>
                  </div>

                  {tab === "understand" ? (
                    <div style={{ background: "#080e1a", border: "1px solid #1e3a5f", borderLeft: "3px solid #3b82f6", borderRadius: 6, padding: "11px 13px", fontSize: 12, color: "#bfdbfe", lineHeight: 1.8 }}>
                      {item.understand}
                    </div>
                  ) : (
                    <pre style={{ background: "#060e06", border: "1px solid #14532d", borderLeft: "3px solid #22c55e", borderRadius: 6, padding: "11px 13px", fontSize: 11, color: "#dcfce7", lineHeight: 1.75, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
                      {item.write}
                    </pre>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 20, fontSize: 9, color: "#1e293b", letterSpacing: 2 }}>
        FILTER BY DEFINITE → TAP → 🧠 UNDERSTAND → ✍️ WRITE
      </div>
    </div>
  );
}
