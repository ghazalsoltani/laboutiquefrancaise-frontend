import { Category } from "../types";

interface CategorySectionProps {
  readonly categories?: Category[];
  readonly onCategoryClick?: (category: Category) => void;
}

// Category images mapping
const categoryImages: Record<string, string> = {
  Sacs: "/images/categories/sacs.jpg",
  Bijoux: "/images/categories/bijoux.jpg",
  Lunettes: "/images/categories/lunettes.jpg",
};

// Category descriptions mapping
const categoryDescriptions: Record<string, string> = {
  Sacs: "Sacs en cuir élégants",
  Bijoux: "Bijoux artisanaux raffinés",
  Lunettes: "Lunettes de soleil tendance",
};

function CategorySection({
  categories = [],
  onCategoryClick,
}: CategorySectionProps) {
  // Safe categories array
  const safeCategories = Array.isArray(categories) ? categories : [];

  const handleClick = (category: Category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }

    // Scroll to products section
    setTimeout(() => {
      const productsSection = document.querySelector("section.flex-1");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Don't render if no categories
  if (safeCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          Nos Catégories
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explorez notre sélection de produits artisanaux
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {safeCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleClick(category)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg text-left"
            >
              {/* Image */}
              <img
                src={
                  categoryImages[category.name] ||
                  "/images/categories/default.jpg"
                }
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-serif font-semibold mb-1">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm mb-3">
                  {categoryDescriptions[category.name] ||
                    "Découvrez notre collection"}
                </p>
                <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                  Découvrir
                  <svg
                    className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
