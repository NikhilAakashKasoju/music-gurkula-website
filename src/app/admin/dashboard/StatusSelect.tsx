"use client";

import { useTransition } from "react";
import { updateStatusAction } from "./actions";
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/lib/enquiryStatus";

export default function StatusSelect({
  id,
  status,
}: {
  id: number;
  status: EnquiryStatus;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    startTransition(async () => {
      try {
        await updateStatusAction(id, next);
      } catch {
        alert("Could not update status.");
      }
    });
  }

  return (
    <select
      className="mg-status-select"
      defaultValue={status}
      onChange={handleChange}
      disabled={isPending}
    >
      {ENQUIRY_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
