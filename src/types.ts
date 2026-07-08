export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  specs?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}
