import type { CertImageKey } from './translations'
import certFullstackWeb from '../assets/cert-fullstack-web.webp'
import certIndianCooking from '../assets/cert-indian-cooking.webp'
import certPythonBootcamp from '../assets/cert-python-bootcamp.webp'
import certPythonMega from '../assets/cert-python-mega.webp'
import whyOurGenerationImg from '../assets/whyourgeneration.webp'
import whyMassesImg from '../assets/whyIbelievethemasses.webp'
import onExistentialCrisisImg from '../assets/onexistentialcrisis.webp'
import theComplexityOfEducationImg from '../assets/thecomplexityofeducation.webp'
import theIdealOfDiversityImg from '../assets/theidealofdiversity.webp'

export const certImages: Record<CertImageKey, string> = {
  pythonBootcamp: certPythonBootcamp,
  fullstackWeb: certFullstackWeb,
  pythonMega: certPythonMega,
  indianCooking: certIndianCooking,
}

// Keyed by blog post id; posts without an entry fall back to a decorative placeholder cover
export const blogCoverImages: Partial<Record<string, string>> = {
  'why-our-generation-cannot-ignore-agi': whyOurGenerationImg,
  'why-masses-happier-without-ai': whyMassesImg,
  'on-existential-crisis': onExistentialCrisisImg,
  'education-complexity-and-information-gap': theComplexityOfEducationImg,
  'the-ideal-of-diversity': theIdealOfDiversityImg,
}
