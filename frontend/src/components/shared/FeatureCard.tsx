'use client';

import { TenantFeature } from '@/types/tenant';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  feature: TenantFeature;
  tenantColor: string;
}

export default function FeatureCard({ feature, tenantColor }: FeatureCardProps) {
  const iconMap: Record<string, string> = {
    rocket: '🚀',
    'map-pin': '📍',
    shield: '🛡️',
    'dollar-sign': '💰',
    wifi: '📡',
    box: '📦',
    cpu: '⚙️',
    'bar-chart-2': '📊',
    award: '🏆',
    'check-circle': '✅',
    'book-open': '📖',
    briefcase: '💼',
  };

  const icon = iconMap[feature.icon] || '⭐';

  return (
    <div 
      className={styles.card}
      style={{ borderTopColor: tenantColor }}
    >
      <div 
        className={styles.iconContainer}
        style={{ backgroundColor: tenantColor + '15' }}
      >
        <span className={styles.icon}>{icon}</span>
      </div>
      <h3 
        className={styles.title}
        style={{ color: tenantColor }}
      >
        {feature.title}
      </h3>
      <p className={styles.description}>
        {feature.description}
      </p>
    </div>
  );
}

// FeatureCard.module.css
const featureCardCSS = `
.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border-top: 4px solid;
  transition: all 300ms ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.iconContainer {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.icon {
  font-size: 1.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.1rem;
  }

  .description {
    font-size: 0.9rem;
  }
}
`;

---

// components/shared/TestimonialCard.tsx
'use client';

import { TenantTestimonial } from '@/types/tenant';
import Image from 'next/image';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  testimonial: TenantTestimonial;
  tenantColor: string;
}

export default function TestimonialCard({ 
  testimonial, 
  tenantColor 
}: TestimonialCardProps) {
  return (
    <div 
      className={styles.card}
      style={{ borderColor: tenantColor + '30' }}
    >
      {/* Stars Rating */}
      <div className={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <span 
            key={i}
            style={{ color: tenantColor }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Testimonial Content */}
      <p className={styles.content}>
        "{testimonial.content}"
      </p>

      {/* Author Info */}
      <div className={styles.author}>
        {testimonial.avatar && (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={50}
            height={50}
            className={styles.avatar}
          />
        )}
        <div>
          <p className={styles.name}>{testimonial.name}</p>
          <p className={styles.position}>
            {testimonial.position} at {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

// TestimonialCard.module.css
const testimonialCardCSS = `
.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid;
  transition: all 300ms ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.stars {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.stars span {
  font-size: 1.2rem;
}

.content {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-weight: 600;
  margin: 0;
  font-size: 0.95rem;
}

.position {
  color: #666;
  font-size: 0.85rem;
  margin: 0;
}

@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }

  .content {
    font-size: 0.95rem;
  }
}
`;