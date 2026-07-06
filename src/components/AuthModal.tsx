import { useState, FormEvent } from "react";
import { useAuth } from "../Providers/useAuth";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const AuthModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register } = useAuth();
  const { t } = useTranslation("global");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("auth.error-generic"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setEmail("");
    setPassword("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-8 relative text-neutral-900">
        <button
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faX} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {mode === "login" ? t("auth.title-login") : t("auth.title-register")}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 font-semibold text-sm">
            {t("auth.email")}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="border border-neutral-300 rounded-lg px-3 py-2 font-normal text-base focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="you@email.com"
            />
          </label>

          <label className="flex flex-col gap-1 font-semibold text-sm">
            {t("auth.password")}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              className="border border-neutral-300 rounded-lg px-3 py-2 font-normal text-base focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="••••••••"
            />
            {mode === "register" && (
              <span className="text-xs text-neutral-400 font-normal">
                {t("auth.password-hint")}
              </span>
            )}
          </label>

          {error && (
            <p className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-neutral-900 text-white font-bold py-2 rounded-lg hover:bg-neutral-700 disabled:opacity-50 transition-colors mt-2"
          >
            {isSubmitting
              ? t("auth.loading")
              : mode === "login"
                ? t("auth.submit-login")
                : t("auth.submit-register")}
          </button>
        </form>

        <button
          className="mt-5 text-sm text-neutral-500 hover:text-neutral-900 underline w-full text-center transition-colors"
          onClick={switchMode}
        >
          {mode === "login"
            ? t("auth.switch-to-register")
            : t("auth.switch-to-login")}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
