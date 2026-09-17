import "./admin.css";

export const metadata = {
  title: "Music Gurukula — Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mg-admin-root">{children}</div>;
}
