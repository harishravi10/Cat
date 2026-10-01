-- ==========================================================
-- SSN Question Paper Vault - Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==========================================================

-- 1. Create the question_papers table
create table if not exists public.question_papers (
  id uuid primary key default gen_random_uuid(),
  paper_name text not null,
  paper_text text not null,
  uploaded_by text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Ensure at the database constraint level that only SSN institutional emails are stored
  constraint ssn_email_check check (uploaded_by ilike '%@ssn.edu.in')
);

-- 2. Create index on created_at for fast descending queries
create index if not exists idx_question_papers_created_at 
  on public.question_papers (created_at desc);

-- 3. Enable Row Level Security (RLS)
alter table public.question_papers enable row level security;

-- 4. Policy: Allow all users (including anonymous visitors) to view question papers
create policy "Allow public read access to question papers"
  on public.question_papers
  for select
  using (true);

-- 5. Policy: Allow insertion of question papers only with valid @ssn.edu.in email
create policy "Allow insert with valid SSN institutional email"
  on public.question_papers
  for insert
  with check (uploaded_by ilike '%@ssn.edu.in');

-- ==========================================================
-- Optional: Sample Seed Question Papers
-- ==========================================================
insert into public.question_papers (paper_name, paper_text, uploaded_by)
values
(
  'Data Structures & Algorithms - CAT 1 (2024)',
  'DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
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
6. (a) Write algorithms for inserting at any given position and deleting a node with a specific value in a doubly linked list.
   OR
   (b) Explain the evaluation of postfix expressions using a stack with an illustrative example.

7. (a) Implement a Priority Queue using an array and explain its operations with time complexities.
   OR
   (b) Explain the Josephus problem and demonstrate how a circular linked list can be utilized to solve it efficiently.',
  'srikrishna2412069@ssn.edu.in'
),
(
  'Operating Systems - Semester End Exam (2023)',
  'DEPARTMENT OF INFORMATION TECHNOLOGY
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
7. What is Beladys Anomaly? Name the page replacement algorithm susceptible to it.
8. Define thrashing and explain its effect on CPU utilization.
9. Distinguish between logical and physical address spaces.
10. What is a Translation Lookaside Buffer (TLB)?

PART B (5 x 13 = 65 Marks)
11. (a) Consider processes P1, P2, P3, P4. Draw Gantt charts and calculate average turnaround and waiting time for FCFS, SJF Preemptive, and Round Robin (Quantum = 4).
    OR
    (b) Explain the Dining Philosophers Problem and provide a deadlock-free monitor solution.

12. (a) Explain Bankers Algorithm for Deadlock Avoidance with a suitable 5-process, 3-resource example.',
  'raghavan.m@ssn.edu.in'
);
