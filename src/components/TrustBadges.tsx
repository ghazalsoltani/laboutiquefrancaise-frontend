// Custom SVG Icons - Minimal Style
function DeliveryIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      />
    </svg>
  );
}

function SecureIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function FranceIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
      />
    </svg>
  );
}

function ReturnIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
      />
    </svg>
  );
}

function TrustBadges() {
  const badges = [
    {
      icon: DeliveryIcon,
      title: "Livraison offerte",
      description: "Dès 50€ d'achat",
    },
    {
      icon: SecureIcon,
      title: "Paiement sécurisé",
      description: "Par Stripe",
    },
    {
      icon: FranceIcon,
      title: "Made in France",
      description: "Artisanat français",
    },
    {
      icon: ReturnIcon,
      title: "Retours gratuits",
      description: "Sous 30 jours",
    },
  ];

  return (
    <section className="py-8 md:py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center gap-3 p-4"
              >
                {/* Icon - Plus grand */}
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#faf8f5]">
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-[#c5a880]" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <span
                    className="text-sm md:text-base uppercase tracking-[0.1em] text-gray-800 font-medium"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {badge.title}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500">
                    {badge.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;