# Akiro - the expense tracker

This an expense tracker for iOS (and maybe later Android), written in React-Native.

The scope of this app is just entering your expenses as quickly and painlessly as possible. Processing of the entered data for reports, budgeting, etc. must be done by external software.

"Akiro" is Esperanto for "purchase".

## Next steps / Roadmap

### 0.1 Prototype
- [x] GUI prototype: Expense list
- [ ] GUI prototype: Form for entering expenses
  * Amount (Plain text field)
  * Selection of dummy payees
  * Selection of dummy envelopes
  * Selection of dummy accounts
  * Memo
  * Date ( current date )
  * Save button

### 0.2 Storage and export
- [ ] Create DB-structure and integrate sqlite (https://github.com/andpor/react-native-sqlite-storage)
- [ ] Put dummy values in DB
- [ ] Add DB-connected search field for envelope and payee
- [ ] Add new envelope to DB or payee of no exact match in search field
- [ ] Store expense in DB
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

### 0.7 Edit envelopes, payees and accounts

### 1.0 Release
- [ ] Icon
- [ ] App store?
- Design improvements
  - [ ] List sections for each date in expense list

### 2.0 The Future
[ ] Sync by logging all the changes
