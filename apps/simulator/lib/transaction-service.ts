interface TransactionRequest {
  amount: number
  recipient: string
  purpose?: string
  isSuspicious?: boolean
  isAfterHours?: boolean
  location?: string
  userRole?: string
}

interface TransactionResponse {
  status: "approved" | "denied"
  reason?: string
  transactionId?: string
}

// Role-based limits
const ROLE_LIMITS = {
  intern: {
    singleTransaction: 100,
    daily: 300,
  },
  junior: {
    singleTransaction: 500,
    daily: 1000,
  },
  manager: {
    singleTransaction: 2000,
    daily: 5000,
  },
  executive: {
    singleTransaction: 10000,
    daily: 25000,
  },
}

// Allowed countries
const ALLOWED_COUNTRIES = ["Germany", "France", "Spain", "Italy", "Netherlands"]

export async function checkTransaction(request: TransactionRequest): Promise<TransactionResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { amount, recipient, isSuspicious, isAfterHours, location, userRole = "junior" } = request

  // Check for suspicious flag
  if (isSuspicious) {
    return {
      status: "denied",
      reason: "Transaction flagged as suspicious",
    }
  }

  // Check for after-hours transactions
  if (isAfterHours && amount > 1000) {
    return {
      status: "denied",
      reason: "High-value transactions are not allowed outside business hours",
    }
  }

  // Check for geo-location restrictions
  if (location && !ALLOWED_COUNTRIES.includes(location)) {
    return {
      status: "denied",
      reason: `Transactions from ${location} are not allowed`,
    }
  }

  // Check role-based limits
  const limits = ROLE_LIMITS[userRole as keyof typeof ROLE_LIMITS] || ROLE_LIMITS.junior

  if (amount > limits.singleTransaction) {
    return {
      status: "denied",
      reason: `Transaction exceeds the ${userRole} single transaction limit of €${limits.singleTransaction}`,
    }
  }

  // All checks passed
  return {
    status: "approved",
    transactionId: `TX-${Math.floor(Math.random() * 1000000)}`,
  }
}

