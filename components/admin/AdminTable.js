"use client";

import { useEffect, useState } from "react";
import AdminForm from "@/components/admin/AdminForm";

export default function AdminTable({ resource, title, fields, columns }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...item} = edit
  const [error, setError] = useState("");

  const displayColumns = columns || fields.slice(0, 3).map((f) => f.key);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/${resource}`);
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [resource]);

  async function handleSubmit(values) {
    const isEdit = Boolean(editing?._id);
    const url = isEdit ? `/api/admin/${resource}/${editing._id}` : `/api/admin/${resource}`;
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not save.");
    setEditing(null);
    await load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl text-black">{title}</h1>
        {!editing ? (
          <button
            onClick={() => setEditing({})}
            className="bg-navy px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-white"
          >
            + Add New
          </button>
        ) : null}
      </div>

      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      {editing ? (
        <div className="mb-8">
          <AdminForm
            fields={fields}
            initialValues={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitLabel={editing._id ? "Update" : "Create"}
          />
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-500">No items yet — the public site is showing its built-in defaults.</p>
      ) : (
        <div className="overflow-x-auto border border-slate-200">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {displayColumns.map((col) => (
                  <th key={col} className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-slate-200">
                  {displayColumns.map((col) => (
                    <td key={col} className="max-w-xs truncate px-4 py-3 text-slate-700">
                      {Array.isArray(item[col]) ? item[col].join(", ") : String(item[col] ?? "")}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button onClick={() => setEditing(item)} className="mr-4 text-xs font-medium uppercase tracking-wide text-black">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-xs font-medium uppercase tracking-wide text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
