# Self Productivity Tracking System

## Overview

This project defines a *privacy-first, individual self-productivity tracking system* built using a *hybrid architecture*:

* *Web Application* – User interface, dashboard, analytics visualization
* *Local Desktop Agent* – On-device data collection and enforcement
* *Backend Server* – Secure storage, analytics, intelligence, and integrity monitoring

The system is explicitly *consent-based, **transparent, and **user-owned*. No silent tracking exists. All tracking begins only after the user enables it and follows strict ethical and privacy rules.

---

## Problem Statement

Individuals lack a trustworthy, self-controlled system to understand and improve daily productivity without employer surveillance or unethical monitoring.

---

## Solution Summary (TL;DR)

A self-owned productivity enforcement platform where users explicitly enable daily tracking that cannot be stopped until midnight, providing transparent analytics, privacy controls, and intelligent insights to improve focus and work discipline.

---

## System Architecture

### 1. Web Application (Frontend)

*Responsibilities:*

* User registration & login
* Permission management
* Tracker control (enable/disable)
* Dashboard & analytics visualization
* Privacy and data management

*Key Characteristics:*

* No tracking logic
* No system-level access
* Read-only view of collected data

---

### 2. Local Desktop Tracking Agent

*Responsibilities:*

* Data collection (screenshots, apps, websites, idle state)
* Enforcement of tracker rules
* Tamper detection
* Local encryption before transmission

*Key Characteristics:*

* Runs only after explicit enable
* Cannot be silently installed
* Visible system presence
* Enforces midnight lock rule

---

### 3. Backend Server

*Responsibilities:*

* Authentication & authorization
* Secure data ingestion
* Analytics & intelligence processing
* Tamper event monitoring
* Report generation

*Key Characteristics:*

* No direct device access
* Cannot initiate tracking
* User-owned data model

---

## Functional Flow (Step-by-Step)

### Step 1: User Registration

User creates an account via the web application.

*Registration Form Fields:*

* username
* email
* password
* age
* gender
* profession
* device_type (Windows / macOS / Linux)

*Permissions (Explicit Checkboxes):*

* allow_screenshot_capture
* allow_application_tracking
* allow_website_tracking
* allow_idle_detection
* allow_network_event_logging
* agree_to_privacy_policy
* agree_to_no_silent_tracking

Registration is blocked unless all mandatory disclosures are accepted.

---

### Step 2: Login & Profile Setup

*Profile Fields:*

* full_name (optional)
* timezone
* daily_work_goal_hours (optional)
* preferred_work_window (optional)

Goals are optional and never enforced unless provided.

---

### Step 3: Dashboard Access

The dashboard displays:

* Profile summary
* Active permissions
* Tracker status
* Daily goal progress
* Historical productivity data
* Privacy controls

No tracking occurs at this stage.

---

### Step 4: Tracker Enable

When the user clicks *Enable Tracker*:

* Backend records start intent
* Local agent activates
* Start timestamp is locked
* Disable option is removed
* Countdown to midnight begins

*Critical Rule:*
Once enabled, the tracker cannot be stopped until *12:00 AM*.

---

### Step 5: Active Tracking Phase

#### Data Collected (Local Agent Only)

*Screenshots*

* Periodic capture
* Sensitive app & website blur
* Screenshot metadata tagging

*Website Usage*

* Domain name
* Start & end time
* Duration

*Application Usage*

* Application name
* Foreground time
* Total usage duration

*Idle Detection*

* Keyboard/mouse inactivity
* System sleep
* Extended idle intervals

*Network Events*

* Disconnects
* Reconnects
* Offline durations

---

### Step 6: Tamper Detection

The agent continuously monitors:

* Forced shutdown attempts
* Process termination
* System clock manipulation
* Network suppression

*Tamper Severity Levels:*

* Low: network fluctuation
* Medium: app force close
* High: repeated kill attempts

All tamper events are logged and visible to the user.

---

### Step 7: Midnight Enforcement

At exactly *12:00 AM*:

* Tracking stops automatically
* Daily summary is generated
* Tracker becomes manually stoppable
* Next day requires re-enable

---

## Intelligence & Analytics

### Productivity Classification

* Manual website tagging (productive / distracting)
* Pattern-based classification (future ML)

### Focus Session Detection

* Long uninterrupted productive periods
* Context-aware deep work detection

### Burnout & Overwork Detection

* Excessive daily hours
* Lack of breaks
* Continuous late-night usage

### Smart Break Recommendations

* Triggered by fatigue patterns
* Shown as dashboard suggestions

### Anomaly Detection

* Sudden behavior changes
* Unusual inactivity or spikes

---

## Reporting

### Daily Report

* Productive vs distracted time
* Idle duration
* Goal completion percentage
* Tamper incidents

### Weekly Report

* Productivity trends
* Focus consistency
* Burnout risk indicators

### Timeline Replay

* Hour-by-hour activity timeline
* Screenshot preview (blurred)

### Explainable Metrics

* Clear definitions for every score
* No hidden algorithms

---

## Privacy & Ethics

### Privacy Controls

* Screenshot blur
* Website blacklist
* Sensitive app pause

### Data Retention

* Auto-delete after configurable days
* Manual deletion
* Data export

### Ethical Principles

* No silent tracking
* No third-party access
* User-owned data
* Full transparency

---

## Security & Integrity

* Local encryption before transmission
* Secure backend storage
* Heartbeat monitoring between agent and server
* Visible integrity logs

---

## What Is In Scope

* Individual self-tracking
* Consent-based monitoring
* Behavioral analytics
* Daily enforcement rules

---

## Explicitly Out of Scope

* Employer surveillance
* Keystroke logging
* Audio/video recording
* Background spying
* Remote control of devices

---

## Final Note

This system is designed as a *personal discipline and awareness platform*, not a surveillance tool. Every feature prioritizes user consent, transparency, and ethical responsibility, making it suitable for real-world, production-grade deployment.
