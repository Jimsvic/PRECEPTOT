
export enum View {
  Profile = 'Profile',
  Publications = 'Publications',
  CV = 'CV Generator',
  AdPortal = 'Ad Portal',
  Directory = 'Directory'
}

export interface Location {
  country: string;
  state: string;
  lga: string; // Local Government Area
}

export interface User {
  id: string;
  name: string;
  email: string;
  orcid?: string;
  affiliations: string[];
  location: Location;
  bio?: string;
  researchInterests?: string[];
}

export type PublicationType = 'article' | 'book' | 'chapter' | 'conference';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  doi?: string;
  abstract?: string;
  venue?: string;
  year: number;
  pub_type: PublicationType;
  publisher?: string;
  isbn?: string;
  files?: File[];
  visibility: 'public' | 'private' | 'collaborators';
}

export type AdvertType = 'CFP' | 'book' | 'journal' | 'conference';

export interface Advert {
    id: string;
    creator: string;
    advert_type: AdvertType;
    title: string;
    content: string;
    promo_level: 'free' | 'featured' | 'email_blast';
}
