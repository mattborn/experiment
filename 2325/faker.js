const g = document.getElementById.bind(document)

import { faker } from 'https://cdn.skypack.dev/@faker-js/faker'

const insert = (target = document.body, tag = 'div') => {
  const el = document.createElement(tag)
  target.appendChild(el)
  return el
}

const testObject1 = {
  // identifiers
  CustomerNumber: faker.finance.accountNumber(),
  LoanNumber: faker.helpers.regexpStyleStringParse('[0-9][0-9][0-9][0-9][0-9][0-9]'),
  // enums
  LoanType: faker.finance.transactionType(),
  // strings
  Name: faker.person.fullName(),
  DriversLicense: faker.helpers.regexpStyleStringParse('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
  HomeAddress: faker.location.streetAddress(true),
  HomeCity: faker.location.city(),
  Employer: faker.company.name(),
  EmployerAddress: faker.location.streetAddress(),
  EmployerCity: faker.location.city(),
  BankName: faker.company.name(),
  BankAccount: faker.finance.accountNumber(),
  Store: faker.company.name(), // many (portfolio) vs. one (ar)
  Email: faker.internet.email(),
  // fixed format
  SSN: faker.helpers.regexpStyleStringParse('[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]'),
  DOB: faker.date.birthdate(),
  HomeState: faker.location.state(),
  HomeZip: faker.location.zipCode(),
  EmployerState: faker.location.state(),
  EmployerZip: faker.location.zipCode(),
  RoutingNumberABA: faker.finance.routingNumber(),
  WorkPhone: faker.phone.number(),
  CellPhone: '847 347 4463',
  // amounts
  FinanceCharge: faker.finance.amount(),
  PrincipalDue: faker.finance.amount(),
  TotalDue: faker.finance.amount(),
  // integers
  DaysLate: faker.number.int(120),
  // dates
  LoanDate: faker.date.past(),
  DueDate: faker.date.recent(),
  // events
  EventLog: [
    {
      Time: null,
      Event: 'Status changed to Collections by Lender',
    },
    {
      Time: null,
      Event: 'Debt first sold',
    },
    {
      Time: faker.date.recent(),
      Event: 'Debt acquired by Oliver',
    },
    {
      Time: null,
      Event:
        'Disclosure: Any prior arrangements are no longer relevant. This is an entirely new thing. You violated your agreement and your lender has given up on you.',
    },
    {
      Time: faker.date.recent(),
      Event: 'First message sent from Oliver',
      MessageText: faker.lorem.sentences(),
    },
  ],
  // scheduled
  ScheduledEvents: [
    {
      Time: faker.date.future(),
      Event: 'Change status to Default',
    },
  ],
  // account status
  Status: {
    SomePaymentsMade: false,
    LatestPayment: null, // inference: finance vs. principal vs. total vs. balance vs. includes penalty? vs. bank account (bounced?)
    LastVisitedApp: null,
    Communication: 'text', // default
    Payment: null, // undecided, waiting
    Terms: null, // undecided, waiting
    Verification: null, // undecided, waiting
  },
}

const pre = insert(g('data'), 'pre')
pre.textContent = JSON.stringify(testObject1, null, 2)

// max discount 50%
// first discount available after N days
