"use client";

import { TenantTestimonial } from "@/types/tenant";
import Image from "next/image";
import styles from "./TestimonialCard.module.css";

interface TestimonialCardProps {
  testimonial: TenantTestimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const stars = "⭐".repeat(testimonial.rating);

  return (
    <div className={styles.card}>
      <div className={styles.rating}>{stars}</div>
      <p className={styles.quote}>"{testimonial.quote}"</p>
      <div className={styles.author}>
        <div className={styles.avatar}>
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={50}
            height={50}
          />
        </div>
        <div className={styles.info}>
          <h4>{testimonial.name}</h4>
          <p>{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
}
