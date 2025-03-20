class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!/^[A-Z][a-zA-Z]{2,}$/.test(firstName) || !/^[A-Z][a-zA-Z]{2,}$/.test(lastName)) {
            throw new Error("First and Last Name should start with a capital letter and have at least 3 characters.");
        }
        if (!/^[a-zA-Z0-9\s]{4,}$/.test(address) || !/^[a-zA-Z\s]{4,}$/.test(city) || !/^[a-zA-Z\s]{4,}$/.test(state)) {
            throw new Error("Address, City, and State should have at least 4 characters.");
        }
        if (!/^\d{6}$/.test(zip)) {
            throw new Error("Zip code should be exactly 6 digits.");
        }
        if (!/^\d{10}$/.test(phone)) {
            throw new Error("Phone number should be exactly 10 digits.");
        }
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new Error("Invalid email format.");
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phone}, ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        if (this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName)) {
            throw new Error("Duplicate contact entry is not allowed.");
        }
        this.contacts.push(contact);
    }

    editContact(name, newContact) {
        let index = this.contacts.findIndex(c => c.firstName + " " + c.lastName === name);
        if (index !== -1) {
            this.contacts[index] = newContact;
        } else {
            throw new Error("Contact not found.");
        }
    }

    deleteContact(name) {
        let initialSize = this.contacts.length;
        this.contacts = this.contacts.filter(c => c.firstName + " " + c.lastName !== name);
        if (this.contacts.length === initialSize) {
            throw new Error("Contact not found.");
        }
    }

    countContacts() {
        return this.contacts.reduce((count) => count + 1, 0);
    }

    searchByCityOrState(name, cityOrState) {
        return this.contacts.filter(c => (c.city === cityOrState || c.state === cityOrState) && (c.firstName + " " + c.lastName === name));
    }

    viewByCityOrState(cityOrState) {
        return this.contacts.filter(c => c.city === cityOrState || c.state === cityOrState);
    }

    countByCityOrState(cityOrState) {
        return this.contacts.filter(c => c.city === cityOrState || c.state === cityOrState).length;
    }

    sortByName() {
        return this.contacts.sort((a, b) => (a.firstName + " " + a.lastName).localeCompare(b.firstName + " " + b.lastName));
    }

    sortByCityStateOrZip(criteria) {
        return this.contacts.sort((a, b) => a[criteria].localeCompare(b[criteria]));
    }
}

// **Example Usage**
let addressBook = new AddressBook();

try {
    let contact1 = new Contact("Amit", "Kumar", "Sector 12", "Delhi", "Delhi", "110011", "9876543210", "amit.kumar@example.com");
    let contact2 = new Contact("Rohit", "Sharma", "MG Road", "Mumbai", "Maharashtra", "400001", "9988776655", "rohit.sharma@example.com");
    
    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    
    console.log("All Contacts:");
    console.log(addressBook.contacts.map(c => c.toString()).join("\n"));

    console.log("\nCount of Contacts: " + addressBook.countContacts());

    console.log("\nSearch by City (Delhi):");
    console.log(addressBook.viewByCityOrState("Delhi").map(c => c.toString()).join("\n"));

    console.log("\nSorted by Name:");
    console.log(addressBook.sortByName().map(c => c.toString()).join("\n"));

} catch (error) {
    console.error(error.message);
}
