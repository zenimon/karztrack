// Mock API for user loan dashboard flows.

const mockLoans = [
  {
    id: "LN-1001",
    userName: "Rahul Sharma",
    relationship: "borrower", // borrower | lender
    counterparty: "Amit Verma",
    amount: 250000,
    interestRate: 12,
    startDate: "2024-01-15",
    durationMonths: 24,
    status: "active", // active | pending | completed
    requiresConfirmation: false,
    payments: [
      { month: 1, dueDate: "2024-02-15", amount: 11500, status: "paid" },
      { month: 2, dueDate: "2024-03-15", amount: 11500, status: "paid" },
      { month: 3, dueDate: "2024-04-15", amount: 11500, status: "pending" },
    ],
  },
  {
    id: "LN-1002",
    userName: "Rahul Sharma",
    relationship: "lender",
    counterparty: "Neha Patil",
    amount: 180000,
    interestRate: 11,
    startDate: "2024-02-01",
    durationMonths: 20,
    status: "pending",
    requiresConfirmation: true,
    payments: [
      { month: 1, dueDate: "2024-03-01", amount: 9900, status: "pending" },
    ],
  },
];

const mockConfirmations = [
  {
    id: "CONF-1",
    type: "loan", // loan | repayment
    message:
      "Rahul borrowed 1,80,000 from Neha at 11% for 20 months paying 9,900/month NGO:HelpTrust",
    relatedLoanId: "LN-1002",
  },
];

export function fetchUserLoans() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(mockLoans)), 400);
  });
}

export function fetchConfirmationRequests() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(mockConfirmations)), 400);
  });
}

export function confirmRequest(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id });
    }, 400);
  });
}

export function downloadLoanPdf(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In real app this would be a file download; here we just resolve.
      resolve({ success: true, id });
    }, 600);
  });
}

