# Akiro - the expense tracker

This an expense tracker for iOS (and maybe later Android), written in React-Native.

The scope of this app is just entering your expenses as quickly and painlessly as possible. Processing of the entered data for reports, budgeting, etc. must be done by external software.

"Akiro" is Esperanto for "purchase".

## Running the application
For running the iOS app, the [React native CLI](https://facebook.github.io/react-native/docs/getting-started.html#the-react-native-cli) has to be installed. If it is installed, run

    react-native run-ios  

## Next steps / Roadmap

### 0.1 GUI Prototype
- [x] GUI prototype: Expense list
  - [x] Screen
  - [x] Add "Add Expense" Button in Expense List and connect it to navigator
- [x] GUI prototype: Form for entering expenses
  - [x] Amount (Plain text field)
  - [x] Selection of payees (with dummy data)
    - [x] List Screen
    - [x] Search field for payee selection (hides section headers)
  - [x] Selection of envelopes (with dummy data)
  - [x] Selection of accounts (with dummy data)
  - [x] Memo
  - [x] Date ( current date )
  - [x] Save button
- [x] Checkmark for selected items in selection lists
- [x] Back button for select lists (to cancel)
- [x] Selecting existing item removes selection
- [x] Edit expense

### 0.2 SQL Storage
- [x] Create DB-structure and integrate sqlite (https://github.com/andpor/react-native-sqlite-storage)
- [x] Put dummy values in DB
- [ ] Add new payee to DB, if no exact match in search field
- [x] Store expense in DB (and update expense list screen)

### 0.3 Export
- [ ] Add side menu for export
- [ ] Export page (with button for mail). Select export start date and store last export date.
- [ ] Export expenses as CSV via mail
- [ ] Add option to delete exported data.

### 0.4 Speed up data entry
- [ ] Separate amount page screen, calculator style (Look ma, no keyboard)
- [ ] Store last envelope and account of each payee, select them when payee is selected
- [ ] Add "Cancel" button to search/entry fields in payee selection

### 0.5 Geolocation
- [ ] Store geolocation of each payee, put payees in 1 km radius/rectangle in a "near you" section at the top of the list
- [ ] Store geolocation of each expense, just for the fun of it
- [ ] Export geolocation in CSV

### 0.6 Export all the things!
- [ ] CSV-Export and import for all database tables
- [ ] Store CSV files in Dropbox
- [ ] Document CSV format

### 1.0 Release
This release is the MVP for personal use.
- [ ] Icon
- [ ] Splash screen

### 2.0 Release
This release makes the app useful for an international, non-technical audience. This will probably be released in the app store.

##### Configuration
- [ ] displayed currency and locale
- [ ] CSV export format
- [ ] Geolocation on/off and radius

##### Design improvements
- [ ] Add section header for each date in expense list
- [ ] Show memo and account name in expense list
- [ ] Improve button design in nav bar - larger nav bar, more explicit buttons
- [ ] Improve alignment (left margin) of button and list elements in entry list and entry add screen

##### CRUD GUI for ancillary data
Instead of importing CSV data, make the data editable in the app
- [ ] menu item for editing
- [ ] Payees
    - [ ] CRUD
    - [ ] Delete location data
- [ ] Envelopes
    - [ ] CRUD for Envelopes
    - [ ] CRUD for Envelope Categories
    - [ ] Move envelopes between categories
- [ ] Accounts
- [ ] Reset all data

### 3.0 The Future
- [ ] Sync across multiple devices by logging all the changes
- [ ] Add more remote storage options (Owncloud, Google, S3, Box)
- [ ] Android version
