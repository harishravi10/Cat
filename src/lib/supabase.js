import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial curated seed data for SSN students
const DEFAULT_PAPERS = [
  {
    id: 'qp-ssn-101',
    paper_name: 'Data Structures & Algorithms - CAT 1 (2024)',
    paper_text: `DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
SSN COLLEGE OF ENGINEERING
CONTINUOUS ASSESSMENT TEST - 1 (2024)
Course: CS8391 - Data Structures & Algorithms
Duration: 90 Minutes | Max Marks: 50

PART A (5 x 2 = 10 Marks)
1. Differentiate between linear and non-linear data structures with examples.
2. What is the time complexity of inserting a node at the beginning of a singly linked list?
3. Convert the infix expression (A + B) * (C - D) into postfix notation.
4. Define circular queue. Why is it preferred over a linear queue?
5. State the condition for queue overflow in an array-based implementation.

PART B (2 x 15 = 30 Marks)
6. (a) Write algorithms for the following operations on a doubly linked list:
       (i) Insert at any given position (8 Marks)
       (ii) Delete a node with a specific value (7 Marks)
   OR
   (b) Explain the evaluation of postfix expressions using a stack with an illustrative example. Trace for: 6 5 2 3 + 8 * + 3 + *

7. (a) Implement a Priority Queue using an array and explain its operations with time complexities. (15 Marks)
   OR
   (b) Explain the Josephus problem and demonstrate how a circular linked list can be utilized to solve it efficiently. (15 Marks)

PART C (1 x 10 = 10 Marks)
8. Design a browser back/forward history management system using stack data structures. Provide detailed pseudo-code.`,
    uploaded_by: 'srikrishna2412069@ssn.edu.in',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  },
  {
    id: 'qp-ssn-102',
    paper_name: 'Operating Systems - Semester End Exam (2023)',
    paper_text: `DEPARTMENT OF INFORMATION TECHNOLOGY
SSN COLLEGE OF ENGINEERING
SEMESTER EXAMINATION - NOVEMBER 2023
Course: IT8401 - Operating Systems
Duration: 3 Hours | Max Marks: 100

PART A (10 x 2 = 20 Marks)
1. What is the role of the Process Control Block (PCB)?
2. Define context switching and identify factors affecting switching overhead.
3. What are the four necessary conditions for a deadlock to occur?
4. Differentiate between preemptive and non-preemptive CPU scheduling.
5. What is the primary difference between a process and a thread?
6. Explain internal vs external fragmentation.
7. What is Belady's Anomaly? Name the page replacement algorithm susceptible to it.
8. Define thrashing and explain its effect on CPU utilization.
9. Distinguish between logical and physical address spaces.
10. What is a Translation Lookaside Buffer (TLB)?

PART B (5 x 13 = 65 Marks)
11. (a) Consider the following set of processes with arrival time and CPU burst times:
    P1: Arrival 0, Burst 8
    P2: Arrival 1, Burst 4
    P3: Arrival 2, Burst 9
    P4: Arrival 3, Burst 5
    Draw Gantt charts and calculate average turnaround and waiting time for:
    (i) FCFS (ii) SJF Preemptive (SRTF) (iii) Round Robin (Quantum = 4)
    OR
    (b) Explain the Dining Philosophers Problem and provide a deadlock-free monitor solution.

12. (a) Explain Bankers Algorithm for Deadlock Avoidance with a suitable 5-process, 3-resource example.
    OR
    (b) Describe Paging hardware and detail the mechanism of address translation with TLB support.

PART C (1 x 15 = 15 Marks)
13. Suppose a computer system has 32-bit virtual addresses and a page size of 4 KB. If each page table entry takes 4 bytes, design a multi-level page table structure to optimize memory footprint.`,
    uploaded_by: 'raghavan.m@ssn.edu.in',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
  },
  {
    id: 'qp-ssn-103',
    paper_name: 'Database Management Systems - CAT 2 (2024)',
    paper_text: `DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
SSN COLLEGE OF ENGINEERING
CONTINUOUS ASSESSMENT TEST - 2 (2024)
Course: CS8492 - Database Management Systems
Duration: 90 Minutes | Max Marks: 50

PART A (5 x 2 = 10 Marks)
1. State the ACID properties of database transactions.
2. Differentiate between 3NF and BCNF with a simple dependency rule.
3. What is the purpose of the SQL GROUP BY and HAVING clauses?
4. Define Lossless Join Decomposition.
5. What is a serializable schedule?

PART B (2 x 15 = 30 Marks)
6. (a) Consider relation R(A, B, C, D, E) with Functional Dependencies:
       F = { A -> BC, CD -> E, B -> D, E -> A }
       (i) Find all candidate keys of R. (7 Marks)
       (ii) Determine the highest normal form of R and decompose if necessary. (8 Marks)
   OR
   (b) Write SQL queries for a University Database:
       STUDENT(RollNo, Name, Dept, CGPA)
       ENROLLMENT(RollNo, CourseId, Grade)
       COURSE(CourseId, CourseName, Credits)
       (i) Find names of students who have enrolled in all courses offered by 'CSE'.
       (ii) Find courses with more than 50 enrolled students where average CGPA > 8.0.

7. (a) Explain Two-Phase Locking (2PL) protocol. Contrast Strict 2PL and Rigorous 2PL. (15 Marks)
   OR
   (b) Explain B+ Tree indexing. Demonstrate step-by-step insertion of keys: 10, 20, 30, 40, 50, 60 with order p=3. (15 Marks)

PART C (1 x 10 = 10 Marks)
8. Design an ER diagram for a Campus Placement Management Portal with at least 4 entities, cardinalities, and key constraints.`,
    uploaded_by: 'ananya.s@ssn.edu.in',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString()
  }
];

