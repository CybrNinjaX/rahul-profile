import { ArrowRight, ArrowUpRight } from "lucide-react";
import { socialLinks } from "../../data/homePageData";

function ContactSection() {
	return (
		<section className="profile-contact" id="contact" aria-labelledby="contact-title">
			<div className="profile-contact-copy">
				<p className="profile-section-label"><span>05</span> Open to good ideas</p>
				<h2 id="contact-title">Let’s make<br />something <em>work.</em></h2>
				<a className="profile-button profile-button-primary" href="mailto:rahul63794@gmail.com">rahul63794@gmail.com <ArrowUpRight size={16} aria-hidden="true" /></a>
			</div>
			<div className="profile-contact-links">
				<p>Find me elsewhere</p>
				{socialLinks.map(({ label, href, icon: Icon }) => (
					<a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={16} aria-hidden="true" />{label}<ArrowRight className="profile-social-arrow" size={14} aria-hidden="true" /></a>
				))}
			</div>
		</section>
	);
}

export default ContactSection;
