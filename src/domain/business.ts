/**
 * Single source of truth for business identity.
 * Everything here is real data from am4less.com EXCEPT `email`, which the
 * current site does not publish — confirm it before going live.
 */
export const BUSINESS = {
  name: 'AM4LESS',
  legalName: 'AM4LESS Commercial Cleaning Services',
  slogan: 'Develop a Spotless Reputation',
  tagline: 'Faith · Excellence · Empowerment',
  phoneDisplay: '(267) 642-4616',
  phoneHref: 'tel:+12676424616',
  whatsappHref: 'https://wa.me/12676424616',
  email: 'bookings@am4less.com',
  city: 'Quakertown',
  region: 'PA',
  postalCode: '18951',
  areaServed: 'Quakertown, Bucks & Lehigh County, and the state of Pennsylvania',
  mapHref:
    'https://www.google.com/maps/place/@40.438894,-75.344458,14z/data=!3m1!4b1!4m3!3m2!1s0xaa409ac027bbb6c1:0x9a45185c20f5fb9e!12e1',
  hoursSummary: 'Mon–Sat 8:00 AM – 5:00 PM · Sunday closed',
  foundedNote: 'More than two decades of cleaning experience',
  social: {
    facebook: 'https://facebook.com/p/AM4LESS-61560284444247',
    instagram: 'https://instagram.com/am4less',
    tiktok: 'https://www.tiktok.com/@am4lessusa'
  },
  reviewHref: 'https://www.google.com/maps/place/@40.438894,-75.344458,14z'
} as const

export function smsHref(body: string): string {
  return `sms:+12676424616?body=${encodeURIComponent(body)}`
}

export function mailtoHref(subject: string, body: string): string {
  return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function whatsappHref(body: string): string {
  return `${BUSINESS.whatsappHref}?text=${encodeURIComponent(body)}`
}

export const CORE_VALUES = [
  {
    name: 'Faith',
    text: 'We believe in divine purpose and the power of believing in yourself.'
  },
  {
    name: 'Excellence',
    text: 'We aim for top-tier results in every service and every student we train.'
  },
  {
    name: 'Empowerment',
    text: 'We lift people higher by turning workers into entrepreneurs.'
  },
  {
    name: 'Discipline',
    text: 'We commit daily to consistency, accountability, and growth.'
  },
  {
    name: 'Consistency',
    text: 'We build success through steady action and lasting standards.'
  }
] as const
