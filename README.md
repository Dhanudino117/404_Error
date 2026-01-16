# 📰 Next.js Rendering Strategies – Project README

## 📌 Project Overview

This project demonstrates the use of **Static Rendering (SSG)**, **Dynamic Rendering (SSR)**, and **Hybrid Rendering (ISR)** using the **Next.js App Router**.  
The goal is to balance **performance**, **data freshness**, and **scalability** in a real-world application similar to a news and content platform.

The project also addresses the case study **“The News Portal That Felt Outdated”**, where static pages caused stale content and dynamic pages caused performance and cost issues.

---

## 🎯 Objective

- Understand how different rendering strategies affect:
  - Performance
  - Scalability
  - Data freshness
- Apply the right rendering strategy to the right page
- Build a balanced and scalable Next.js application

---

## 🔺 Rendering Trade-Off Triangle

| Rendering Strategy | Performance | Data Freshness | Scalability |
|-------------------|------------|----------------|-------------|
| Static (SSG) | Very Fast | Can be outdated | Excellent |
| Dynamic (SSR) | Slower | Always fresh | Expensive |
| Hybrid (ISR) | Fast | Mostly fresh | Balanced |

Each rendering mode optimizes two aspects, so choosing the correct strategy per page is crucial.

---

## 🟢 Static Rendering (SSG)

### Description
Static rendering generates pages at build time and serves them as pre-built HTML files.

### Benefits
- Extremely fast load times
- High scalability
- Minimal server cost

### Trade-offs
- Data can become outdated
- Requires rebuild to update content

### Usage in This App
- Home page
- About / marketing pages

### Implementation
```js
export const dynamic = "force-static";


