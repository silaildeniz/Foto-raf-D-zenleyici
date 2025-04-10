# Fotograf-Duzenleyici
Fotoğraf Kırpma,Döndürme,Size Ayarlama Uygulaması 
Bu proje, kullanıcıların yükledikleri görselleri belirledikleri boyut, döndürme, çevirme ve kırpma gibi işlemlerle düzenlemelerini sağlayan bir uygulamadır. Frontend kısmı React ile, backend kısmı ise FastAPI ile geliştirilmiştir. Kullanıcı, görseli yükledikten sonra çeşitli düzenlemeler yapabilir ve işlenmiş görseli anında görebilir.

## Teknolojiler

- **Frontend**: React, Axios, CSS
- **Backend**: FastAPI, Pillow (Python için görüntü işleme kütüphanesi)

## Özellikler

- **Resim Yükleme**: Kullanıcı, bir görsel dosyası yükleyebilir.
- **Boyutlandırma**: Görselin genişlik ve yüksekliği kullanıcı tarafından belirlenebilir.
- **Döndürme**: Görsel, kullanıcı tarafından girilen açıya göre döndürülebilir.
- **Çevirme**: Görselin yatay veya dikey olarak çevrilmesi sağlanabilir.
- **Kırpma**: Görselin belirli bir bölgesi kırpılabilir.
- **Görsel Önizleme**: İşlenen görsel, anında kullanıcıya gösterilir.

## Kurulum

### Backend (FastAPI)

1. **Gerekli paketlerin yüklenmesi**:

   FastAPI ve Pillow kütüphanelerini yüklemek için aşağıdaki komutları çalıştırın:
   pip install fastapi uvicorn pillow
FastAPI'yi başlatın:

uvicorn main:app --reload
Backend varsayılan olarak http://localhost:8000 adresinde çalışacaktır.

Frontend (React)
React Uygulamasını Başlatma:

npm install
npm run dev

Uygulama varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

Frontend uygulamasına gidin.

Bir görsel yükleyin.

Görseli düzenlemek için gerekli parametreleri (boyut, döndürme, çevirme, kırpma) girin.

"Resmi Düzenle" butonuna tıklayın.

İşlenen görselin anında önizlemesini görebileceksiniz.

API Endpoints
POST /process
Bu endpoint, gönderilen görseli işlemekte kullanılır.

Parametreler:

file (Required): Yüklenen resim dosyası.

width (Optional): Yeni genişlik (Varsayılan: 300).

height (Optional): Yeni yükseklik (Varsayılan: 300).

rotate (Optional): Döndürme açısı (Varsayılan: 0).

flip (Optional): Çevirme tipi (none, horizontal, vertical).

crop_x (Optional): Kırpma için X koordinatı (Varsayılan: 0).

crop_y (Optional): Kırpma için Y koordinatı (Varsayılan: 0).

crop_width (Optional): Kırpma genişliği (Varsayılan: 300).

crop_height (Optional): Kırpma yüksekliği (Varsayılan: 300).

