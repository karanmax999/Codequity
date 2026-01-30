const FALLBACK_ADMINS = [
    "0x715F47Ce330aF0fd7130290874a182FBaF1D892F",
    "0x86E25598E12a7116eBb3C2bD41Ad80bdEC4a9bEf"
];

export const ADMIN_WALLETS = process.env.ADMIN_WALLETS
    ? process.env.ADMIN_WALLETS.split(",").map(addr => addr.trim())
    : FALLBACK_ADMINS;

// Session expires in 24 hours
export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;
