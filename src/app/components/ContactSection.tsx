"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { useUmami } from "@/contexts/UmamiContext";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function ContactSection() {
  const { t } = useTranslation();
  const { track } = useUmami();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = t("contact.form.validation.nameRequired") as string;
    }
    
    if (!formData.email.trim()) {
      errors.email = t("contact.form.validation.emailRequired") as string;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("contact.form.validation.emailInvalid") as string;
    }
    
    if (!formData.message.trim()) {
      errors.message = t("contact.form.validation.messageRequired") as string;
    } else if (formData.message.trim().length < 10) {
      errors.message = t("contact.form.validation.messageMinLength") as string;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      track('Contact Form Validation Error', {
        errors: Object.keys(formErrors),
        error_count: Object.keys(formErrors).length
      });
      return;
    }
    
    track('Contact Form Submit', {
      has_company: formData.company.trim() !== '',
      message_length: formData.message.length,
      name_provided: formData.name.trim() !== '',
      email_provided: formData.email.trim() !== ''
    });
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", company: "", message: "" });
    
    track('Contact Form Success', {
      submission_successful: true
    });
    
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.05 }}
          >
            <h2 className="text-3xl font-sans font-bold text-gray-900 mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-lg font-mono text-gray-600">
              {t("contact.subtitle")}
            </p>
          </motion.div>

          {submitSuccess && (
            <motion.div 
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-green-800 font-mono font-medium">
                {t("contact.form.successMessage")}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.05 }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-mono">
                        {t("contact.form.name")} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("contact.form.namePlaceholder") as string}
                        className={formErrors.name ? "border-red-500" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-sm font-caveat text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-mono">
                        {t("contact.form.email")} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("contact.form.emailPlaceholder") as string}
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-sm font-caveat text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-mono">{t("contact.form.company")}</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.companyPlaceholder") as string}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-mono">
                      {t("contact.form.message")} <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.messagePlaceholder") as string}
                      rows={5}
                      className={formErrors.message ? "border-red-500" : ""}
                    />
                    {formErrors.message && (
                      <p className="text-sm font-caveat text-red-500">{formErrors.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-mono font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {t("contact.form.sending")}
                      </>
                    ) : (
                      <>
                        {t("contact.form.sendMessage")}
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}