import type { PolicyPageContent } from '../types/content';
import { getPolicies } from './cms';

const policies = await getPolicies();

function requirePolicy(slug: string): PolicyPageContent {
  const policy = policies[slug];
  if (!policy) throw new Error(`Missing required CMS policy: ${slug}`);
  return policy;
}

export const privacyPolicy = requirePolicy('privacy-policy');
export const termsOfUse = requirePolicy('terms-of-use');
