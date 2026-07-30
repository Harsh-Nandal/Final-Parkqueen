import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import { getSettings } from "@/lib/content/getSettings";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Cancellation Policy",
    description: `Booking cancellation policy for ${settings.name}, Rohtak.`,
    alternates: { canonical: "/cancellation-policy" },
  };
}

export default async function CancellationPolicyPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero title="Cancellation Policy" subtitle="Legal" />
      <section className="py-24">
        <Container className="mx-auto max-w-[760px] space-y-8 text-[15px] leading-relaxed text-grey">
          <p>
            We understand that plans can change. The following policy applies to cancellations of room bookings at{" "}
            {settings.name}.
          </p>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Standard Cancellations</h2>
            <p>
              Cancellations made at least 48 hours before the scheduled check-in time are eligible for a full
              refund. Cancellations made within 48 hours of check-in will be charged for one night&rsquo;s stay.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">No-Shows</h2>
            <p>
              Guests who do not arrive on their scheduled check-in date without prior notice will be charged the
              full amount for the first night of their reservation.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Banquet &amp; Event Bookings</h2>
            <p>
              Cancellation terms for banquet halls, conference rooms, and event bookings are agreed individually at
              the time of booking, given the advance planning involved. Please refer to your event confirmation for
              specific terms.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">How to Cancel</h2>
            <p>
              To cancel or modify a booking, please call our reservations team at{" "}
              <a href={`tel:${settings.roomPhones[0].replace(/\s+/g, "")}`} className="text-black underline hover:text-gold">
                {settings.roomPhones[0]}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${settings.email}`} className="text-black underline hover:text-gold">
                {settings.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
