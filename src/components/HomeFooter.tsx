import Image from 'next/image';

type HomeFooterProps = {
  /** When false, hides the "Have any questions?" contact form section. */
  showQuestions?: boolean;
};

export default function HomeFooter({ showQuestions = true }: HomeFooterProps) {
  return (
    <section className="bg-[#0A2E1D] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with Logo and Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo/raz-capitals-logo.png"
                alt="Raz Capitals"
                width={146}
                height={54}
                priority
                className="h-12 w-auto"
              />
              <span className="sr-only">Raz Capitals</span>
            </div>
            <p className="text-[#A0C8A9]/70 text-sm leading-relaxed mb-6">
              Your trusted partner in trading and investment management. Build wealth with confidence using our advanced trading platform.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] transition-colors"
                aria-label="Raz Capitals on X"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2h3.525l-7.708 8.798L23 22h-6.745l-4.21-5.502L7.094 22H3.568l8.243-9.405L2 2h6.91l3.804 5.032L18.244 2Z" />
                </svg>
              </a>
              <a href="#" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/features" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/trading-charts"
                  className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors"
                >
                  Trading Charts
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-medium mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A0C8A9]/70 hover:text-[#A0C8A9] text-sm transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-6">Contact Info</h3>
            <div className="flex items-center text-[#A0C8A9]/70 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              support@razcapitals.com
            </div>
          </div>
        </div>

        {showQuestions && (
          <>
            {/* Contact Form Section */}
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">Have any questions?</h2>
              <form className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-4 py-3 rounded-lg bg-[#1E2E23] border border-[#2D4A35] text-white placeholder-[#A0C8A9]/50 focus:outline-none focus:border-[#A0C8A9] transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="px-4 py-3 rounded-lg bg-[#1E2E23] border border-[#2D4A35] text-white placeholder-[#A0C8A9]/50 focus:outline-none focus:border-[#A0C8A9] transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-[#1E2E23] border border-[#2D4A35] text-white placeholder-[#A0C8A9]/50 focus:outline-none focus:border-[#A0C8A9] transition-colors resize-none mb-6"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#A0C8A9] hover:bg-[#8FB89A] text-[#1E2E23] py-3 px-8 rounded-lg font-semibold transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </>
        )}

        {/* Copyright */}
        <div className="border-t border-[#2D4A35] pt-8 text-center">
          <p className="text-[#A0C8A9]/60 text-sm">© 2025 RazCapitals. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}


