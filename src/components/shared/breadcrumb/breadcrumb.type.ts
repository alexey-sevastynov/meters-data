export interface BreadcrumbItem {
  id: string;
  label: string;
  link: string;
  isActive?: boolean;
}

export interface MdBreadcrumbProps {
  items: BreadcrumbItem[];
}
