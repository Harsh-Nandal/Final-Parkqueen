import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import { getSettings } from "@/lib/content/getSettings";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: "Privacy Policy",
    description: `Privacy policy for ${settings.name}, Rohtak.`,
    alternates: { canonical: "/privacy-policy" },
  };
}

export default async function PrivacyPolicyPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero title="Privacy Policy" subtitle="Legal" />
      <section className="py-24">
        <Container className="mx-auto max-w-[760px] space-y-8 text-[15px] leading-relaxed text-grey">
          <p>
            {settings.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy and is
            committed to protecting the personal information you share with us when you visit our website, make a
            booking enquiry, or contact us.
          </p>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Information We Collect</h2>
            <p>
              When you submit a booking enquiry or contact form, we collect your name, email address, phone number,
              and any details you provide about your stay or enquiry (such as check-in/check-out dates, room
              preference, or message content).
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">How We Use Your Information</h2>
            <p>
              We use the information you provide solely to respond to your enquiry, process booking requests,
              confirm reservations, and communicate with you about your stay. We do not sell or rent your personal
              information to third parties.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Data Storage &amp; Security</h2>
            <p>
              Your information is stored securely and is only accessible to authorised hotel staff for the purposes
              described above.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg text-black">Contact Us</h2>
            <p>
              If you have questions about this privacy policy or how your information is handled, please contact us
              at{" "}
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
