"use client"

import type React from "react"

import { useState } from "react"
import InputGroup from "./InputGroup"

interface ContactFormProps {
  variant?: "business" | "creative"
}

export default function ContactForm({ variant = "business" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const isCreative = variant === "creative"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    alert("消息已发送！")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputGroup
        label="姓名"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        variant={variant}
      />

      <InputGroup
        label="邮箱"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        variant={variant}
      />

      <InputGroup
        label="留言"
        name="message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        required
        variant={variant}
      />

      <div className="pt-2">
        <button
          type="submit"
          className={`
            w-full py-2 px-4 rounded-md font-medium transition-colors
            ${
              isCreative
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }
          `}
        >
          发送消息
        </button>
      </div>
    </form>
  )
}
