import type { CertImageKey, ProjectImageKey } from './translations'
import certFullstackWeb from '../assets/cert-fullstack-web.webp'
import certHighschool from '../assets/cert-highschool.webp'
import certIndianCooking from '../assets/cert-indian-cooking.webp'
import certMba from '../assets/cert-mba.webp'
import certPythonBootcamp from '../assets/cert-python-bootcamp.webp'
import certPythonMega from '../assets/cert-python-mega.webp'
import certSqlBootcamp from '../assets/cert-sql-bootcamp.webp'
import projectTypbox from '../assets/project-01.webp'
import projectTalonbox from '../assets/project-02.webp'
import projectWarbox from '../assets/project-03.webp'
import whyOurGenerationImg from '../assets/whyourgeneration.webp'
import whyMassesImg from '../assets/whyIbelievethemasses.webp'
import onExistentialCrisisImg from '../assets/onexistentialcrisis.webp'
import theComplexityOfEducationImg from '../assets/thecomplexityofeducation.webp'
import theIdealOfDiversityImg from '../assets/theidealofdiversity.webp'
import unfoundedConfidenceImg from '../assets/unfoundedconfidence.webp'
import breakingPreconceptionsImg from '../assets/breakingpreconceptions.webp'

export const certImages: Record<CertImageKey, string> = {
  highschool: certHighschool,
  pythonBootcamp: certPythonBootcamp,
  fullstackWeb: certFullstackWeb,
  pythonMega: certPythonMega,
  indianCooking: certIndianCooking,
  mba: certMba,
  sqlBootcamp: certSqlBootcamp,
}

// Project screenshots: all trimmed to 1600 × 830, so frames use aspect-[160/83] and nothing is cropped
export const projectImages: Record<ProjectImageKey, string> = {
  typbox: projectTypbox,
  talonbox: projectTalonbox,
  warbox: projectWarbox,
}

// Keyed by blog post id; posts without an entry fall back to a decorative placeholder cover
export const blogCoverImages: Partial<Record<string, string>> = {
  'why-our-generation-cannot-ignore-agi': whyOurGenerationImg,
  'why-masses-happier-without-ai': whyMassesImg,
  'on-existential-crisis': onExistentialCrisisImg,
  'education-complexity-and-information-gap': theComplexityOfEducationImg,
  'the-ideal-of-diversity': theIdealOfDiversityImg,
  'on-unfounded-confidence': unfoundedConfidenceImg,
  'how-to-break-preconceptions': breakingPreconceptionsImg,
}
