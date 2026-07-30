import nodemailer from "nodemailer";
import { CONTACT, SITE } from "@/lib/data/site";

let transport = null;

function getTransport() {
  if (transport) return transport;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP credentials are not set — add them to .env.local");
  }

  transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  return transport;
}

function fromAddress() {
  return process.env.SMTP_FROM || `"${SITE.name}" <${process.env.SMTP_USER}>`;
}

function adminAddress() {
  return process.env.ADMIN_NOTIFICATION_EMAIL || CONTACT.email;
}

/**
 * Sends both emails independently so a failure on one side doesn't block the
 * other; caller gets back which of the two actually went out.
 */
async function sendBoth(adminMail, guestMail) {
  const results = { admin: false, guest: false, errors: [] };

  try {
    await getTransport().sendMail(adminMail);
    results.admin = true;
  } catch (err) {
    results.errors.push(`admin: ${err.message}`);
  }

  try {
    await getTransport().sendMail(guestMail);
    results.guest = true;
  } catch (err) {
    results.errors.push(`guest: ${err.message}`);
  }

  return results;
}

export async function sendContactEmails({ name, email, message }) {
  const from = fromAddress();

  const adminMail = {
    from,
    to: adminAddress(),
    replyTo: email,
    subject: `New Contact Message — ${name}`,
    html: `
      <h2>New contact message from ${SITE.name} website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  };

  const guestMail = {
    from,
    to: email,
    subject: `We've received your message — ${SITE.name}`,
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to ${SITE.name}. We've received your message and our team will get back to you shortly.</p>
      <p>For urgent enquiries, call us at ${CONTACT.phones[0]}.</p>
      <p>Warm regards,<br/>${SITE.name}</p>
    `,
  };

  return sendBoth(adminMail, guestMail);
}

export async function sendBookingEmails({ checkIn, checkOut, adults, children, roomType, name, phone, email }) {
  const from = fromAddress();

  const adminMail = {
    from,
    to: adminAddress(),
    replyTo: email,
    subject: `New Booking Enquiry — ${name}`,
    html: `
      <h2>New booking enquiry from ${SITE.name} website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Room Type:</strong> ${roomType}</p>
      <p><strong>Check In:</strong> ${checkIn}</p>
      <p><strong>Check Out:</strong> ${checkOut}</p>
      <p><strong>Adults:</strong> ${adults} &nbsp; <strong>Children:</strong> ${children}</p>
    `,
  };

  const guestMail = {
    from,
    to: email,
    subject: `Your booking enquiry — ${SITE.name}`,
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for your enquiry for a <strong>${roomType}</strong> from <strong>${checkIn}</strong> to <strong>${checkOut}</strong> (${adults} adult${adults > 1 ? "s" : ""}${children > 0 ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}).</p>
      <p>Our reservations team will confirm availability and get back to you shortly. For immediate assistance, call us at ${CONTACT.phones[0]}.</p>
      <p>Warm regards,<br/>${SITE.name}</p>
    `,
  };

  return sendBoth(adminMail, guestMail);
}
