# Data Model & Transitions: Pagination & Docs

This document outlines the pagination state properties and state machine rules for infinite card queue filling.

## Core State Entities

### 1. PaginationState
Extended state inside `useGameSwiper.js` hook to control catalog offsets.

| State Field | Type | Description | Default Value |
|---|---|---|---|
| `currentPage` | number | The current page number index to request from RAWG API | `1` |

---

## State Transition Workflow

The swiping queue state machine controls page transitions and filter resets.

```mermaid
stateDiagram-v2
    [*] --> InitPage1 : App Start / Reset Filters
    InitPage1: currentPage = 1, queue = []
    
    InitPage1 --> LoadSuccess : Fetch Page 1 Success
    LoadSuccess: queue contains Page 1 results
    
    LoadSuccess --> DecrementQueue : Swipe Card
    
    DecrementQueue --> LoadNextPage : Queue length < 5
    LoadNextPage: currentPage = currentPage + 1
    
    LoadNextPage --> AppendQueue : Fetch currentPage Success
    AppendQueue: queue = [...queue, ...newPageResults]
    
    AppendQueue --> DecrementQueue : Swipe Card
    
    DecrementQueue --> InitPage1 : Click "Resetar Filtros"
    LoadSuccess --> InitPage1 : Click "Resetar Filtros"
```
