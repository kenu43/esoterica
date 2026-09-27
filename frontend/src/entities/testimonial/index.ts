import { useQuery } from '@tanstack/react-query'
import { sanityFetch } from '@/shared/api'
import { env } from '@/shared/config'
import { MOCK_TESTIMONIALS, type Testimonial } from './model/testimonials.data'

async function fetchTestimonials(): Promise<Testimonial[]> {
  if (env.VITE_DATA_SOURCE !== 'sanity') return MOCK_TESTIMONIALS
  try {
    const docs = await sanityFetch<Testimonial[]>(
      `*[_type == "testimonial"] | order(_createdAt desc) { name, city, store, text, "rating": coalesce(rating, 5) }`,
    )
    return docs.length ? docs : MOCK_TESTIMONIALS
  } catch {
    return MOCK_TESTIMONIALS
  }
}

export const useTestimonials = () =>
  useQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials, placeholderData: MOCK_TESTIMONIALS })

export { MOCK_TESTIMONIALS, type Testimonial }
