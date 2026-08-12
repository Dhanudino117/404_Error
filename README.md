# ReliefSync – Disaster Response Coordination System 

## Overview

ReliefSync is a web-based disaster response coordination system designed to improve collaboration between government agencies and non-governmental organizations (NGOs) during emergency situations such as floods, earthquakes, and cyclones.

Disaster relief operations often suffer from delays due to fragmented communication, uncoordinated data sharing, and lack of real-time visibility into resources and affected areas. ReliefSync addresses these challenges by providing a centralized platform that enables real-time data exchange through open APIs and presents actionable insights through live dashboards.

The system helps authorities and relief organizations make informed decisions quickly, reduce duplication of efforts, and ensure timely delivery of aid to affected regions.

---

## Problem Statement

During disaster scenarios: 

- NGOs and government agencies operate on isolated systems  
- Data sharing is manual and slow  
- Resource allocation is inefficient  
- Critical areas may be overlooked  

These issues lead to delayed response times and reduced effectiveness of relief efforts.

---

## Solution

ReliefSync provides a unified platform where:

- Government agencies can publish disaster alerts and affected locations  
- NGOs can update available resources such as food, medical aid, and rescue teams  
- All stakeholders can monitor real-time information through a centralized dashboard  

This improves coordination, transparency, and operational efficiency during disaster response.

---

## Key Features

- Centralized data sharing using open REST APIs  
- Real-time dashboard for monitoring disaster status and resources  
- Map-based visualization of affected areas and active relief teams  
- Role-based access control for government and NGO users  
- Live status updates for relief requests and task assignments  

---

## Technology Stack

### Frontend
- Next.js (App Router)  
- React.js  
- Tailwind CSS v4  
- Leaflet / React-Leaflet (Map Visualization)  
- Lucide React Icons  

### Backend & Database
- Next.js API Routes  
- Node.js  
- **MongoDB Atlas with Mongoose**  

### Authentication and Security
- JSON Web Tokens (JWT)  
- Role-based access control   
- Default demo credentials supported for quick testing  

### Integrations
- REST APIs for data exchange  
- OpenStreetMap via Leaflet for geospatial visualization  

---

## Getting Started & Setup Guide

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Local Installation

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file inside the `client` directory with the following variables:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/reliefsync
   JWT_SECRET=your-secret-key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Authentication & Quick Demo Login

For ease of testing and evaluation, default credentials are pre-configured in the authentication system:

- **Default Email:** `admin@reliefsync.com` (or any email)
- **Default Password:** `password123` (or any password)

Any user can log in using these default credentials or any email/password combination without requiring prior database seeding.

---

## Why Next.js & MongoDB Atlas

- **MongoDB Atlas**: Provides flexible, cloud-hosted document storage ideal for dynamic disaster relief data schemas, geospatial indexing, and real-time updates.
- **Next.js App Router**: Enables server-side rendering, API route handling, and rapid UI updates within a unified codebase.

---

## Expected Impact

- Faster disaster response and decision-making  
- Improved coordination between multiple organizations  
- Reduced redundancy in relief operations  
- Better utilization of available resources  

---

## Conclusion

ReliefSync demonstrates how modern full-stack web technologies can address real-world coordination challenges in disaster management. By leveraging Next.js, MongoDB Atlas, open REST APIs, and real-time interactive maps, the system provides a scalable and efficient solution for improving disaster relief collaboration.

