# Blog Projesi 

Node.js ile geliştirilmiş basit bir blog yönetim sistemi. Bu proje, HTTP sunucusu kullanarak blog yazıları oluşturma, okuma ve listeleme işlemlerini gerçekleştirir.

## 🚀 Özellikler

- **Blog Oluşturma**: Yeni blog yazıları oluşturabilme
- **Blog Okuma**: Mevcut blog yazılarını okuyabilme
- **Blog Listeleme**: Tüm blog yazılarını listeleme
- **Event-Driven Mimari**: EventEmitter kullanarak blog işlemlerini takip etme
- **Aktivite Loglama**: Tüm blog işlemlerinin otomatik loglanması
- **JSON Tabanlı Depolama**: Basit dosya sistemi tabanlı veri saklama

## 📁 Proje Yapısı

```
blog-projesi-2/
├── blogManager.js      # Blog yönetim sınıfı
├── server.js          # HTTP sunucu
├── package.json       # Proje bağımlılıkları
├── blogs/             # Blog dosyalarının saklandığı klasör
│   ├── blog-1.json
│   ├── blog-2.json
│   └── ...
├── logs/              # Aktivite logları (otomatik oluşturulur)
│   └── activity.log
└── public/            # Statik dosyalar
    └── 404.html       # Hata sayfası
```

## 🛠️ Kurulum

1. Projeyi klonlayın:

```bash
git clone <repository-url>
cd blog-projesi-2
```

2. Bağımlılıkları yükleyin (bu proje sadece Node.js built-in modüllerini kullanır):

```bash
npm install
```

3. Sunucuyu başlatın:

```bash
npm start
```

Sunucu `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## 📖 API Kullanımı

### Ana Sayfa

```
GET /
```

Basit bir karşılama mesajı döndürür.

### Tüm Blogları Listele

```
GET /blogs
```

Tüm blog yazılarını JSON formatında döndürür.

### Belirli Bir Blogu Oku

```
GET /blog/:id
```

Belirtilen ID'ye sahip blog yazısını döndürür.

**Örnek:**

```
GET /blog/1
```

### Yeni Blog Oluştur

```
POST /create
Content-Type: application/json

{
  "title": "Blog Başlığı",
  "content": "Blog içeriği..."
}
```

## 💡 Örnek Kullanım

### cURL ile blog oluşturma:

```bash
curl -X POST http://localhost:3000/create \
  -H "Content-Type: application/json" \
  -d '{"title":"Yeni Blog","content":"Bu yeni bir blog yazısıdır."}'
```

### cURL ile blog okuma:

```bash
curl http://localhost:3000/blog/1
```

### cURL ile tüm blogları listeleme:

```bash
curl http://localhost:3000/blogs
```

## 🏗️ Teknik Detaylar

- **Node.js**: Vanilla Node.js (harici bağımlılık yok)
- **HTTP Server**: Node.js built-in `http` modülü
- **File System**: Asenkron dosya işlemleri için `fs/promises`
- **Event System**: `EventEmitter` ile blog işlemlerini takip
- **Data Format**: JSON tabanlı veri saklama

## 📝 Blog Veri Yapısı

Her blog yazısı aşağıdaki yapıda saklanır:

```json
{
  "id": "1",
  "title": "Blog Başlığı",
  "content": "Blog içeriği...",
  "date": "2025-07-23",
  "readCount": 0
}
```

## 🔧 Geliştirme

Proje, basit ve anlaşılır bir yapıya sahiptir:

- `BlogManager` sınıfı tüm blog işlemlerini yönetir
- Event-driven mimari ile işlemler loglanır
- Otomatik ID ataması yapılır
- Hata durumları için 404 sayfası sunulur

## 📄 Lisans

ISC

## 👤 Yazar

Yusuf Arslan
