"use client";

import { useEffect, useState } from "react";
import AdminForm from "@/components/admin/AdminForm";

export default function AdminSingletonForm({ resource, title, fields }) {
  const [initialValues, setInitialValues] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/${resource}`)
      .then((res) => res.json())
      .then(setInitialValues);
  }, [resource]);

  async function handleSubmit(values) {
    const res = await fetch(`/api/admin/${resource}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not save.");
    setInitialValues(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl text-black">{title}</h1>
        {saved ? <span className="text-xs uppercase tracking-wide text-green-600">Saved</span> : null}
      </div>
      {!initialValues ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <AdminForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Save Changes" />
      )}
    </div>
  );
}
