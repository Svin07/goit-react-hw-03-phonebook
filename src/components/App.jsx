import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContsctList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  createContact = body => {
    const isExist = this.state.contacts.find(
      el => el.name.toLowerCase() === body.name.toLowerCase()
    );
    if (isExist) {
      alert(`${body.name} is already in contacts.`);
      return;
    }

    this.setState(prev => ({
      contacts: [...prev.contacts, { id: nanoid(), ...body }],
    }));
  };

  filterContact = filterQuery => {
    this.setState({
      filter: filterQuery,
    });
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilterAddContact = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter)
    );
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div
          style={{
            margin: 15,
            padding: '12px 16px',
            borderRadius: 4,
            backgroundColor: 'gray',
            color: 'white',
          }}
        >
          <h1>Phonebook</h1>
          <ContactForm createContact={this.createContact} />

          <h2>Contacts</h2>
          <Filter filterContact={this.filterContact} />
          <ContactList
            contacts={this.getFilterAddContact()}
            handleDelete={this.handleDelete}
          ></ContactList>
        </div>
      </div>
    );
  }
}
