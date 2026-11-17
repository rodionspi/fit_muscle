"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ErrorMessage, Field } from "formik";
import { AlertTriangle, Eye, EyeOff, Info, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inputClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type IconType = React.ComponentType<{ className?: string }>;

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  icon?: IconType;
}

/** Label + Formik field + validation message, styled like <Input>. */
export const FormField = ({ name, label, type = "text", placeholder, autoComplete, icon: Icon }: FormFieldProps) => (
  <div>
    <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground/90">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(inputClassName, Icon && "pl-10")}
      />
    </div>
    <ErrorMessage name={name} component="p" className="mt-1.5 text-sm text-red-300" />
  </div>
);

interface PasswordFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
}

/** Password field with a show / hide toggle. */
export const PasswordField = ({
  name = "password",
  label = "Password",
  placeholder = "Your password",
  autoComplete,
  hint,
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground/90">
        {label}
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Field
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(inputClassName, "pl-10 pr-11")}
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((state) => !state)}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      <ErrorMessage name={name} component="p" className="mt-1.5 text-sm text-red-300" />
    </div>
  );
};

interface GoogleButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const GoogleButton = ({ onClick, disabled, children }: GoogleButtonProps) => (
  <Button type="button" variant="white" size="lg" className="w-full" onClick={onClick} disabled={disabled}>
    <Image src="/images/logos/google_logo.png" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
    {children}
  </Button>
);

interface FormAlertProps {
  tone: "error" | "info";
  children: React.ReactNode;
}

export const FormAlert = ({ tone, children }: FormAlertProps) => (
  <div
    role={tone === "error" ? "alert" : "status"}
    className={cn(
      "flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed",
      tone === "error"
        ? "border-red-500/30 bg-red-500/10 text-red-200"
        : "border-sky-500/30 bg-sky-500/10 text-sky-200"
    )}
  >
    {tone === "error" ? (
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
    ) : (
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
    )}
    <p>{children}</p>
  </div>
);

export const OrDivider = () => (
  <div className="relative my-6 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
    <span className="absolute inset-x-0 top-1/2 h-px bg-border" aria-hidden="true" />
    <span className="relative bg-card px-3">or</span>
  </div>
);
