# Akiro - the expense tracker

This an expense tracker for iOS (and maybe later Android), written in React-Native.

The scope of this app is just entering your expenses as quickly and painlessly as possible. Processing of the entered data for reports, budgeting, etc. must be done by external software.

"Akiro" is Esperanto for "purchase".

## Running the application
For running the iOS app, the [React native CLI](https://facebook.github.io/react-native/docs/getting-started.html#the-react-native-cli) has to be installed. If it is installed, run

    react-native run-ios  

## Next steps / Roadmap

### 0.1 Prototype
- [x] GUI prototype: Expense list
  - [x] Screen
  - [ ] Add "Add Expense" Button in Expense List and connect it to navigator
- [ ] GUI prototype: Form for entering expenses
  - [x] Amount (Plain text field)
  - [ ] Selection of payees (with dummy data)
    - [x] List Screen
    - [ ] Search field for payee selection (hides section headers)
  - [x] Selection of envelopes (with dummy data)
  - [ ] Selection of accounts (with dummy data)
  - [x] Memo
  - [x] Date ( current date )
  - [x] Save button
- [ ] Checkmark for selected items in selection lists

### 0.2 Storage and export
- [ ] Create DB-structure and integrate sqlite (https://github.com/andpor/react-native-sqlite-storage)
- [ ] Put dummy values in DB
- [ ] Add DB-connected search field for envelope and payee
- [ ] Add new payee to DB, if no exact match in search field
- [ ] Store expense in DB (and update expense list screen)
- [ ] Export expenses as CSV via mail

### 0.3 Speed up data entry
- [ ] Separate amount page screen, calculator style (Look ma, no keyboard)
- [ ] Store last envelope and account of each payee, select them when payee is selected

### 0.4 Geolocation
- [ ] Store geolocation of each payee, put payees in 1 km radius/rectangle in a "near you" section at the top of the list
- [ ] Store geolocation of each expense, just for the fun of it
- [ ] Export geolocation in CSV

### 0.5 Export all the things!
- [ ] CSV-Export for all database tables
- [ ] Store CSV exports in Dropbox
- [ ] iPhone: Store CSV in a location where it can be synced by iTunes (https://www.npmjs.com/package/react-native-create-new-file-ios)

### 0.6 Configuration
- [ ] displayed currency and locale
- [ ] CSV export format
- [ ] Geolocation on/off and radis

### 0.7 CRUD for ancillary data
- [ ] Add hamburger menu for editing
- [ ] Payees
  - [ ] CRUD
  - Delete location data
- [ ] Envelopes
  - [ ] CRUD for Envelopes
  - [ ] CRUD for Envelope Categories
  - Move envelopes between categories
- [ ] Accounts

### 1.0 Release
- [ ] Icon
- [ ] App store?
- Design improvements
  - [ ] List sections for each date in expense list

### 2.0 The Future
- [ ] Sync by logging all the changes
- [ ] Android version
