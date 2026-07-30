import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import { getSettings } from "@/lib/content/getSettings";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Terms & Conditions",
    description: `Terms and conditions for ${settings.name}, Rohtak.`,
    alternates: { canonical: "/terms" },
  };
}

export default async function TermsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero title="Terms & Conditions" subtitle="Legal" />
      <section className="py-24">
        <Container className="mx-auto max-w-[760px] space-y-8 text-[15px] leading-relaxed text-grey">
          <p>
            By booking a stay, dining reservation, or event with {settings.name}, you agree to the following terms
            and conditions.
          </p>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Check-In &amp; Check-Out</h2>
            <p>
              Standard check-in time is {settings.checkIn} and check-out time is {settings.checkOut}. Early check-in
              and late check-out may be arranged in advance, subject to availability.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Bookings &amp; Payment</h2>
            <p>
              All room tariffs are subject to applicable taxes as displayed at the time of booking. Full payment or
              an agreed deposit may be required to confirm a reservation.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Guest Conduct</h2>
            <p>
              Guests are expected to conduct themselves respectfully towards staff and other guests. The hotel
              reserves the right to refuse service or end a stay in cases of misconduct, damage to property, or
              violation of hotel policies.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Liability</h2>
            <p>
              While every effort is made to ensure your safety and comfort, {settings.name} is not liable for loss,
              theft, or damage to personal belongings on the premises, except where required by law.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
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
