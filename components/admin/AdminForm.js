"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

const inputClass =
  "w-full border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-navy";
const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500";

function fieldDefault(field) {
  if (field.type === "string-array" || field.type === "image-array" || field.type === "object-array") return [];
  if (field.type === "number") return 0;
  return "";
}

function emptyItem(itemFields) {
  const item = {};
  itemFields.forEach((f) => {
    item[f.key] = f.type === "number" ? 0 : "";
  });
  return item;
}

function ObjectArrayField({ field, value, onChange }) {
  function updateItem(index, key, itemValue) {
    const next = [...value];
    next[index] = { ...next[index], [key]: itemValue };
    onChange(next);
  }

  return (
    <div className="space-y-4">
      {value.map((item, i) => (
        <div key={i} className="space-y-3 border border-slate-200 p-4">
          {field.itemFields.map((itemField) => (
            <div key={itemField.key}>
              <label className={labelClass}>{itemField.label}</label>
              {itemField.type === "textarea" ? (
                <textarea
                  rows={itemField.rows || 3}
                  value={item[itemField.key] ?? ""}
                  onChange={(e) => updateItem(i, itemField.key, e.target.value)}
                  className={inputClass}
                />
              ) : itemField.type === "select" ? (
                <select
                  value={item[itemField.key] ?? ""}
                  onChange={(e) => updateItem(i, itemField.key, e.target.value)}
                  className={inputClass}
                >
                  {itemField.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : itemField.type === "image" ? (
                <ImageUploader value={item[itemField.key]} onChange={(url) => updateItem(i, itemField.key, url)} />
              ) : itemField.type === "number" ? (
                <input
                  type="number"
                  value={item[itemField.key] ?? 0}
                  onChange={(e) => updateItem(i, itemField.key, e.target.valueAsNumber || 0)}
                  className={inputClass}
                />
              ) : (
                <input
                  type="text"
                  value={item[itemField.key] ?? ""}
                  onChange={(e) => updateItem(i, itemField.key, e.target.value)}
                  className={inputClass}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-xs uppercase tracking-wide text-red-600"
          >
            Remove Card
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, emptyItem(field.itemFields)])}
        className="text-xs uppercase tracking-wide text-black underline"
      >
        + Add {field.itemLabel || "Item"}
      </button>
    </div>
  );
}

export default function AdminForm({ fields, initialValues = {}, onSubmit, onCancel, submitLabel = "Save" }) {
  const [values, setValues] = useState(() => {
    const base = {};
    fields.forEach((field) => {
      base[field.key] = initialValues[field.key] ?? fieldDefault(field);
    });
    return base;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setValue(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-slate-200 bg-white p-6">
      {fields.map((field) => (
        <div key={field.key}>
          <label className={labelClass}>{field.label}</label>

          {field.type === "text" && (
            <input
              type="text"
              required={field.required}
              value={values[field.key]}
              onChange={(e) => setValue(field.key, e.target.value)}
              className={inputClass}
            />
          )}

          {field.type === "number" && (
            <input
              type="number"
              required={field.required}
              value={values[field.key]}
              onChange={(e) => setValue(field.key, e.target.valueAsNumber || 0)}
              className={inputClass}
            />
          )}

          {field.type === "textarea" && (
            <textarea
              required={field.required}
              rows={field.rows || 4}
              value={values[field.key]}
              onChange={(e) => setValue(field.key, e.target.value)}
              className={inputClass}
            />
          )}

          {field.type === "select" && (
            <select
              value={values[field.key]}
              onChange={(e) => setValue(field.key, e.target.value)}
              className={inputClass}
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "image" && (
            <ImageUploader value={values[field.key]} onChange={(url) => setValue(field.key, url)} />
          )}

          {field.type === "string-array" && (
            <textarea
              rows={field.rows || 4}
              placeholder="One item per line"
              value={values[field.key].join("\n")}
              onChange={(e) => setValue(field.key, e.target.value.split("\n"))}
              className={inputClass}
            />
          )}

          {field.type === "image-array" && (
            <div className="space-y-3">
              {values[field.key].map((url, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ImageUploader
                    value={url}
                    onChange={(newUrl) => {
                      const next = [...values[field.key]];
                      next[i] = newUrl;
                      setValue(field.key, next);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setValue(field.key, values[field.key].filter((_, idx) => idx !== i))}
                    className="text-xs uppercase tracking-wide text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setValue(field.key, [...values[field.key], ""])}
                className="text-xs uppercase tracking-wide text-black underline"
              >
                + Add Image
              </button>
            </div>
          )}

          {field.type === "object-array" && (
            <ObjectArrayField field={field} value={values[field.key]} onChange={(next) => setValue(field.key, next)} />
          )}
        </div>
      ))}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-navy px-6 py-2.5 text-xs font-medium uppercase tracking-wide text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {onCancel ? (
          <button type="button" onClick={onCancel} className="px-6 py-2.5 text-xs font-medium uppercase tracking-wide text-slate-500">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
