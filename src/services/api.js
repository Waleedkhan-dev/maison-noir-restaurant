/**
 * Stubbed backend. Every call resolves after a realistic delay so the UI can
 * show its pending states; swap the bodies for real fetches when the API exists.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function subscribe(email) {
  await delay(900);
  return { ok: true, email };
}

export async function createReservation(payload) {
  await delay(1400);
  return {
    ok: true,
    reference: `MN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    ...payload,
  };
}

export async function sendMessage(payload) {
  await delay(1200);
  return { ok: true, ...payload };
}

export async function placeOrder(payload) {
  await delay(1600);
  return {
    ok: true,
    reference: `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    eta: 42,
    ...payload,
  };
}