const LOCAL_STORAGE_KEY = 'ssn_question_papers_store_v1';

function getLocalPapers() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PAPERS));
      return DEFAULT_PAPERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading localStorage papers:', err);
    return DEFAULT_PAPERS;
  }
}

function saveLocalPapers(papers) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(papers));
  } catch (err) {
    console.error('Error writing localStorage papers:', err);
  }
}

/**
 * Fetch question papers (from Supabase if configured, otherwise from localStorage)
 */
export async function getQuestionPapers() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('question_papers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase query error, falling back to local cache:', error.message);
        return { data: getLocalPapers(), source: 'local', error: error.message };
      }

      // If Supabase table is empty on first setup, seed or return empty
      return { data: data || [], source: 'supabase', error: null };
    } catch (err) {
      console.warn('Supabase fetch failed:', err);
      return { data: getLocalPapers(), source: 'local', error: err.message };
    }
  }

  // Local fallback
  return { data: getLocalPapers(), source: 'local', error: null };
}

/**
 * Upload a new question paper (text only)
 */
export async function createQuestionPaper({ paper_name, paper_text, uploaded_by }) {
  const newPaper = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'qp-' + Date.now(),
    paper_name: paper_name.trim(),
    paper_text: paper_text.trim(),
    uploaded_by: uploaded_by.trim().toLowerCase(),
    created_at: new Date().toISOString()
  };

  // Always update local cache for instant resilience
  const currentLocal = getLocalPapers();
  const updatedLocal = [newPaper, ...currentLocal];
  saveLocalPapers(updatedLocal);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('question_papers')
        .insert([
          {
            paper_name: newPaper.paper_name,
            paper_text: newPaper.paper_text,
            uploaded_by: newPaper.uploaded_by
          }
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert error (stored locally):', error.message);
        return { data: newPaper, source: 'local', error: error.message };
      }

      return { data: data || newPaper, source: 'supabase', error: null };
    } catch (err) {
      console.warn('Supabase insert network error (stored locally):', err);
      return { data: newPaper, source: 'local', error: err.message };
    }
  }

  return { data: newPaper, source: 'local', error: null };
}
