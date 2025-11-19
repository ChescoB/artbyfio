
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Shop removed',
  description: 'This page has been removed.'
};

export default function ShopPage() {
  // Return a 404 for /shop since the shop has been removed
  notFound();
}
