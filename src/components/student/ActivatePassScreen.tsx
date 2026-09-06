import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { ASSETS } from '../../data/mockData';
import { Header } from '../common/Header';

interface ActivatePassScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const ActivatePassScreen: React.FC<ActivatePassScreenProps> = ({ onNavigate }) => {
  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'vodafone'>('instapay');
  const [studentName, setStudentName] = useState('أحمد طارق حسن');
  const [phone, setPhone] = useState('01198765432');
  const [txRef, setTxRef] = useState('IP-994821');
  const [receiptImage, setReceiptImage] = useState<string | null>(ASSETS.receiptUploadDemo);
  const [copied, setCopied] = useState(false);

  const transferAddress =
    paymentMethod === 'instapay' ? 'ahmed.teacher@instapay' : '010 1234 5678';

  const handleCopy = () => {
    navigator.clipboard.writeText(transferAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setReceiptImage(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Proceed to Payment Under Review screen
    onNavigate('payment-status');
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col" dir="rtl">
      <Header
        title="تفعيل اشتراك الترم"
        subtitle="Kinetic Pass"
        showBack={true}
        onBack={() => onNavigate('home')}
        onNavigate={onNavigate}
        badge="الترم الثاني"
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface px-margin-mobile">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-stack-lg pt-stack-xs">
          {/* Plan Summary Card */}
          <div className="rounded-3xl bg-gradient-to-tr from-primary to-primary-container p-5 text-white shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold">
                الصف الثالث الثانوي
              </span>
              <span className="text-2xl font-black">250 ج.م</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">اشتراك الفصل الدراسي الثاني كاملاً</h1>
              <p className="text-xs text-white/80 mt-0.5">
                تفعيل فوري لجميع الوحدات وبنك الأسئلة والمراجعات النهائية
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                <span>فتح جميع وحدات المنهج (Units 1 - 6)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                <span>أكثر من 650 سؤال بنك أسئلة وتدريبات تفاعلية</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                <span>متابعة خاصة من مستر أحمد حسن وفريق المساعدين</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-on-surface">اختر طريقة الدفع والتحويل:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('instapay')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'instapay'
                    ? 'border-primary bg-primary/5 text-primary shadow-xs'
                    : 'border-surface-container-high bg-surface-container-lowest text-on-surface-variant'
                }`}
              >
                <span className="text-xl">⚡</span>
                <span className="font-bold text-xs">إنستاباي (InstaPay)</span>
                <span className="text-[10px] text-tertiary font-medium">تحويل لحظي فوري</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('vodafone')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'vodafone'
                    ? 'border-primary bg-primary/5 text-primary shadow-xs'
                    : 'border-surface-container-high bg-surface-container-lowest text-on-surface-variant'
                }`}
              >
                <span className="text-xl">📱</span>
                <span className="font-bold text-xs">فودافون كاش</span>
                <span className="text-[10px] text-on-surface-variant font-medium">محفظة الهاتف</span>
              </button>
            </div>
          </div>

          {/* Transfer Info Box */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
            <span className="text-xs text-on-surface-variant font-medium">
              بيانات التحويل الخاصة بحساب الأكاديمية:
            </span>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-high">
              <div className="flex flex-col text-left font-mono text-xs font-bold text-primary truncate pl-2">
                <span>{transferAddress}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center gap-1 active:scale-95 transition-all shrink-0"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
              </button>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              يرجى تحويل مبلغ <strong>250 جنيه مصري</strong> مع كتابة اسم الطالب في خانة الملاحظات، ثم أخذ
              لقطة شاشة (سكرين شوت) واضحة للإيصال ورفعها بالأسفل.
            </p>
          </div>

          {/* Verification Form Inputs */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 border border-surface-container-low shadow-sm flex flex-col gap-3">
            <h3 className="text-xs font-bold text-on-surface">بيانات الطالب وتأكيد الدفع</h3>

            <div>
              <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                اسم الطالب ثلاثي:
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:border-primary focus:outline-none"
                placeholder="أدخل اسم الطالب..."
              />
            </div>

            <div>
              <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                رقم الواتساب المسجل:
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface font-mono focus:border-primary focus:outline-none"
                placeholder="01xxxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                الرقم المرجعي للتحويل أو اسم الحساب المحول منه:
              </label>
              <input
                type="text"
                required
                value={txRef}
                onChange={(e) => setTxRef(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface font-mono focus:border-primary focus:outline-none"
                placeholder="مثال: IP-994821 أو رقم المحفظة"
              />
            </div>

            {/* Receipt Upload */}
            <div>
              <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                صورة إيصال التحويل (Screenshot):
              </label>

              {receiptImage ? (
                <div className="relative rounded-xl overflow-hidden border border-primary/40 bg-surface-container-low p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={receiptImage}
                      alt="Uploaded receipt"
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex flex-col text-xs">
                      <span className="font-bold text-on-surface">تم إرفاق الإيصال بنجاح ✓</span>
                      <span className="text-[10px] text-tertiary">صورة واضحة ومقروءة</span>
                    </div>
                  </div>
                  <label className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-on-surface cursor-pointer hover:bg-surface-container-highest">
                    تغيير
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors text-center">
                  <span className="material-symbols-outlined text-[32px] text-primary mb-1">
                    cloud_upload
                  </span>
                  <span className="text-xs font-bold text-primary">انقر لاختيار صورة الإيصال</span>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">
                    JPG أو PNG (حجم أقصى 5 ميجابايت)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* SLA Notification */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">
              schedule
            </span>
            <p className="leading-relaxed">
              <strong>وقت التفعيل:</strong> يتم فحص الإيصال واعتماد الاشتراك خلال 15 إلى 30 دقيقة، وستصلك
              رسالة تأكيد مباشرة على الواتساب.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer active:scale-[0.99]"
          >
            <span>إرسال طلب التفعيل الآن</span>
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>

          {/* WhatsApp Support Direct Button */}
          <div className="flex items-center justify-center gap-1 text-xs text-on-surface-variant pb-4">
            <span>تواجه مشكلة في الدفع؟</span>
            <a
              href="https://wa.me/201012345678"
              target="_blank"
              rel="noreferrer"
              className="text-primary font-bold hover:underline flex items-center gap-0.5"
            >
              <span>تواصل مع المساعد عبر واتساب</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};
