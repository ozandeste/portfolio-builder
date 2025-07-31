# Portfolio Builder

Modern ve kullanıcı dostu bir portfolio oluşturma uygulaması. React ile geliştirilmiş bu uygulama, geliştiricilerin profesyonel portfolyolarını adım adım oluşturmalarına ve PDF olarak dışa aktarmalarına olanak tanır.

Canlı Önizleme: [Live Preview][https://flourishing-elf-e2cb3e.netlify.app/]

## 🌟 Özellikler

### ✨ Modern Tasarım
- Responsive ve mobile-friendly tasarım
- Tailwind CSS ile şık ve modern UI/UX
- Adım bazlı (step-by-step) form sistemi
- Real-time form validasyonu ve hata gösterimi

### 📝 Kapsamlı Form Sistemi
- **Kişisel Bilgiler**: Ad, e-posta, telefon, konum, website, LinkedIn
- **Deneyim**: Şirket, pozisyon, tarih aralığı, açıklama
- **Eğitim**: Kurum, derece, alan, mezuniyet tarihi, GPA
- **Beceriler**: Beceri adı ve seviye (Beginner, Intermediate, Advanced, Expert)

### 🎯 Akıllı Validasyon
- Real-time form validasyonu
- E-posta formatı kontrolü
- URL formatı doğrulaması
- LinkedIn profil URL doğrulaması
- Minimum karakter sınırları
- Tarih aralığı kontrolü

### 📊 İlerleme Takibi
- Görsel ilerleme çubuğu
- Adım durumu göstergeleri (tamamlandı, eksik, aktif)
- Tamamlanmamış adımlara geçiş engellemesi
- Validasyon uyarıları

### 📄 PDF Export
- Profesyonel PDF çıktısı
- Otomatik sayfa bölmesi
- Yüksek kaliteli görüntü aktarımı
- Otomatik dosya adlandırma

## 🛠️ Teknolojiler

- **React 18+** - Modern React hooks ile state yönetimi
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern ikonlar
- **jsPDF** - PDF oluşturma
- **html2canvas** - HTML'den canvas'a dönüştürme
- **Context API** - Global state yönetimi

## 🚀 Kurulum

### Gereksinimler
- Node.js 16+
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone [repository-url]
   cd portfolio-builder
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Gerekli paketleri yükleyin**
   ```bash
   npm install jspdf html2canvas lucide-react
   # veya
   yarn add jspdf html2canvas lucide-react
   ```

4. **Uygulamayı başlatın**
   ```bash
   npm start
   # veya
   yarn start
   ```

5. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```
