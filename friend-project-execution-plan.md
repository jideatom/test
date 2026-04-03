# Friend Project Execution Plan

## Strategy
You have three side projects, but two are lower-pressure proof projects:
1. Logistics + Car Sales Copilot
2. SoftTouch Repair + Parts Intelligence

These two should be used to:
- sharpen your delivery process
- create portfolio-quality demos
- build confidence before the Malaria Consortium proposal

---

# 1) Logistics + Car Sales Copilot
## Goal
Build a simple AI-assisted ops dashboard for tracking cars, shipment documents, and customer updates from Dallas to Lagos.

## Main business problems to solve
- shipment status is scattered across chats, docs, and memory
- documents are hard to track
- customers need regular updates
- delays and missing papers are hard to spot early

## MVP scope
### Core entities
- Vehicle
- Customer
- Shipment
- Documents
- Status timeline

### Features
1. Vehicle tracker
   - VIN
   - make/model/year
   - customer
   - current status
   - ETA
   - notes

2. Document intake
   - invoice
   - title
   - shipping document
   - customs-related docs
   - uploaded file metadata

3. AI extraction
   Extract:
   - VIN
   - customer name
   - shipment reference
   - dates
   - destination
   - document type

4. Exceptions dashboard
   Show:
   - missing documents
   - delayed shipments
   - delivered but not closed
   - customers needing updates

5. Customer update generator
   Example:
   - "Your vehicle has been shipped and is awaiting arrival in Lagos."
   - "We are currently waiting on document confirmation."

## Recommended stack
### MVP
- FastAPI backend
- SQLite or Postgres
- simple HTML frontend first
- file upload support
- optional LLM layer for extraction + message drafts

## Data model
### vehicles
- id
- vin
- make
- model
- year
- customer_name
- status
- eta
- notes

### documents
- id
- vehicle_id
- filename
- doc_type
- extracted_json
- uploaded_at

### status_events
- id
- vehicle_id
- stage
- detail
- created_at

## Build sequence
### Week 1
- define statuses
- build DB schema
- create CRUD for vehicles
- create shipment list view

### Week 2
- add file uploads
- add extraction pipeline
- save extracted fields
- link documents to vehicle records

### Week 3
- build exceptions dashboard
- add customer update generator
- create simple demo dataset

## Demo flow
- create 3 sample vehicles
- upload sample docs
- show missing-doc alert
- show delayed shipment view
- generate a customer update

## Success criteria
- can see all active vehicles in one screen
- can identify missing paperwork
- can generate customer update drafts
- friend can say "this reduces confusion immediately"

## Nice-to-have after MVP
- WhatsApp/email export
- daily status digest
- search by customer or VIN
- Lagos customs checklist

---

# 2) SoftTouch Repair + Parts Intelligence
## Goal
Build a grounded assistant over manuals, repair notes, and part information to help answer technical questions faster.

## Main business problems to solve
- manuals and notes are hard to search
- old boards and part references are messy
- quote-support responses take time
- staff need faster access to repair / sourcing context

## MVP scope
### Core features
1. Document upload
   - PDF manuals
   - datasheets
   - repair notes
   - product sheets

2. Text extraction + chunking
   - parse uploaded docs
   - split into searchable chunks
   - store in DB

3. Grounded search
   Questions like:
   - "What does this board do?"
   - "Is repair mentioned?"
   - "What related parts are referenced?"
   - "Which industries use this product?"

4. Answer builder
   - return answer from retrieved chunks
   - show source snippets
   - avoid unsupported claims

5. Quote-support helper
   - create a brief intake summary
   - draft repair/source note
   - summarize likely next step

## Recommended stack
### MVP
- FastAPI
- SQLite
- PDF/text extraction
- keyword or simple retrieval first
- LLM answer generation in phase 2

## Data model
### documents
- id
- filename
- full_text

### chunks
- id
- document_id
- chunk_text

### optional later: part_records
- id
- part_number
- manufacturer
- industry
- status
- notes

## Build sequence
### Week 1
- build upload flow
- extract PDF/text
- store docs and chunks
- show uploaded docs

### Week 2
- implement search
- return top matching chunks
- build grounded answer view

### Week 3
- add repair/source summary helper
- test on 5–10 sample docs
- build demo Q&A list

## Demo flow
- upload manual + repair note
- ask "What does this board do?"
- ask "Is there any mention of replacement?"
- ask "What industries are referenced?"
- show grounded answer + source text

## Success criteria
- reduces lookup time
- produces technically relevant answers
- gives quote/intake support faster
- friend sees it as immediately useful

## Nice-to-have after MVP
- embeddings search
- structured extraction of part numbers
- "repair vs source" classification
- quote draft generator
- searchable part catalog view

---

# Delivery rule for both projects
For both proof projects:
- keep scope narrow
- deliver MVP first
- get feedback quickly
- avoid overengineering
- use them to refine your reusable stack

## Reusable stack you should standardize
- FastAPI
- local DB first
- file upload + extraction
- simple dashboard
- grounded retrieval
- prompt-based drafting

This lets you reuse the same architecture when you return to the Malaria Consortium concept later.
