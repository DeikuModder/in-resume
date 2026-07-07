import { useState } from "react";
import {
  faPrint,
  faDownload,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Providers/useAuth";
import useCVInfo from "../hooks/useCVInfo";
import { API_BASE } from "../services/api";
import { getTemplate } from "@/templates/index";

const DOWNLOAD_COUNT_KEY = "pdfDownloadCount";

const PrintButton = () => {
  const { t } = useTranslation("global");
  const { user, token } = useAuth();
  const { cvInfo, templateId, accentColor, sectionOrder, sidebarOrder } = useCVInfo();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadCount, setDownloadCount] = useState(() =>
    parseInt(localStorage.getItem(DOWNLOAD_COUNT_KEY) ?? "0", 10),
  );

  const isPremiumUser = user?.tier === "premium";
  const isTemplatePremium = getTemplate(templateId).premium;

  const handlePrint = () => window.print();

  const incrementDownloadCount = () => {
    const next = downloadCount + 1;
    setDownloadCount(next);
    localStorage.setItem(DOWNLOAD_COUNT_KEY, next.toString());
    return next;
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 5000);
  };

  const handleDownloadPdf = async () => {
    if (isTemplatePremium && !isPremiumUser) {
      setShowPremiumGate(true);
      return;
    }

    setIsGenerating(true);
    try {
      let pdfBlob: Blob;

      if (token) {
        // Authenticated flow: sync current resume to backend slot then download
        const upsertRes = await fetch(`${API_BASE}/resumes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            slotName: "slot1",
            name: cvInfo.name,
            pictureUrl: cvInfo.pictureUrl,
            role: cvInfo.role,
            address: cvInfo.address,
            email: cvInfo.email,
            phone: cvInfo.phone,
            secondaryPhone: cvInfo.secondaryPhone,
            gitHubUser: cvInfo.gitHubUser,
            gitHubUrl: cvInfo.gitHubUrl,
            linkedinUser: cvInfo.linkedinUser,
            linkedinUrl: cvInfo.linkedinUrl,
            aboutMe: cvInfo.aboutMe,
            projects: cvInfo.projects,
            education: cvInfo.education,
            experience: cvInfo.experience,
            languages: cvInfo.languages,
            skills: cvInfo.skills,
            softSkills: cvInfo.softSkills,
            certificates: cvInfo.certificates,
            hiddenSections: cvInfo.hiddenSections,
            templateId,
            accentColor,
            sectionOrder,
            sidebarOrder,
          }),
        });

        if (!upsertRes.ok) throw new Error("Failed to sync resume");

        const pdfRes = await fetch(`${API_BASE}/pdf/slot1`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!pdfRes.ok) throw new Error("Failed to generate PDF");
        pdfBlob = await pdfRes.blob();
      } else {
        // Anonymous flow: send resume data directly, receive PDF with watermark
        const res = await fetch(`${API_BASE}/pdf/anonymous`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: cvInfo.name,
            pictureUrl: cvInfo.pictureUrl,
            role: cvInfo.role,
            address: cvInfo.address,
            email: cvInfo.email,
            phone: cvInfo.phone,
            secondaryPhone: cvInfo.secondaryPhone,
            gitHubUser: cvInfo.gitHubUser,
            gitHubUrl: cvInfo.gitHubUrl,
            linkedinUser: cvInfo.linkedinUser,
            linkedinUrl: cvInfo.linkedinUrl,
            aboutMe: cvInfo.aboutMe,
            projects: cvInfo.projects,
            education: cvInfo.education,
            experience: cvInfo.experience,
            languages: cvInfo.languages,
            skills: cvInfo.skills,
            softSkills: cvInfo.softSkills,
            certificates: cvInfo.certificates,
            hiddenSections: cvInfo.hiddenSections,
            templateId,
            accentColor,
            sectionOrder,
            sidebarOrder,
          }),
        });

        if (res.status === 429) {
          throw new Error(t("pdf.rateLimit"));
        }
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            Array.isArray(err.message)
              ? err.message.join(", ")
              : (err.message ?? "Failed to generate PDF"),
          );
        }
        pdfBlob = await res.blob();
      }

      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cvInfo.name || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      if (!isPremiumUser) {
        incrementDownloadCount();
        setShowUpsell(true);
        setTimeout(
          () => setShowUpsell(false),
          downloadCount >= 2 ? 10000 : 6000,
        );
      }
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="hideOnPrint flex items-center gap-2">
        <button
          className="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg"
          onClick={handlePrint}
        >
          {t("print-button")} <FontAwesomeIcon icon={faPrint} />
        </button>
        <button
          className="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg disabled:opacity-50 transition-opacity"
          onClick={handleDownloadPdf}
          disabled={isGenerating}
        >
          {isGenerating ? t("pdf.generating") : t("pdf.download")}{" "}
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>

      {/* Error toast */}
      {errorMsg && (
        <div className="fixed bottom-6 right-6 bg-red-700 text-white p-4 rounded-xl shadow-lg z-50 max-w-xs text-sm">
          {errorMsg}
        </div>
      )}

      {/* Post-download upsell toast */}
      {showUpsell && !isPremiumUser && (
        <div className="fixed bottom-6 right-6 bg-neutral-800 border border-neutral-600 text-white p-4 rounded-xl shadow-lg z-50 max-w-xs">
          <button
            onClick={() => setShowUpsell(false)}
            className="absolute top-2 right-3 text-neutral-400 hover:text-white text-lg leading-none"
            aria-label="Dismiss"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <p className="text-sm pr-5 leading-snug">
            {downloadCount >= 3 ? t("pdf.upsellStrong") : t("pdf.upsell")}
          </p>
        </div>
      )}

      {/* Premium template gate modal */}
      {showPremiumGate && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => setShowPremiumGate(false)}
        >
          <div
            className="bg-neutral-900 text-white p-6 rounded-xl max-w-sm mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">✨ Premium Template</h2>
            <p className="text-neutral-300 text-sm mb-5">
              {t("pdf.premiumGate")}
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded-lg text-sm hover:bg-yellow-300 transition-colors"
                onClick={() => setShowPremiumGate(false)}
              >
                {t("pdf.upgradeCta")}
              </button>
              <button
                className="flex-1 bg-neutral-700 text-white py-2 rounded-lg text-sm hover:bg-neutral-600 transition-colors"
                onClick={() => setShowPremiumGate(false)}
              >
                {t("pdf.premiumGateClose")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrintButton;
