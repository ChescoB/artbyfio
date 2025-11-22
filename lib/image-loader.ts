export default function imageLoader({ src }: { src: string }) {
  // Properly encode the URL for paths with spaces and special characters
  return encodeURI(src);
}
