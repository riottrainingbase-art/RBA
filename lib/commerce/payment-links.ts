import "server-only";

// Existing Stripe Payment Links remain the single commerce source of truth.
// Keeping them server-only prevents direct payment URLs from being embedded in
// public HTML while preserving the established checkout destination.
export const paymentLinks: Readonly<Record<string, string>> = Object.freeze({
  "yaima-rba": "https://book.stripe.com/7sYeVf567eTW8aN0JV7EQ0d",
  "saga-fukuoka-2day": "https://book.stripe.com/fZu7sN2XZ9zC9eRakv7EQ0e",
  "yamagata-1day": "https://book.stripe.com/9B67sN4233be76Jakv7EQ0f",
  "shizugawa-2day": "https://book.stripe.com/00wdRbeGHh248aN0JV7EQ0i",
  "kobe-friday": "https://book.stripe.com/aFa3cxcyz6nq62F50b7EQ06",
  "kobe-half": "https://book.stripe.com/8x2dRb2XZ4fi1MpeAL7EQ00",
  "kobe-half-friday": "https://book.stripe.com/00w00l5678vyezbakv7EQ0g",
  "kobe-1day": "https://book.stripe.com/aFa28t1TV5jm3UxeAL7EQ01",
  "kobe-1day-friday": "https://book.stripe.com/00waEZ423bHKaiVeAL7EQ0h",
  "kobe-2day": "https://book.stripe.com/dRmbJ31TVdPS0IlfEP7EQ02",
  "kobe-2day-friday": "https://book.stripe.com/dRmdRb7ef1364YB64f7EQ0j",
  "kobe-3day": "https://book.stripe.com/8x25kF7efdPS76J50b7EQ03",
  "kobe-3day-friday": "https://book.stripe.com/bJe8wRgOPfY0cr3dwH7EQ0m",
  "kobe-2day-stay": "https://book.stripe.com/4gM14paqr27aezb9gr7EQ04",
  "kobe-2day-stay-friday": "https://book.stripe.com/cNi7sN5675jm62FeAL7EQ0l",
  "kobe-3day-stay": "https://book.stripe.com/cNi00leGHcLOaiV3W77EQ05",
  "kobe-3day-stay-friday": "https://book.stripe.com/bJe28tbuv8vydv764f7EQ0k",
  "torsten-live": "https://book.stripe.com/aFa14p5678vy8aN8cn7EQ0b",
  "torsten-ondemand": "https://book.stripe.com/bJebJ3dCD6nq9eR9gr7EQ0c",
});
