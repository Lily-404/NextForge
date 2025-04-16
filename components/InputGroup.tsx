"use client"

import type React from "react"

interface InputGroupProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean
  placeholder?: string
}

export default function InputGroup({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  placeholder = "",
}: InputGroupProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={4}
          className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
        />
      )}
    </div>
  )
}
