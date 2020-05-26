import React from "react";

export default function PodiaNewsletter({ url }) {
  return (
    <form action={url} acceptCharset="UTF-8" method="post">
      <input name="utf8" type="hidden" value="✓" />
      <input
        type="email"
        name="email"
        required="required"
        placeholder="Email"
      />
      <button type="submit" className="btn">
        Subscribe
      </button>
    </form>
  );
}
