import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-teal">404</p>
      <h1 className="mt-3 font-display text-[40px] font-semibold leading-[46px]">Page not found · Sahifa topilmadi</h1>
      <p className="mt-6 flex gap-6">
        <Link href="/en" className="font-semibold">Home →</Link>
        <Link href="/uz" className="font-semibold">Bosh sahifa →</Link>
      </p>
    </Container>
  );
}
