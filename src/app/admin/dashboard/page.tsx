import { getCurrentAdmin } from "@/lib/server/auth";
import {
  PROGRAM_PATHS,
  getEnquiryStats,
  listEnquiries,
  pathLabel,
  type EnquiryStatus,
} from "@/lib/server/enquiries";
import StatusSelect from "./StatusSelect";
import { logoutAction } from "./actions";

const ALLOWED_STATUSES = ["all", "new", "contacted", "enrolled", "closed"];

function buildUrl(
  current: { path: string; status: string; q: string; page: number },
  overrides: Partial<{ path: string; status: string; q: string; page: number }>
): string {
  const merged = { ...current, ...overrides };
  const params = new URLSearchParams();
  if (merged.path && merged.path !== "all") params.set("path", merged.path);
  if (merged.status && merged.status !== "all")
    params.set("status", merged.status);
  if (merged.q) params.set("q", merged.q);
  if (merged.page && merged.page !== 1) params.set("page", String(merged.page));
  const qs = params.toString();
  return qs ? `/admin/dashboard?${qs}` : "/admin/dashboard";
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const admin = await getCurrentAdmin();
  const sp = await searchParams;

  const knownPaths = Object.keys(PROGRAM_PATHS);
  const rawPath = typeof sp.path === "string" ? sp.path : "all";
  const activePath =
    rawPath === "all" || knownPaths.includes(rawPath) ? rawPath : "all";

  const rawStatus = typeof sp.status === "string" ? sp.status : "all";
  const activeStatus = ALLOWED_STATUSES.includes(rawStatus) ? rawStatus : "all";

  const search = typeof sp.q === "string" ? sp.q.trim() : "";
  const pageParam = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
  const requestedPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const [{ countsByPath, totalCount, newCount }, { enquiries, page, totalPages }] =
    await Promise.all([
      getEnquiryStats(),
      listEnquiries({
        path: activePath,
        status: activeStatus,
        q: search,
        page: requestedPage,
      }),
    ]);

  const current = { path: activePath, status: activeStatus, q: search, page };

  return (
    <div className="mg-shell">
      <div className="mg-topbar">
        <div className="mg-brand">
          <span className="mg-brand-badge">♪</span>
          <span className="mg-brand-name">
            Music <em>Gurukula</em> · Admin
          </span>
        </div>
        <div className="mg-topbar-user">
          <span>Signed in as {admin?.username}</span>
          <form action={logoutAction}>
            <button type="submit" className="mg-btn" style={{ background: "none", padding: 0 }}>
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="mg-main">
        <h1 className="mg-page-title">Enquiries</h1>
        <p className="mg-page-subtitle">
          Every enquiry from the website is auto-segregated by program of interest.
        </p>

        <div className="mg-stats">
          <div className="mg-stat-card">
            <div className="mg-stat-value">{totalCount}</div>
            <div className="mg-stat-label">Total enquiries</div>
          </div>
          <div className="mg-stat-card">
            <div className="mg-stat-value">{newCount}</div>
            <div className="mg-stat-label">New, unactioned</div>
          </div>
          {Object.entries(PROGRAM_PATHS)
            .filter(([slug]) => slug !== "general")
            .map(([slug, label]) => (
              <div className="mg-stat-card" key={slug}>
                <div className="mg-stat-value">{countsByPath[slug] ?? 0}</div>
                <div className="mg-stat-label">{label}</div>
              </div>
            ))}
        </div>

        <div className="mg-tabs">
          <a
            className={`mg-tab ${activePath === "all" ? "active" : ""}`}
            href={buildUrl(current, { path: "all", page: 1 })}
          >
            All <span className="count">{totalCount}</span>
          </a>
          {Object.entries(PROGRAM_PATHS).map(([slug, label]) => (
            <a
              key={slug}
              className={`mg-tab ${activePath === slug ? "active" : ""}`}
              href={buildUrl(current, { path: slug, page: 1 })}
            >
              {label} <span className="count">{countsByPath[slug] ?? 0}</span>
            </a>
          ))}
        </div>

        <form className="mg-toolbar" method="get">
          {activePath !== "all" && (
            <input type="hidden" name="path" value={activePath} />
          )}
          <input
            type="search"
            name="q"
            placeholder="Search name, phone, email…"
            defaultValue={search}
          />
          <select name="status" defaultValue={activeStatus}>
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="enrolled">Enrolled</option>
            <option value="closed">Closed</option>
          </select>
          <button type="submit" className="mg-btn" style={{ background: "#eee" }}>
            Filter
          </button>
          {(search !== "" || activeStatus !== "all") && (
            <a
              className="mg-btn"
              style={{ background: "#eee" }}
              href={buildUrl(current, { q: "", status: "all", page: 1 })}
            >
              Clear
            </a>
          )}
        </form>

        <div className="mg-table-wrap">
          {enquiries.length === 0 ? (
            <div className="mg-empty">No enquiries match these filters yet.</div>
          ) : (
            <table className="mg-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Student / contact</th>
                  <th>Program</th>
                  <th>Timing &amp; notes</th>
                  <th>Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((row) => {
                  const { date, time } = formatDate(row.created_at);
                  return (
                    <tr key={row.id}>
                      <td className="mg-muted">
                        {date}
                        <br />
                        {time}
                      </td>
                      <td>
                        <strong>{row.name}</strong>
                        <br />
                        <span className="mg-muted">{row.phone}</span>
                        {row.email && (
                          <>
                            <br />
                            <span className="mg-muted">{row.email}</span>
                          </>
                        )}
                      </td>
                      <td>
                        <span className={`mg-badge mg-badge-${row.path_slug}`}>
                          {pathLabel(row.path_slug)}
                        </span>
                      </td>
                      <td style={{ maxWidth: 240 }}>
                        {row.preferred_timing && <div>{row.preferred_timing}</div>}
                        {row.message && (
                          <div className="mg-muted" style={{ whiteSpace: "pre-line" }}>
                            {row.message}
                          </div>
                        )}
                      </td>
                      <td className="mg-muted">{row.source}</td>
                      <td>
                        <StatusSelect id={row.id} status={row.status as EnquiryStatus} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mg-pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                className={p === page ? "active" : ""}
                href={buildUrl(current, { page: p })}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
